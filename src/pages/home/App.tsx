import React, { FC } from 'react';
// import { DownloadOutlined } from '@ant-design/icons';
// import { PoweroffOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import '../../sytles/app.scss';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
// import HeaderBox from '../../component/HeaderBox';
import Home from "./Home"
// import System from './System';
import Login from "../../login";
import { Layout, Menu, Breadcrumb } from 'antd';
const { Header, Content, Footer } = Layout;
class App extends React.Component {
  render() {
    return <HashRouter>
      <Layout className={"layout"}>
        {/*<Header>*/}
        {/*  <div className="logo" />*/}
        {/*  <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>*/}
        {/*    {new Array(15).fill(null).map((_, index) => {*/}
        {/*      const key = index + 1;*/}
        {/*      return <Menu.Item key={key}>{`nav ${key}`}</Menu.Item>;*/}
        {/*    })}*/}
        {/*  </Menu>*/}
        {/*</Header>*/}
        {/*
				  * 配置一级路由表
				  *   REACT路由默认：某一个规则匹配渲染组件，还会继续向下查找，把所有匹配规则的都渲染出来  =>Switch解决这个问题
				  *   默认匹配的规则是不严谨的：只要包含一个完整的规则体则都会符合要求 =>exact设置严谨性
				  *   /  都符合
				  *   /home  符合：/home  /home/a   不符合：/home2
				  */}
        <Switch>
          {/* <Route path='/' exact component={Home} /> */}
          <Redirect exact from='/' to='/home'/>

          <Route path='/login' component={Login} />
          <Route path='/home' component={Home} />
          {/* <Route path='/system' component={System} /> */}
          {/*<Route path='/system' render={_ => {*/}
          {/*  if (1 === 1) {*/}
          {/*    //=>有权限*/}
          {/*    return <System />;*/}
          {/*  }*/}
          {/*  //=>可以做提示或者渲染不同的组件*/}
          {/*  return '';*/}
          {/*}} />*/}

          <Redirect to='/home' />
          {/* <Route path='*' component={Home} /> */}
        </Switch>
      </Layout>
    </HashRouter>;
  }
}
export default App;

// const App: FC = () => (
//   <div className="App" >
//     {/*<Button type="default" size={"small"} color={"#555555"} >Pri</Button>*/}
//     {/*<Button>Default Button</Button>*/}
//     {/*<Button type="dashed">Dashed Button</Button>*/}
//     {/*<br />*/}
//     {/*<Button type="text">Text Button</Button>*/}
//     {/*<Button type="link">Link Button</Button>*/}
//     {/*<Button type="primary" shape="circle" icon={<DownloadOutlined />} />*/}
//     {/*<Button type="primary" icon={<PoweroffOutlined />} loading />*/}
//
//   </div>
// );
// class App extends React.Component<any, any>{
//   constructor(a:any) {
//     super(a);
//     this.state = {
//       arr:[1,2]
//     }
//   }
//   render() {
//     let {arr} = this.state;
//     return <div>
//       {arr.map((value:any,index:any)=>{
//         console.log(index, value)
//         return <Button key={index} type="text">{index}, {value}</Button>
//       })}
//     </div>
//   }
// }
