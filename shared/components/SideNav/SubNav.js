/**
 * Created by tiankaiyuan on 2018/3/1.
 */
import React from 'react'
import PropTypes from 'prop-types'
import {NavLink} from 'react-router-dom'
const SubNav = ({subNavList}) => {
    return (<ul className="subNavList">
        {
            subNavList.map((value, index) => {
                return (<li key={index} >
                    <NavLink to={value.link}
                             activeClassName={'subNavSelected'}>
                        {value.text}
                    </NavLink>
                </li>)
            })
        }
    </ul>)
};
SubNav.propTypes = {
    subNavList: PropTypes.array.isRequired
};
export default SubNav