/**
 * Created by tiankaiyuan on 2017/7/18.
 */
import React, {Component} from 'react';
import './style.less';
import PropTypes from 'prop-types';
import idCard  from './idcard.js'
class InputPassword extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isChanged: false,
            hasError: false
        }
        this.values = {};
        this.onChangeHandle = this.onChangeHandle.bind(this);
        this.onSaveHandle = this.onSaveHandle.bind(this);
    }

    onChangeHandle(key) {
        return e => {
            this.setState({isChanged: true});
            this.values[key] = e.target.value;
            if (key === 'confirmPassword') {
                this.setState({
                    hasError: !this.values['newPassword'] && '2'
                });
                this.values['newPassword'] && this.setState({
                    hasError: !this.values['newPassword'].match(this.values[key]) && '3'
                })
            }
            if (key === 'newPassword') {
                this.setState({
                    hasError: !this.values['curPassword'] && '1'
                })
            }
        }
    }

    onSaveHandle() {
        if (this.state.hasError || !this.values.confirmPassword) return;
        if (this.values.newPassword !== this.values.confirmPassword) return;
        const {onSave} = this.props,
            {isChanged} = this.state;
        isChanged && onSave({
            password: this.values.curPassword,
            newPassword: this.values.newPassword
        });
    }

    render() {
        const {isChanged, hasError} = this.state;
        return (<ul className={'InputPwsList'}>
            <li>
                <p>
                    当前密码
                </p>
                <input type="password"
                       style={{border: hasError ==='1' && '1px solid #ff0000'}}
                       onChange={this.onChangeHandle('curPassword')}
                       id={'curPassword'}
                       placeholder={'当前密码'}/>
                <label htmlFor={'curPassword'}><i className="icon-edit"/></label>
            </li>
            <li >
                <p>
                    新密码
                </p>
                <input type="password"
                       style={{border: hasError ==='2' && '1px solid #ff0000'}}
                       onChange={this.onChangeHandle('newPassword')}
                       id={'newPassword'}
                       placeholder={'新密码'}/>
                <label htmlFor={'newPassword'}><i className="icon-edit"/></label>
            </li>
            <li>
                <p>
                    确认新密码
                </p>
                <input type="password"
                       style={{border: hasError ==='3' && '1px solid #ff0000'}}
                       onChange={this.onChangeHandle('confirmPassword')}
                       id={'confirmPassword'}
                       placeholder={'确认新密码'}/>
                <label htmlFor={'confirmPassword'}><i className="icon-edit"/></label>
            </li>
            <li>
                <button onClick={this.onSaveHandle}
                        disabled={!isChanged}>保存
                </button>
            </li>
        </ul>)
    }
}
InputPassword.propTypes = {
    onSave: PropTypes.func.isRequired
};
export default {InputPassword,idCard};