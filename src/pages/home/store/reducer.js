import {
    fromJS
} from 'immutable';
import * as actionTypes from './actionTypes'

const defaultState = fromJS({
    topicList: [],
    articList: [],
    recomendList:[],
    page:1,
    showScroll:false
});

export default (state = defaultState, action) => {
    switch (action.type) {
        case actionTypes.CHANGE_HOME_DATA:
            return state.merge({
                topicList:fromJS(action.topicList),
                articList:fromJS(action.articList),
                recomendList:fromJS(action.recomendList),
            })
        case actionTypes.ADD_ARTIC_LIST:
            return state.merge({
                articList:state.get('articList').concat(action.list),
                page:action.nextPage
            })
        case actionTypes.TOGGLE_SHOW:
            return state.set('showScroll',action.show)
        default:
            return state;
    }
    // return state;
}