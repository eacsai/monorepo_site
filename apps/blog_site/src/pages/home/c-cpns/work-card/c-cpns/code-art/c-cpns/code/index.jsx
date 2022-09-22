import React, { memo } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { CodeStyle } from "./style";
import { Marked } from "@ts-stack/markdown";
export default memo(function Code() {

  const { homePages } = useSelector(
    (state) => ({
      homePages: state.getIn(["home", "homePages"]),
    }),
    shallowEqual
  );
  const pagePic = homePages[0] && homePages[0].pic
  const pageType = homePages[0] && homePages[0].type
  const pageTitle = homePages[0] && homePages[0].title
  const pageDate = homePages[0] && homePages[0].date
  const pageIntroduce = homePages[0] && homePages[0].introduce
  let introduce = (pageIntroduce && pageIntroduce.length > 500) ? pageIntroduce.slice(0,500) : pageIntroduce
  if( introduce === undefined){ introduce = ''}
  return (
    <CodeStyle img={pagePic}>
      <div className="code-img"></div>
      <div className="code-type">{pageType}</div>
      <dic className="code-title">{pageTitle}</dic>
      <div className="code-line"></div>
      <div className="code-date">{pageDate}</div>
      <div className="code-content" style={{textAlign: 'start'}} dangerouslySetInnerHTML={{__html: Marked.parse(introduce)}}></div>
    </CodeStyle>
    // <div></div>
  );
});
