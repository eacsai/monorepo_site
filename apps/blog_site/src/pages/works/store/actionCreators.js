import * as actionTypes from "./constants";
import { getPic } from '@/services/home';

const changeWorksImageAction = (res) => ({
  type: actionTypes.CHANGE_WORKS_IMAGES,
  workImages: res.data
});

export const getPageTypesAction = () => {
  return (dispatch) => {
    getPic().then(res => {
      dispatch(changeWorksImageAction(res));
    })
  };
};
