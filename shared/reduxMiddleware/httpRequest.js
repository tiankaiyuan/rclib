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
    console.log(progress, 'download progress!');
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
            if (res.data.code) {
                store.dispatch(popMsg(res.data.msg));
                if (res.data.code === 401) { //未登录
                    store.dispatch(logout);
                }
                return;
            }
            action.callback && action.callback(res.data);
        })
        .catch(err => {
            if (process.env.BROWSER) {
                if (process.env.NODE_ENV !== 'production') {
                    store.dispatch(popMsg(err));
                } else {
                    store.dispatch(popMsg('网络错误，稍后再试'));
                }
                // store.dispatch(popMsg(err.toString()));
                return;
            }
            console.log('request has some error: ', err);
        });
}
