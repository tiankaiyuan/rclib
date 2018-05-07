/**
 * Created by tiankaiyuan on 2018/2/27.
 */
import * as ActionTypes from './actionTypes'

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
/*INSERT_ACTION*/