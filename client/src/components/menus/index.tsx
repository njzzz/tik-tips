import React, { Component }from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
type ListItem = {
    name: string | number,
    url: any,
    key: string | number
}
interface IStartMenu {
    menuList: ListItem[],
    className: string
}
class StartMenu extends Component<IStartMenu> {
    static defaultProps: IStartMenu = {
        menuList: [
            { name: 'tips', key: 'tips', url: '/tips'},
            { name: 'times', key: 'times', url: '/times'},
        ],
        className: ''
    }
    readonly state = {
        current: '/',
    };
    handleClick = (e: { key: string }) =>{
        this.setState({
            current: e.key
        });
    };
    componentWillMount(){
        const url = window.location.href;
        const result = this.props.menuList.filter( val => {
            return url.includes(val.url);
         })
        const activeMenuItem = result.length ? result[0].url : '/';
        this.setState({
            current: activeMenuItem
        })
    };
    menuItems = (list: ListItem[]) => {
        return list.map(item => {
            return (
                <Menu.Item key={item.url}>
                    <Link to={item.url}>{item.name}</Link>
                </Menu.Item>
            );
        });
    };
    render() {
        const {className } = this.props;
        return (
            <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="inline" theme="dark" className={className}>
                { this.menuItems(this.props.menuList) } 
            </Menu>
        );
    }
}


export default StartMenu;
