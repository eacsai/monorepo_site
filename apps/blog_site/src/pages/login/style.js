import styled from "styled-components";

export const LoginStyle = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  position: relative;
  overflow: hidden;
  background: url("https://w.wallhaven.cc/full/wq/wallhaven-wq2xdx.jpg")
    no-repeat;
  background-size: cover;
  .color {
    position: absolute;
    filter: blur(200px);
  }
  .sign-upload {
    display: flex;
    justify-content: space-between;
  }
  .color:nth-child(1) {
    top: -350px;
    width: 600px;
    height: 600px;
    background: #ff359d;
  }
  .color:nth-child(2) {
    top: -150px;
    left: 100px;
    width: 500px;
    height: 500px;
    background: #fffd87;
  }
  .color:nth-child(3) {
    top: 50px;
    right: 100px;
    width: 600px;
    height: 600px;
    background: #00d2ff;
  }

  .box {
    position: relative;
  }

  /* 背景圆样式 */

  .box .circle {
    position: absolute;
    background: rgba(255, 255, 255, 0.1);
    /* backdrop-filter属性为一个元素后面区域添加模糊效果 */
    backdrop-filter: blur(5px);
    box-shadow: 0 25px 45px rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.5);
    border-right: 1px solid rgba(255, 255, 255, 0.2);
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 50%;
    /* 使用filter(滤镜) 属性，改变颜色。
    hue-rotate(deg)  给图像应用色相旋转 
    calc() 函数用于动态计算长度值 
    var() 函数调用自定义的CSS属性值x*/
    /* 调用动画animate，需要10s完成动画，
    linear表示动画从头到尾的速度是相同的，
    infinite指定动画应该循环播放无限次*/
    animation: animate 10s linear infinite;
    /* 动态计算动画延迟几秒播放 */
    animation-delay: calc(-1s);
  }

  /* 背景圆动画 */

  @keyframes animate {
    0%,
    100% {
      transform: translateY(-50px);
    }
    50% {
      transform: translateY(50px);
    }
  }

  .box .circle:nth-child(1) {
    top: -50px;
    right: -60px;
    width: 100px;
    height: 100px;
    filter: hue-rotate(calc(1 * 70deg));
  }

  .box .circle:nth-child(2) {
    top: 150px;
    left: -100px;
    width: 120px;
    height: 120px;
    z-index: 2;
    filter: hue-rotate(calc(2 * 70deg));
  }

  .box .circle:nth-child(3) {
    bottom: 50px;
    right: -60px;
    width: 80px;
    height: 80px;
    z-index: 2;
    filter: hue-rotate(calc(3 * 70deg));
  }

  .box .circle:nth-child(4) {
    bottom: -80px;
    left: 100px;
    width: 60px;
    height: 60px;
    filter: hue-rotate(calc(4 * 70deg));
  }

  .box .circle:nth-child(5) {
    top: -80px;
    left: 140px;
    width: 60px;
    height: 60px;
    filter: hue-rotate(calc(5 * 70deg));
  }

  .form h2 {
    position: relative;
    color: #fff;
    font-size: 24px;
    font-weight: 600;
    letter-spacing: 5px;
    margin-bottom: 30px;
    cursor: pointer;
  }

  /* 登录标题的下划线样式 */

  .form h2::before {
    content: "";
    position: absolute;
    left: 0;
    bottom: -10px;
    width: 0px;
    height: 3px;
    background: #fff;
    transition: 0.5s;
  }

  .form h2:hover:before {
    width: 53px;
  }

  .form .inputBox {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin-top: 20px;
    position: relative;
  }

  /* 输入框样式 */

  .form .inputBox input {
    flex: 9;
    background: rgba(255, 255, 255, 0.2);
    padding: 15px;
    outline: none;
    border: none;
    height: 30px;
    border-radius: 30px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    font-size: 16px;
    letter-spacing: 1px;
    color: #fff;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
    height: 100%;
  }
  .hide-password{
    position: absolute;
    right: 0;
    padding: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
    outline: none;
    border: none;
    height: 100%;
    border-radius: 0 30px 30px 0;
    border-bottom: 1px solid rgba(255,255,255,0.2);
    font-size: 16px;
  }
  .form .inputBox input::placeholder {
    color: #fff;
  }

  /* 登录按钮样式 */

  .form .inputBox div {
    color: #666;
    max-width: 100px;
    margin-bottom: 20px;
    font-weight: 600;
    cursor: pointer;
    width: 140px;
    height: 40px;
    text-align: center;
    line-height: 40px;
    border-radius: 10px;
    background: yellowgreen;
  }

  .forget {
    margin-top: 6px;
    color: #fff;
    letter-spacing: 1px;
  }

  .forget a {
    color: #fff;
    font-weight: 600;
    text-decoration: none;
  }

  .turn {
    perspective: 800px;
    transform-style: preserve-3d;
    transition: all 1.6s ease;
  }

  .over {
    position: relative;
    width: 400px;
    height: 450px;
    min-height: 400px;
    background: rgba(255, 255, 255, 0.1);
    display: flex;
    justify-content: center;
    align-items: center;
    backdrop-filter: blur(5px);
    box-shadow: 0 25px 45px rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.5);
    border-right: 1px solid rgba(255, 255, 255, 0.2);
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  }

  .change {
    background-color: #2196f35e;
    color: white;
    width: 280px;
    padding: 8px 0;
    /* 用padding方便文字垂直居中 */
    font-size: 24px;
    font-weight: 600;
    text-align: center;
    position: absolute;
    left: 50%;
    margin-left: -140px;
    top: 120%;
    border-radius: 8px;
    cursor: pointer;
  }
  .active {
    transform: rotateY(180deg);
  }
  .form {
    position: absolute;
    width: 100%;
    padding: 50px;
    transform-style: preserve-3d;
  }
  .sign {
    transform: rotateY(180deg);
  }
  .swi {
    display: none;
    transition: all 1.6s ease;
  }
`;
