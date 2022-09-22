import React, { memo, useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import { ImgStyle } from "./style";
export default memo(function TopImg() {
  const [height, setHeight] = useState(document.body.clientHeight);
  const [width, setWidth] = useState(document.body.clientWidth);
  const imgSize = () => {
    setHeight(document.body.clientHeight);
    setWidth(document.body.clientWidth);
  };
  useEffect(() => {
    window.addEventListener("resize", imgSize);
  });
  return (
    <ImgStyle style={{ height, width }}>
      <div className="a">
        <div className="b"></div>
        <div className="c"></div>
        <div className="d"></div>
        <div className="e"></div>
        <p className="f">LONELY GOAT</p>
        <Link to='/login/login' className="h">Login / Regist</Link>
      </div>
    </ImgStyle >
  );
});
