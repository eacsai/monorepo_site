import styled from "styled-components";

export const ImgListStyle = styled.div`
  .works-img {
    height: 700px;
    background: url("https://tva1.sinaimg.cn/large/008i3skNly1gtr005wg7xj61c00u0wm702.jpg")
      no-repeat;
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  .work-list {
    width: 100%;
  }
  .box {
    width: 0;
    position: absolute;
  }
  .container {
    margin: 100px auto -200px auto;
    min-width: 1200px;
    position: relative;
  }
  @import url(https://fonts.googleapis.com/css?family=Raleway:400,500,700);
  @import url(https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css);
  figure.sample {
    font-family: "Raleway", Arial, sans-serif;
    position: relative;
    overflow: hidden;
    margin: 10px;
    width: 100%;
    color: #ffffff;
    text-align: center;
    font-size: 16px;
    background-color: #000000;
  }
  figure.sample *,
  figure.sample *:before,
  figure.sample *:after {
    box-sizing: border-box;
    transition: all 0.55s ease;
  }
  figure.sample img {
    max-width: 100%;
    backface-visibility: hidden;
    vertical-align: top;
    opacity: 0.9;
  }
  .tt{
    position: absolute;
    top: 58%;
    left: 8vw;
    display:flex;
  }
  .title {
    padding: 5px 10px 10px;
  }
  .title:before,
  .title:after {
    height: 2px;
    width: 30rem;
    position: absolute;
    content: "";
    background: #ffffff;
  }
  .title:before {
    top: 0;
    left: 10px;
    transform: translateX(100%);
  }
  .title:after {
    bottom: 0;
    right: 10px;
    transform: translateX(-100%);
  }
  .type:before,
  .type:after {
    width: 2px;
    height: 100rem;
    position: absolute;
    content: "";
    background-color: #ffffff;
  }
  .type:before {
    bottom:10px;
    right: 0;
    transform: translateY(-100%);
  }
  .type:after {
    top: 10px;
    left: 0;
    transform: translateY(100%);
  }
  .type {
    margin: 0;
    text-transform: uppercase;
  }
  .type {
    display: block;
    opacity: 0;
    font-weight: 700;
    background: rgba(255,255,255,0.6);
    padding: 5px 10px;
    color: #000000;
  }
  figure.sample figcaption {
    position: relative;
    bottom: 40px;
    text-align: left;
    opacity: 0;
    padding: 5px 60px 5px 10px;
    font-size: 1em;
    font-weight: 500;
    letter-spacing: 1.5px;
  }
  figure.sample figcaption p {
    margin: 0;
  }
  figure.sample:hover img,
  figure.sample.hover img {
    zoom: 1;
    filter: alpha(opacity=35);
    -webkit-opacity: 0.35;
    opacity: 0.35;
  }
  figure.sample:hover .title:before,
  figure.sample.hover .title:before,
  figure.sample:hover .title:after,
  figure.sample.hover .title:after,
  figure.sample:hover .type:before,
  figure.sample.hover .type:before,
  figure.sample:hover .type:after,
  figure.sample.hover .type:after {
    transform: translate(0, 0);
  }
  figure.sample:hover .title:before,
  figure.sample.hover .title:before,
  figure.sample:hover .title:after,
  figure.sample.hover .title:after {
    -webkit-transition-delay: 0.15s;
    transition-delay: 0.15s;
  }
  figure.sample:hover figcaption,
  figure.sample.hover figcaption,
  figure.sample:hover .type,
  figure.sample.hover .type {
    opacity: 1;
    -webkit-transition-delay: 0.2s;
    transition-delay: 0.2s;
  }
`;
