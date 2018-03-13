/**
 * Created by tiankaiyuan on 2018/3/8.
 */
const log4 = require('log4js');
import config from './config'
// logger.trace('Entering cheese testing');
// logger.debug('Got cheese.');
// logger.info('Cheese is Gouda.');
// logger.warn('Cheese is quite smelly.');
// logger.error('Cheese is too ripe!');
// logger.fatal('Cheese was breeding ground for listeria.');
export default (name) => {
    log4.configure(config);
    const logger = log4.getLogger(name);
    if (process.env.NODE_ENV !== 'production') {
        logger.level = 'debug';
    }
    return logger;
}