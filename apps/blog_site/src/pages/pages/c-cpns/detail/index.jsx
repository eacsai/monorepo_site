import { memo, useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Comment, Input, Tooltip, Avatar } from 'antd';

//markdown
import { Marked, Renderer } from '@ts-stack/markdown';
import hljs from 'highlight.js';
import 'highlight.js/styles/monokai-sublime.css';

import { getHomePagesAction } from '@/pages/home/store/actionCreators';
import { useNavigate, useLocation } from 'react-router-dom';
import { DetailStyle } from './style';
import Tocify from '@/components/tocify';
import { setComment, getComment } from '@/services/detail';

export default memo(function Detail() {
  const [isHide1, setIsHide1] = useState(true);
  const [isHide2, setIsHide2] = useState(false);
  const { TextArea } = Input;
  const dispatch = useDispatch();
  const contentRef = useRef();
  useEffect(() => {
    dispatch(getHomePagesAction());
  }, [dispatch]);
  const navigate = useNavigate();
  const location = useLocation();
  const mydate = new Date();
  const { pageData, data } = useSelector((state) => ({
    pageData: state.getIn(['home', 'homePages']),
    data: state.getIn(['login', 'data'])
  }));
  const { token, username, avatar } = data;
  const [commentList, setCommentList] = useState([]);
  const [topHide, setTopHide] = useState(false);
  const [conmentContent, setCommentContent] = useState('');
  const scroll = () => {
    if (!contentRef?.current) {
      return;
    }
    document?.documentElement.scrollTop < contentRef?.current?.offsetHeight + 300
      ? setTopHide(false)
      : setTopHide(true);
  };
  useEffect(() => {
    // data === 'success' ? setIsHide1(false) : setIsHide1(true)
    if (token) {
      setIsHide2(true);
      setIsHide1(false);
    } else {
      setIsHide1(true);
      setIsHide2(false);
    }
    getComment(articleId).then((res) => {
      setCommentList(res.data);
    });
    window.addEventListener('scroll', () => {
      scroll();
    });
    return () => {
      window.removeEventListener('scroll', () => {
        scroll();
      });
    };
  }, [token]);
  console.log(topHide);
  let tmpText = pageData && pageData[location.state.pageIndex] && pageData[location.state.pageIndex].content;
  let articleId = pageData && pageData[location.state.pageIndex] && pageData[location.state.pageIndex].id;
  if (tmpText === undefined) {
    tmpText = '';
  }
  if (articleId === undefined) {
    articleId = 0;
  }
  const toLogin = () => {
    navigate('/login/login');
  };
  const toSignin = () => {
    navigate('/login/signin');
  };
  //markdown配置:
  const renderer = new Renderer();
  const tocify = new Tocify();
  renderer.heading = function (text, level) {
    const anchor = tocify.add(text, level);
    return `<a id="/pages/detail/${anchor}" href="#/pages/detail/${anchor}" class="anchor-fix"><h${level}>${text}</h${level}></a>\n`;
  };
  Marked.setOptions({
    renderer: renderer,
    gfm: true,
    tables: true,
    breaks: true,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: true,
    highlight: function (code) {
      return hljs.highlightAuto(code).value;
    }
  });

  const onChange = (e) => {
    setCommentContent(e.target.value);
  };

  const commitComment = () => {
    const date = mydate.toLocaleDateString();
    console.log('articleId', articleId);
    setComment(username, conmentContent, date, avatar, articleId);
    let tmpList = [...commentList, { comment: conmentContent, username, date, avatar, articleId }];
    setCommentList(tmpList);
  };

  return (
    <div style={{ backgroundColor: 'rgb(244, 245, 245)' }}>
      <DetailStyle>
        <div className="detail-content">
          <div className="page-content" ref={contentRef}>
            <div
              className="content-markdown"
              dangerouslySetInnerHTML={{ __html: Marked.parse(tmpText) }}
            ></div>
          </div>
          {commentList.length && <div className="content-subtitle">{commentList.length} Comments</div>}
          <div className="content-line2"></div>
          {commentList?.map((item, index) => {
            return (
              <div
                key={index}
                style={{
                  display: 'flex',
                  width: '100%',
                  justifyContent: 'flex-start'
                }}
              >
                <Avatar size={45} src={item.avatar} style={{ marginRight: '20px', marginTop: '20px' }} />
                <Comment
                  style={{ flex: '1' }}
                  author={<div style={{ color: '#fff' }}>{item.username}</div>}
                  content={<p>{item.comment}</p>}
                  datetime={
                    <Tooltip title={item.date}>
                      <span style={{ color: '#fff' }}>{item.date}</span>
                    </Tooltip>
                  }
                />
              </div>
            );
          })}
          <div className="login">
            <div className="content-subtitle" style={{ marginTop: '50px' }}>
              Post a comment
            </div>
            <div className="content-line2"></div>
            {/* 未登录 */}
            <div className={`content-box ${isHide2 === true ? 'hidden' : ''}`}>
              <div className="content-text">Before you comment, please first</div>
              <div className="content-login" style={{ background: 'skyblue' }} onClick={toLogin}>
                sign in
              </div>
              <div className="content-text">Or</div>
              <div className="content-login" style={{ background: 'hotpink' }} onClick={toSignin}>
                sign up
              </div>
            </div>
            {/* 已登陆 */}
            <div className={isHide1 === true ? 'hidden' : ''}>
              <div className="reader">
                <Avatar size={45} src={avatar} style={{ marginRight: '20px' }} />
                <div className="reader-text">
                  <div>{username}</div>
                  <div>{mydate.toLocaleDateString()}</div>
                </div>
              </div>
              <div className="text-bg">
                <TextArea rows={4} onChange={onChange} />
              </div>
              <div className="submit-button" onClick={commitComment} style={{ cursor: 'pointer' }}>
                <span>Button</span>
                <div className="wave"></div>
              </div>
            </div>
          </div>
        </div>
        <div className={`toc ${topHide ? 'top-hide' : 'top-show'}`}>{tocify && tocify.render()}</div>
      </DetailStyle>
    </div>
  );
});
