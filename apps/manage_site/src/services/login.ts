import request from './request';

export function login(username: string, password: string) {
  return request.post('/admin/checkLogin', {
    username,
    password
  });
}

export function sign(username: string, password: string) {
  return request.post('/admin/signUp', {
    username,
    password
  });
}
