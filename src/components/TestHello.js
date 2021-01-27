import React,{Component} from "react"
import HelloReact,{Hello} from "yzgtest_react"


export default class TestHello extends Component{
    render(){
        return(
            <div>
                <HelloReact></HelloReact>
                <Hello test={"接收"}></Hello>
            </div>
        );

    }
}