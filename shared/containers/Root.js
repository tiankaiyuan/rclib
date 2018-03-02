/**
 * Created by tiankaiyuan on 2018/2/27.
 */
import React from 'react'
import {connect}    from 'react-redux'
//由connect封装的路由组件，有可能无法改变路由状态(地址栏改变，组件不响应，activeClassName无效)，要使用withRouter
import {withRouter} from 'react-router'
//使用babel-plugin-transform-require-ignore 这个插件后 被忽略的文件类型，不能以变量的形式引入，这种形式是不行的import xx from './root.less'
import  './root.less';
import '../assets/font/css/fontello.css'
import SideNav from '../components/SideNav'
const Root = (props) => {
    return (<div className="root-component">
        <header>

        </header>
        <nav>
            <SideNav navList={props.navList} subNavList={props.subNavList}/>
        </nav>
        <main>

        </main>
        <footer></footer>
    </div>)
};
const RootMSPT = (state)=>{
    return {
        navList: state.nav.navList,
        subNavList: state.nav.subNavList
    }
};
export default withRouter(connect(RootMSPT)(Root));