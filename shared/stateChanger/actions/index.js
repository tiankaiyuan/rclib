/**
 * Created by tiankaiyuan on 2018/2/27.
 */
import * as ActionTypes from './actionTypes'
export const reqError=(msg)=> {
    return {
        type: ActionTypes.REQ_ERROR,
        msg
    }
};
export const reqStart = {
    type: ActionTypes.REQ_START
}
export const reqEnd = {
    type: ActionTypes.REQ_END
}
/*INSERT_ACTION*/