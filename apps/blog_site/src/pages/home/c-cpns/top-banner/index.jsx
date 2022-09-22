import React, { memo, useRef, useEffect } from "react";
import { Carousel } from "antd";
import { useDispatch, useSelector, shallowEqual } from "react-redux";

import {BannerWrapper,Container} from './style';
import {
  getHomeBannersAction,
} from "../../store/actionCreators.js";

export default memo(function TopBanner() {
  const bannerRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getHomeBannersAction());
  }, [dispatch]);

  const { homeBanners} = useSelector(
    (state) => ({
      homeBanners: state.getIn(["home", "homeBanners"]),
    }),
    shallowEqual
  );

  return (
    <div>
      <BannerWrapper>
        <div className="top-title">
          <div className="title1">Inno</div>
          <div className="title2">BLOG</div>
        </div>
        <div className="left-direction">
          <button
            className="prev"
            onClick={(e) => bannerRef.current.prev()}
          ></button>
          <button
            className="next"
            onClick={(e) => bannerRef.current.next()}
          ></button>
        </div>
        <Carousel dots={false} autoplay ref={bannerRef}>
          {homeBanners.map((item, index) => {
            return <Container img={item} key={index} />;
          })}
        </Carousel>
      </BannerWrapper>
    </div>
  );
});
