import React, { memo } from "react";
import { Content } from './style' 
export default memo(function Welcome() {
  return (
    <div>
      <Content>
        <div className="content-title">ART / CODE</div>
        <div className="content-subtitle">Welcome to MyBlog</div>
        <div className="content-line2" />
        <div className="content-text">
          Lorem ipsum dosectetur adipisicing elit, sed do.Lorem ipsum dolor sit
          amet, consectetur Nulla fringilla
        </div>
        <div className="content-text">
          purus at leo dignissim congue. Mauris elementum accumsan leo vel
          tempor. …
        </div>
      </Content>
    </div>
  );
});
