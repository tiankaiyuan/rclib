/**
 * Created by tiankaiyuan on 2018/3/10.
 */
import mongoose from 'mongoose';
import baseModel from './baseModel'
const Schema = mongoose.Schema;
// const Model = mongoose.model; // 不能这样使用model model函数中的this会被改变
const Component =  Schema({
    width: Number
});
Component.plugin(baseModel);

export default mongoose.model('Component',Component);