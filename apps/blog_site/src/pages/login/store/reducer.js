import { Map } from "immutable";

import * as actionTypes from "./constants";
let data = sessionStorage.getItem('loginData')?JSON.parse(sessionStorage.getItem('loginData')):'';
let msg = sessionStorage.getItem('loginMsg')?JSON.parse(sessionStorage.getItem('loginMsg')):'';

const defaultState = Map({
  data,
  msg,
});

function reducer(state = defaultState, action) {
  switch (action.type) {
    case actionTypes.SIGN_SUCCESS:
      sessionStorage.setItem('loginData', JSON.stringify(action.data));
      return state.set("data", action.data);
    case actionTypes.SIGN_FAILURE:
      sessionStorage.setItem('loginMsg', JSON.stringify(action.msg));
      return state.set("msg", action.msg);
    case actionTypes.LOGIN_SUCCESS:
      sessionStorage.setItem('loginData', JSON.stringify(action.data));
      return state.set("data", action.data);
    case actionTypes.LOGIN_FAILURE:
      sessionStorage.setItem('loginMsg', JSON.stringify(action.msg));
      return state.set("msg", action.msg)
    default:
      return state;
  }
}

export default reducer;
