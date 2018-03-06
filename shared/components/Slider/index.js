/**
 * Created by tiankaiyuan on 2018/3/5.
 */
import React, {Component} from 'react'
import {isPc, drag}   from '../../utils/frontUtils'
class Slider extends Component {
    constructor(props) {
        super(props);
        this.dragCursor = this.dragCursor.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.sliderDom = undefined;
        this.cursor = undefined;
        this.drag = undefined;
        this.sliderWidth = undefined;
        this.state = {
            sliderWidth: 0,
            cursorWidth: 0
        }
    }

    componentDidMount() {
        this.sliderWidth = this.sliderDom.offsetWidth;
        //初始化游标位置
        this.setState({
            sliderWidth: this.sliderDom.offsetWidth,
            cursorWidth: this.cursor.offsetWidth
        });
        this.drag = drag(this.sliderWidth, this.dragCursor);
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

    handleClick(e) {
        const offsetX = e.nativeEvent.offsetX;
        this.props.changeWidth(offsetX / this.sliderWidth * 100);
    }

    render() {
        const percent = 100 - this.props.percent; //游标位置大小与数值大小成反比
        const left = percent / 100 * (this.state.sliderWidth - this.state.cursorWidth) + 'px';
        return (<div className="sliderInput"
                     id="sliderInput"
                     onClick={this.handleClick}
                     ref={node => this.sliderDom = node}>
            <button onClick={(e) => {
                this.props.savePercent();
                e.stopPropagation();
            }}>OK
            </button>
            <span className="cursor"
                  style={{left}}
                  onClick={(e) => {
                      e.stopPropagation()
                  }}
                  ref={node => this.cursor = node}>
                <i>{this.props.percent}</i>
            </span>
            <label htmlFor="sliderInput"
                   >调整大小</label>
        </div>);
    }
}

export default Slider;