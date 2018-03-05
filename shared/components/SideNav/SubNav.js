/**
 * Created by tiankaiyuan on 2018/3/1.
 */
import React from 'react'
import PropTypes from 'prop-types'
import {NavLink} from 'react-router-dom'
const SubNav = ({subNavList, navLink}) => {
    let arr = [];
    for (let key in subNavList) {
        if (subNavList.hasOwnProperty(key)) {
            let value = subNavList[key];
            arr.push(<li key={key}>
                <NavLink to={navLink + value.id}
                         activeClassName={'subNavSelected'}>
                    {value.text}
                </NavLink>
            </li>)
        }
    }
    return (<ul className="subNavList">
        {
            arr
        }
    </ul>)
};
SubNav.propTypes = {
    subNavList: PropTypes.object.isRequired,
    navLink: PropTypes.string.isRequired
};
export default SubNav