import React, { Component } from 'react';
import { Typography, Button, Icon, message , Spin, Modal } from 'antd';
import { Ilist,  SITipsProps, SITipsState } from '../../types/tips';

import './index.scss';

const { Paragraph  } = Typography;
const { confirm } = Modal;

class Tips extends  Component<SITipsProps, SITipsState>{
    constructor(props: SITipsProps){
        super(props)
        this.state = {
            loading: false
        }
    }
    
    setLocalStorage = () => {
        // @ts-ignore
        localStorage.setItem('tips-list',JSON.stringify(this.state.list));
    };
    onChange = (item: Ilist) => {
        return async (value: string) => {
            const { _setTipsList, _getTipsList } = this.props;
            if(item.info === value){
                return;
            }
            try {
                const { id } = item;
                await _setTipsList({data: { id , info: value }, contentType: 'json'});
                message.success('修改成功！');
                this.next();
                _getTipsList();
                this.next();
            } catch (error) {
                this.next();
                message.error('修改失败！');
                console.log(error);
            }
           
        }
    };
    async componentWillMount(){
        const { _getTipsList } = this.props;
        try {
            this.next();
            await _getTipsList();
            this.next();
        } catch (error) {
            this.next();
            console.log(error);
        }
    };
    next = () => {
        const { loading } = this.state;
        this.setState({loading: !loading});
    };
    deleteItem = (item: Ilist): any =>{
        const self = this;
        const { id } = item;
        const { _deleteTipsList, _getTipsList } = this.props;
        confirm({
            title: 'Are you sure delete this item?',
            content: 'this will unrecoverable！',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            async onOk() {
                await _deleteTipsList({ data: { id }});
                self.next();
                await _getTipsList();
                self.next();
            },
            onCancel() {
              console.log('Cancel');
            },
        });
    };
    addList =  async () => {
        const {_addTipsList, _getTipsList} = this.props;
        try {
            await _addTipsList();
            message.success('新增成功！');
            this.next();
            _getTipsList();
            this.next();
        } catch (error) {
            this.next();
            message.error('新增失败！');
            console.log(error);
        }
    };
    render(){
        const { list = [] } = this.props;
        const { loading } = this.state;
        return (
            <Spin spinning={loading}>
                <div className="page-tips">
                    <Button 
                        size="small" 
                        onClick={this.addList}
                        className="page-tips__add">
                       新增
                    </Button>
                    {
                        list.map((item: Ilist) => {
                            return (
                                <div 
                                    key={item.id} 
                                    onDoubleClick={this.deleteItem.bind(this, item) as any}>
                                    <Paragraph
                                            className="page-tips__eidt_line"
                                            copyable
                                            editable={{ onChange: this.onChange(item)}}
                                            key={item.id}
                                            >{item.info}</Paragraph>
                                    </div>
                                )
                        })
                    }
                </div>
            </Spin>
        ) 
    }
}
export default Tips;