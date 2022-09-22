import styled from "styled-components";

export const Article = styled.div`
  .markdown-content {
    font-size: 16px !important;
    max-height: 745px;
  }
  .show-html {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 16px;
    height: 745px;
    background-color: #f0f0f0;
    overflow: auto;
  }

  .show-html h1 {
    font-size: 30px;
  }

  .show-html h2 {
    font-size: 28px;
    border-bottom: 1px solid #cbcbcb;
  }
  .show-html h3 {
    font-size: 24px;
  }

  .show-html pre {
    display: block;
    background-color: #f0f0f0;
    padding: 5px;
    border-radius: 5px;
  }
  .show-html pre > code {
    color: #000;
    background-color: #f0f0f0;
  }
  .show-html code {
    background-color: #fff5f5;
    padding: 5px 10px;
    border-radius: 5px;
    margin: 0px 3px;
    color: #ff502c;
  }
  .show-html blockquote {
    border-left: 4px solid #cbcbcb;
    padding: 10px 10px 10px 30px;
    background-color: #f8f8f8;
  }
  .introduce-html {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 16px;

    background-color: #f0f0f0;
  }

  .introduce-html h1 {
    font-size: 30px;
  }

  .introduce-html h2 {
    font-size: 28px;
    border-bottom: 1px solid #cbcbcb;
  }
  .introduce-html h3 {
    font-size: 24px;
  }

  .introduce-html pre {
    display: block;
    background-color: #f0f0f0;
    padding: 5px;
    border-radius: 5px;
  }
  .introduce-html pre > code {
    color: #000;
    background-color: #f0f0f0;
  }
  .introduce-html code {
    background-color: #fff5f5;
    padding: 5px 10px;
    border-radius: 5px;
    margin: 0px 3px;
    color: #ff502c;
  }
  .introduce-html blockquote {
    border-left: 4px solid #cbcbcb;
    padding: 10px 10px 10px 30px;
    background-color: #f8f8f8;
  }
  .date-select {
    margin-top: 10px;
  }
  .img-text {
    font-size: 16px;
    overflow: hidden; //超出的文本隐藏
    text-overflow: ellipsis; //溢出用省略号显示
    white-space: nowrap; //溢出不换行
  }
`;
