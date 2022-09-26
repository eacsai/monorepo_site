import styled from 'styled-components';

export const AvatarStyle = styled.div`
  margin: 100px;
  .drawing-wrap {
    width: 500px;
    height: 500px;
    border: 1px solid red;
    position: relative;
    top: 100px;
    left: 100px;
  }
  .drawing-item {
    cursor: move;
    width: 100px;
    height: 100px;
    background-color: transparent;
    position: absolute;
    top: 100px;
    left: 100px;
    border: 1px solid skyblue;
    box-sizing: border-box;
  }
  .control-point {
    position: absolute;
    box-sizing: border-box;
    display: inline-block;
    background: #fff;
    border: 1px solid #c0c5cf;
    box-shadow: 0 0 2px 0 rgba(86, 90, 98, 0.2);
    border-radius: 6px;
    padding: 8px;
    margin-top: -8px !important;
    margin-left: -8px !important;
    user-select: none; // 注意禁止鼠标选中控制点元素，不然拖拽事件可能会因此被中断
  }
  .control-point.point-e {
    cursor: ew-resize;
    left: 100%;
    top: 50%;
    margin-left: 1px;
  }
  .control-point.point-n {
    cursor: ns-resize;
    left: 50%;
    margin-top: -1px;
  }
  .control-point.point-s {
    cursor: ns-resize;
    left: 50%;
    top: 100%;
    margin-top: 1px;
  }
  .control-point.point-w {
    cursor: ew-resize;
    top: 50%;
    left: 0;
    margin-left: -1px;
  }
  .control-point.point-ne {
    cursor: nesw-resize;
    left: 100%;
    margin-top: -1px;
    margin-left: 1px;
  }
  .control-point.point-nw {
    cursor: nwse-resize;
    margin-left: -1px;
    margin-top: -1px;
  }
  .control-point.point-se {
    cursor: nwse-resize;
    left: 100%;
    top: 100%;
    margin-left: 1px;
    margin-top: 1px;
  }
  .control-point.point-sw {
    cursor: nesw-resize;
    top: 100%;
    margin-left: -1px;
    margin-top: 1px;
  }
  .ant-upload {
    width: 200px;
    height: 200px;
    background-color: #a0cdf7;
  }
  .ant-upload.ant-upload-select-picture-card {
    background-color: transparent;
    border: 1px dashed #fff;
    border-radius: 5%;
    margin: 20px 0 0 10px;
  }
  .anticon-plus {
    color: #fff;
  }
  .cut-modal {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 99;
  }
  .mask {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 100vw;
    height: 100vh;
    z-index: 9;
    background-color: #00000094;
  }
  .show-picture {
    display: flex;
  }
  .pre-picture {
    display: flex;
    width: 500px;
    height: 500px;
    justify-content: center;
    align-items: center;
  }
`;
