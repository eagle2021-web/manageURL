import React from "react";
import {UserOutlined,LockOutlined} from "@ant-design/icons";
import "./sytles/scss/login.scss"
import {queryPOST} from "./sytles/js/http"
interface Props {
}
const md5 = require("md5");
class Login extends React.Component<Props>{
    private x:any;
    private y:any;
    constructor(props:Props) {
        super(props);
        this.x = React.createRef();
        this.y = React.createRef();
    }
    render(){
        return <>
            <main className="mainBox">
                <h1 className="title">CRM客户管理系统</h1>
                <p className="tip">为保护企业的数据安全，请妥善保管密码</p>
                <section className="loginBox">
                    <div className="form">
                        <UserOutlined className="iconfont"/>
                        <input type="text" className="userName"
                            ref={x=>{this.x=x}} placeholder="请输入用户名/手机号/邮箱"/>
                    </div>
                    <div className="form">
                        <LockOutlined className="iconfont"/>
                        <input type="password" 
                            ref = {y=>{this.y=y}} className="userPass" placeholder="请输入登录密码"/>
                    </div>
                    <button className="submit" onClick={this.handleClick}>登录</button>
                </section>
	        </main>
            <footer className="footerBox">
                <span>北京珠峰世纪技术培训有限公司</span>
                <span>京ICP备09041920号</span>
                <span>京公网安备110108400531号</span>
            </footer>
        </>
    };

    handleClick = () =>{
        console.log(md5("123456"));
        let account = null,
            password = null;
        if(this.x.value && this.y.value){
            account = this.x.value;
            password = md5(this.y.value);
            queryPOST("",{
                account,
                password
            }).then((response) =>{
                // console.log(response)
                if(response != null){
                    console.log(response);
                    // alert("登录成功！点击确认跳转！")
                    // window.location.href = "/login"
                }else{
                    alert("账户或密码不正确！")
                }
            }).catch(reason => {
                console.log(reason);
            });
        }else{
            alert("账户和密码不能为空.....")
        }
    }
}
export default Login;