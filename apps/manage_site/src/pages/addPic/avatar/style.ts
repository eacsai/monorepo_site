import styled from 'styled-components';

export const AvatarStyle = styled.div`
  display: flex;
  width: 100%;
  overflow: hidden;
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
    background-color: transparent;
    position: absolute;
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    border: 3px solid skyblue;
    box-sizing: border-box;
    box-shadow: 0px 0px 0px 1000px #57505066;
  }
  .drawing-item::before {
    content: '';
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    position: absolute;
    width: 100%;
    height: 30%;
    border-top: 1px solid skyblue;
    border-bottom: 1px solid skyblue;
  }
  .drawing-item::after {
    content: '';
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    position: absolute;
    width: 30%;
    height: 100%;
    border-left: 1px solid skyblue;
    border-right: 1px solid skyblue;
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
    background-color: #a0cdf7;
    width: 100px;
    height: 100px;
    overflow: hidden;
  }
  .ant-upload.ant-upload-select-picture-card {
    width: 100px;
    height: 100px;
    background-color: transparent;
    border: 1px dashed #fff;
    border-radius: 5%;
    margin: 20px 0 0 10px;
  }
  .anticon-plus {
    color: #fff;
  }
  .cut-picture {
    position: relative;
    height: 100%;
    width: 100%;
    overflow: hidden;
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
    background-color: #000000ba;
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
  .show-canvas {
    position: absolute;
    top: 0px;
    z-index: -1;
    left: 0px;
  }
  .preview {
    font-size: 24px;
  }
  .modal-wrapper {
    width: 200px;
    height: 100%;
    background: hotpink;
    overflow: hidden;
    .cut-edit-modal {
      width: 100%;
      height: 100px;
      background-color: lightblue;
    }
    .scale-modal {
      width: 100%;
      height: 100px;
      background-color: lightgreen;
    }
    .style-modal {
      width: 100%;
      height: 100px;
      background-color: hotpink;
    }
  }
  .image-item {
    width: 200px;
    height: 70px;
    margin: 10px;
    .image-content {
      display: flex;
      width: 100%;
      height: 80%;
      .image-show {
        flex: 1;
      }
      .image-text {
        display: flex;
        justify-content: center;
        align-items: center;
        flex: 2;
      }
      .image-control {
        display: flex;
        justify-content: center;
        align-items: center;
        flex: 1;
      }
    }
    .image-progress-bar {
      width: 100%;
      height: 20%;
    }
    .ant-progress {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
    }
  }
`;
