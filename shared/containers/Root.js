/**
 * Created by tiankaiyuan on 2018/2/27.
 */
import React from 'react'
//使用babel-plugin-transform-require-ignore 这个插件后 被忽略的文件类型，不能以变量的形式引入，这种形式是不行的import xx from './root.less'
import  './root.less';
export default ()=>{
    return (<div className="root-component">
        hello world
    </div>)
}