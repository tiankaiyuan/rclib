/**
 * Created by tiankaiyuan on 2018/2/28.
 */
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import NavList from './NavList'
import './index.less'
class SideNav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSub: []
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(index) {
        let i = this.state.showSub.indexOf(index),
            arr = [...this.state.showSub];
        if (i >= 0) {
            arr.splice(i,1)
        } else {
            arr.push(index)
        }
        return () =>
            this.setState({showSub: [...arr]})
    }

    render() {
        return (<ul className="sideNav">
            <NavList navList={this.props.navList}
                     subNavList={this.props.subNavList}
                     showSub={this.state.showSub}
                     onClick={this.handleClick}/>
        </ul>)
    }
}
export default SideNav;