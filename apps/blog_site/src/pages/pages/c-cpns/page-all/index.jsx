import React, { memo, useState, useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { List } from "antd";
import { BackTop } from "antd";
import { Marked } from "@ts-stack/markdown";
import {
  getHomePagesAction,
  getPageTypesAction,
} from "@/pages/home/store/actionCreators";
import { PageStyle, TypeList } from "./style";
import { NavLink, useNavigate } from "react-router-dom";

export default memo(function PageAll() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getHomePagesAction());
    dispatch(getPageTypesAction());
  }, [dispatch]);
  const [clickAll, setClickAll] = useState(true);
  const { pageData, types } = useSelector((state) => ({
    pageData: state.getIn(["home", "homePages"]),
    types: state.getIn(["home", "pageTypes"]),
  }));
  const navigate = useNavigate();
  const handleClickAll = () => {
    setCurrentIndex(-1);
    setClickAll(true);
    setListData(pageData);
  };

  const [currentIndex, setCurrentIndex] = useState(-1);
  const [listData, setListData] = useState(null);
  console.log(listData);
  const indexChange = useCallback(
    (item, index) => {
      setClickAll(false);
      setCurrentIndex(index);
      const tmpData = pageData.filter((page) => page.type === item);
      setListData(tmpData);
    },
    [pageData]
  );

  return (
    <PageStyle>
      <BackTop />
      <TypeList>
        <div className="type-list" key="_first">
          <div className={clickAll ? "active" : ""} onClick={handleClickAll}>
            {"all"}
          </div>
        </div>
        {types.length &&
          types.map((item, index) => (
            <div className="type-list" key={index}>
              <div
                className={index === currentIndex ? "active" : ""}
                key={index}
                onClick={() => indexChange(item.type, index)}
              >
                {item.type}
              </div>
            </div>
          ))}
      </TypeList>
      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          pageSize: 8,
        }}
        dataSource={listData === null ? pageData : listData}
        renderItem={(item, index) => (
          <List.Item
            key={item.title}
            onClick={()=>navigate("/pages/detail",{state: {pageIndex: index}})}
            extra={<img width={300} height={200} alt="logo" src={item.pic} />}
          >
            <List.Item.Meta
              title={
                <NavLink to="/pages/detail" state={{ pageIndex: index }}>
                  {item.title}
                </NavLink>
              }
              description={item.description}
            />
            <div
              dangerouslySetInnerHTML={{
                __html: Marked.parse(
                  item.introduce.length > 150
                    ? item.introduce.slice(0, 150) + "..."
                    : item.introduce
                ),
              }}
            ></div>
          </List.Item>
        )}
      />
    </PageStyle>
  );
});
