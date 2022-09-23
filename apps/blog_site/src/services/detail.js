import request from './request';
export function setComment(username, comment, date, avatar, articleId) {
  return request.post('/default/addComment', {
    username,
    comment,
    date,
    avatar,
    articleId
  });
}
export function getComment(articleId) {
  console.log('articleId', articleId);
  return request.post('/default/getComment', {
    articleId
  });
}
