import React, { FormEvent, useState, ChangeEvent } from 'react';
import './index.scss';
import { Icon, Form, Input, Button, Checkbox } from 'antd';
import { FormComponentProps } from 'antd/lib/form/Form';
import { IOperateType, ILoginRegisterParam, ISetOnlineState, ISetType, ISetVisible } from '../../types/login';
import { requestLogin } from '../../api/login';
import { IResponse } from '../../types/ajax';
const md5 = require('md5');
interface ILoginModalProps extends FormComponentProps {
    operateFunc: { 
        setOnlineState: ISetOnlineState,
        setType: ISetType,
        setVisible: ISetVisible
    }
}
function LoginModal(props: ILoginModalProps){
    const [ userName, setUserName ] = useState('');
    const [ passWord, setPassWord ] = useState('');

    function userNameChangeEvt(event:ChangeEvent<HTMLInputElement>):void{
        setUserName(event.target.value || '');
    }

    function passWordChangeEvt(event:ChangeEvent<HTMLInputElement>):void{
        setPassWord(event.target.value || '');
    }
    
    function handleSubmit(event: FormEvent){
        event.preventDefault();
        const { setOnlineState, setVisible } = props.operateFunc;
        const param: ILoginRegisterParam = {
            userName: md5(userName), 
            passWord: md5(passWord)
        }
        requestLogin({ data: param, contentType: 'json' })
            .then((res: IResponse) => {
                window.localStorage.setItem('token', res.data && res.data.token);
                window.localStorage.setItem('loginStatus', 'true');
                // setOnlineState(true);
                // setVisible(false);
                window.location.reload();
            }).catch(error => {
                console.log(error)
            });
    }

    function register(type: IOperateType): void{
        const { setType } = props.operateFunc;
        setType(type);
    }

    return(
        <Form onSubmit={handleSubmit} className="login-form" id="components-form-normal-login">
            <Form.Item>
                <Input
                    value={userName}
                    onChange={userNameChangeEvt}
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="请输入用户名"/>
            </Form.Item>
            <Form.Item>
                <Input.Password
                    value={passWord}
                    onChange={passWordChangeEvt}
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type="password"
                    placeholder="请输入密码"/>
            </Form.Item>
            <Form.Item>
                <Checkbox>记住密码</Checkbox>
                <a className="login-form-forgot" href="">
                    忘记密码
                </a>
                <Button 
                    type="primary" 
                    htmlType="submit" 
                    className="login-form-button">
                    登录
                </Button>
                <Button 
                    className="login-form-button" 
                    onClick={()=>{ register('register') }}>
                    注册
                </Button>
            </Form.Item>
        </Form>
    )
}
const WrappedNormalLoginForm = Form.create<ILoginModalProps>({ name: 'normal_login' })(LoginModal);
export default WrappedNormalLoginForm