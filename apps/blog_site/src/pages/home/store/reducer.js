import { Map } from 'immutable';

import * as actionTypes from './constants';

const defaultState = Map({
  homeBanners: [],
  homeWorks: [],
  homePages: [],
  pageTypes: [],
});

function reducer(state = defaultState, action) {
  switch (action.type) {
    case actionTypes.CHANGE_Home_BANNERS:
      return state.set("homeBanners", action.homeBanners);
    case actionTypes.CHANGE_WORKS_IMAGES:
      return state.set("homeWorks", action.workImages);
    case actionTypes.CHANGE_HOME_PAGES:
      return state.set("homePages", action.homePages);
    case actionTypes.CHANGE_PAGE_TYPES:
      return state.set("pageTypes", action.pageTypes);
    default:
      return state;
  }
}

export default reducer;
