import React, { useState, useRef, useCallback, useMemo, forwardRef, useImperativeHandle } from 'react';
import { DragStyle } from './style';

const RefDrag = (props: any) => {
  const { Picture, Canvas, dragEnd, myRef } = props;
  const isDown = useRef(false);
  const direction = useRef<any>();
  const [style, setStyle] = useState<any>({
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  });
  const oriPos = useRef({
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    cX: 0, // 鼠标的坐标
    cY: 0
  });
  useImperativeHandle(myRef, () => ({
    getStyle() {
      return style;
    }
  }));
  const transform = (direction: any, oriPos: any, e: any) => {
    const style = { ...oriPos.current };
    const offsetX = e.clientX - oriPos.current.cX;
    const offsetY = e.clientY - oriPos.current.cY;
    let newStyle;
    console.log('===', direction);
    //获取canvas内部图片宽高
    switch (direction.current) {
      // 拖拽移动
      case 'move':
        style.top += offsetY;
        style.bottom -= offsetY;
        style.right -= offsetX;
        style.left += offsetX;
        newStyle = {
          top: Math.min(Math.max(style.top, 0), oriPos.current.top + oriPos.current.bottom),
          bottom: Math.min(Math.max(style.bottom, 0), oriPos.current.bottom + oriPos.current.top),
          right: Math.min(Math.max(style.right, 0), oriPos.current.right + oriPos.current.left),
          left: Math.min(Math.max(style.left, 0), oriPos.current.right + oriPos.current.left)
        };
        break;
      // 东
      case 'e':
        // 向右拖拽添加宽度
        style.right -= offsetX;
        break;
      // 西
      case 'w':
        // 增加宽度、位置同步左移
        style.left += offsetX;
        break;
      // 南
      case 's':
        style.bottom -= offsetY;
        break;
      // 北
      case 'n':
        style.top += offsetY;
        break;
      // 东北
      case 'ne':
        style.right -= offsetX;
        style.top += offsetY;
        break;
      // 西北
      case 'nw':
        style.left += offsetX;
        style.top += offsetY;
        break;
      // 东南
      case 'se':
        style.right -= offsetX;
        style.bottom -= offsetY;
        break;
      // 西南
      case 'sw':
        style.left += offsetX;
        style.bottom -= offsetY;
        break;
    }
    if (!newStyle) {
      newStyle = {
        top: Math.max(style.top, 0),
        bottom: Math.max(style.bottom, 0),
        right: Math.max(style.right, 0),
        left: Math.max(style.left, 0)
      };
    }
    return newStyle;
  };
  const onMouseMove = (e: any) => {
    if (!isDown.current) return;
    // 判断鼠标是否按住
    const newStyle = transform(direction, oriPos, e);
    setStyle(newStyle);
  };
  const handleDragEnd = () => {
    isDown.current = false;
    dragEnd();
  };
  const handleDragStart = useCallback(
    (dir: any, e: any) => {
      const img = new Image();
      img.src = '';
      // 阻止事件冒泡
      e.stopPropagation();
      // 保存方向。
      direction.current = dir;
      isDown.current = true;
      // 然后鼠标坐标是
      const cY = e.clientY; // clientX 相对于可视化区域
      const cX = e.clientX;
      oriPos.current = {
        ...style,
        cX,
        cY
      };
    },
    [style]
  );
  const points = useMemo(() => ['e', 'w', 's', 'n', 'ne', 'nw', 'se', 'sw'], []);

  return (
    <DragStyle>
      <div
        className="cut-picture"
        onMouseMove={onMouseMove}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
      >
        {Picture}
        <div className="drawing-item" onMouseDown={(e) => handleDragStart('move', e)} style={style}>
          {points.map((item, index) => (
            <div
              key={index}
              onMouseDown={(e) => handleDragStart(item, e)}
              className={`control-point point-${item}`}
            ></div>
          ))}
        </div>
        {Canvas}
      </div>
    </DragStyle>
  );
};
export const Drag = forwardRef((props: any, ref) => {
  console.log('ref', ref);
  return <RefDrag {...props} myRef={ref} />;
});
Drag.displayName = 'Drag';
