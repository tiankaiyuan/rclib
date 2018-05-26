/**
 * Created by tiankaiyuan on 2018/2/27.
 */
import {combineReducers} from 'redux'
import root from './root'
import popMsgs from './popMsgs'

export default combineReducers({
    popMsgs,
    root
});
