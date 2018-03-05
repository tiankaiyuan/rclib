/**
 * Created by tiankaiyuan on 2018/3/3.
 */
import React from 'react'
import PropTypes from 'prop-types'
const ContainerCom = ({title = '', description = ''}) => {
    return (<div className="ContainerCom">
        <h1>{title}</h1>
        <p className="ContainerComDesc">{description}</p>
    </div>)
};
ContainerCom.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
};
export default ContainerCom;