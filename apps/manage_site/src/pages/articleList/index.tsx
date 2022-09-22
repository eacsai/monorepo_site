import React, { memo, useState, useEffect } from "react";
import { List, Row, Col, Modal, message, Button, Switch } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ListStyle } from "./style";
import servicePath from "../../config/apiUrl";
const { confirm } = Modal;

export default memo(function ArticleList(props: any) {
  const [list, setList] = useState([]);
  useEffect(() => {
    getList();
  }, []);
  //得到文章列表
  const getList = () => {
    axios({
      method: "post",
      url: servicePath.getArticleList,
      withCredentials: true,
      headers: { "Access-Control-Allow-Origin": "*" },
    }).then((res) => {
      setList(res.data.list);
      console.log(list);
    });
  };
  const navigate = useNavigate();

  //修改文章
  const updateArticle = (id: any) => {
    console.log("===点击===");
    navigate("/add/", { state: id });
  };

  //删除文章的方法
  const delArticle = (id: any) => {
    confirm({
      title: "确定要删除这篇博客文章吗?",
      content: "如果你点击OK按钮，文章将会永远被删除，无法恢复。",
      onOk() {
        axios(servicePath.delArticle + id, { withCredentials: true }).then(
          (res) => {
            message.success("文章删除成功");
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
              <b>标题</b>
            </Col>
            <Col span={3}>
              <b>类别</b>
            </Col>
            <Col span={3}>
              <b>发布时间</b>
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
              <Col span={8}>{item.title}</Col>
              <Col span={3}>{item.typeName}</Col>
              <Col span={3}>{item.addTime}</Col>

              <Col span={4}>
                <Button
                  onClick={() => {
                    console.log("===点击===");
                    updateArticle(item.id);
                  }}
                  type="primary"
                >
                  修改
                </Button>
                &nbsp;
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
