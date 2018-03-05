/**
 * Created by tiankaiyuan on 2018/2/28.
 */
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import NavList from './NavList'
class SideNav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSub: []
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(value) {
        let i = this.state.showSub.indexOf(value),
            arr = [...this.state.showSub];
        if (i >= 0) {
            arr.splice(i,1)
        } else {
            arr.push(value)
        }
        return () =>
            this.setState({showSub: [...arr]})
    }

    render() {
        return (<ul className="sideNav">
            <NavList navList={this.props.navList}
                     showSub={this.state.showSub}
                     onClick={this.handleClick}/>
        </ul>)
    }
}
export default SideNav;