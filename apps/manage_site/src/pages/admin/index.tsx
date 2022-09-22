import React, { memo, useState } from "react";
import { Layout, Menu, Breadcrumb } from "antd";

import { Outlet, NavLink } from "react-router-dom";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

export default memo(function Admin(props: any) {
  const [collapsed, setCollapsed] = useState(false);
  const onCollapse = (collapsed: any) => {
    setCollapsed(collapsed);
  };
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          <Menu.Item key="1">
            <span>工作台</span>
          </Menu.Item>
          <SubMenu
            title={
              <span key="sub1">
                <NavLink to="list">文章管理</NavLink>
              </span>
            }
          >
            <Menu.Item key="addArticle">
              <NavLink to="add">添加文章</NavLink>
            </Menu.Item>
            <Menu.Item key="articleList">
              <NavLink to="list">文章列表</NavLink>
            </Menu.Item>
          </SubMenu>
          <Menu.Item key="editComment">
            <NavLink to="editComment">留言管理</NavLink>
          </Menu.Item>
          <Menu.Item key="addPic">
            <NavLink to="addPic">添加图片</NavLink>
          </Menu.Item>
          <Menu.Item key="addType">
            <NavLink to="addType">添加类型</NavLink>
          </Menu.Item>
          <Menu.Item key="editUser">
            <NavLink to="editUser">用户管理</NavLink>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ background: "#fff", padding: 0 }} />
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>后台管理</Breadcrumb.Item>
            <Breadcrumb.Item>工作台</Breadcrumb.Item>
          </Breadcrumb>
          <div style={{ padding: 24, background: "#fff", minHeight: 360 }}>
            <div>
              <Outlet />
            </div>
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>{"Noly's Blog"}</Footer>
      </Layout>
    </Layout>
  );
});
