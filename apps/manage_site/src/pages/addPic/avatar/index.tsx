import React, { memo, useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { Upload, message } from 'antd';
// import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { AvatarStyle } from './style';
import servicePath from '../../../config/apiUrl';
import axios from 'axios';
import { useThrottle } from '../../../hooks/useThrottle';
import { useUpdateEffect } from '../../../hooks/useUpdateEffect';
export default memo(function UserAvatar(props: any) {
  const { imgUrl, setImgUrl } = props;
  const rightRef = useRef(0);
  const canvasRef = useRef<any>();
  const imageRef = useRef<any>();
  const direction = useRef<any>();
  const showCutRef = useRef<any>();
  const imageWidth = useRef(0);
  const imageHeight = useRef(0);
  const [loading, setLoading] = useState(false);
  const [showCutModal, setShowCutModal] = useState(false);
  const [file, setFile] = useState({ name: '' });
  const [times, setTimes] = useState(1);
  const [dataUrl, setDataUrl] = useState();
  const [cutDataUrl, setCutDataUrl] = useState('');
  const [style, setStyle] = useState<any>({
    left: 100,
    top: 100,
    width: 100,
    height: 100
  });
  // 初始数据， 因为不需要重新render 所以用 useRef
  const oriPos = useRef({
    top: 0, // 元素的坐标
    left: 0,
    cX: 0, // 鼠标的坐标
    cY: 0
  });
  const isDown = useRef(false);

  const avatarRef = useRef<any>();
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
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = (e: any) => {
      const base64 = e.target.result;
      setDataUrl(base64);
      setFile(file);
    };
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
    const image = imageRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    imageWidth.current = image.width;
    imageHeight.current = image.height;
    if (imageWidth.current > imageHeight.current) {
      const scale = canvas.width / canvas.height;
      imageWidth.current = canvas.width * times;
      imageHeight.current = imageHeight.current * scale * times;
    } else {
      const scale = canvas.height / canvas.width;
      imageHeight.current = canvas.height * times;
      imageWidth.current = imageWidth.current * scale * times;
    }
    setStyle({
      left: (canvas.width - imageWidth.current) / 2,
      top: (canvas.height - imageHeight.current) / 2,
      width: imageWidth.current,
      height: imageHeight.current
    });
    ctx.drawImage(
      image,
      (canvas.width - imageWidth.current) / 2,
      (canvas.height - imageHeight.current) / 2,
      imageWidth.current,
      imageHeight.current
    );
  };

  const handleCutUrl = useCallback(() => {
    const showCanvas = showCutRef.current;
    const showCtx = showCanvas.getContext('2d');
    showCtx.clearRect(0, 0, showCanvas.width, showCanvas.height);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    console.log('===', style.left, style.top, style.width, style.height);
    const imageData = ctx.getImageData(style.left, style.top, style.width, style.height);
    const avatarCanvas = document.createElement('canvas');
    avatarCanvas.width = style.width;
    avatarCanvas.height = style.height;
    const avatarCtx = avatarCanvas.getContext('2d');
    avatarCtx.putImageData(imageData, 0, 0);
    avatarRef.current.src = avatarCanvas.toDataURL();
    showCtx.drawImage(
      avatarRef.current,
      showCanvas.width / 2 - avatarRef.current.width,
      showCanvas.height / 2 - avatarRef.current.height,
      avatarRef.current.width * 2,
      avatarRef.current.height * 2
    );

    setCutDataUrl(avatarCanvas.toDataURL());
  }, [style]);
  const confirm = useCallback(() => {
    const base64Data = cutDataUrl.replace(/^data:image\/\w+;base64,/, '');
    axios({
      method: 'post',
      url: servicePath.addPic,
      withCredentials: true,
      headers: { 'Access-Control-Allow-Origin': '*' },
      data: { filename: file.name, file: base64Data }
    })
      .then((result) => {
        setImgUrl(result.data.result.url);
      })
      .catch((error) => {
        console.log(error.message);
      })
      .finally(() => {
        closeModal();
      });
  }, [file, setImgUrl, cutDataUrl]);
  function transform(direction: any, oriPos: any, e: any) {
    const style = { ...oriPos.current };
    const canvas = canvasRef.current;
    const offsetX = e.clientX - oriPos.current.cX;
    const offsetY = e.clientY - oriPos.current.cY;
    // 元素当前位置 + 偏移量
    const top = oriPos.current.top + offsetY;
    const left = oriPos.current.left + offsetX;
    console.log('wqwwqw===', (canvas.height + imageHeight.current) / 2 - style.width);
    //获取convas内部图片宽高
    switch (direction.current) {
      // 拖拽移动
      case 'move':
        console.log('===', (canvas.height + imageHeight.current) / 2 - style.width);
        // 限制必须在这个范围内移动 画板的高度-元素的高度
        style.top = Math.max(
          (canvas.height - imageHeight.current) / 2,
          Math.min(top, (canvas.height + imageHeight.current) / 2 - style.height)
        );
        style.left = Math.max(0, Math.min(left, imageWidth.current - style.width));
        break;
      // 东
      case 'e':
        // 向右拖拽添加宽度
        style.width = Math.min(imageWidth.current, style.width + offsetX);
        return style;
      // 西
      case 'w':
        // 增加宽度、位置同步左移
        style.width = Math.min(imageWidth.current, style.width - offsetX);
        style.left += offsetX;
        return style;
      // 南
      case 's':
        style.height = Math.min(style.height + offsetY, imageHeight.current);
        return style;
      // 北
      case 'n':
        style.height = Math.min(style.height - offsetY, imageHeight.current);
        style.top = Math.max(
          (canvas.height - imageHeight.current) / 2,
          Math.min(top + offsetY, (canvas.height + imageHeight.current) / 2 - style.height)
        );
        break;
      // 东北
      case 'ne':
        style.height -= offsetY;
        style.top += offsetY;
        style.width += offsetX;
        break;
      // 西北
      case 'nw':
        style.height -= offsetY;
        style.top += offsetY;
        style.width -= offsetX;
        style.left += offsetX;
        break;
      // 东南
      case 'se':
        style.height += offsetY;
        style.width += offsetX;
        break;
      // 西南
      case 'sw':
        style.height += offsetY;
        style.width -= offsetX;
        style.left += offsetX;
        break;
    }
    return style;
  }
  const handleDragStart = useCallback(
    (dir: any, e: any) => {
      console.log('开始拖拽');
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
      console.log('oriPos', oriPos.current);
    },
    [style]
  );
  const onMouseMove = useCallback((e: any) => {
    console.log('mouseMove');
    if (!isDown.current) return;
    // 判断鼠标是否按住
    const newStyle = transform(direction, oriPos, e);
    setStyle(newStyle);
  }, []);
  const handleDragEnd = useCallback((e: any) => {
    console.log('结束拖拽');
    isDown.current = false;
  }, []);
  const bigger = () => {
    setTimes((pre) => pre + 0.1);
  };
  const smaller = () => {
    setTimes((pre) => pre - 0.1);
  };
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
            onDragLeave={() => console.log('dragleave')}
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
              <div style={{ position: 'relative' }}>
                <canvas
                  ref={canvasRef}
                  width="300px"
                  height="300px"
                  style={{ border: '2px dashed #632B21' }}
                ></canvas>
                {Drawing}
              </div>
              <div className="btn-group">
                <button type="button" className="btn btn-primary" onClick={bigger}>
                  变大
                </button>
                <button type="button" className="btn btn-primary" onClick={smaller}>
                  变小
                </button>
                <button type="button" className="btn btn-primary" onClick={confirm}>
                  剪切
                </button>
              </div>
            </div>
            <div className="pre-picture">
              <img ref={avatarRef} alt="" style={{ visibility: 'hidden' }} />
              <canvas ref={showCutRef} width="600px" height="600px"></canvas>
            </div>
          </div>
        </div>
        <div className="mask" onClick={closeModal}></div>
      </>
    );
  }, [Drawing, confirm]);
  useUpdateEffect(() => {
    showCutModal && drawImage();
  }, [times, dataUrl, showCutModal]);
  useUpdateEffect(() => {
    handleCutUrl();
  }, [times]);
  useUpdateEffect(() => {
    handleCutUrl();
  }, [style]);
  return (
    <AvatarStyle>
      {showCutModal && CutModal}
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
      <img ref={imageRef} src={dataUrl} alt="avatar" style={{ width: '300px', visibility: 'hidden' }} />
    </AvatarStyle>
  );
});
