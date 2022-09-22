import React, { memo, useEffect } from "react";
import TopBanner from "../home/c-cpns/top-banner";
import { PagesAllStyle } from "./style";
import { Outlet } from "react-router-dom";
import AppFooter from "../../components/App-footer";
export default memo(function Pages(props) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <PagesAllStyle>
      <TopBanner />
        <Outlet />
      <AppFooter />
    </PagesAllStyle>
  );
});
