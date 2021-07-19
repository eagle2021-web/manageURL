import React from 'react';
import './HeaderBox.less';
import { Link, NavLink, withRouter } from 'react-router-dom';
import { Layout, Menu } from 'antd';
const { Header } = Layout;

/*
 * Link / NavLink：实现路由跳转的（最后都渲染为a标签）
 *   NavLink会根据URL地址和自己设定的跳转规则地址进行匹配，匹配上的设置class='active'以此我们可以设置选中的样式
 */

function HeaderBox(props) {
	console.log(props);
	return <Header>
		<div className="logo"></div>
		<Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
			<Menu.Item key="1">
				<NavLink to='/home'>首页</NavLink>
			</Menu.Item>
			<Menu.Item key="2">
				<NavLink to={{
					pathname: '/login',
					//支持问号传参
					search: '?xxx=xxx'
				}}>系统设置</NavLink>
			</Menu.Item>
		</Menu>
	</Header>;
}
export default withRouter(HeaderBox);

/*
 * withRouter把非路由管控的组件变为受路由管控的组件，这样属性中就有history等信息了，它是一个高阶函数（类似于react-redux中的connect）
 */