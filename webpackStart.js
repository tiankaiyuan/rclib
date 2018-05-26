/**
 * created by tiankaiyuan on 2018/5/10
 */
const webpack = require('webpack');
require('babel-polyfill');
require('babel-core/register');
const axios = require('axios');
const config = require('./webpack.config.babel').default;
const api = require('./shared/apis').default;
const logger = require('./logger')('webpack');
const commonCompPath = './server/commonComponents/';

const webpackHandle = (err, stats) => {
    if (err) {
        logger.error(err);
        return;
    }
    if (stats.hasErrors()) {
        let jsonStats = stats.toJson('errors-only'),
            target = [];
        for (let i = 0; i < jsonStats.errors.length; i++) {
            let error = jsonStats.errors[i];
            error.includes(commonCompPath) &&
            target.push(error.match(/[0-9,a-f]{24}/)[0])
        }
        target.length > 0 && axios.post(api.login, {
            tPartyAccount: 'tky2030@163.com',
            pwd: '151336'
        }).then((res) => {
            return axios.delete(api.manDelComp, {
                params: {
                    id: JSON.stringify(target),
                    uid: res.data.id,
                    token: res.data.token
                }
            })
        }).catch((err) => {
            logger.error(err)
        })

    }

    if (process.env.NODE_ENV !== 'production') {
        logger.info(stats.toString({colors: true}))
    }
};
const compiler = webpack(config);
// compiler.run(webpackHandle);

const watching = compiler.watch({ //不与run方法同时使用，watch会触发一次编译
    aggregateTimeout: 300,
    poll: 1000,//要进行查询，不然有的修改无法捕获
    ignored: /node_modules/
}, webpackHandle);
process.on('SIGINT', () => {
    watching.close(() => {
        logger.info('webpack watch closed')
    })
    process.exit()
})
process.on('exit', () => {
    logger.info('webpack exited')
})