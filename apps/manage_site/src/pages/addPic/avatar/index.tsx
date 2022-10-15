import React, { memo, useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { Upload, message } from 'antd';
import { FileUploaderClient } from '../../../utils/uploaderClient';
import qs from 'qs';
// import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { AvatarStyle } from './style';
import servicePath from '../../../config/apiUrl';
import axios from 'axios';
import useThrottle from '@rushapp/hooks';
import { useUpdateEffect } from '../../../hooks/useUpdateEffect';
export default memo(function UserAvatar(props: any) {
  const { imgUrl, setImgUrl } = props;
  const canvasRef = useRef<any>();
  const imageRef = useRef<any>();
  const direction = useRef<any>();
  const showCutRef = useRef<any>();
  const [loading, setLoading] = useState(false);
  const [showCutModal, setShowCutModal] = useState(false);
  const [file, setFile] = useState<any>();
  const [showEdit, setShowEdit] = useState(false);
  const [dataUrl, setDataUrl] = useState<any>();
  const [cutData, setCutData] = useState();
  const fileUploaderClient = useRef<any>(null);
  const source = useRef<any>(axios.CancelToken.source()); //add
  const [style, setStyle] = useState<any>({
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  });
  // 初始数据， 因为不需要重新render 所以用 useRef
  const oriPos = useRef({
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    cX: 0, // 鼠标的坐标
    cY: 0
  });
  const isDown = useRef(false);
  const CancelToken = axios.CancelToken;
  const points = useMemo(() => ['e', 'w', 's', 'n', 'ne', 'nw', 'se', 'sw'], []);

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
    setDataUrl(window.URL.createObjectURL(blob));
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

  const handleCutUrl = useCallback(() => {
    console.log('===');
  }, [style]);
  const confirm = useCallback(() => {
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
    let uploadId = '';
    const HOST = 'http://localhost:7001/';
    fileUploaderClient.current = new FileUploaderClient({
      chunkSize: 0.002 * 1024 * 1024, // 2MB
      requestOptions: {
        retryTimes: 2,
        initFilePartUploadFunc: async () => {
          console.log('file.size', avatarCanvas.width + avatarCanvas.height);
          const fileName =
            file.name +
            String(avatarCanvas.width) +
            String(avatarCanvas.height) +
            String(style.left) +
            String(style.top);
          const { data } = await axios.post(`${HOST}admin/initUpload`, {
            name: fileName
          });
          uploadId = data.uploadId;
          console.log('初始化上传完成');
          setImgUrl('');
          return data;
        },
        uploadPartFileFunc: async (chunk: Blob, index: number) => {
          const formData = new FormData();
          formData.append('uploadId', uploadId);
          formData.append('partIndex', index.toString());
          formData.append('partFile', chunk);
          const res = await axios.post(`${HOST}admin/uploadPart`, formData, {
            cancelToken: source.current.token
          });
          console.log(`上传分片${index}完成`);
        },
        finishFilePartUploadFunc: async (md5: string) => {
          const fileName = file.name;
          const { data } = await axios.post(`${HOST}admin/finishUpload`, {
            name: fileName,
            uploadId,
            md5
          });
          console.log(`上传完成，存储地址为：${HOST}public/${data.path}`);
          setImgUrl(`${HOST}public/${data.path}`);
        }
      }
    });
    avatarCanvas.toBlob((blob: any) => {
      fileUploaderClient.current.uploadFile(blob);
    });
    // fileUploaderClient.current.uploadFile(file);
  }, [setImgUrl, file, style, cutData]);
  function transform(direction: any, oriPos: any, e: any) {
    const style = { ...oriPos.current };
    const offsetX = e.clientX - oriPos.current.cX;
    const offsetY = e.clientY - oriPos.current.cY;
    let newStyle;
    //获取convas内部图片宽高
    switch (direction.current) {
      // 拖拽移动
      case 'move':
        style.top += offsetY;
        style.bottom -= offsetY;
        style.right -= offsetX;
        style.left += offsetX;
        newStyle = {
          top: Math.min(Math.max(style.top, 0), oriPos.current.top + oriPos.current.bottom),
          bottom: Math.min(Math.max(style.bottom, 0), oriPos.current.bottom + oriPos.current.top),
          right: Math.min(Math.max(style.right, 0), oriPos.current.right + oriPos.current.left),
          left: Math.min(Math.max(style.left, 0), oriPos.current.right + oriPos.current.left)
        };
        break;
      // 东
      case 'e':
        // 向右拖拽添加宽度
        style.right -= offsetX;
        break;
      // 西
      case 'w':
        // 增加宽度、位置同步左移
        style.left += offsetX;
        break;
      // 南
      case 's':
        style.bottom -= offsetY;
        break;
      // 北
      case 'n':
        style.top += offsetY;
        break;
      // 东北
      case 'ne':
        style.right -= offsetX;
        style.top += offsetY;
        break;
      // 西北
      case 'nw':
        style.left += offsetX;
        style.top += offsetY;
        break;
      // 东南
      case 'se':
        style.right -= offsetX;
        style.bottom -= offsetY;
        break;
      // 西南
      case 'sw':
        style.left += offsetX;
        style.bottom -= offsetY;
        break;
    }
    if (!newStyle) {
      newStyle = {
        top: Math.max(style.top, 0),
        bottom: Math.max(style.bottom, 0),
        right: Math.max(style.right, 0),
        left: Math.max(style.left, 0)
      };
    }
    return newStyle;
  }
  const handleDragStart = useCallback(
    (dir: any, e: any) => {
      const img = new Image();
      img.src = '';
      e.dataTransfer.setDragImage(img, 0, 0);
      // 阻止事件冒泡
      e.stopPropagation();
      // 保存方向。
      direction.current = dir;
      isDown.current = true;
      // 然后鼠标坐标是
      const cY = e.clientY; // clientX 相对于可视化区域
      const cX = e.clientX;
      oriPos.current = {
        ...style,
        cX,
        cY
      };
    },
    [style]
  );
  const handleMove = (e: any) => {
    if (!isDown.current) return;
    // 判断鼠标是否按住
    const newStyle = transform(direction, oriPos, e);
    setStyle(newStyle);
  };
  const useThrottle = (fn: (...args: any[]) => void, delay: number, dep: any = []) => {
    const { current } = useRef<any>({ fn, timer: null });
    useEffect(
      function () {
        current.fn = fn;
      },
      [fn]
    );

    return useCallback((...args: any) => {
      if (!current.timer) {
        current.timer = setTimeout(() => {
          current.fn(...args);
          clearTimeout(current.timer);
          current.timer = null;
        }, delay);
      }
    }, dep);
  };
  const onMouseMove = useThrottle(handleMove, 2, []);
  const handleDragEnd = useCallback(
    (e: any) => {
      const image = imageRef.current;
      const ctx = canvasRef.current.getContext('2d');
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      ctx.drawImage(imageRef.current, 0, 0, image.width, image.height);
      isDown.current = false;
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
    },
    [style]
  );
  const pause = () => {
    source.current.cancel('cancle request!');
  };
  const retry = useCallback(() => {
    source.current = CancelToken.source();
    fileUploaderClient.current.continue();
  }, [CancelToken]);
  const closeModal = () => {
    setShowCutModal(false);
  };

  const Drawing = useMemo(() => {
    // const data = useState()
    return (
      <div
        className="drawing-item"
        onDragStart={(e) => handleDragStart('move', e)}
        onDragOver={onMouseMove}
        onDragEnd={handleDragEnd}
        onDrop={handleDragEnd}
        onDragLeave={() => console.log('dragleave')}
        draggable="true"
        style={style}
      >
        {points.map((item, index) => (
          <div
            key={index}
            onDragStart={(e) => handleDragStart(item, e)}
            onDragOver={onMouseMove}
            onDragEnd={handleDragEnd}
            onDrop={handleDragEnd}
            draggable="true"
            className={`control-point point-${item}`}
          ></div>
        ))}
      </div>
    );
  }, [handleDragStart, style, points, onMouseMove, handleDragEnd]);

  const CutModal = useMemo(() => {
    return (
      <>
        <div className="cut-modal">
          <div className="show-picture">
            <div className="cut-picture">
              <img
                ref={imageRef}
                src={dataUrl}
                alt="avatar"
                style={{ maxWidth: '600px', maxHeight: '600px', position: 'relative' }}
              />
              {Drawing}
            </div>
            <canvas ref={canvasRef} width={600} height={600} style={{ display: 'none' }}></canvas>
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
            <canvas ref={showCutRef} width={600} height={600}></canvas>
          </div>
        </div>
        <div className="mask" onClick={closeModal}></div>
      </>
    );
  }, [Drawing, confirm, dataUrl, retry]);
  useUpdateEffect(() => {
    showCutModal && drawImage();
  }, [dataUrl, showCutModal]);
  useUpdateEffect(() => {
    handleCutUrl();
  }, [style]);
  return (
    <AvatarStyle>
      {/* {showCutModal && CutModal} */}
      {showEdit && CutModal}
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        beforeUpload={beforeUpload}
        onChange={handleChange}
      >
        {imgUrl ? <img alt="avatar" src={imgUrl} style={{ width: '100%', height: '100%' }} /> : uploadButton}
      </Upload>
    </AvatarStyle>
  );
});
