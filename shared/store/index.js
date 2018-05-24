/**
 * Created by tiankaiyuan on 2018/2/27.
 */
import {createStore, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunk  from 'redux-thunk';
import httpRequest from '../reduxMiddleware/httpRequest'
import reducers      from '../../shared/stateChanger/reducers'
let middleware = [thunk, httpRequest];
if (process.env.NODE_ENV !== 'production') {
    middleware.push(createLogger());
}
export default (initState = {}) => {
    return createStore(reducers, initState, applyMiddleware(...middleware))
}