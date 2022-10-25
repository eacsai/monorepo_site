import React, {
  memo,
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
  forwardRef,
  useImperativeHandle,
  Dispatch,
  SetStateAction
} from 'react';
import { Button, Upload, message, Progress } from 'antd';
import { FileUploaderClient } from '../../../utils/uploaderClient';
import { AvatarStyle } from './style';
import servicePath from '../../../config/apiUrl';
import axios from 'axios';
import { Drag } from '../Drag/index';
import {
  UploadOutlined,
  PauseOutlined,
  RightOutlined,
  DeleteOutlined,
  CaretRightOutlined
} from '@ant-design/icons';
import { useUpdateEffect } from '../../../hooks/useUpdateEffect';
import type { UploadFile } from 'antd/es/upload/interface';

interface UploadListProp {
  uploadList: any[];
}
export default memo(
  forwardRef(function UserAvatar(props: any, ref: any) {
    const canvasRef = useRef<any>();
    const imageRef = useRef<any>();
    const showCutRef = useRef<any>();
    const [loading, setLoading] = useState(false);
    const [showCutModal, setShowCutModal] = useState(false);
    const [file, setFile] = useState<any>();
    const [showEdit, setShowEdit] = useState(false);
    const [dataUrl, setDataUrl] = useState<any>();
    const dragRef = useRef<any>();
    const [blobList, setBlobList] = useState<any>([]);
    const [times, setTimes] = useState(1);
    const CancelToken = axios.CancelToken;
    const { Dragger } = Upload;
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const uploadId = useRef<any>();
    const beforeUpload = useCallback((file: any) => {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
        return;
      }
      const isLt10M = file.size / 1024 / 1024 < 10;
      if (!isLt10M) {
        message.error('Image must smaller than 10MB!');
        return;
      }
      const fileType = file.type;
      const blob = new Blob([file], { type: fileType || 'application/*' });
      setDataUrl(URL.createObjectURL(blob));
      setFile(file);
      setShowEdit(true);
      return isJpgOrPng && isLt10M;
    }, []);

    const drawImage = () => {
      console.log('===');
    };

    const closeModal = () => {
      setShowEdit(false);
    };

    const CutModal = memo(() => {
      const [cutData, setCutData] = useState();
      const control = useRef(CancelToken.source());

      const dragEnd = useCallback(() => {
        const style = dragRef.current.getStyle() || {
          top: 0,
          bottom: 0,
          left: 0,
          right: 0
        };
        const image = imageRef.current;
        const ctx = canvasRef.current.getContext('2d');
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        ctx.drawImage(
          image,
          (canvasRef.current.width - image.width) / 2,
          (canvasRef.current.height - image.height) / 2,
          image.width * times,
          image.height * times
        );
        const cutCtx = showCutRef.current.getContext('2d');
        cutCtx.clearRect(0, 0, showCutRef.current.width, showCutRef.current.height);
        const data = ctx.getImageData(
          style.left,
          style.top,
          image.width - style.left - style.right,
          image.height - style.top - style.bottom
        );
        cutCtx.putImageData(data, 0, 0);
        setCutData(data);
      }, []);
      const Img = useMemo(
        () => (
          <img
            ref={imageRef}
            src={dataUrl}
            onLoad={dragEnd}
            alt="avatar"
            style={{ maxWidth: '600px', maxHeight: '600px', position: 'relative', visibility: 'hidden' }}
          />
        ),
        [dragEnd]
      );
      const CanvasShow = useMemo(
        () => <canvas className="show-canvas" ref={canvasRef} width={600} height={600}></canvas>,
        []
      );

      const confirm = useCallback(() => {
        const style = dragRef.current.getStyle();
        console.log('style', style);
        const image = imageRef.current;
        const avatarCanvas = document.createElement('canvas');
        avatarCanvas.width = image.width - style.left - style.right;
        avatarCanvas.height = image.height - style.top - style.bottom;
        const avatarCtx = avatarCanvas.getContext('2d');
        avatarCtx.putImageData(cutData, 0, 0);
        const fileName =
          file.name +
          String(image.width - style.left - style.right) +
          String(image.height - style.top - style.bottom) +
          String(style.left) +
          String(style.top);
        // 直接上传阿里云oss
        // avatarCanvas.toBlob((blob: any) => {
        //   const data = new FormData();
        //   blob.lastModifiedDate = new Date();
        //   data.append('file', blob);
        //   data.append('filename', file.name);
        //   axios({
        //     method: 'post',
        //     url: servicePath.addPic,
        //     withCredentials: true,
        //     headers: { 'Access-Control-Allow-Origin': '*' },
        //     data: data
        //   })
        //     .then((result) => {
        //       setImgUrl(result.data.result.url);
        //     })
        //     .catch((error) => {
        //       console.error(error.message);
        //     })
        //     .finally(() => {
        //       closeModal();
        //     });
        // });
        // 分片上传
        avatarCanvas.toBlob((blob: any) => {
          setBlobList((pre: any) => [
            ...pre,
            {
              blob,
              image,
              style,
              control,
              fileName
            }
          ]);
          setFileList((pre) => [
            ...pre,
            {
              uid: pre.length + '1',
              name: file.name,
              status: 'done',
              url: URL.createObjectURL(blob)
            }
          ]);
          setShowEdit(false);
        });
        // fileUploaderClient.current.uploadFile(file);
      }, [cutData]);
      useEffect(() => {
        // setDragStyle(dragRef.current);
      }, []);
      return (
        <>
          <div className="cut-modal">
            <div className="show-picture">
              <Drag Picture={Img} Canvas={CanvasShow} dragEnd={dragEnd} ref={dragRef} />
              <div className="btn-group">
                <button type="button" className="btn btn-primary" onClick={confirm}>
                  剪切
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => {
                    setTimes((c) => Math.min(1, (c * 10) / 9));
                  }}
                >
                  放大
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => {
                    setTimes((c) => c * 0.9);
                  }}
                >
                  缩小
                </button>
              </div>
              <div className="preview">预览</div>
              <canvas ref={showCutRef} width={600} height={600}></canvas>
            </div>
          </div>
          <div className="mask" onClick={closeModal}></div>
        </>
      );
    });
    CutModal.displayName = 'CutModal';
    useUpdateEffect(() => {
      showCutModal && drawImage();
    }, [dataUrl, showCutModal]);
    useImperativeHandle(ref, () => ({
      getBlobList() {
        return blobList;
      }
    }));

    const ListRender = (): null => {
      return null;
    };
    const uploadProps = {
      name: 'file',
      multiple: true,
      beforeUpload,
      fileList,
      itemRender: ListRender
    };

    const EditModal = () => {
      return (
        <div className="modal-wrapper">
          <div className="cut-edit-modal">
            <div className="cut-title">裁剪比例</div>
          </div>
          <div className="scale-modal">
            <div className="scale-title">放大缩小</div>
          </div>
          <div className="style-modal">
            <div className="scale-title">风格滤镜</div>
          </div>
        </div>
      );
    };
    const ImageItem = memo((props: any) => {
      const { item, index } = props;
      const [uploadFlag, setUploadFlag] = useState(false);
      const [startFlag, setStartFlag] = useState(true);
      const [persent, setPersent] = useState(0);
      const HOST = 'http://localhost:7001/';
      console.log('======重新渲染======');
      const fileUploader = useMemo(
        () =>
          new FileUploaderClient({
            chunkSize: 0.002 * 1024 * 1024, // 2MB
            requestOptions: {
              retryTimes: 2,
              initFilePartUploadFunc: async (currentIndex: number) => {
                const { data } = await axios.post(`${HOST}admin/initUpload`, {
                  name: blobList[currentIndex].fileName
                });
                uploadId.current = data.uploadId;
                console.log('blobList[currentIndex].fileName', blobList[currentIndex].fileName);
                console.log('初始化上传完成', uploadId.current);
                return data;
              },
              uploadPartFileFunc: async (chunk: Blob, i: number, currentIndex: number) => {
                const formData = new FormData();
                formData.append('uploadId', uploadId.current);
                formData.append('partIndex', i.toString());
                formData.append('partFile', chunk);
                // await axios.post(`${HOST}admin/uploadPart`, formData, {
                //   cancelToken: source.current.token
                // });
                return new Promise((resolve, reject) => {
                  console.log('control.current.token', blobList[currentIndex].control.current.token);
                  console.log('control index', currentIndex);

                  setTimeout(() => {
                    axios
                      .post(`${HOST}admin/uploadPart`, formData, {
                        cancelToken: blobList[currentIndex].control.current.token
                      })
                      .then(() => {
                        resolve(i);
                      })
                      .catch((e) => {
                        reject({ e, i });
                      });
                  }, 1000);
                });
              },
              finishFilePartUploadFunc: async (md5: string, currentIndex: number) => {
                const fileName = blobList[currentIndex].fileName;
                console.log('fileName', fileName);
                console.log('uploadId.current', uploadId.current);
                const { data } = await axios.post(`${HOST}admin/finishUpload`, {
                  name: fileName,
                  uploadId: uploadId.current,
                  md5
                });
                console.log(`上传完成，存储地址为：${data.path}`);
                // setImgUrl(data.path);
              }
            }
          }),
        []
      );
      const pause = useCallback(() => {
        console.log('============parse=============', index);
        blobList[index].control.current.cancel('cancle request!');
        console.log('control.current.token', blobList[index].control.current.token);
      }, [index]);
      const retry = useCallback(
        (setPersent: Dispatch<SetStateAction<number>>) => {
          console.log('============retry=============', index);
          blobList[index].control.current = CancelToken.source();
          fileUploader.uploadFile({ setPersent, currentIndex: index });
        },
        [index, fileUploader]
      );
      const start = useCallback(
        (setPersent: Dispatch<SetStateAction<number>>) => {
          console.log('============start=============', blobList[index]);
          // control.cancel('cancle request!');
          fileUploader.uploadFile({ file: blobList[index].blob, setPersent, currentIndex: index });
        },
        [fileUploader, index]
      );
      useEffect(() => {
        console.log('flag', uploadFlag);
        console.log('persent', persent);
      }, [uploadFlag, persent]);
      return (
        <div className="image-item">
          <div className="image-content">
            <img src={item.url} alt="" className="image-show"></img>
            <div className="image-text">{item.name}</div>
            <div className="image-control">
              {startFlag ? (
                <CaretRightOutlined
                  onClick={() => {
                    start(setPersent);
                    setStartFlag((c) => !c);
                  }}
                />
              ) : uploadFlag ? (
                <RightOutlined
                  onClick={() => {
                    retry(setPersent);
                    setUploadFlag((c) => !c);
                  }}
                />
              ) : (
                <PauseOutlined
                  onClick={() => {
                    pause();
                    setUploadFlag((c) => !c);
                  }}
                />
              )}
              <DeleteOutlined />
            </div>
          </div>
          <div className="image-progress-bar">
            <Progress percent={persent} size="small" status="exception" />
          </div>
        </div>
      );
    });
    ImageItem.displayName = 'ImageItem';
    const ImageList = (props: UploadListProp) => {
      const { uploadList } = props;
      return (
        <div>
          {uploadList.map((item: any, index: number) => {
            return <ImageItem key={index} item={item} index={index} />;
          })}
        </div>
      );
    };
    return (
      <AvatarStyle>
        <EditModal />
        {/* {showCutModal && CutModal} */}
        {showEdit && <CutModal />}
        <Dragger listType="picture" {...uploadProps}>
          <p className="ant-upload-drag-icon"></p>
          <p className="ant-upload-text">Click or drag file to this area to upload</p>
          <p className="ant-upload-hint">
            Support for a single or bulk upload. Strictly prohibit from uploading company data or other band
            files
          </p>
          <Button icon={<UploadOutlined />}>Upload</Button>
        </Dragger>
        <ImageList uploadList={fileList}></ImageList>
      </AvatarStyle>
    );
  })
);
