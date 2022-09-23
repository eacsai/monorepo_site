import React, { memo, useState, useRef, useEffect } from 'react';
import { Upload, message } from 'antd';
// import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { AvatarStyle } from './style';
import servicePath from '../../../config/apiUrl';
import axios from 'axios';

export default memo(function UserAvatar(props: any) {
  const { imgUrl, setImgUrl } = props;
  const canvasRef = useRef<any>();
  const imageRef = useRef<any>();
  const [loading, setLoading] = useState(false);
  const [mouseState, setMouseState] = useState<any>();
  useEffect(() => {
    setImgUrl('http://my-site-avatar.oss-cn-beijing.aliyuncs.com/1663899453292wallhaven-e7jj6r.jpeg');
  }, []);
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
    const reader = new FileReader();
    reader.readAsDataURL(file);
    console.log('start1');
    reader.onloadend = (e: any) => {
      const base64 = e.target.result;
      console.log(base64);
      const base64Data = base64.replace(/^data:image\/\w+;base64,/, '');
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
        });
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
  const handleMouseDown = (event: any) => {
    setMouseState({
      startX: event.clientX,
      startY: event.clientY,
      startDrag: true
    });
  };

  const handleMouseMove = (event: any) => {
    if (mouseState?.startDrag) {
      drawImage(
        event.clientX - mouseState.startX + mouseState.lastX,
        event.clientY - mouseState.startY + mouseState.lastY
      );
    }
  };

  const handleMouseUp = (event: any) => {
    setMouseState((pre: any) => {
      return {
        lastX: event.clientX - pre.startX + pre.lastX,
        lastY: event.clientY - pre.startY + pre.lastY,
        startDrag: false
      };
    });
  };

  const drawImage = (left = mouseState.lastX, top = mouseState.lastY) => {
    let image = imageRef.current;
    console.log('image', image);
    let canvas = canvasRef.current;
    let ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let imageWidth = image.width;
    let imageHeight = image.height;
    if (imageWidth > imageHeight) {
      let scale = canvas.width / canvas.height;
      imageWidth = canvas.width * mouseState.times;
      imageHeight = imageHeight * scale * mouseState.times;
    } else {
      let scale = canvas.height / canvas.width;
      imageHeight = canvas.height * mouseState.times;
      imageWidth = imageWidth * scale * mouseState.times;
    }
    console.log(image.width);
    console.log('x', (canvas.width - imageWidth) / 2 + left);
    console.log('y', (canvas.height - imageWidth) / 2 + top);
    console.log('width', imageWidth);
    console.log('height', imageHeight);
    ctx.drawImage(
      image,
      (canvas.width - imageWidth) / 2 + left,
      (canvas.height - imageHeight) / 2 + top,
      imageWidth,
      imageHeight
    );
  };

  return (
    <AvatarStyle>
      <div
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        style={{ position: 'relative' }}
      >
        <canvas
          ref={canvasRef}
          width="300px"
          height="300px"
          style={{ border: '2px dashed #632B21' }}
        ></canvas>
        <div
          style={{
            width: 100,
            height: 100,
            backgroundColor: 'blue',
            opacity: 0.3,
            position: 'absolute',
            left: 100,
            top: 100
          }}
        ></div>
      </div>
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        beforeUpload={beforeUpload}
        onChange={handleChange}
      >
        {imgUrl ? (
          <img ref={imageRef} src={imgUrl} alt="avatar" style={{ width: '100%', height: '100%' }} />
        ) : (
          uploadButton
        )}
      </Upload>
    </AvatarStyle>
  );
});
