import React, { memo } from "react";
import { CardStyle,PagesList,TypeList,WorksList } from "./style";
import { useSelector, shallowEqual } from "react-redux";

export default memo(function Card() {
  const { homeWorks, homePages, pageTypes } = useSelector(
    (state) => ({
      homeWorks: state.getIn(["home", "homeWorks"]),
      homePages: state.getIn(["home", "homePages"]),
      pageTypes: state.getIn(["home", "pageTypes"]),
    }),
    shallowEqual
  );
    console.log('=====homeworks=====',pageTypes)
  return (
    <CardStyle>
      <div className="card-content">
        <div className="card-title1">ABOUT ME</div>
        <img
          src="https://tva1.sinaimg.cn/large/008i3skNly1gt3l2r1d36j30u00u0wji.jpg"
          alt=""
          className="card-picture"
        ></img>
        <div className="card-aboutme">
          Aliquam et elit eu nunc rhoncus viverra quis at felis et netus et
          malesuada fames ac turpis egestas. Aenean commodo ligula eget dolor.
        </div>
        <div className="card-title1">WORKS</div>
        <div className="card-works">
          {homeWorks?.slice(0,9).map((item, index) => {
            return <WorksList img={item.picUrl} key={index} />;
          })} 
        </div>
        <div className="card-title1">POPULAR PAGES</div>
        <div className="card-pages">
          {homePages.map((item, index) => {
            return (
              <PagesList img={item.pic}>
                <div className="pages-img"></div>
                <div className="pages-contain">
                  <div className="pages-title">{item.title}</div>
                  <div className="pages-date">{item.date}</div>
                </div>
              </PagesList>
            );
          })}
        </div>
        <div
          className="card-title1"
          style={{ marginTop: "10px", marginBottom: "10px" }}
        >
          PAGETYPES
        </div>
        <TypeList>
          {pageTypes.map((item, index) => {
            if (index === pageTypes.length - 1) {
              return (
                <div
                  className="page-types"
                  style={{ borderBottom: "1px solid rgb(242,242,242)" }}
                  key={index}
                >
                  {item.type}
                </div>
              );
            }
            return (
              <div className="page-types" key={index}>
                {item.type}
              </div>
            );
          })}
        </TypeList>
      </div>
    </CardStyle>
  );
});
