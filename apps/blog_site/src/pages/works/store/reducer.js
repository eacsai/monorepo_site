import { Map } from 'immutable';

import * as actionTypes from './constants';

const defaultState = Map({
  workImages: [],
});

function reducer(state = defaultState, action) {
  switch (action.type) {
    case actionTypes.CHANGE_WORKS_IMAGES:
      return state.set("workImages", action.workImages);
    default:
      return state;
  }
}

export default reducer;
