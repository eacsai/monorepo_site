import styled from "styled-components";

export const CodeArtStyles = styled.div`
  width: 80%;
  text-align: center;
  .container {
    margin: 0px 60px;
    .content-title {
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 2px;
      margin-top: 10px;
      color: #be9656;
    }
    .content-subtitle {
      font-family: "Josefin";
      font-size: 30px;
      font-weight: 600;
    }
    .content-line {
      margin: 20px auto;
      width: 10%;
      height: 1px;
      border-top: solid #be9656 2px;
    }
    .content-line2 {
      margin: 20px auto;
      width: 3%;
      height: 1px;
      border-top: solid #000 1px;
    }
    .view-more {
      background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(180,180,180,1) 0%, rgba(242,242,242,1) 100%);
      background-size: 400%;
      width: 20%;
      box-sizing: border-box;
      margin: 20px auto;
      font-size: 16px;
      font-family: "Varela Round";
      font-weight: 400;
      letter-spacing: 4px;
      z-index: 1;
      padding: 0 10px;
      text-decoration:none
    }
    .view-more::before {
      content: "";
      position: absolute;
      border-radius: 5px;
      background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(180,180,180,1) 0%, rgba(242,242,242,1) 100%);
      background-size: 400%;
      z-index: -1;
      filter: blur(20px);
    }
    .view-more:hover {
      cursor:pointer;
      animation: sun 8s infinite;
    }
    .view-more:hover::before {
      animation: sun 8s infinite;
    }
    @keyframes sun {
      100%{
        background-position: -400% 0;
      }
    }
  }
`;
