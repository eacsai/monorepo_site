import React, { memo, useState } from "react";
import { Upload, message } from "antd";
// import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { AvatarStyle } from "./style";
import servicePath from "../../../config/apiUrl";
import axios from "axios";

export default memo(function UserAvatar(props:any) {
  const {imgUrl,setImgUrl} = props;
  
  const [loading, setLoading] = useState(false)

  const beforeUpload = (file:any) => {
    console.log('beforeUpload')
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
      return;
    }
    const isLt10M = file.size / 1024 / 1024 < 10;
    console.log('isLt10M', isLt10M)
    if (!isLt10M) {
      message.error("Image must smaller than 10MB!");
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    console.log('start1')
    reader.onloadend = (e:any) => {
      const base64 = e.target.result;
      const base64Data = base64.replace(/^data:image\/\w+;base64,/, "");
      axios({
        method: "post",
        url: servicePath.addPic,
        withCredentials: true,
        headers: { "Access-Control-Allow-Origin": "*" },
        data: {filename:file.name, file:base64Data}
      }).then((result) => {
        console.log(result.data);
        console.log(result.data.result.url);
        setImgUrl(result.data.result.url)
      }).catch((error) =>{
        console.log(error.message)
      });
    };
    return isJpgOrPng && isLt10M;
  };

  const uploadButton = (
    <div>
      {/* {loading ? <LoadingOutlined /> : <PlusOutlined />} */}
      <div style={{ marginTop: 3, color: "#fff" }}>上传头像</div>
    </div>
  );

  const handleChange = (info:any) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
  }

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
        {imgUrl ? (
          <img src={imgUrl} alt="avatar" style={{ width: "100%", height: "100%"}} />
        ) : (
          uploadButton
        )}
      </Upload>
    </AvatarStyle>
  );
});
