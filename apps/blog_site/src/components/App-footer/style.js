import styled from "styled-components";

export const FooterStyle = styled.div`
  .foot-text {
    width: 100%;
    margin: 80px auto;
    text-align: center;
    text {
      font-size: 16px;
      font-family: FontAwesome;
      padding: 5px 30px;
      border-top: 1px solid #000;
      border-bottom: 1px solid #000;
    }
    .img-list {
      display: flex;
      margin: 20px;
    }
    img {
      flex: 1;
      overflow: hidden;
      height: 200px;
      object-fit: cover;
    }
  }
  .tigris {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 200px;
    background-color: rgb(249, 249, 249);
    text-align: center;
    .tigris-text1 {
      display: flex;
      align-items: center;
      flex: 1;
      text {
        font-family: Poppins, sans-serif;
        font-size: 22px;
        font-weight: 600;
        letter-spacing: 2px;
      }
    }
    .tigris-text2{
      display: flex;
      flex:1;
      width:40%;
      justify-content:space-around;
      text{
        font-size:12px;
        font-weight: 400;
      }
    }
  }
`;
