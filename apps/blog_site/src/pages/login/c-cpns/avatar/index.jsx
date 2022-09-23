import { memo, useState } from 'react';
import { Upload, message } from 'antd';
import { AvatarStyle } from './style';
import { setAvatar } from '@/services/login';

export default memo(function Avatar(props) {
  const { setAvatarImg } = props;
  const [imgUrl, setImgUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const beforeUpload = (file) => {
    console.log('beforeUpload');
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
      return;
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = (e) => {
      console.log('upload');
      const base64 = e.target.result;
      const base64Data = base64.replace(/^data:image\/\w+;base64,/, '');
      setAvatar(file.name, base64Data)
        .then((result) => {
          console.log(result.result.url);
          setImgUrl(result.result.url);
          setAvatarImg(result.result.url);
        })
        .catch((error) => {
          console.log(error.message);
        });
    };
    return isJpgOrPng && isLt2M;
  };

  const uploadButton = (
    <div>
      {/* {loading ? <LoadingOutlined /> : <PlusOutlined />} */}
      <div style={{ marginTop: 3, color: '#fff' }}>上传头像</div>
    </div>
  );

  const handleChange = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
  };

  return (
    <AvatarStyle>
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        beforeUpload={beforeUpload}
        onChange={handleChange}
      >
        {imgUrl ? <img src={imgUrl} alt="avatar" style={{ width: '100%', height: '100%' }} /> : uploadButton}
      </Upload>
    </AvatarStyle>
  );
});
