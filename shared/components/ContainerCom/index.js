/**
 * Created by tiankaiyuan on 2018/3/3.
 */
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Slider    from '../Slider';
class ContainerCom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            width: props.width || 100
        };
        this.changeWidth = this.changeWidth.bind(this);
        this.saveWidth = this.saveWidth.bind(this);
    }

    changeWidth(value) {
        this.setState({width: 100 - value})
    }
    saveWidth(){
        console.log('save width',this.state.width)
    }
    render() {
        const width = this.state.width;
        return (<div className="ContainerCom">
            <Slider changeWidth={this.changeWidth}
                    savePercent={this.saveWidth}
                    percent={width}/>
            <div className="container" style={
                {
                    width: width + '%'
                }
            }>
                {this.props.children}
            </div>
        </div>)
    }
}

ContainerCom.propTypes = {
  width: PropTypes.number.isRequired
};
export default ContainerCom;