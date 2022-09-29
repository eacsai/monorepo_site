import { Image, Input } from 'antd';
import pinyin from 'pinyin';
import { useSelector, shallowEqual } from 'react-redux';

import { memo, useEffect, useRef, useState, useCallback } from 'react';
import { ImgListStyle } from './style';
import useSize from './winSize';
export default memo(function ImgList(props) {
  const { workImages } = useSelector(
    (state) => ({
      workImages: state.getIn(['works', 'workImages'])
    }),
    shallowEqual
  );
  const { Search } = Input;
  const imgListRef = useRef();
  const [visible, setVisible] = useState(false);
  let [preImag, setPreImag] = useState([]);
  const [showList, setShowList] = useState([...workImages]);
  const [height, setHeight] = useState(0);
  const pinyinList = workImages.map((item) => {
    return pinyin(item.text, { style: 'normal' });
  });
  const size = useSize();
  useEffect(() => {
    //定义图片加载函数
    imgListRef.current.style.width = size.width * 0.66 + 'px';
    // 加载图片
    const columns = 2; // 列数
    const gap = 30; // 间隔
    // 计算每一张图片的宽度
    let itemWidth = Math.max(size.width * 0.66, 1200) / columns - gap;
    const arr = [];
    let tmpCount = 0;
    let items = Array.from(imgListRef.current.children);
    console.log('items', items);
    for (let i = 0; i < items.length; i++, tmpCount++) {
      // 获取图片元素
      const img = items[i].getElementsByTagName('img')[0];
      // 图片有缓存时直接布局(主要在窗口尺寸变化时调用)
      if (img.complete) {
        reflow(items[i], itemWidth, columns, gap, arr);
      }
      // 图片无缓存时先对加载速度快的图片进行布局
      else {
        img.addEventListener('load', () => {
          reflow(items[i], itemWidth, columns, gap, arr);
        });
      }
    }
    if (items.length === 0) {
      setHeight(0);
    }
  }, [size, workImages, showList]);

  useEffect(() => {
    imgListRef.current.style.height = height + 300 + 'px';
  }, [height, showList]);
  useEffect(() => {
    setShowList(workImages);
  }, [workImages]);
  const onSearch = (value) => {
    const keyword = value;
    if (keyword) {
      let chineseShow = [];
      let pinyinShow = [];
      let chineseShowPinyin = [];
      const chinese = /[\u4e00-\u9fa5]/g;
      const englishReg = /[A-Za-z]+/g;
      const searchChinese = keyword.match(chinese) //匹配到的中文
        ? keyword.match(chinese).reduce((pre, cur) => {
            return pre + cur;
          }, '[') + ']+'
        : '';
      const resultPinyin = [];
      const searchPinyin = keyword.match(englishReg)?.map((item) => {
        resultPinyin.push('^' + item + '.*?');
        return '^' + item + '.*?';
      });
      const chineseReg = new RegExp(searchChinese, 'g'); //中文正则
      const pinyinReg =
        searchPinyin?.map((item) => {
          return new RegExp(item, 'gi'); //英文正则
        }) ?? [];
      const allPinyin = keyword.match(englishReg) ? keyword.match(englishReg).join('') : '';
      const allPinyinReg = new RegExp(allPinyin, 'gi');
      console.log('chineseMatch', chineseReg);
      console.log('pinyinMatch', pinyinReg);
      //匹配特殊字符和数字
      const regEn = /[`~!@#$%^&*()_+<>?:"{},.;'[\]]/im,
        regCn = /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im,
        regNumber = /[0-9]+/g;
      if (regEn.test(keyword) || regCn.test(keyword) || regNumber.test(keyword)) {
        setShowList([]);
        return;
      }

      if (searchChinese) {
        for (let i = 0; i < workImages.length; i++) {
          if (
            workImages[i].text.match(chineseReg) &&
            workImages[i].text.match(chineseReg)[0]?.length >= keyword.match(chinese)?.length
          ) {
            chineseShow = [...chineseShow, workImages[i]];
            chineseShowPinyin = [...chineseShowPinyin, workImages[i]];
          }
        }
      }
      console.log('chineseShow', chineseShow);
      console.log('pinyinkeyword', pinyin(keyword, { style: 'normal' }).join(''));
      if (pinyinReg.length) {
        console.log('has pinyin');
        if (!chineseShow.length) {
          //没有汉字
          console.log(111);
          if (searchChinese) {
            //出现错误的汉字
            console.log(222);
            pinyinShow = [];
          } else {
            for (let i = 0; i < pinyinList.length; i++) {
              if (pinyinList[i].join('').match(allPinyinReg)) {
                pinyinShow = [...pinyinShow, workImages[i]];
              } else {
                let tmp = true;
                for (let j = 0; j < pinyinList[i].flat().length; j++) {
                  if (keyword[j] !== pinyinList[i].flat()[j][0]) {
                    tmp = false;
                  }
                }
                if (tmp) {
                  pinyinShow = [...pinyinShow, workImages[i]];
                }
              }
            }
          }
        } else {
          //有汉字
          for (let i = 0; i < chineseShowPinyin.length; i++) {
            const newArray = chineseShowPinyin[i]
              .reduce((pre, cur) => [...pre, ...cur], [])
              .filter((item) => {
                return (
                  pinyin(keyword.match(chinese).join(''), { style: 'normal' })
                    .reduce((pre, cur) => [...pre, ...cur], [])
                    .indexOf(item) === -1
                );
              });
            console.log('newArray', newArray); //把汉字的部分干掉
            if (!newArray.length) {
              pinyinShow = [...pinyinShow, chineseShow[i]];
            } else if (searchPinyin.length === 1) {
              if (newArray.join('').match(keyword.match(englishReg))) {
                pinyinShow = [...pinyinShow, chineseShow[i]];
              }
            } else {
              console.log('searchPinyin', searchPinyin);
              const tmpArray = searchPinyin.map((item) => {
                let tmpFlag = false;
                for (let i = 0; i < newArray.length; i++) {
                  if (newArray[i].match(item)) {
                    newArray.splice(i, 1);
                    tmpFlag = true;
                    break;
                  }
                }
                return tmpFlag;
              });
              if (!tmpArray.includes(false)) {
                pinyinShow = [...pinyinShow, chineseShow[i]];
              }
            }
          }
        }
        setShowList(pinyinShow);
      } else if (!searchChinese) {
        setShowList([]);
      } else {
        setShowList(chineseShow);
      }
    } else {
      setShowList(workImages);
    }
  };

  const reflow = (el, itemWidth, columns, gap, arr) => {
    el.style.width = itemWidth + 'px';
    console.log('start reflow');
    // 第一行
    if (arr.length < columns) {
      el.style.top = 0;
      el.style.left = (itemWidth + gap) * arr.length + 'px';
      arr.push(el.offsetHeight);
      setHeight(Math.min(...arr));
    }
    // 其他行
    else {
      // 最小的列高度
      const minHeight = Math.min(...arr);
      // 当前高度最小的列下标
      const index = arr.indexOf(minHeight);
      el.style.top = minHeight + gap + 'px';
      el.style.left = (itemWidth + gap) * index + 'px';
      arr[index] = arr[index] + el.offsetHeight + gap;
      setHeight(Math.max(...arr));
    }
  };
  return (
    <ImgListStyle>
      <div className="works-img">
        <div className="img-text">Inno's Blog</div>
        <div className="img-subtext">Welcome to My World</div>
        <Search
          placeholder="input search text"
          allowClear
          onSearch={onSearch}
          style={{ width: 800 }}
          size="large"
        />
      </div>
      <div className="container" ref={imgListRef}>
        {showList &&
          showList.map((item, index) => {
            return (
              <div className="box">
                <figure className="sample">
                  <img
                    src={item.picUrl}
                    className="work-list"
                    key={index}
                    alt=""
                    // style={styles[index]}
                    onClick={function () {
                      setPreImag(workImages.slice(index));
                      preImag = workImages.slice(index).concat(workImages.slice(0, index));
                      setVisible(true);
                    }}
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
      <div style={{ display: 'none' }}>
        <Image.PreviewGroup preview={{ visible, onVisibleChange: (vis) => setVisible(vis) }}>
          {preImag.map((item, index) => {
            return <Image src={item.picUrl} />;
          })}
        </Image.PreviewGroup>
      </div>
    </ImgListStyle>
  );
});
