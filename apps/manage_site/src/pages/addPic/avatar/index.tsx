import React, { memo, useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { Button, Upload, message } from 'antd';
import { FileUploaderClient } from '../../../utils/uploaderClient';
import { AvatarStyle } from './style';
import servicePath from '../../../config/apiUrl';
import axios from 'axios';
import { Drag } from '../Drag/index';
import useThrottle from '@rushapp/hooks';
import { useUpdateEffect } from '../../../hooks/useUpdateEffect';
import type { UploadFile } from 'antd/es/upload/interface';

export default memo(function UserAvatar(props: any) {
  const { imgUrl, setImgUrl } = props;
  const canvasRef = useRef<any>();
  const imageRef = useRef<any>();
  const showCutRef = useRef<any>();
  const [loading, setLoading] = useState(false);
  const [showCutModal, setShowCutModal] = useState(false);
  const [file, setFile] = useState<any>();
  const [showEdit, setShowEdit] = useState(false);
  const [dataUrl, setDataUrl] = useState<any>();
  const fileUploaderClient = useRef<any>(null);
  const dragRef = useRef(null);
  const source = useRef<any>(axios.CancelToken.source()); //add
  const [blobList, setBlobList] = useState([]);
  const CancelToken = axios.CancelToken;
  const { Dragger } = Upload;

  const fileList: UploadFile[] = [
    {
      uid: '-1',
      name: 'xxx.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
    },
    {
      uid: '-2',
      name: 'yyy.png',
      status: 'error'
    }
  ];
  useEffect(() => {
    let uploadId = '';
    const HOST = 'http://localhost:7001/';
    fileUploaderClient.current = new FileUploaderClient({
      chunkSize: 0.002 * 1024 * 1024, // 2MB
      requestOptions: {
        retryTimes: 2,
        initFilePartUploadFunc: async () => {
          const style = dragRef.current.getStyle();
          const image = imageRef.current;
          const fileName =
            file.name +
            String(image.width - style.left - style.right) +
            String(image.height - style.top - style.bottom) +
            String(style.left) +
            String(style.top);
          const { data } = await axios.post(`${HOST}admin/initUpload`, {
            name: fileName
          });
          uploadId = data.uploadId;
          console.log('初始化上传完成');
          return data;
        },
        uploadPartFileFunc: async (chunk: Blob, index: number) => {
          const formData = new FormData();
          formData.append('uploadId', uploadId);
          formData.append('partIndex', index.toString());
          formData.append('partFile', chunk);
          // await axios.post(`${HOST}admin/uploadPart`, formData, {
          //   cancelToken: source.current.token
          // });
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              axios
                .post(`${HOST}admin/uploadPart`, formData, {
                  cancelToken: source.current.token
                })
                .then(() => {
                  resolve(index);
                })
                .catch((e) => {
                  reject({ e, index });
                });
            }, 1000);
          });
        },
        finishFilePartUploadFunc: async (md5: string) => {
          const fileName = file.name;
          const { data } = await axios.post(`${HOST}admin/finishUpload`, {
            name: fileName,
            uploadId,
            md5
          });
          console.log(`上传完成，存储地址为：${HOST}public/${data.path}`);
          setShowEdit(false);
          // setImgUrl(`${HOST}public/${data.path}`);
        }
      }
    });
  }, [file]);
  const beforeUpload = (file: any) => {
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
    setShowCutModal(true);
    const fileType = file.type;
    const blob = new Blob([file], { type: fileType || 'application/*' });
    setDataUrl(URL.createObjectURL(blob));
    setFile(file);
    setShowEdit(true);
    return isJpgOrPng && isLt10M;
  };
  const uploadButton = (
    <div>
      {/* {loading ? <LoadingOutlined /> : <PlusOutlined />} */}
      <div style={{ marginTop: 3, color: '#fff' }}>上传头像</div>
    </div>
  );

  const handleChange = (info: any) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
  };

  const drawImage = () => {
    console.log('===');
  };

  const closeModal = () => {
    setShowEdit(false);
  };

  const CutModal = memo(() => {
    const [cutData, setCutData] = useState();

    const dragEnd = useCallback(() => {
      const style = dragRef.current.getStyle() ||
        dragRef.current.getStyle() || {
          top: 0,
          bottom: 0,
          left: 0,
          right: 0
        };
      const image = imageRef.current;
      console.log('dragEnd', image, image.width, image.height);
      const ctx = canvasRef.current.getContext('2d');
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      ctx.drawImage(image, 0, 0, image.width, image.height);
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
      const image = imageRef.current;
      const avatarCanvas = document.createElement('canvas');
      avatarCanvas.width = image.width - style.left - style.right;
      avatarCanvas.height = image.height - style.top - style.bottom;
      const avatarCtx = avatarCanvas.getContext('2d');
      avatarCtx.putImageData(cutData, 0, 0);
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
        // fileUploaderClient.current.uploadFile(blob);
        setBlobList((pre) => [...pre, blob]);
        setShowEdit(false);
      });
      // fileUploaderClient.current.uploadFile(file);
    }, [cutData]);

    const pause = () => {
      source.current.cancel('cancle request!');
    };
    const retry = useCallback(() => {
      source.current = CancelToken.source();
      fileUploaderClient.current.uploadFile();
    }, []);
    return (
      <>
        <div className="cut-modal">
          <div className="show-picture">
            <Drag Picture={Img} Canvas={CanvasShow} dragEnd={dragEnd} ref={dragRef} />
            <div className="btn-group">
              <button type="button" className="btn btn-primary" onClick={pause}>
                暂停
              </button>
              <button type="button" className="btn btn-primary" onClick={retry}>
                继续
              </button>
              <button type="button" className="btn btn-primary" onClick={confirm}>
                剪切
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
  return (
    <AvatarStyle>
      {/* {showCutModal && CutModal} */}
      {showEdit && <CutModal />}
      {
        /* <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        beforeUpload={beforeUpload}
        onChange={handleChange}
      >
        {imgUrl ? <img alt="avatar" src={imgUrl} style={{ width: '100%', height: '100%' }} /> : uploadButton}
      </Upload> */
        <Dragger {...props}>
          <p className="ant-upload-drag-icon"></p>
          <p className="ant-upload-text">Click or drag file to this area to upload</p>
          <p className="ant-upload-hint">
            Support for a single or bulk upload. Strictly prohibit from uploading company data or other band
            files
          </p>
        </Dragger>
      }
    </AvatarStyle>
  );
});
