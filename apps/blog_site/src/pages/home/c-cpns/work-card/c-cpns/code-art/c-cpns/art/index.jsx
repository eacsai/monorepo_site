import React, { memo, useState, useEffect, useRef } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { ArtStyle } from "./style";
import useSize from "./useSize";

export default memo(function Art() {
  const { workImages } = useSelector(
    (state) => ({
      workImages: state.getIn(["home", "homeWorks"]),
    }),
    shallowEqual
  );
  const imgListRef = useRef();
  const [height, setHeight] = useState(0);
  const size = useSize();
  useEffect(() => {
    //定义图片加载函数
    imgListRef.current.style.width = size.width * 0.6 + "px";
    // 加载图片
    const columns = 2; // 列数
    const gap = 30; // 间隔
    // 计算每一张图片的宽度
    let itemWidth = size.width * 0.6 / columns - gap;
    const arr = [];
    let tmpCount = 0;
    let items = Array.from(imgListRef.current.children);
    for (let i = 0; i < items.length; i++, tmpCount++) {
      // 获取图片元素
      const img = items[i].getElementsByTagName("img")[0];
      // 图片有缓存时直接布局(主要在窗口尺寸变化时调用)
      if (img.complete) {
        reflow(items[i], itemWidth, columns, gap, arr);
      }
      // 图片无缓存时先对加载速度快的图片进行布局
      else {
        img.addEventListener("load", () => {
          reflow(items[i], itemWidth, columns, gap, arr);
        });
      }
    }
  }, [size, workImages]);

  useEffect(() => {
    imgListRef.current.style.height = height + 70 + "px";
  }, [height]);

  const reflow = (el, itemWidth, columns, gap, arr) => {
    el.style.width = itemWidth + "px";
    // 第一行
    if (arr.length < columns) {
      el.style.top = 0;
      el.style.left = (itemWidth + gap) * arr.length + "px";
      arr.push(el.offsetHeight);
      setHeight(Math.max(...arr))
    }
    // 其他行
    else {
      // 最小的列高度
      const minHeight = Math.min(...arr);
      // 当前高度最小的列下标
      const index = arr.indexOf(minHeight);
      el.style.top = minHeight + gap + "px";
      el.style.left = (itemWidth + gap) * index + "px";
      arr[index] = arr[index] + el.offsetHeight + gap;
      setHeight(Math.max(...arr));
    }
  };
  console.log("showList", workImages?.slice(0, 5));
  return (
    <ArtStyle>
      {/* {workImages?.slice(0, 1).map((item, index) => {
        return (
          <img
            src={item.picUrl}
            alt=""
            key={index}
            className="work-list"
          ></img>
        );
      })} */}
      <div className="container" ref={imgListRef}>
        {workImages &&
          workImages.slice(0, 5).map((item, index) => {
            return (
              <div className="box">
                <figure className="sample">
                  <img
                    src={item.picUrl}
                    className="work-list"
                    key={index}
                    alt=""
                  ></img>
                  <div className="tt">
                    <div className="title">
                      <h2 className="type">11{item.type}</h2>
                    </div>
                    <figcaption>
                      <p>{item.text}</p>
                    </figcaption>
                  </div>
                </figure>
              </div>
            );
          })}
      </div>
    </ArtStyle>
  );
});
