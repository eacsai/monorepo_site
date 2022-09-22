import styled from "styled-components";

export const ImgStyle = styled.div`
  .a {
    position: relative;
    height: ${props=>props.style.height}px;
    width: ${props=>props.style.width}px;
    top: 0;
    background: url("https://tva1.sinaimg.cn/large/008i3skNly1gtrpqcytdij61hc0u0whm02.jpg")
      no-repeat;
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    overflow: hidden;
  }
  .b,
  .c,
  .d,
  .e {
    position: absolute;
    height: ${props=>props.style.height}px;
    width: ${props=>props.style.width}px;
    /* 设置阴影 */
    filter: drop-shadow(4px 4px 12px rgba(0, 0, 0, 0.5));
    background-size: cover;
    opacity: 0.7;
    transition: 0.5s;
  }
  .b::after,
  .c::after,
  .d::after,
  .e::after {
    content: "";
    position: absolute;
    height: ${props=>props.style.height}px;
    width: ${props=>props.style.width}px;
    background-image: url("https://tva1.sinaimg.cn/large/008i3skNly1gtrpqcytdij61hc0u0whm02.jpg");
  }
  .b {
    left: ${props=>-props.style.width*0.4}px;
    transform: rotateZ(100deg);
    overflow: hidden;
  }
  .b::after {
    transform: rotateZ(-100deg);
  }

  .c {
    left: ${props=>-props.style.width*0.4}px;
    transform: rotateZ(-100deg);
    overflow: hidden;
  }
  .c::after {
    transform: rotateZ(100deg);
  }

  .d {
    right: ${props=>-props.style.width*0.4}px;
    transform: rotateZ(105deg);
    overflow: hidden;
  }
  .d::after {
    transform: rotateZ(-105deg);
  }

  .e {
    right: ${props=>-props.style.width*0.4}px;
    transform: rotateZ(-100deg);
    overflow: hidden;
  }
  .e::after {
    transform: rotateZ(100deg);
  }
  .f {
    opacity: 0;
    font: 900 30px "";
    /* 设置字体间距 */
    letter-spacing: 10px;
    transition: 0.5s;
    color: #fff;
  }
  .h {
    opacity: 0;
    font: 900 10px "";
    /* 设置字体间距 */
    letter-spacing: 3px;
    transition: 0.5s;
    color: #fff;
  }
  /* 设置动画 */
  .a:hover .b {
    left: ${props=>-props.style.width*0.57}px;
    opacity: 0.3;
  }
  .a:hover .c {
    left: ${props=>-props.style.width*0.52}px;
    opacity: 0.3;
  }
  .a:hover .d {
    right: ${props=>-props.style.width*0.53}px;
    opacity: 0.3;
  }
  .a:hover .e {
    right: ${props=>-props.style.width*0.55}px;
    opacity: 0.3;
  }
  .a:hover .f {
    opacity: 1;
  }
  .a:hover .h {
    opacity: 1;
  }
`;
