import SparkMD5 from 'spark-md5';
import { getBlobSlice } from './util';

const DEFAULT_CHUNK_SIZE = 5 * 1024 * 1024;
const DEFAULT_OPTIONS = {
  chunkSize: DEFAULT_CHUNK_SIZE
};

export interface IFileUploaderClientOptions {
  chunkSize: number;
  requestOptions?: {
    retryTimes: number;
    initFilePartUploadFunc: (currentIndex: number) => Promise<any>;
    uploadPartFileFunc: (chunk: Blob, index: number, currentIndex: number) => Promise<any>;
    finishFilePartUploadFunc: (md5: string, currentIndex: number) => Promise<any>;
  };
}

export interface uploadFileProps {
  file?: Blob;
  setPersent: (persent: number) => void;
  currentIndex: number;
}

export class FileUploaderClient {
  fileUploaderClientOptions: IFileUploaderClientOptions;
  md5: string;
  chunkList: Blob[];
  abort: string;
  tmpList: Blob[];
  results: any[];
  startIndex: number;
  sum: number;
  currentIndex: number;
  makePersent: (persent: number) => void;
  retryList: any[];
  constructor(options: IFileUploaderClientOptions) {
    console.log('rrrrrrrr');
    this.fileUploaderClientOptions = Object.assign(DEFAULT_OPTIONS, options);
    this.abort = 'upload';
    this.md5 = '';
    this.results = [];
    this.startIndex = 0;
    this.sum = 0;
    this.retryList = [];
    this.currentIndex = 0;
    this.tmpList = [];
  }
  public createRequest(tasks: any[], pool: number, chunkList: any) {
    this.results = [];
    pool = pool || 5;
    let together = new Array(pool).fill(null);
    let index = 0;
    together = together.map((item, i) => {
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      const that = this;
      return new Promise<void>((resolve, reject) => {
        const run = function run() {
          if (index >= tasks.length) {
            resolve();
            return;
          }
          const old_index = index;
          // 从任务池拿任务，由于index是升级作用域的变量，所以多个Promise共享一个index
          //这样可以让一个数组里面的任务一次执行
          const task = tasks[index++];
          console.log(`开始上传分片${index - 1 + that.startIndex}`);
          task(chunkList[index - 1], index - 1 + that.startIndex, that.currentIndex)
            .then((result: any) => {
              console.log(`上传分片${result}完成`, (that.results.length * 100) / that.sum);
              that.makePersent((that.results.length * 100) / that.sum);
              // 将返回的结果放置在results里面，实现请求数据的集中存储。
              that.results[old_index] = result;
              // 只有在上一个   任务执行成功后才会执行一个异步任务
              run();
              // this.startNumber += 1;
            })
            .catch((e: any) => {
              console.error(e.e, that.results.length);
              if (e.e.message === 'cancle request!') {
                console.warn(`${e.index} part upload failed`);
              } else {
                console.warn(`${e.index} part upload failed`);
                that.retryList.push(e.index);
              }
              reject(that.results.length);
            });
        };
        run();
      });
    });
    // 多个promise同时处理，根据pool来限制同一时刻并发请求的个数
    return Promise.all(together)
      .then(() => this.results)
      .catch((e) => {
        console.log('eeeeee', e);
      });
  }
  /**
   * 将file对象进行切片，然后根据切片计算md5
   * @param file 要上传的文件
   * @returns 返回md5和切片列表
   */

