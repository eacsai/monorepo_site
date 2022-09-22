import request from "./request";
export function setComment(username, comment, date, avatar) {
  return request.post("/default/addComment", {
    username,
    comment,
    date,
    avatar,
  });
}
export function getComment() {
  return request({
    url: "/default/getComment"
  })
}