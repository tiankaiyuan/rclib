/**
 * Created by tiankaiyuan on 2018/3/5.
 */
import React, {Component} from 'react'
import {isPc, drag}   from '../../utils/frontUtils'
class Slider extends Component {
    constructor(props) {
        super(props);
        this.dragCursor = this.dragCursor.bind(this);
        this.sliderDom = undefined;
        this.cursor = undefined;
        this.drag = undefined;

    }

    componentDidMount() {
        this.drag = drag(this.sliderDom.offsetWidth, this.dragCursor);
        if (isPc()) {
            this.cursor.addEventListener('mousedown', this.drag, false);
        } else {
            this.cursor.addEventListener('touchstart', this.drag, false);
        }
    }

    componentWillUnmount() {
        if (isPc()) {
            this.cursor.removeEventListener('mousedown', this.drag, false);
        } else {
            this.cursor.removeEventListener('touchstart', this.drag, false);
        }
    }

    dragCursor(value) {
        this.props.changeWidth(value);
    }

    render() {
        return (<div className="sliderInput"
                     id="sliderInput"
                     ref={node => this.sliderDom = node}>
            <button onClick={this.props.savePercent}>OK</button>
            <span className="cursor" ref={node => this.cursor = node}><i>{this.props.percent}</i></span>
            <label htmlFor="">调整大小</label>
        </div>);
    }
}

export default Slider;