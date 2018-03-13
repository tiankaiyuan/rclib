/**
 * Created by tiankaiyuan on 2018/3/9.
 */
let dbOption = {
        keepAlive: 1, //防止自动断开连接
        connectTimeoutMS: 30000,
        reconnectTries: 30,
        reconnectInterval: 5000
    },
    devConfig = {
        db: 'mongodb://localhost/test',
        dbOption,
    },
    config = {
        db: '',
        dbOption,
    };
if (process.env.NODE_ENV !== 'production') {
    config = devConfig
}
export default config;
