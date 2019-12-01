import './index.scss';
import React from 'react';
import { useState, useEffect } from 'react'
import { Icon, Avatar, Badge, Modal, message } from 'antd';
import { hideWindow, minimizeWindow } from '../../common/windowController';

import LoginModal from '../loginModal/index';
import RegisterModal from '../registerMoal/index';

export default function HeaderOperate (){
    const [count, setCount] = useState(1);
    const [visible, setVisible] = useState(false);
    const [type, setType] = useState('login');
    const [onlineState, setOnlineState] = useState(false);
    function jumpToUserCenter(){
        console.log(onlineState)
        if(!onlineState){
            setVisible(true);
            setType('login');
        }
    }
    function closeLogin(){
        setVisible(false);
    }
    useEffect(()=>{
        console.log(window.localStorage.getItem('loginStatus'))
        setOnlineState(Boolean(window.localStorage.getItem('loginStatus')) || false);
    })
    function logOut(){
        window.localStorage.removeItem('token');
        window.localStorage.removeItem('loginStatus');
        setOnlineState(false);
        message.success('退出成功');
        window.location.href = '/';
        
    }
    return (
        <div className="header-operate">
            <ul className="header-operate_bar">
                <li onClick={ hideWindow }>
                    <Icon type="close" title="关闭到托盘"/>   
                </li>
                <li onClick={ minimizeWindow }>
                    <Icon type="minus" title="最小化"/>
                </li>
                <li onClick={ jumpToUserCenter } className="header-operate_bar_avatar">
                    { onlineState 
                        ?   <div className="header-operate_bar_avatar_operate"  onClick={logOut}>
                                退出
                            </div> 
                        :   null 
                    }
                    <Badge 
                        dot={count > 0}
                        className="header-operate_bar_avatar_count">
                        <Avatar icon="user" size="small"/>
                    </Badge>
                </li>
            </ul>
            <Modal
                title={ type === 'login' ?'登录' : '注册' }
                destroyOnClose={true}
                footer={null}
                onCancel={closeLogin}
                visible={visible}
                >
                    {
                        type === 'login'
                            ? <LoginModal operateFunc={{ setOnlineState, setType, setVisible}}/>
                            : <RegisterModal operateFunc={{ setOnlineState, setType, setVisible}}/>
                    }
                
            </Modal>
        </div>
    )
}