import styled from "styled-components";

export const PageStyle = styled.div`
  .ant-list {
    width: 70%;
    margin: 100px auto;
  }
  .ant-list-item{
    cursor: pointer;
  }
`;
export const TypeList = styled.div`
  margin: 100px auto;
  width: 60%;
  display: flex;
  justify-content: center;
  text-align: center;
  .type-list {
    flex: 1;
    align-items: center;
    justify-content: center;
    div {
      height: 30px;
      line-height: 30px;
    }
    text {
      font-family: Poppins, sans-serif;
      font-size: 16px;
      font-weight: 400;
      letter-spacing: 1px;
      color: #333;
      padding: 5px 15px;
    }
    .active {
      background: #f47a65;
    }
  }
`;
