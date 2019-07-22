import * as actionTypes from './actionTypes'
import axios from 'axios';
import { fromJS } from 'immutable';

const changHomeData = (result)=>({
    type:actionTypes.CHANGE_HOME_DATA,
    articList:result.articList,
    recomendList:result.recomendList,
    topicList:result.topicList
})

const addHomeList = (list,nextPage)=>({
    type:actionTypes.ADD_ARTIC_LIST,
    list:fromJS(list),
    nextPage
})

export const getHomeInfo = () =>{
    return (dispatch)=>{
        axios.get('/api/home.json').then((res)=>{
            const result = res.data.data;
            const action = changHomeData(result)
            dispatch(action);
        }).catch(error=>{

        })
    }
}

export const getMoreList = (page) =>{
    return (dispatch)=>{
        axios.get('/api/homeList.json?page='+page).then((res)=>{
            const result = res.data.data;
            const action = addHomeList(result.list,page+1)
            dispatch(action);
        }).catch(error=>{

        })
    }
}

export const toggleTopShow = (show)=>({
    type:actionTypes.TOGGLE_SHOW,
    show
})