  public async getChunkListAndFileMd5(file: Blob): Promise<{ md5: string; chunkList: Blob[] }> {
    return new Promise((resolve, reject) => {
      let currentChunk = 0;
      const chunkSize = this.fileUploaderClientOptions.chunkSize;
      const chunks = Math.ceil(file.size / chunkSize);
      const spark = new SparkMD5.ArrayBuffer();
      const fileReader = new FileReader();
      const blobSlice = getBlobSlice();
      const chunkList: Blob[] = [];

      fileReader.onload = function (e) {
        if (e?.target?.result instanceof ArrayBuffer) {
          spark.append(e.target.result);
        }
        currentChunk++;

        if (currentChunk < chunks) {
          loadNextChunk();
        } else {
          const computedHash = spark.end();
          resolve({ md5: computedHash, chunkList });
        }
      };

      fileReader.onerror = function (e) {
        console.warn('read file error', e);
        reject(e);
      };

      function loadNextChunk() {
        const start = currentChunk * chunkSize;
        const end = start + chunkSize >= file.size ? file.size : start + chunkSize;

        const chunk = blobSlice.call(file, start, end);
        chunkList.push(chunk);
        fileReader.readAsArrayBuffer(chunk);
      }
      loadNextChunk();
    });
  }
  /**
   * 上传文件方法，当FileUploaderClient的配置项中传入了requestOptions才能使用
   * 会依次执行getChunkListAndFileMd5、配置项中的initFilePartUploadFunc、配置项中的uploadPartFileFunc、配置项中的finishFilePartUploadFunc
   * 执行完成后返回上传结果，若有分片上传失败，则会自动重试
   * @param file 要上传的文件
   * @returns finishFilePartUploadFunc函数Promise resolve的值
   */
  public async uploadFile(props: uploadFileProps): Promise<any> {
    const { file, setPersent, currentIndex } = props;
    this.makePersent = setPersent;
    this.currentIndex = currentIndex;
    const requestOptions = this.fileUploaderClientOptions.requestOptions;
    if (file) {
      const { md5, chunkList } = await this.getChunkListAndFileMd5(file);
      this.chunkList = chunkList;
      this.tmpList = chunkList;
      this.sum = chunkList.length;
      this.md5 = md5;
      console.log('this.chunkList', this.chunkList);
    } else {
      console.log('this.tmpList', this.tmpList);
      this.chunkList = this.tmpList;
    }

    if (
      requestOptions?.retryTimes === undefined ||
      !requestOptions?.initFilePartUploadFunc ||
      !requestOptions?.uploadPartFileFunc ||
      !requestOptions?.finishFilePartUploadFunc
    ) {
      throw Error(
        'invalid request options, need retryTimes, initFilePartUploadFunc, uploadPartFileFunc and finishFilePartUploadFunc'
      );
    }

    const data = await requestOptions.initFilePartUploadFunc(this.currentIndex);
    // 妙传逻辑
    if (file && data.quickUpload) {
      console.log('quickUpload');
      return null;
    }
    const uploadArray = [];
    for (let index = 0; index < this.chunkList?.length || 0; index++) {
      uploadArray.push(requestOptions.uploadPartFileFunc);
    }
    console.log('uploadArray', uploadArray);
    this.createRequest(uploadArray, 5, this.chunkList)
      .then(async (results) => {
        console.log('retryList', this.retryList);
        for (let retry = 0; retry < requestOptions.retryTimes; retry++) {
          if (this.retryList?.length > 0) {
            console.log(`retry start, times: ${retry}`);
            for (let a = 0; a < this.retryList?.length; a++) {
              const blobIndex = this.retryList[a];
              try {
                await requestOptions.uploadPartFileFunc(
                  this.chunkList[blobIndex],
                  blobIndex,
                  this.currentIndex
                );
                this.retryList.splice(a, 1);
              } catch (e) {
                console.warn(`${blobIndex} part retry upload failed, times: ${retry}`);
              }
            }
          }
        }
        if (this.retryList?.length === 0) {
          if (this.abort === 'abort') {
            console.log(this.abort);
            return null;
          } else {
            console.log(this.abort);
            return await requestOptions.finishFilePartUploadFunc(this.md5, this.currentIndex);
          }
        } else {
          throw Error(`upload failed, some chunks upload failed: ${JSON.stringify(this.retryList)}`);
        }
      })
      .catch((reason) => {
        console.log('fail->', this.startIndex + this.results.length);
        this.chunkList.splice(0, this.results.length);
        this.startIndex += this.results.length;
      });
  }
}
