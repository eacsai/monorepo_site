import React, { memo } from "react";
import { NavLink } from "react-router-dom";
import { HeaderWrapper } from "./style.js";
import { headerLinks } from "../../common/local-data";

export default memo(function AppHeader() {
  return (
    <div>
      <HeaderWrapper>
        <div className="header">
          {headerLinks.map((item, index) => {
            return (
              <div className="container">
                <div className="wrap-content">
                  <NavLink className="content" to={item.link}>
                    {item.title}
                  </NavLink>
                </div>
              </div>
            );
          })}
        </div>
      </HeaderWrapper>
    </div>
  );
});
