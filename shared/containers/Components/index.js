/**
 * Created by tiankaiyuan on 2018/3/3.
 */
import React from 'react'
import {connect}    from 'react-redux'
import {Route}       from 'react-router-dom'
import {withRouter} from 'react-router'
import SideNav from '../../components/SideNav'
import Header  from '../../components/Header'
import ContainerCom from '../../components/ContainerCom'
import Title from '../../components/Title'
import {saveComponentSize}   from '../../stateChanger/actions'
const Com = props => {
    const SN = () => <SideNav navList={props.navList}/>;
    let arr = [];
    for (let key in props.navList) {
        if (props.navList.hasOwnProperty(key)) {
            let value = props.navList[key];
            arr.push(<Route path={value.link}
                            key={key}
                            component={() => <Title
                                title={value.title || ''}
                                description={value.description || ''}>
                            </Title>}>

            </Route>);
            if (value.subNavList) {
                let subNav = value.subNavList;
                for (let k in subNav) {
                    if (subNav.hasOwnProperty(k)) {
                        arr.push(
                            <Route path={value.link + k}
                                   key={k}
                                   component={() => {
                                       const subNavCom = subNav[k];
                                       return (<ContainerCom
                                           width={64}
                                           componentId={k}
                                           author={''}
                                           saveComponentSize={props.saveComponentSize}>
                                           {/*react组件最终取得只是函数或类的内存地址，可以使用jsx理解的变量承载*/}
                                           <subNavCom.Component/>
                                       </ContainerCom>)
                                   }}/>
                        );
                    }
                }
            }
        }
    }

    return [
        <nav className="com-nav" key="com-nav">
            <SideNav navList={props.navList}/>
        </nav>,
        <main className="com-main" key="com-main">
            <link href="/test.css" type="text/css" rel="stylesheet" async="async"/>
            {
                arr
            }
            <Route path={'/components/table/dynamic'}
                   component={SN}/>
            <Route path={'/components/button/normal'}
                   component={Header}/>
        </main>
    ]
};
const ComMSTP = (state) => {
    return {
        navList: state.nav
    }
};
const ComMDTP = (dispatch) => {
    return {
        saveComponentSize: (value,id) => dispatch(saveComponentSize(value,id))

    }
};
export default withRouter(connect(ComMSTP, ComMDTP)(Com))

