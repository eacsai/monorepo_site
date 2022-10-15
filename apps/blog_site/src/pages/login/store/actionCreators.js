import * as actionTypes from './constants';
import { login, sign } from '@/services/login';
import setAuthToken from '@/utils/AuthToken';

const signSuccessAction = (data) => ({
  type: actionTypes.SIGN_SUCCESS,
  data: data
});

const signFailedAction = (msg) => ({
  type: actionTypes.SIGN_FAILURE,
  msg: msg
});

const loginSuccessAction = (data) => ({
  type: actionTypes.LOGIN_SUCCESS,
  data: data
});

const loginFailedAction = (msg) => ({
  type: actionTypes.LOGIN_FAILURE,
  msg: msg
});

export const getLoginAction = (username, password) => {
  return async (dispatch) => {
    if (!username || !password) {
      dispatch(signFailedAction('密码账号不能为空'));
      throw new Error('密码账号不能为空');
    }
    await login(username, password).then((res) => {
      if (res.msg === '登录失败') {
        console.log('failed', res.msg);
        dispatch(loginFailedAction(res.msg));
        throw new Error(res.msg);
      } else {
        const { token } = res.data;
        localStorage.setItem('jwToken', token);
        setAuthToken(token);
        dispatch(loginSuccessAction(res.data));
      }
    });
  };
};

export const getSignAction = (username, password1, password2, avatarImg) => {
  return async (dispatch) => {
    if (!username || !password1) {
      dispatch(signFailedAction('密码账号不能为空'));
      throw new Error('密码账号不能为空');
    }
    if (password1 !== password2) {
      dispatch(signFailedAction('两次密码不一致'));
      throw new Error('两次密码不一致');
    }
    await sign(username, password1, password2, avatarImg).then((res) => {
      console.log('===res===', res);
      if (res.msg === '注册成功') {
        const { token } = res.data;
        localStorage.setItem('jwToken', token);
        setAuthToken(token);
        dispatch(signSuccessAction(res.data));
      } else {
        dispatch(signFailedAction(res.msg));
        throw new Error(res.msg);
      }
    });
  };
};
