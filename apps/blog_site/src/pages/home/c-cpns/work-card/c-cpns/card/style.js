import styled from "styled-components"

export const CardStyle = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;

    .card-content {
      margin-right: 30px;
      background: rgb(242, 242, 242);
    }
    .card-title1 {
      text-align: center;
      margin: 30px 20px;
      padding: 10px 0;
      font-family: "Varela Round", Helvetica, Arial, sans-serif;
      font-size: 11px;
      font-weight: 900;
      letter-spacing: 2px;
      color: #222222;
      border-top: 1px solid #000;
      border-bottom: 1px solid #000;
    }
    .card-picture {
      display: block;
      margin: 0 auto;
      width: 150px;
      height: 150px;
    }
    .card-aboutme {
      text-align: center;
      word-wrap: break-word;
      margin: 20px;
      line-height: 1.7;
    }
    .card-works {
      margin: 0px 10px;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
    }
    .card-pages {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
    }
`;
export const PagesList = styled.div`
  display: flex;
  margin: 0px 0px 20px 30px;
  .pages-img {
    flex: 2;
    height: 0;
    padding-bottom: 25%;
    background: pink url(${(props) => props.img});
    background-size: cover;
  }
  .pages-contain {
    flex: 3;
    margin-left: 10px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }
  .pages-title {
    display: flex;
    flex: 1;
  }
  .pages-date {
    display: flex;
    flex: 3;
    font-weight: 300;
    color: #a29a9a;
  }
`;
export const TypeList = styled.div`
  margin: 0px 20px 20px 20px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  .page-types {
    flex: 1;
    width: 50%;
    min-width: 50%; // 加入这两个后每个item的宽度就生效了
    max-width: 50%;
    font-size: 14px;
    font-family: "PingFang SC";
    padding: 10px 0px;
    border-bottom: 1px solid #b7afaf;
  }
`;
export const WorksList = styled.div`
  width: 30%;
  height: 0;
  padding-bottom: 30%;
  min-width: 30%; // 加入这两个后每个item的宽度就生效了
  max-width: 30%;
  background: url(${(props) => props.img}) no-repeat;
  background-size: cover;
  margin: 10px auto;
`;