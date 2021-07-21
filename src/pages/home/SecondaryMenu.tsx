import React from "react";
import {Button, Menu, Popconfirm} from "antd";
import {Input} from 'antd';
import {queryGET, queryPOST} from "../../sytles/js/http";
import "../../sytles/scss/Menu.scss";
interface EntityType{
    id:number,
    name:string
    user_id:number
}
interface StateType{
    dataSource:Array<EntityType>,
    count: number,
    bool: boolean,
    current_index:number,
    current_key:number,
    bool_remove:boolean
}
class SecondaryMenu extends React.Component<any, StateType> {
    constructor(props: any) {
        super(props);
        this.state = {
            dataSource: [],
            count: 3,
            bool: false, //控制修改
            bool_remove:true,
            current_index:0,
            current_key:0
        };
    }

    render() {
        const self = this;
        const {dataSource,current_index} = this.state;
        console.log("render", this.state);
        return <>
            <Menu theme="dark" mode="horizontal" inlineCollapsed={false} disabledOverflow={true}
                  defaultSelectedKeys={[`${dataSource.length > 0 ? dataSource[0].id + '': 1}`]} style={{ display:"inline-block"}}>
                {dataSource.map((value:EntityType,index:number)=>{
                   return <Menu.Item key={value.id} onClick={(e)=> self.handleClick(index, e)}>{value.name}
                   </Menu.Item>
                })}
            </Menu>
            <Button onClick={this.handleAdd} type="primary" shape="circle" className={"add-menu-item operate-menu-item" }>
                +
            </Button>
            {/*<Button  onClick={event => this.handleDelete(this.state.current_index)} type="primary"*/}
            {/*         shape="circle"  className={"remove-menu-item operate-menu-item"} disabled={!this.state.bool_remove}>*/}
            {/*    -*/}
            {/*</Button>*/}
            <Popconfirm title={`are you sure remove ${dataSource.length > 0 ? dataSource[current_index].name : 0} ?`}
                        onConfirm={() => this.handleDelete(this.state.current_index)} disabled={!this.state.bool_remove}>
                <Button  type="primary" shape="circle"  className={"remove-menu-item operate-menu-item"} disabled={!this.state.bool_remove}>
                    -
                </Button>
            </Popconfirm>
            <Input placeholder="Basic usage" hidden={self.state.bool} enterKeyHint={"previous"} style={{zIndex:100}}
                onBlur={() => console.log(1)}/>
        </>

    }
    abc = (a:any, b:any) =>{
        console.log(a);
    }
    //a
    handleClick = (index:number, b:any) => {
        console.log("当前 index  ", index);
        this.setState({
            current_index:index,
            current_key:this.state.dataSource[index].id,
            bool_remove:true
        });
        console.log(b);
        //输出的是上一次的，即尚未更新的数据
        // console.log(this.state)
    }
    handleAdd = () => {
        const entity = {
            id:null,
            name:'abc' + this.state.dataSource.length
        }
        const self = this;
        queryPOST("/menu/add",entity )
            .then((response) =>{
                // console.log(response)
                if(response != null){
                    console.log(response);
                    const b:boolean = response.data;
                    b ? console.log("successfully add menu item!") : console.log("failed");
                    if(b){
                        self.update();
                    }
                }else{
                    alert("账户或密码不正确！")
                }
            }).catch(reason => {
            console.log(reason);
        });
    };
    //删除一个menu-item
    handleDelete = (index: number) => {
        // console.log(key)
        const dataSource = [...this.state.dataSource];
        if(index <0 || index >= dataSource.length){
            alert("请选择要删除的item");
            return;
        }
        const entity:EntityType = {...dataSource[index]};
        console.log(entity);
        this.setState({ dataSource: dataSource.filter((item, i) => i !== index) });
        this.setState({
            current_index:0
        })
        //向服务器删除
        queryPOST(`/menu/delete`,entity).then((response) =>{
            // console.log(response)
            if(response != null){
                console.log(response);
                // alert("删除成功");
                this.setState({
                    bool_remove:false
                })
                // this.update();
            }else{
                alert("删除失败");
            }
        }).catch(reason => {
            console.log(reason);
        });
    };
    componentDidMount() {
       this.update();
    }
    update = () =>{
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
export default SecondaryMenu;