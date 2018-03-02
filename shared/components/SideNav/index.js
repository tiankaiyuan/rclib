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
            showSub: 0
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(index) {
        if(index === this.state.showSub){
            index = -1;
        }
        return ()=>
        this.setState({showSub: index})
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