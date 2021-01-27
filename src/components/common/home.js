import React,{Component} from "react"
import {Redirect}  from "react-router-dom"

export default class Home extends Component{

    componentDidMount=()=>{

    }

    getAuth=()=>{

        // console.log("本地存储",localStorage)
        // if (localStorage.CONF_ACCESS_TOKEN) {
            //如果token不存在则没有权限访问页面
            return <Redirect to="/PdczSrIndex"/>;
        // }else {
        //     return <div style={{
        //         marginTop:"20%",
        //         textAlign:"center",
        //         width:"100%"
        //     }}>没有权限访问系统！</div>
        // }
    }

    render(){
        return(
            this.getAuth()
        );

    }
}