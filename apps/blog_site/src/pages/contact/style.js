import styled from "styled-components";

export const ContactStyle = styled.div`
  height: 100vh;
  overflow-x: hidden;
  perspective: 3px;

  div {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    font-style: 30px;
    letter-spacing: 2px;
  }
  .image {
    transform: translateZ(-1px) scale(1.6);
    background-size: cover;
    height: 100vh;
    z-index: -1;
  }
  .text {
    height: 50vh;
    background-color: #fff;
  }
  .text h1 {
    color: #000;
  }
  .heading {
    z-index: -1;
    transform: translateY(-30vh) translateZ(1px);
    color: #fff;
    font-size: 30px;
  }
`;