/**
 * Created by tiankaiyuan on 2018/3/2.
 */
import React, {Component} from 'react'
import {Link} from 'react-router-dom';

class Logo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            move: ''
        }
    }

    componentDidMount() {
        setTimeout(()=>{
            this.setState({
                move: 'move'
            })
        },0)
    }

    render() {
        const className = this.state.move;
        return (<Link className="logo" to={'/'}>
            <span className="square-1"/>
            <span className="square-2"/>
            <span className="square-3"/>
            <span className="square-4"/>
            <span className={"square-5 " + className}/>
            <span className="square-6"/>
            <span className="square-7"/>
            <span className={"square-8 " + className}/>
            <div className="cover"/>
        </Link>)
    }
}
export default Logo