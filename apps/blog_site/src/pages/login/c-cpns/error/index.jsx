import React, { memo } from "react";
import { ErrStyle } from "./style";
export default memo(function Error(props) {
  const { errMsg = "err",errHide} = props;
  return (
    <ErrStyle>
        <div className="wrap">
          <div className="err-wrap">
            <div className="container">
              <p>err message</p>
              <div className="err-text">{errMsg}</div>
            </div>
          </div>
        </div>
        <div
          className="mask"
          onClick={()=>{
            errHide(true)
          }}
        ></div>
    </ErrStyle>
  );
});
