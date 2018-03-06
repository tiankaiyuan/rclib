/**
 * Created by tiankaiyuan on 2018/3/5.
 */
import React from 'react'
import PropTypes from 'prop-types'
const Title = ({title = '', description = ''}) => {
    return (<div className="title">
        <h1>{title}</h1>
        <p className="description">{description}</p>
    </div>)
};
Title.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
};
export default Title;