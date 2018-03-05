/**
 * Created by tiankaiyuan on 2018/3/1.
 */
import React from 'react'
import PropTypes from 'prop-types'
import {NavLink} from 'react-router-dom'
import SubNav    from './SubNav'
const NavList = ({navList, showSub, onClick}) => {
    let arr = [];
    for (let key in navList) {
        if (navList.hasOwnProperty(key)) {
            let value = navList[key];
            arr.push(<li key={key}>
                <NavLink to={value.link}
                         onClick={onClick(key)}>
                    {value.text}
                    <i className={"icon-angle-right " + (showSub.includes(key) ? 'icon-rotate' : '')}/>
                </NavLink>
                {
                    showSub.includes(key) && <SubNav
                        navLink={value.link}
                        subNavList={value.subNavList || {} }/>
                }
            </li>)
        }
    }
    return arr;
};
NavList.propTypes = {
    navList: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired,
    showSub: PropTypes.array.isRequired
};
export default NavList