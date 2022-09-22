import styled from "styled-components";

export const DetailStyle = styled.div`
  display: flex;
  max-width: 1800px;
  margin: 100px auto;
  .detail-content {
    width: 80%;
    background: url("https://tva1.sinaimg.cn/large/008i3skNly1gundpw2lx9j31e00u0k0v.jpg·")
      no-repeat;
    background-size: cover;
  }
  .top-hide{
      animation: 1s ease-in-out forwards fadeOut;
    }
  @keyframes fadeOut {
    0%{
      opacity: 1;
      visibility: visible;
    }
    100%{
      opacity: 0;
      visibility: hidden;
    }
  }
  .top-show{
      animation: 1s ease-in-out forwards fadeIn;
    }
  @keyframes fadeIn {
    0%{
      opacity: 0;
      visibility: hidden;
    }
    100%{
      opacity: 1;
      visibility: visible;
    }
  }
  .page-content {
    margin: 100px 50px 100px 100px;
    font-size: 16px;
    padding: 50px;
    background: #d3e2e84f;
    border-radius: 30px;
    box-shadow: 20px 20px 60px #bebebe, -20px -20px 60px #ffffff;
    backdrop-filter: blur(10px);
  }
  .ant-comment-content {
    padding: 10px;
    border-radius: 10px;
    background: skyblue;
    position: relative;
    margin-left: 20px;
  }
  .ant-comment-content::before {
    position: absolute;
    top: 40px;
    left: -20px;
    content: "";
    width: 0;
    height: 0;
    border-right: 10px solid skyblue;
    border-bottom: 10px solid transparent;
    border-left: 10px solid transparent;
    border-top: 10px solid transparent;
  }
  .toc {
    width: 20%;
    margin-right: 30px;
  }
  .nav-title {
    text-align: center;
    color: #888;
    border-bottom: 1px solid #000;
  }
  .article-menu {
    font-size: 12px;
  }
  .hidden {
    display: none;
  }
  .login {
    margin-bottom: 100px;
  }
  .content-box {
    /* display: flex; */
    margin: 20px auto;
    text-align: center;
  }
  .content-text {
    display: inline-block;
    letter-spacing: 2px;
  }
  .content-login {
    display: inline-block;
    text-align: center;
    line-height: 40px;
    width: 60px;
    height: 40px;
    color: #fff;
    margin: 20px;
    border-radius: 20%;
    background: skyblue;
    cursor: pointer;
    box-shadow: 7px 7px 14px #c5c5c5, -7px -7px 14px #fbfbfb;
  }
  .ant-avatar-image {
    /* position: static; */
    display: block;
    margin: 0 100px;
  }
  .ant-comment-inner {
    margin: 0;
    border-bottom: none;
  }
  .text-bg{
    background: url('https://tva1.sinaimg.cn/large/008i3skNly1gundp9ckk1j61o00u0tja02.jpg') no-repeat;
    background-size: cover;
    height: 300px;
    margin: 20px 100px;
    width: 80%;
    position: relative;
    border-radius: 20px;
    overflow: hidden;
  }
  .ant-input {    
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    border-radius: 20px;
    height: 300px;
    width: 100%;
    background:rgba(255,255,255,0.8);
    font-size: 16px;
  }
  .reader {
    display: flex;
  }
  .reader-text {
    display: flex;
    flex-direction: column;
  }
  .submit-button {
    width: 120px;
    height: 40px;
    margin: 0 100px;
    position: relative;
    display: block;
    text-align: center;
    line-height: 40px;
    border: 2px solid #00aeff;
    text-transform: uppercase;
    font-size: 14px;
    letter-spacing: 4px;
    color: #00aeff;
    text-decoration: none;
    overflow: hidden;
    span {
      position: relative;
      z-index: 1;
      transition: 1s;
    }
    .wave {
      position: absolute;
      top: calc(100% + 22px);
      left: 0;
      width: 100%;
      height: 100%;
      background: #00aeff;
      transition: 1s;
    }
    :hover .wave {
      top: 0;
    }
    :hover span {
      color: #fff;
    }
    .wave::before {
      content: "";
      position: absolute;
      top: -22px;
      left: 0;
      width: 100%;
      height: 22px;
      background: url("http://markdowntc.wanqqq29.cn/img/wave.png");
      background-size: cover;
      animation: animate 0.5s linear infinite;
    }
    @keyframes animate {
      0% {
        background-position-x: 0;
        background-position-y: -22px;
      }
      100% {
        background-position-x: 118px;
        background-position-y: -22px;
      }
    }
  }
`;
