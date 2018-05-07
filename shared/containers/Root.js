/**
 * Created by tiankaiyuan on 2018/2/27.
 */
import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import {Route} from 'react-router-dom'
import {
    /*INSERT_ACTION*/
} from '../stateChanger/actions'
import './root.less'
/*INSERT*/

const Root = (props) => {
    const {
        /*INSERT_STATE*/
        /*INSERT_DISPATCH_NAME*/
    } = props;
    return (<div className="root-component">
        {/*INSERT2*/}
    </div>)
};
const MSTPRoot = (state) => {
    const {
        /*INSERT_STATE*/
    } = state;
    return {
        /*INSERT_STATE*/
    }
};
const MDTPRoot = (dispatch) => {
    return {
        /*INSERT_DISPATCH*/
    }
};
export default withRouter(connect(MSTPRoot, MDTPRoot)(Root));
