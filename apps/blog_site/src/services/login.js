import request from "./request";

export function login(username, password) {
  return request.post("/default/login", {
    username,
    password,
  });
}

export function sign(username, password1, password2, avatarImg) {
  return request.post("/default/sign", {
    username,
    password1,
    password2,
    avatarImg
  });
}

export function setAvatar(username, file) {
  return request.post("/default/avatar", {
    username,
    file,
  });
}