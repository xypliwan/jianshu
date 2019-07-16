import * as actionTypes from './actionTypes'
import axios from 'axios';
import { fromJS } from 'immutable';

const changeList = (data) =>({
    type: actionTypes.CHANGE_LIST,
    //吧data数据类型，变成immutable类型!!!!!!
    data: fromJS(data),
    totalPage: Math.ceil(data.length / 5)     
})

export const searchFocus = () =>({
    type: actionTypes.SEARCH_FOCUS
})

export const searchBlur = () =>({
    type: actionTypes.SEARCH_BLUR
})



export const getList = () => {
    return (dispatch) => {
        axios.get('/api/headerList.json').then((res)=>{
            dispatch(changeList(res.data.data))
        }).catch(error=>{
            console.log(error)
        })
        
    }
}

export const mouseEnter = () =>({
    type: actionTypes.MOUSE_ENTER
})

export const handleLeave = () =>({
    type: actionTypes.MOUSE_LEAVE
})

export const handChangePage = (page) =>({
    type: actionTypes.CHANGE_PAGE,
    page
})