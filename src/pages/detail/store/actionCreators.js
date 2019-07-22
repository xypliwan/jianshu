import axios from 'axios';
import * as actionTypes from './actionTypes'

const changeDetail = (title,content)=> ({
    type:actionTypes.CHANGE_DETAIL,
    title,
    content
})
export const getDetail = (id) =>{
    return (dispatch) => {
        // axios.get(?id=id)...
        const result = {
            title:'33123发士大夫反倒是',
            content:'33123发士大夫反倒是'
        }
        dispatch(changeDetail(result.title,result.content))
    }
}