/**
 * Created by tiankaiyuan on 2018/2/27.
 */
import {combineReducers} from 'redux'
import button      from './button'
import nav     from './nav'
import popMsgs  from './popMsgs'

export default combineReducers({
    button,
    nav,
    popMsgs
});