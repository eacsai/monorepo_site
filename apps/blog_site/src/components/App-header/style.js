import styled from 'styled-components';

export const HeaderWrapper = styled.div`
  position:fixed;
  top:0px;
  width:100%;
  height: 53px;
  background-color: #fff;
  border-bottom: 1px solid rgba(225, 225, 225);
  z-index: 99999;
  .header {
    display:flex;
    height: auto;
  }
  .container {
    flex:1;
    text-align:center;
  }
  .content {
    display:inline-block;
    position: relative;
    line-height:53px;
    font-family: "Josefin Sans", Helvetica, Arial, sans-serif;
    font-size: 11px;
    font-weight: 900;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: #444444;
  }
  .content::after {
    position: absolute;
    top: 20px;
    right: -15px;
    content: "";
    width: 7px;
    height: 7px;
    border-top: 2px solid #000;
    border-left: 2px solid #000;
    transform: rotate(225deg)
  }
  .subnav li{
    max-height: 0;
    transition: all 0.25s ease-out;
    overflow: hidden;
    background-color: #fff;
    line-height:30px;
    cursor: pointer;
  }
  .subnav li:hover{
    background-color: #d7d1d1;
    transition: all 0.25s ease-in;
  }
  .container:hover .subnav li{
    max-height: 50px;
    transition: all 0.25s ease-in;
  }
`