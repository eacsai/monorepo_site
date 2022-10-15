import React, { memo, useState, useMemo, useCallback } from 'react';
import { Card, Input, Button, Spin, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { LoginStyle } from './style';
import setAuthToken from '../../utils/setAuthToken';

export default memo(function Login(props: any) {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const checkLogin = useCallback(() => {
    setIsLoading(true);
    setUserName('');
    setPassword('');
    if (!userName) {
      message.error('用户名不能为空');
      setTimeout(() => {
        setIsLoading(false);
      });
      return false;
    } else if (!password) {
      message.error('密码不能为空');
      setTimeout(() => {
        setIsLoading(false);
      });
      return false;
    }
    const dataProps = {
      userName: userName,
      password: password
    };
    axios({
      method: 'post',
      url: 'http://103.79.78.232:7001/admin/checkLogin',
      data: dataProps,
      withCredentials: true
    }).then((res) => {
      console.log(res.data.data === '登录成功');
      setIsLoading(false);
      if (res.data.data === '登录成功') {
        const { token } = res.data;
        sessionStorage.setItem('jwToken', token);
        setAuthToken(token);
        navigate('/index');
      } else {
        message.error('用户名密码错误');
      }
    });

    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, [navigate, userName, password]);
  const signUp = useCallback(() => {
    setIsLoading(true);
    if (!userName) {
      message.error('用户名不能为空');
      setTimeout(() => {
        setIsLoading(false);
      });
      return false;
    } else if (!password) {
      message.error('密码不能为空');
      setTimeout(() => {
        setIsLoading(false);
      });
      return false;
    }
    const dataProps = {
      userName: userName,
      password: password
    };
    axios({
      method: 'post',
      url: 'http://localhost:7001/admin/signUp',
      data: dataProps,
      withCredentials: true
    }).then((res) => {
      console.log(res);
      setIsLoading(false);
      if (res.data.data === '注册成功') {
        const { token } = res.data;
        sessionStorage.setItem('jwToken', token);
        setAuthToken(token);
        navigate('/index');
      } else if (res.data.data === '该账号已注册') {
        message.error('该账号已注册');
      } else {
        message.error('注册失败');
      }
    });

    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, [password, userName, navigate]);
  const LoginCard = useMemo(() => {
    return (
      <div className="login">
        <div className="title">LOGIN</div>
        <input
          className="username"
          placeholder="用户名"
          value={userName}
          onChange={(e) => {
            setUserName(e.target.value);
          }}
        ></input>
        <input
          className="password"
          placeholder="密码"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        ></input>
        <div className="login-button" onClick={checkLogin}>
          登陆
        </div>
      </div>
    );
  }, [password, userName, checkLogin]);
  const RegisterCard = useMemo(() => {
    return (
      <div className="register">
        <div className="title">SIGNUP</div>
        <input
          className="username"
          placeholder="用户名"
          value={userName}
          onChange={(e) => {
            setUserName(e.target.value);
          }}
        ></input>
        <input
          className="password"
          placeholder="密码"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        ></input>
        <div className="login-button" onClick={signUp}>
          注册
        </div>
      </div>
    );
  }, [password, userName, signUp]);
  const change = () => {
    setIsLogin((c) => !c);
  };
  return (
    <LoginStyle>
      <div className="container">
        <div className={isLogin ? 'dynamic' : 'dynamic active'}>
          {isLogin && LoginCard}
          {!isLogin && RegisterCard}
        </div>
        <div className="choose">
          <div className={!isLogin ? 'login-question' : 'login-question change'}>
            <button className="login-button" onClick={change}>
              {'已有账号，直接登陆'}
            </button>
          </div>
          <div className={isLogin ? 'register-question' : 'register-question change'}>
            <button className="register-button" onClick={change}>
              {'没有账号，点击注册'}
            </button>
          </div>
        </div>
      </div>
    </LoginStyle>
  );
});
