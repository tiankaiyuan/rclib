/**
 * Created by tiankaiyuan on 2018/3/9.
 */
import Http from 'http'
import Koa from 'koa'
import Cors from 'kcors'
import config from './config.js';
import './models'
import Routes from './routes'
import Logger from '../logger'
const logger = Logger('apiServer');
const App = new Koa();
const listenCallback = (protocol, port) => () => {
    logger.info('listen on ' + port + ' protocol: ' + protocol, App.env)
};
Http.createServer(App.callback())
    .listen(config.port, listenCallback('http', config.port));
App.use(Cors());
App.use(Routes);

