import React, { memo, useState, useEffect, useRef } from 'react';
import { List, Row, Col, Modal, message, Button, Avatar, Input } from 'antd';
import axios from 'axios';
import { ListStyle } from './style';
import UserAvatar from './avatar/index';
import servicePath from '../../config/apiUrl';
import { FileUploaderClient } from '../../utils/uploaderClient';

const { confirm } = Modal;

export default memo(function AddPic() {
  const [list, setList] = useState([]);
  const [imgUrl, setImgUrl] = useState<null | string>(null);
  const source = useRef<any>(axios.CancelToken.source()); //add
  const avatarRef = useRef<any>(null);
  useEffect(() => {
    getList();
  }, []);

  //得到图片列表
  const getList = () => {
    axios({
      method: 'get',
      url: servicePath.getPic,
      withCredentials: true,
      headers: { 'Access-Control-Allow-Origin': '*' }
    }).then((res) => {
      setList(res.data.data);
    });
  };
  console.log('list', list);
  //删除图片的方法
  const delArticle = (id: any) => {
    confirm({
      title: '确定要删除这个用户吗?',
      content: '如果你点击OK按钮，评论将会永远被删除，无法恢复。',
      onOk() {
        axios(servicePath.delPic + id, {
          method: 'post',
          withCredentials: true
        }).then((res) => {
          message.success('评论用户成功');
          getList();
        });
      },
      onCancel() {
        message.success('没有任何改变');
      }
    });
  };
  const [text, setText] = useState('');
  const [type, setType] = useState('');
  const submitPic: any = async () => {
    // axios({
    //   method: 'post',
    //   url: servicePath.subPic,
    //   withCredentials: true,
    //   headers: { 'Access-Control-Allow-Origin': '*' },
    //   data: { picUrl: imgUrl, text, type }
    // })
    //   .then((result) => {
    //     console.log(result);
    //     setText('');
    //     setType('');
    //     setImgUrl(null);
    //     getList();
    //   })
    //   .catch((error) => {
    //     console.log(error.message);
    //   });
    const blobList = avatarRef.current.getBlobList();
    for (let i = 0; i < blobList.length; i++) {
      console.log('blobList[i]', blobList[i]);
      await blobList[i].uploadFile(blobList[i].blob);
      console.log(`上传成功图片${i}`);
    }
  };
  return (
    <ListStyle>
      <div className="picUpload">
        <UserAvatar setImgUrl={setImgUrl} imgUrl={imgUrl} ref={avatarRef} />
        <div className="picInput">
          <Input
            value={text}
            onChange={(e) => {
              setText(e.target.value);
            }}
            placeholder="图片描述"
            style={{ height: '50px', width: '80%', margin: '15px 0' }}
          />
          <Input
            value={type}
            onChange={(e) => {
              setType(e.target.value);
            }}
            placeholder="图片类型"
            style={{ height: '50px', width: '80%', margin: '15px 0' }}
          />
          <Button
            onClick={submitPic}
            style={{
              width: '6rem',
              background: 'skyblue',
              color: '#fff',
              borderRadius: '1rem',
              marginTop: '10px'
            }}
          >
            提交
          </Button>
        </div>
      </div>
      <List
        header={
          <Row className="list-div">
            <Col span={8}>
              <b>图片类型</b>
            </Col>
            <Col span={3}>
              <b>图片描述</b>
            </Col>
            <Col span={3}>
              <b>图片缩略图</b>
            </Col>
            <Col span={4}>
              <b>操作</b>
            </Col>
          </Row>
        }
        bordered
        dataSource={list}
        renderItem={(item: any) => (
          <List.Item>
            <Row className="list-div">
              <Col span={8}>{item.type}</Col>
              <Col span={3}>{item.text}</Col>
              <Col span={3}>
                <Avatar src={item.picUrl} />
              </Col>
              <Col span={4}>
                <Button
                  onClick={() => {
                    delArticle(item.id);
                  }}
                >
                  删除
                </Button>
              </Col>
            </Row>
          </List.Item>
        )}
      />
    </ListStyle>
  );
});
