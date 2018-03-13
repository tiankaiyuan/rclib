/**
 * Created by tiankaiyuan on 2018/3/12.
 */
const getAppenders = () => {
    if (process.env.NODE_ENV !== 'production') {
        return ['log', 'out']
    } else {
        return ['log']
    }
};
let config = {
    pm2: true, //设置说明log4js 是在pm2下使用，否则日志无效
    appenders: {
        out: {
            type: 'stdout'
        },
        log: {
            type: "file",
            filename: "./log/log.log",
            maxLogSize: 1048576,
            backups: 3
        }
    },
    categories: { // 通过配置这个属性进行分类，getLogger 未命中目标时，使用默认，appenders是同时触发的
        default: {
            appenders: getAppenders(),
            level: "info"
        },
        apiServer: {
            appenders: getAppenders(),
            level: 'info'
        },
        appServer: {
            appenders: getAppenders(),
            level: 'info'
        }
    }
};


export default config