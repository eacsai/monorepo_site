import * as actionTypes from "./constants";
import { getPageDetail } from "@/services/home";
import { getPic } from "@/services/home";
import { getType } from "@/services/home";

const res = {
  banners: [
    "https://w.wallhaven.cc/full/k7/wallhaven-k7mwy7.jpg",
    "https://w.wallhaven.cc/full/rd/wallhaven-rdke5w.jpg",
    "https://w.wallhaven.cc/full/1k/wallhaven-1k9yv1.jpg",
    "https://w.wallhaven.cc/full/j3/wallhaven-j3m8y5.png",
  ],
  types: ["All", "Net", "Golang", "Vue"],
};
const changeHomeBannersAction = (res) => ({
  type: actionTypes.CHANGE_Home_BANNERS,
  homeBanners: res.banners,
});

const changeHomePagesAction = (res) => ({
  type: actionTypes.CHANGE_HOME_PAGES,
  homePages: res.data,
});

const changePageTypesAction = (res) => ({
  type: actionTypes.CHANGE_PAGE_TYPES,
  pageTypes: res.data,
});

const changeWorksImageAction = (res) => ({
  type: actionTypes.CHANGE_WORKS_IMAGES,
  workImages: res.data,
});
export const getHomeBannersAction = () => {
  return (dispatch) => {
    dispatch(changeHomeBannersAction(res));
  };
};

export const getHomePagesAction = () => {
  return (dispatch) => {
    getPageDetail()
      .then((res) => {
        console.log("wqw getHomePages", res);
        dispatch(changeHomePagesAction(res));
      })
      .catch((err) => console.log(err));
  };
};

export const getPageTypesAction = () => {
  return (dispatch) => {
    getType().then(res => {
      dispatch(changePageTypesAction(res));
    })
  };
};
export const getPicturesAction = () => {
  return (dispatch) => {
    getPic().then((res) => {
      dispatch(changeWorksImageAction(res));
    });
  };
};
