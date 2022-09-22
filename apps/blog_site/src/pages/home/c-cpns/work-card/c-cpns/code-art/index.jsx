import React, { memo } from "react";
import { CodeArtStyles } from "./style";
import { NavLink } from "react-router-dom";
import Code from './c-cpns/code'
import Art from './c-cpns/art'
export default memo(function CodeArt() {
  return (
    <CodeArtStyles>
      <div className="container">
        <div className="content-title">CODE</div>
        <div className="content-subtitle">New Page</div>
        <div className="content-line" />
        {/* 插入code组件 */}
        <Code/>
        <div className="content-line2" />
        <NavLink to='/pages/pageAll' className="view-more">view more</NavLink>
        <div className="content-title">ART</div>
        <div className="content-subtitle">Fresh Works</div>
        <div className="content-line" />
        {/* 插入Art组件 */}
        <Art/>
        <div className="content-line2" />
        <NavLink to='/works' className="view-more">view more</NavLink>
      </div>
    </CodeArtStyles>
  );
});
