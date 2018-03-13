/**
 * Created by tiankaiyuan on 2018/3/8.
 */
import mongoose   from 'mongoose';
import config from './config'
import Component from './component'
import Logger    from '../../logger'
const logger  = Logger('apiServer');
mongoose.connect(config.db, config.dbOption).catch(err=>console.error(err));
const mongoDb = mongoose.connection;
mongoDb.on('error',(err)=>{
    if(err){
        logger.error('there some error:',err);
        process.exit(1);
    }
});
mongoDb.once('open',()=>{
    logger.info('dataBase connected!!')
});
export  {Component}