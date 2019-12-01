import React, { FormEvent, ChangeEvent, Dispatch, SetStateAction } from 'react';
import { useState } from 'react';
import { Icon, Form, Input, Button } from 'antd';
import './index.scss';
import { requestRegister } from '../../api/register';
import { IResponse } from '../../types/ajax';
import { ILoginRegisterParam, ISetOnlineState, ISetType, ISetVisible } from '../../types/login';
import { FormComponentProps } from 'antd/lib/form';

const md5 = require('md5');

interface ILoginModalProps extends FormComponentProps {
    operateFunc: { 
        setOnlineState: ISetOnlineState,
        setType: ISetType,
        setVisible: ISetVisible
    }
}
function RegisterModal (props: ILoginModalProps){
    const [ userName, setUserName ] = useState('');
    const [ passWord, setPassWord ] = useState('');
    function handleSubmit(event: FormEvent){
        event.preventDefault();
        const {setOnlineState, setVisible } = props.operateFunc;
        const param: ILoginRegisterParam = {
            userName: md5(userName), 
            passWord: md5(passWord)
        }
        requestRegister({ data: param, contentType:'json'})
        .then((res: IResponse) => {
            window.localStorage.setItem('token', res.data);
            window.localStorage.setItem('loginStatus', 'true');
            // setOnlineState(true);
            // setVisible(false);
            window.location.reload();
        }).catch(error => {
            console.log(error)
        });
       
        
    }

    function userNameChangeEvt(event:ChangeEvent<HTMLInputElement>):void{
        setUserName(event.target.value || '');
    }
    function passWordChangeEvt(event:ChangeEvent<HTMLInputElement>):void{
        setPassWord(event.target.value || '');
    }
    return(
        <Form onSubmit={handleSubmit} className="register-form" id="components-form-normal-register">
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
                <Button  htmlType="submit"  className="register-form-button" type="primary">
                    注册
                </Button>
            </Form.Item>
        </Form>
    )
}
const WrappedNormalRegisterForm = Form.create<ILoginModalProps>({ name: 'normal_register' })(RegisterModal);
export default WrappedNormalRegisterForm