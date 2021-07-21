import React from "react";
import {Menu} from "antd";
import {Input} from 'antd';
import {queryGET, queryPOST} from "../../sytles/js/http";
interface EntityType{
    id:number,
    name:string
    user_id:number
}
interface StateType{
    dataSource:Array<EntityType>,
    count: number,
    bool: boolean
}
class TopMenu extends React.Component<any, StateType> {
    constructor(props: any) {
        super(props);
        this.state = {
            dataSource: [],
            count: 3,
            bool: false
        };
    }

    render() {
        const self = this;
        const {dataSource} = this.state;
        return <>
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} >
                {dataSource.map((value:EntityType,index:number)=>{
                   return <Menu.Item key={value.id} onClick={(e)=> self.handleClick(index, e)}>{value.name}
                   </Menu.Item>
                })}
            </Menu>
            <Input placeholder="Basic usage" hidden={self.state.bool} enterKeyHint={"done"} />
        </>

    }
    //a
    handleClick = (a:any, b:any) => {
        // this.setState({
        //     bool: true
        // })
        // alert(1111);
        console.log(a);
        console.log(b);
    }
    handleAdd = () => {
        const entity = {
            id:null,
            name:'abc'
        }
        queryPOST("/menu/add",entity )
            .then((response) =>{
                // console.log(response)
                if(response != null){
                    console.log(response);
                    const b:boolean = response.data;
                    b ? console.log("successfully add menu item!") : console.log("failed");
                }else{
                    alert("账户或密码不正确！")
                }
            }).catch(reason => {
            console.log(reason);
        });
    };
    componentDidMount() {
        const self = this;
        queryGET("/menu/all").then((response) =>{
            // console.log(response)
            if(response != null){
                console.log(response);
                self.setState({
                    dataSource:[...response.data],
                    count:response.data.length
                })
            }else{
                alert("账户或密码不正确！")
            }
        }).catch(reason => {
            console.log(reason);
        });
    }
};
export default TopMenu;