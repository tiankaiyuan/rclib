/**
 * Created by tiankaiyuan on 2018/2/27.
 */
import backendApis from '../../apis'
import * as ActionTypes from './actionTypes'
export const saveComponentSize = (value, id) => (dispatch) => {
    return dispatch({
        request: {
            url: backendApis.saveComponentSize,
            method: 'get',
            params: {
                id,
                value,
            }
        },
        callback: response => {
            // dispatch(popMsg(response.msg))
        }
    })
};
export const reqStart = {type: ActionTypes.REQUEST_START};
export const reqEnd = {type: ActionTypes.REQUEST_END};
export const logout = {type: ActionTypes.LOGOUT_SUCCESS};
export const login = {type: ActionTypes.LOGIN_PAGE, isShow: true};
export const popMsg = (msg, needConfirm = false, showTime = 3000) => {
    return {
        type: ActionTypes.POP_MSG,
        msg,
        showTime,
        needConfirm
    }
};
export const popHidden = (id) => (dispatch, getState) => {
    const {popMsgs} = getState();
    dispatch({
        type: ActionTypes.POP_HIDDEN,
        id
    });
    if (popMsgs.data.length > 0) {
        dispatch({
            type: ActionTypes.POP_MSG_CACHED,
            id
        })
    }
};
export const popConfirm = (id) => {
    return {
        type: ActionTypes.POP_CONFIRM,
        id
    }
};
