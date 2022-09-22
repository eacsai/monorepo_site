const ipUrl = 'http://localhost:7001/admin/'

const servicePath = {
  checkLogin : ipUrl + 'checkLogin',  //检查用户名和密码  
  getTypeInfo : ipUrl + 'getTypeInfo', //获得文章类别信息 
  checkLogin : ipUrl + 'checkLogin' ,  //  检查用户名密码是否正确
  addArticle : ipUrl + 'addArticle' , //添加文字
  updateArticle:ipUrl + 'updateArticle' ,  //  修改文章第api地址
  getArticleList:ipUrl + 'getArticleList' ,  //  文章列表 
  delArticle:ipUrl + 'delArticle/' ,  //  删除文章
  getArticleById:ipUrl + 'getArticleById/' ,  //  根据ID获得文章详情
  getComment:ipUrl + 'getComment/' , // 获取评论
  delComment:ipUrl + 'delComment/' , //删除评论
  subType:ipUrl + 'subType/', //添加类型
  getType:ipUrl + 'getType/' , // 获取类型
  delType:ipUrl + 'delType/' , //删除类型
  getUser:ipUrl + 'getUser/' , //删除用户
  delUser:ipUrl + 'delUser/' , //删除用户
  addPic:ipUrl + 'addPic/', //添加图片
  subPic:ipUrl + 'subPic/', //发送过去
  getPic:ipUrl + 'getPic/', //获取图片
  delPic:ipUrl + 'delPic/', //删除图片
}

export default servicePath;