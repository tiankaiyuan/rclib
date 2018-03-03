/**
 * Created by tiankaiyuan on 2018/3/2.
 */
import React from 'react'
import Logo  from './Logo'
import TopNav from './TopNav'
import './index.less'
export default () => {
    return [
        <Logo key="logo"/>,
        <TopNav key="topNav"/>
    ]
}