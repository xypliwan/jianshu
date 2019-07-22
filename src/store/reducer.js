import { combineReducers } from 'redux-immutable';

import { reducer as headerReducers } from './../common/header/store';
import { reducer as homeReducer } from '../pages/home/store';
import { reducer as detailReducer } from '../pages/detail/store';
 
export default combineReducers({
    header: headerReducers,
    home: homeReducer,
    detail: detailReducer
})