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
    initFilePartUploadFunc: () => Promise<any>;
    uploadPartFileFunc: (chunk: Blob, index: number) => Promise<any>;
    finishFilePartUploadFunc: (md5: string) => Promise<any>;
  };
}

export class FileUploaderClient {
  fileUploaderClientOptions: IFileUploaderClientOptions;
  startNumber: number;
  rejectPause: any;
  abortList: any[];
  md5: string;
  chunkList: Blob[];
  abort: string;
  constructor(options: IFileUploaderClientOptions) {
    this.fileUploaderClientOptions = Object.assign(DEFAULT_OPTIONS, options);
    this.startNumber = 0;
    this.abort = 'upload';
    this.abortList = [];
    this.md5 = '';
  }

  /**
   * 将file对象进行切片，然后根据切片计算md5
   * @param file 要上传的文件
   * @returns 返回md5和切片列表
   */

  public async getChunkListAndFileMd5(file: File): Promise<{ md5: string; chunkList: Blob[] }> {
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
  public async continue() {
    const requestOptions = this.fileUploaderClientOptions.requestOptions;
    const retryList = [];
    this.abort = 'upload';
    for (let a = 0; a < this.abortList.length; a++) {
      const blobIndex = this.abortList[a];
      console.log('blobIndex', blobIndex);
      try {
        await requestOptions.uploadPartFileFunc(this.chunkList[blobIndex], blobIndex);
        this.abortList.splice(a, 1);
        a = a - 1;
      } catch (e) {
        console.error(e);
        if (e.message === 'cancle request!') {
          this.abort = 'abort';
        } else {
          console.warn(`${blobIndex} part upload failed`);
          retryList.push(blobIndex);
        }
      }
    }

    for (let retry = 0; retry < requestOptions.retryTimes; retry++) {
      if (retryList.length > 0) {
        console.log(`retry start, times: ${retry}`);
        for (let a = 0; a < retryList.length; a++) {
          const blobIndex = retryList[a];
          try {
            await requestOptions.uploadPartFileFunc(this.chunkList[blobIndex], blobIndex);
            retryList.splice(a, 1);
          } catch (e) {
            console.warn(`${blobIndex} part retry upload failed, times: ${retry}`);
          }
        }
      }
    }

    if (retryList.length === 0) {
      if (this.abort === 'abort') {
        console.log(this.abort);
        return null;
      } else {
        console.log(this.abort);
        return await requestOptions.finishFilePartUploadFunc(this.md5);
      }
    } else {
      throw Error(`upload failed, some chunks upload failed: ${JSON.stringify(retryList)}`);
    }
  }
  /**
   * 上传文件方法，当FileUploaderClient的配置项中传入了requestOptions才能使用
   * 会依次执行getChunkListAndFileMd5、配置项中的initFilePartUploadFunc、配置项中的uploadPartFileFunc、配置项中的finishFilePartUploadFunc
   * 执行完成后返回上传结果，若有分片上传失败，则会自动重试
   * @param file 要上传的文件
   * @returns finishFilePartUploadFunc函数Promise resolve的值
   */
  public async uploadFile(file: File): Promise<any> {
    const requestOptions = this.fileUploaderClientOptions.requestOptions;
    const { md5, chunkList } = await this.getChunkListAndFileMd5(file);
    this.chunkList = chunkList;
    this.md5 = md5;
    const retryList: any[] = [];
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

    const data = await requestOptions.initFilePartUploadFunc();
    // 妙传逻辑
    if (data.quickUpload) {
      console.log('quickUpload');
      return null;
    }
    // const uploadArray = [];
    // for (let index = 0; index < chunkList.length; index++) {
    //   uploadArray.push(
    //     requestOptions
    //       .uploadPartFileFunc(chunkList[index], index)
    //       .then(() => {
    //       })
    //       .catch((e) => {
    //         console.error(e);
    //         if (e.message === 'cancle request!') {
    //           console.warn(`${index} part upload failed`);
    //           this.abort = 'abort';
    //           this.abortList.push(index);
    //         } else {
    //           console.warn(`${index} part upload failed`);
    //           retryList.push(index);
    //         }
    //       })
    //   );
    // }
    for (let index = 0; index < chunkList.length; index++) {
      // try {
      //   await requestOptions.uploadPartFileFunc(chunkList[index], index);
      // } catch (e) {
      //   console.error(e);
      //   if (e.message === 'cancle request!') {
      //     console.warn(`${index} part upload failed`);
      //     this.abort = 'abort';
      //     this.abortList.push(index);
      //   } else {
      //     console.warn(`${index} part upload failed`);
      //     retryList.push(index);
      //   }
      // }
      requestOptions.uploadPartFileFunc(chunkList[index], index).catch((e) => {
        console.error(e);
        if (e.message === 'cancle request!') {
          console.warn(`${index} part upload failed`);
          this.abort = 'abort';
          this.abortList.push(index);
        } else {
          console.warn(`${index} part upload failed`);
          retryList.push(index);
        }
      });
    }

    for (let retry = 0; retry < requestOptions.retryTimes; retry++) {
      if (retryList.length > 0) {
        console.log(`retry start, times: ${retry}`);
        for (let a = 0; a < retryList.length; a++) {
          const blobIndex = retryList[a];
          try {
            await requestOptions.uploadPartFileFunc(chunkList[blobIndex], blobIndex);
            retryList.splice(a, 1);
          } catch (e) {
            console.warn(`${blobIndex} part retry upload failed, times: ${retry}`);
          }
        }
      }
    }

    if (retryList.length === 0) {
      if (this.abort === 'abort') {
        console.log(this.abort);
        return null;
      } else {
        console.log(this.abort);
        return await requestOptions.finishFilePartUploadFunc(md5);
      }
    } else {
      throw Error(`upload failed, some chunks upload failed: ${JSON.stringify(retryList)}`);
    }
  }
}
