import styled from "styled-components";
import letter_bg from './img/letter_bg.png'
import before from './img/before.png'
import after from './img/after.png'
export const ErrStyle = styled.div`
  .mask {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 1000;
    background-color: rgba(0, 0, 0, 0.6);
  }
  .hide {
    visibility: hidden;
  }
  .wrap {
    transform: scale(0.66);
    position: fixed;
    left: 0;
    right: 0;
    width: 530px;
    bottom: 40vh;
    margin: 0 auto;
    z-index: 9000;
  }
  h1 {
    margin-bottom: 20px;
    text-align: center;
    font-size: 35px;
    font-family: tahoma;
    color: #fff;
  }
  .err-wrap {
    overflow: hidden;
    height: 447px;
    position: relative;
    top: 0px;
    transition: all 1s ease-in-out 0.3s;
  }
  .err-wrap:before {
    content: "";
    position: absolute;
    bottom: 128px;
    left: 0px;
    background: url(${before});
    width: 530px;
    height: 317px;
  }
  .err-wrap:after {
    content: "";
    position: absolute;
    bottom: 0px;
    left: 0;
    background: url(${after});
    width: 530px;
    height: 259px;
  }
  .err-wrap:hover {
    height: 777px;
    top: 200px;
  }
  .container {
    background: url(${letter_bg});
    position: relative;
    top: 200px;
    overflow: hidden;
    height: 200px;
    width: 400px;
    margin: 0px auto;
    padding: 20px;
    border: 1px solid white;
    border-right: 3px;
    transition: all 1s ease-in-out .3s;
  }
  .container p {
    display: block;
    text-align: center;
    font-family: tahoma;
    margin: 40px auto 10px auto;
    font-size: 20px;
  }
  .err-text {
    text-align: center;
    font-size: 20px;
  }
  .error-wrap:hover .container {
    height: 530px;
  }
`;
