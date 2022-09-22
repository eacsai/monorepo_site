import React, { memo, useState, useEffect } from "react";
import axios from "axios";
import servicePath from "../../config/apiUrl";
import { EditTypeStyle } from "./style";
import { List, Row, Col, Modal, message, Button, Switch } from "antd";
import { type } from "os";

export default memo(function EditType(props) {
  const [list, setList] = useState(["1", "2", "3", "4"]);
  const [type, setType] = useState("");
  //得到文章列表
  const getList = () => {
    axios({
      method: "get",
      url: servicePath.getType,
      withCredentials: true,
      headers: { "Access-Control-Allow-Origin": "*" },
    }).then((res) => {
      setList(res.data.data);
    });
  };
  const submitType = () => {
    axios({
      method: "post",
      url: servicePath.subType,
      withCredentials: true,
      headers: { "Access-Control-Allow-Origin": "*" },
      data: { type, orderNum: 1 },
    })
      .then((result) => {
        setType("");
        getList();
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  const { confirm } = Modal;
  const handleSubmit = (e: any) => {
    console.log("submit", e);
  };
  useEffect(() => {
    getList();
  }, []);
  const delType = (id: number) => {
    confirm({
      title: "确定要删除这个类型吗?",
      content: "如果你点击OK按钮，该类型将会永远被删除，无法恢复。",
      onOk() {
        axios(servicePath.delType + id, {
          method: "post",
          withCredentials: true,
        }).then((res) => {
          message.success("类型删除成功");
          getList();
        });
      },
      onCancel() {
        message.success("没有任何改变");
      },
    });
  };
  return (
    <EditTypeStyle>
      <input
        type="text"
        placeholder="请输入类型"
        value={type}
        onChange={(e) => {
          setType(e.target.value);
        }}
      />
      <Button
        onClick={submitType}
        style={{
          width: "6rem",
          background: "skyblue",
          color: "#fff",
          borderRadius: "1rem",
          marginTop: "10px",
        }}
      >
        提交
      </Button>

      <List
        header={
          <Row className="list-div">
            <Col span={8}>
              <b>类型</b>
            </Col>
          </Row>
        }
        bordered
        dataSource={list}
        renderItem={(item: any) => (
          <List.Item>
            <Row className="list-div">
              <Col span={8}>{item.type}</Col>
              <Col span={4}>
                <Button
                  onClick={() => {
                    delType(item.id);
                  }}
                >
                  删除{" "}
                </Button>
              </Col>
            </Row>
          </List.Item>
        )}
      />
    </EditTypeStyle>
  );
});
