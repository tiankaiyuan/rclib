/**
 * Created by tiankaiyuan on 2018/3/1.
 */
import React from 'react'
import PropTypes from 'prop-types'
import {NavLink} from 'react-router-dom'
import SubNav    from './SubNav'
const NavList = ({navList, subNavList, showSub, onClick}) => {
    return navList.map((value, index) => {
        return (<li key={index}>
            <NavLink to={value.link}
                     onClick={onClick(index)}>
                {value.text}
                <i className={"icon-angle-right " + (showSub.includes(index) ? 'icon-rotate' : '')}/>
            </NavLink>
            {
                showSub.includes(index) && <SubNav subNavList={subNavList}/>
            }
        </li>)

    });
};
NavList.propTypes = {
    navList: PropTypes.array.isRequired,
    onClick: PropTypes.func.isRequired,
    showSub: PropTypes.array.isRequired
};
export default NavList