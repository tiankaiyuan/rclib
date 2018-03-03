/**
 * Created by tiankaiyuan on 2018/3/2.
 */
import React from 'react'
import {NavLink} from 'react-router-dom'
export default () => {
    return (<nav className="topNav">
        <NavLink to={'/'}>首页</NavLink>
        <NavLink to={'/components'} activeClassName={'selected'}>组件</NavLink>
        <NavLink to={'/combination'} activeClassName={'selected'}>组合</NavLink>
        <a href={'https://github.com/tiankaiyuan/rclib.git'}>GitHub</a>
    </nav>)
}