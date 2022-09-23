import React, { memo, useState, useEffect, useCallback } from 'react';
import { Marked, Renderer } from '@ts-stack/markdown';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { Row, Col, Input, Select, Button, DatePicker, message } from 'antd';
import axios from 'axios';
import servicePath from '../../config/apiUrl.js';
import ArticleAvatar from './avatar/index';
import { Article } from './style';
const { Option } = Select;
const { TextArea } = Input;
export default memo(function AddArticle(props: any) {
  const [articleId, setArticleId] = useState(0); // 文章的ID，如果是0说明是新增加，如果不是0，说明是修改
  const [articleTitle, setArticleTitle] = useState(''); //文章标题
  const [articleContent, setArticleContent] = useState(''); //markdown的编辑内容
  const [markdownContent, setMarkdownContent] = useState('预览内容'); //html内容
  const [introducemd, setIntroducemd] = useState(); //简介的markdown内容
  const [introducehtml, setIntroducehtml] = useState('等待编辑'); //简介的html内容
  const [showDate, setShowDate] = useState<any>(); //发布日期
  const [articleImg, setArticleImg] = useState<any>();
  const [updateDate, setUpdateDate] = useState<any>(); //修改日志的日期
  const [typeInfo, setTypeInfo] = useState([]); // 文章类别信息
  const [selectedType, setSelectType] = useState(1); //选择的文章类别
  const navigate = useNavigate();
  const location = useLocation();

  Marked.setOptions({
    renderer: new Renderer(),
    gfm: true,
    tables: true,
    breaks: true,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false
  });
  const changeContent = (e: any) => {
    setArticleContent(e.target.value);
    const html = Marked.parse(e.target.value);
    setMarkdownContent(html);
  };

  const changeIntroduce = (e: any) => {
    setIntroducemd(e.target.value);
    const html = Marked.parse(e.target.value);
    setIntroducehtml(html);
  };

  const selectTypeHandler = (value: any) => {
    setSelectType(value);
  };
  //从中台得到文章类别信息
  const getTypeInfo = useCallback(() => {
    axios({
      method: 'get',
      url: servicePath.getTypeInfo,
      headers: { 'Access-Control-Allow-Origin': '*' },
      withCredentials: true
    })
      .then((res) => {
        if (res.data.data === '没有登录') {
          sessionStorage.removeItem('jwToken');
          navigate('/');
        } else {
          setTypeInfo(res.data.data);
        }
      })
      .catch((err) => {
        sessionStorage.removeItem('jwToken');
        console.log('err:', err);
        navigate('/');
      });
  }, [navigate]);

  const getArticleById = (id: any) => {
    axios(servicePath.getArticleById + id, {
      withCredentials: true,
      headers: { 'Access-Control-Allow-Origin': '*' }
    }).then((res) => {
      //let articleInfo= res.data.data[0]
      console.log(res.data.data[0]);
      setArticleTitle(res.data.data[0].title);
      setArticleContent(res.data.data[0].content);
      const html = Marked.parse(res.data.data[0].content);
      setMarkdownContent(html);
      setIntroducemd(res.data.data[0].introduce);
      const tmpInt = Marked.parse(res.data.data[0].introduce);
      setIntroducehtml(tmpInt);
      setShowDate(res.data.data[0].addTime);
      setSelectType(res.data.data[0].typeId);
      setArticleImg(res.data.data[0].picture);
    });
  };

  //保存文章的方法
  const saveArticle = () => {
    if (!selectedType) {
      message.error('必须选择文章类别');
      return false;
    } else if (!articleTitle) {
      message.error('文章名称不能为空');
      return false;
    } else if (!articleContent) {
      message.error('文章内容不能为空');
      return false;
    } else if (!introducemd) {
      message.error('简介不能为空');
      return false;
    } else if (!showDate) {
      message.error('发布日期不能为空');
      return false;
    } else if (!articleImg) {
      message.error('文章图片不能为空');
    }

    const dataProps: any = {}; //传递到接口的参数
    dataProps.type_id = selectedType;
    dataProps.title = articleTitle;
    dataProps.content = articleContent;
    dataProps.introduce = introducemd;
    dataProps.date = showDate;
    dataProps.pic = articleImg;
    if (articleId === 0) {
      console.log('articleId=:' + articleId);
      console.log(dataProps.date);
      axios({
        method: 'post',
        url: servicePath.addArticle,
        data: dataProps,
        withCredentials: true
      }).then((res) => {
        setArticleId(res.data.insertId);
        if (res.data.isScuccess) {
          message.success('文章保存成功');
        } else {
          message.error('文章保存失败');
        }
      });
    } else {
      dataProps.id = articleId;
      axios({
        method: 'post',
        url: servicePath.updateArticle,
        headers: { 'Access-Control-Allow-Origin': '*' },
        data: dataProps,
        withCredentials: true
      }).then((res) => {
        if (res.data.isScuccess) {
          message.success('文章保存成功');
        } else {
          message.error('保存失败');
        }
      });
    }
  };
  useEffect(() => {
    getTypeInfo();
    console.log(location.state);
    if (location.state) {
      setArticleId(Number(location.state));
      getArticleById(location.state);
    }
    //获得文章ID
  }, [getTypeInfo, location]);

  return (
    <Article>
      <Row gutter={5}>
        <Col span={18}>
          <Row gutter={10}>
            <Col span={16}>
              <Input
                value={articleTitle}
                placeholder="博客标题"
                onChange={(e) => {
                  setArticleTitle(e.target.value);
                }}
                size="large"
              />
            </Col>
            <Col span={4}>
              &nbsp;
              <Select defaultValue={selectedType} size="large" onChange={selectTypeHandler}>
                {typeInfo.map((item: any, index) => {
                  return (
                    <Option key={index} value={item.id}>
                      {item.type}
                    </Option>
                  );
                })}
              </Select>
            </Col>
          </Row>
          <br />
          <Row gutter={10}>
            <Col span={12}>
              <TextArea
                value={articleContent}
                className="markdown-content"
                rows={35}
                placeholder="文章内容"
                onChange={changeContent}
              />
            </Col>
            <Col span={12}>
              <div className="show-html" dangerouslySetInnerHTML={{ __html: markdownContent }}></div>
            </Col>
          </Row>
        </Col>
        <Col span={6}>
          <Row>
            <Col span={24}>
              <Button size="large">暂存文章</Button>&nbsp;
              <Button type="primary" size="large" onClick={saveArticle}>
                发布文章
              </Button>
              <br />
            </Col>
            <Col span={24}>
              <br />
              <TextArea
                rows={4}
                value={introducemd}
                onChange={changeIntroduce}
                onPressEnter={changeIntroduce}
                placeholder="文章简介"
              />
              <div
                className="introduce-html"
                dangerouslySetInnerHTML={{
                  __html: '文章简介：' + introducehtml
                }}
              ></div>
            </Col>
            <Col span={12}>
              <div className="date-select">
                <DatePicker
                  onChange={(date, dateString) => setShowDate(dateString)}
                  placeholder="发布日期"
                  size="large"
                />
              </div>
            </Col>
          </Row>
          <Col span={22}>
            <div className="img-text">博客图片</div>
            <div className="img-text">{articleImg}</div>
            <ArticleAvatar setImgUrl={setArticleImg} imgUrl={articleImg} />
          </Col>
        </Col>
      </Row>
    </Article>
  );
});
