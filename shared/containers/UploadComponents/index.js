/**
 * Created by tiankaiyuan on 2018/3/6.
 */
import React from 'react'
import {connect} from 'react-redux'
import UpLoader from '../../components/UploadComp'

const Up = () => {
    return (<UpLoader onLoader={() => {

    }}/>);
};

export default connect()(Up);
