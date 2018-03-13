/**
 * Created by tiankaiyuan on 2017/8/2.
 */
let port = 8989,
    hostname = 'localhost',
    protocol = 'http:';
if (process.env.NODE_ENV !== 'production') {
} else {
    port = 447;
    hostname = 'codingzx.cn';
    protocol = 'https:';
}

if (process.env.BROWSER) {
    port = location.port < 90 ? location.port : 8989;
    hostname = location.hostname;
    protocol = location.protocol;
}
let url = protocol + '//' + hostname + ':' + port + '/api/';

let apis = {
    saveComponentSize: url + 'saveComponentSize',
    oneMsg: url + 'oneMsg',
    authorMsgs: url + 'authorMsgs',
    content: url + 'content',
    collect: url + 'collect',
    collections: url + 'collections',
    resetPassword: url + 'resetPassword',
    leaveMsg: url + 'leaveMsg',
    deleteCollected: url + 'deleteCollected',
    comments: url + 'comments',
    comment: url + 'comment',
    thumbUp: url + 'thumbUp',
    thumbUps: url + 'thumbUps',
    questions: url + 'questions',
    ads: url + 'ads',
    userInfo: url + 'userInfo',
    bindAccount: url + 'bindAccount',
    unbindAccount: url + 'unbindAccount',
    changePassword: url + 'changePassword',
    register: url + 'register',
    login: url + 'login',
    authGitHub: url + 'auth/github',
    authWeChat: url + 'auth/wechat',
};
export default apis