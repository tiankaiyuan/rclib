import React, {Component} from 'react'
import PropTypes from 'prop-types'

class UpComp extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange() {
        this.props.onLoader()
    }

    render() {
        return (<form className={'uploadComponents'}>
            <input id={'uploader'} type={'file'} onChange={this.handleChange}/>
            <label htmlFor={'uploader'}>上传文件</label>
        </form>)
    }
}

UpComp.propTypes = {
    onLoader: PropTypes.func.isRequired
};

export default UpComp;