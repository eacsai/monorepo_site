import { combineReducers } from 'redux-immutable';

import {reducer as HomeReducer } from '@/pages/home/store';
import {reducer as WorksRecorder } from '@/pages/works/store';
import {reducer as LoginReducer} from '@/pages/login/store';


const cReducer = combineReducers({
  home: HomeReducer,
  works: WorksRecorder,
  login: LoginReducer,
});

export default cReducer;