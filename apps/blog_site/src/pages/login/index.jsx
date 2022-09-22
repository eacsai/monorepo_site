import { memo, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Avatar from "./c-cpns/avatar/index";
import { LoginStyle } from "./style.js";
import { useParams } from "react-router-dom";
import { getSignAction, getLoginAction } from "./store/actionCreators";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import Error from "./c-cpns/error/index";

export default memo(function Login(props) {
  const [show, setShow] = useState(false);
  const [name, setName] = useState(null);
  const [hidePassword, setHidePassword] = useState(false);
  const [avatarImg, setAvatarImg] = useState(null);
  const [password1, setPassword1] = useState(null);
  const [password2, setPassword2] = useState(null);
  const [errMsgHide, setErrMsgHide] = useState(true);
  const [errMsg, setErrMsg] = useState("");
  const [name0, setName0] = useState(null);
  const [password0, setPassword0] = useState(null);
  const dispatch = useDispatch();
  const params = useParams();
  const sign = () => {
    if (!(name && password1 && password2 && avatarImg)) {
      console.log("输入不能为空");
      setErrMsg("输入不能为空");
      setErrMsgHide(false);
      return null;
    }
    if (name.length < 3) {
      setErrMsgHide(false);
      return null;
    }
    var regex = new RegExp(
      "(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[^a-zA-Z0-9]).{8,30}"
    );
    if (!regex.test(password1)) {
      setErrMsg(
        "密码中必须包含大小字母、数字、特称字符，至少8个字符，最多30个字符。"
      );
      setErrMsgHide(false);
      return;
    }
    if (password2 !== password1) {
      setErrMsg("确认密码与输入密码不一致");
      setErrMsgHide(false);
      return;
    }
    dispatch(getSignAction(name, password1, password2, avatarImg))
      .then(() => {
        window.history.back();
      })
      .catch((err) => {
        console.log(err.message);
        setErrMsg(err);
        setErrMsgHide(false);
      });
  };
  const login = () => {
    dispatch(getLoginAction(name0, password0))
      .then(() => {
        window.history.back();
      })
      .catch((err) => {
        console.log("wqw err", err.message);
      });
  };
  const errHide = (bool) => {
    setErrMsgHide(bool);
  };
  useEffect(() => {
    if (params.switch === "login") {
      setShow(false);
    } else if (params.switch === "signin") {
      setShow(true);
    }
  }, [params]);

  return (
    <LoginStyle>
      {!errMsgHide && <Error errMsg={errMsg} errHide={errHide}></Error>}
      <div className="color"></div>
      <div className="color"></div>
      <div className="color"></div>
      <div className="box">
        <div className="circle" color="0"></div>
        <div className="circle" color="1"></div>
        <div className="circle" color="2"></div>
        <div className="circle" color="3"></div>
        <div className="circle" color="4"></div>
        <div className={`turn ${show === true ? "active" : ""} `}>
          <div className={`over`}>
            <div className={`form ${show === true ? "swi" : ""} `}>
              <h2>登陆</h2>
              <form>
                <div className="inputBox">
                  <input
                    type="password"
                    placeholder="账号"
                    onChange={(e) => {
                      setName0(e.target.value);
                    }}
                  ></input>
                  <span className="hide-password"></span>
                </div>
                <div className="inputBox">
                  <input
                    type={hidePassword ? "password" : "text"}
                    placeholder="密码"
                    onChange={(e) => {
                      setPassword0(e.target.value);
                    }}
                  ></input>
                  <span
                    className="hide-password"
                    onClick={() => setHidePassword((c) => !c)}
                  >
                    {hidePassword && <AiFillEyeInvisible />}
                    {!hidePassword && <AiFillEye />}
                  </span>
                </div>
                <div className="inputBox">
                  <div onClick={login}>{"登陆"}</div>
                </div>
              </form>
            </div>
            <div className={`form sign ${show === false ? "swi" : ""} `}>
              <h2>注册</h2>
              <form>
                <div className="inputBox">
                  <input
                    type="text"
                    placeholder="账号"
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  ></input>
                  <span className="hide-password"></span>
                </div>
                <div className="inputBox">
                  <input
                    type={hidePassword ? "password" : "text"}
                    placeholder="密码"
                    onChange={(e) => {
                      setPassword1(e.target.value);
                    }}
                  ></input>
                  <span
                    className="hide-password"
                    onClick={() => setHidePassword((c) => !c)}
                  >
                    {hidePassword && <AiFillEyeInvisible />}
                    {!hidePassword && <AiFillEye />}
                  </span>
                </div>
                <div className="inputBox">
                  <input
                    type={hidePassword ? "password" : "text"}
                    placeholder="确认密码"
                    onChange={(e) => {
                      setPassword2(e.target.value);
                    }}
                  ></input>
                  <span
                    className="hide-password"
                    onClick={() => setHidePassword((c) => !c)}
                  >
                    {hidePassword && <AiFillEyeInvisible />}
                    {!hidePassword && <AiFillEye />}
                  </span>
                </div>
                <Avatar setAvatarImg={setAvatarImg} />
                <div className="inputBox">
                  <div onClick={sign}>{"注册"}</div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <input type="checkbox" style={{ display: "none" }} id="change"></input>
        <button
          className="change"
          onClick={() => {
            setShow(!show);
          }}
        >
          切换
        </button>
      </div>
    </LoginStyle>
  );
});
