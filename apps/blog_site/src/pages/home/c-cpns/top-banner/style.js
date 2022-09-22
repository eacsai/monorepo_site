import styled from "styled-components";
export const BannerWrapper = styled.div`
  height: auto;
  position: relative;
  .top-title {
    position: relative;
    /* overflow: hidden; */
  }
  .title1 {
    position: absolute;
    top: 60px;
    text-align: center;
    line-height: 68px;
    left: 50%;
    width: 252px;
    height: 108px;
    z-index: 9999;
    transform: translate(-50%);
    font-size: 30px;
    font-weight: 200;
    font-family: Lucida Family;
    letter-spacing: 10px;
    color: #866b6b;
  }
  .title2 {
    position: absolute;
    text-align: center;
    line-height: 108px;
    top: 100px;
    left: 50%;
    width: 252px;
    height: 108px;
    z-index: 9999;
    transform: translate(-50%);
    font-size: 90px;
    font-weight: 200;
    font-family: Lucida Family;
    color: #e8dcdcb0;
  }
  .left-direction {
    left: -80px;
    display: flex;
    justify-content: space-between;
  }
  .prev,
  .next {
    position: absolute;
    top: 50%;
    width: 100px;
    height: 100px;
    z-index: 9999;
    overflow: hidden;
    background: rgba(0, 0, 0, 0.2);
    &:after {
      position: absolute;
      content: "";
      display: inline-block;
      width: 16px;
      height: 16px;
      border-top: 1px solid #fff;
      border-right: 1px solid #fff;
      top: 50%;
      left: 50%;
    }
  }
  .prev {
    left: 6%;
    &:after {
      transform: translate(-50%, -50%) rotate(225deg);
    }
  }
  .next {
    left: 90%;
    &:after {
      transform: translate(-50%, -50%) rotate(45deg);
    }
  }
  .ant-carousel {
    margin-top: 120px;
    height: 800px;
  }
`;

export const Container = styled.div`
  height: 800px;
  background: url(${(props) => props.img});
  background-size: cover;
`;