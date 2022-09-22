import styled from "styled-components";

export const CodeStyle = styled.div`
  .code-img {
    display: inline-block;
    /* margin: 0 auto; */
    width: 100%;
    height: 600px;
    background: url(${(props) => props.img}) no-repeat;
    background-size: cover;
  }
  .code-type {
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 2px;
    margin-top: 10px;
    color: #be9656;
  }
  .code-title {
    font-family: "Josefin";
    font-size: 30px;
    font-weight: 600;
  }
  .code-line {
    margin: 20px auto;
    width: 5%;
    height: 1px;
    border-top: solid #be9656 2px;
  }
  .code-date {

  }
  .code-content{
    
  }
`;
