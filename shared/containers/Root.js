/**
 * Created by tiankaiyuan on 2018/2/27.
 */
import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import {Route} from 'react-router-dom'
import Test from '../components/Test'
import {} from '../stateChanger/actions'
import './root.less'

const Root = (props) => {
    const {} = props;
    return (<div className="root-component">
        <Test text={' hell'}/>
    </div>)
};
const MSTPRoot = (state) => {
    const {} = state;
    return {}
};
const MDTPRoot = (dispatch) => {
    return {}
};
export default withRouter(connect(MSTPRoot, MDTPRoot)(Root));
