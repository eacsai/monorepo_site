import styled from 'styled-components';

export const DragStyle = styled.div`
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
  .cut-picture {
    position: relative;
    height: 100%;
    width: 100%;
    overflow: hidden;
  }
`;
