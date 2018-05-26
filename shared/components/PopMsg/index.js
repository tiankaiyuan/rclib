/**
 * Created by tiankaiyuan on 2017/2/12.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types'
import  './popMsg.less';

class PopUp extends Component {
    constructor(props) {
        super(props);
        this.timeId = void(0);
        this.onHandleMouseEnter = this.onHandleMouseEnter.bind(this);
        this.onHandleMouseLeave = this.onHandleMouseLeave.bind(this);
        this.onConfirm = this.onConfirm.bind(this)
    }

    componentWillUnmount() {
        clearTimeout(this.timeId);
    }

    componentWillReceiveProps({msg}) {
        const {onPopHidden, showTime, id} = this.props;
        if (this.props.msg !== msg && !!msg) {
            clearTimeout(this.timeId);
            this.timeId = setTimeout(() => onPopHidden(id), showTime);
        }
    }

    onHandleMouseEnter() {
        clearTimeout(this.timeId);
    }

    onHandleMouseLeave() {
        const {onPopHidden, showTime, msg, id} = this.props;
        if (!!msg)
            this.timeId = setTimeout(() => onPopHidden(id), showTime);
    }

    onConfirm() {
        const {onConfirm, id} = this.props;
        onConfirm(id);
    }

    render() {
        const {msg, needConfirm, style} = this.props;
        const className = msg ? 'msgShow' : '';
        return (
            <div className={'popMsg' + ' ' + className}
                 style={style}
                 onMouseLeave={this.onHandleMouseLeave}
                 onMouseEnter={this.onHandleMouseEnter}>
                <p>{msg}</p>
                {needConfirm && <button onClick={this.onConfirm}>确定</button>}
            </div>
        );
    }
}
PopUp.propTypes = {
    onPopHidden: PropTypes.func.isRequired,
    onConfirm: PropTypes.func,
    showTime: PropTypes.number.isRequired,
    msg: PropTypes.string.isRequired,

}
export default PopUp;