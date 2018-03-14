/**
 * Created by tiankaiyuan on 2018/2/27.
 */
import Http from 'http'
import Koa from 'koa'
import koaStatic from 'koa-static'
import Logger    from '../logger'
import config from './config.js';
import sRender from './srender'
const logger = Logger('appServer');
const App = new Koa();
const listenCallback = (protocol, port) => () => {
    logger.info('listen on ' + port + ' protocol: ' + protocol, App.env);
};
Http.createServer(App.callback())
    .listen(config.port,listenCallback('http',config.port));

App.use(sRender);
App.use(koaStatic('./dist'));
