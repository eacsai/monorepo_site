import styled from "styled-components";
export const LoginStyle = styled.div`
  width: 100vw;
  height: 100vh;
  background: url("https://w.wallhaven.cc/full/9m/wallhaven-9mjoy1.png");
  background-size: cover;
  .container {
    width: 36vw;
    height: 60vh;
    display: flex;
    align-items: center;
    position: relative;
    left: 50%;
    top: 40%;
    transform: translate(-50%, -50%);
  }
  .choose {
    width: 100%;
    height: 300px;
    background: #87ceeb91;
    display: flex;
    .login-question {
      display: flex;
      width: 100%;
      align-items: center;
      justify-content: center;
      transition: 0.2s;
      .login-button {
        width: 160px;
        height: 50px;
        border-radius: 10px;
        background: linear-gradient(to right, skyblue, hotpink);
        border: 1px solid #fff;
        outline: none;
        cursor: pointer;
      }
    }
    .register-question {
      display: flex;
      width: 100%;
      align-items: center;
      justify-content: center;
      transition: 0.2s;
      .register-button {
        width: 160px;
        height: 50px;
        border-radius: 10px;
        background: linear-gradient(to right, skyblue, hotpink);
        border: 1px solid #fff;
        outline: none;
        cursor: pointer;
      }
    }
  }
  .dynamic {
    width: 50%;
    height: 100%;
    background-color: #add8e6d6;
    display: flex;
    position: absolute;
    transition: 1s;
    flex-direction: column;
    z-index: 9;
  }
  .login {
    display: flex;
    height: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .username {
      width: 80%;
      height: 30px;
      border-bottom: 1px solid #fff;
      border-top: none;
      border-right: none;
      border-left: none;
      margin: 10px;
      color: #303f9f;
      background: none;
      outline: none;
    }
    .username::placeholder {
      color: #303f9f;
    }
    .password {
      width: 80%;
      height: 30px;
      border-bottom: 1px solid #fff;
      border-top: none;
      border-right: none;
      border-left: none;
      margin: 10px;
      color: #303f9f;
      background: none;
      outline: none;
    }
    .password::placeholder {
      color: #303f9f;
    }
    .title {
      color: #303f9f;
      font-size: 22px;
      font-weight: 700;
    }
    .login-button {
      width: 100px;
      height: 33px;
      line-height: 33px;
      text-align: center;
      border-radius: 10px;
      background: #303f9f;
      color: #fff;
      cursor: pointer;
    }
  }
  .register {
    display: flex;
    height: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .username {
      width: 80%;
      height: 30px;
      border-bottom: 1px solid #fff;
      border-top: none;
      border-right: none;
      border-left: none;
      margin: 10px;
      color: #303f9f;
      background: none;
      outline: none;
    }
    .username::placeholder {
      color: #303f9f;
    }
    .password {
      width: 80%;
      height: 30px;
      border-bottom: 1px solid #fff;
      border-top: none;
      border-right: none;
      border-left: none;
      margin: 10px;
      color: #303f9f;
      background: none;
      outline: none;
    }
    .password::placeholder {
      color: #303f9f;
    }
    .title {
      color: #303f9f;
      font-size: 22px;
      font-weight: 700;
    }
    .login-button {
      width: 100px;
      height: 33px;
      line-height: 33px;
      text-align: center;
      border-radius: 10px;
      background: #303f9f;
      color: #fff;
      cursor: pointer;
    }
  }
  .active {
    transform: translateX(100%);
  }
  .change {
    opacity: 0;
  }
`;
