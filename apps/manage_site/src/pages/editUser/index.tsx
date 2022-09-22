import React, { memo, useState, useEffect } from "react";

import { List, Row, Col, Modal, message, Button, Avatar, } from "antd";
import axios from "axios";
import { ListStyle } from "./style";
import servicePath from "../../config/apiUrl";
const { confirm } = Modal;

export default memo(function EditUser(props) {
  const [list, setList] = useState([]);
  useEffect(() => {
    getList();
  }, []);
  //得到文章列表
  const getList = () => {
    axios({
      method: "get",
      url: servicePath.getUser,
      withCredentials: true,
      headers: { "Access-Control-Allow-Origin": "*" },
    }).then((res) => {
      console.log('========',res.data.data)
      setList(res.data.data);
    });
  };
  console.log('list',list);
  //删除文章的方法
  const delArticle = (id: any) => {
    confirm({
      title: "确定要删除这个用户吗?",
      content: "如果你点击OK按钮，评论将会永远被删除，无法恢复。",
      onOk() {
        axios(servicePath.delUser + id, { method: 'post',withCredentials: true }).then(
          (res) => {
            message.success("评论用户成功");
            getList();
          }
        );
      },
      onCancel() {
        message.success("没有任何改变");
      },
    });
  };
  return (
    <ListStyle>
      <List
        header={
          <Row className="list-div">
            <Col span={8}>
              <b>用户名</b>
            </Col>
            <Col span={3}>
              <b>用户密码</b>
            </Col>
            <Col span={3}>
              <b>用户头像</b>
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
              <Col span={8}>{item.username}</Col>
              <Col span={3}>{item.password}</Col>
              <Col span={3}><Avatar src={item.avatar}/></Col>
              <Col span={4}>
                <Button
                  onClick={() => {
                    delArticle(item.id);
                  }}
                >
                  删除{" "}
                </Button>
              </Col>
            </Row>
          </List.Item>
        )}
      />
    </ListStyle>
  );
});
