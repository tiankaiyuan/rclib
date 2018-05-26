/**
 * Created by tiankaiyuan on 2017/8/2.
 */
import axios  from 'axios'
import {
    popMsg,
    reqEnd,
    reqStart,
    logout,
    login
} from '../stateChanger/actions'
const request = axios.create({timeout: 15000});
const onUploadProgress = progress => {
};
const onDownloadProgress = progress => {
};
export default store => next => action => {
    if (!action.request) {
        return next(action)
    }
    if (action.needLogin) {
        const {userInfo} = store.getState();
        if (!userInfo.isLogin) {
            return store.dispatch(login)
        }
    }
    store.dispatch(reqStart);
    return request
        .request({
            ...action.request,
            onDownloadProgress,
            onUploadProgress
        })
        .then((res) => {
            store.dispatch(reqEnd);
            action.callback && action.callback(res.data);
        })
        .catch(error => {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                let res = error.response;
                store.dispatch(popMsg(res.data.msg || res.data));
                if (res.status === 401) { //未登录
                    store.dispatch(logout);
                }
                if (res.status === 404) {
                    store.dispatch(popMsg(res.data.msg || res.data || '这项功能还未实现'));
                }
                if (res.status === 500) {
                    store.dispatch(popMsg(res.data.msg || res.data || '服务器出错，请稍后再试'));
                }
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                store.dispatch(popMsg('网络错误，稍后再试'));
            } else {
                // Something happened in setting up the request that triggered an Error
                store.dispatch(popMsg(error.message));
            }
            throw error
        });
}
