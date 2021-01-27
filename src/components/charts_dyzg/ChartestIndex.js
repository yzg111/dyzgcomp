import React, {Component} from 'react';
import ReactEcharts from 'echarts-for-react';
import * as echarts from 'echarts'
import GuanxiDemo from "./GuanxiDemo"
import icon111 from "../images/icon111.png"
import icon1_4 from "../images/icon1_4.png"

export default class ChartestIndex extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data:[],
            styleparm:{
                // symbol:"image://"+icon111,
                symbolsize:80,fontcolor:"#2c3239",fontsize:12,linecolor:"#1887b3",opacity:1,linelightcolor:"#b31e29",
                repulsion:1500,edgeLength:150,layoutAnimation:true,edgeSymbol:['', 'arrow'],edgelabfontsize:12,
                strlen:3,edgelabfontcolor:"#063c66"
            },
            symboldata:[]
        }

    }


    componentWillMount() {

        document.title="write_component";
        let symboldata=[
            {name:"护肤品",symbolicon:"image://"+icon111},
            {name:"薇诺娜",symbolicon:"image://"+icon111},
            {name:"韩束",symbolicon:"image://"+icon111},
            {name:"OLAY",symbolicon:"image://"+icon111},
            {name:"片仔癀",symbolicon:"image://"+icon111},
            {name:"痘痘肌",symbolicon:"image://"+icon1_4},
            {name:"油皮",symbolicon:"image://"+icon1_4},
            {name:"干皮",symbolicon:"image://"+icon1_4},
            {name:"敏感肌",symbolicon:"image://"+icon1_4},
            {name:"保湿",symbolicon:"image://"+icon111},
            {name:"美白",symbolicon:"image://"+icon111},
        ]
        let data=[
            {
                name:"护肤品护肤品护肤品护肤品护肤品护肤品",id:"f0",normalcolor:"#30b8c5",
                symbolsize:40,
                value:[
                    {name:"薇诺娜",id:"f1",gxname:"挺好的",normalcolor:"#2f7852",symbolsize:80,},
                    {name:"韩束123",id:"f2",gxname:"",normalcolor:"#8b6503",symbolsize:80,},
                    {name:"OLAY",id:"f3",gxname:"",normalcolor:"#b31847"},
                    {name:"片仔癀",id:"f4",gxname:"",normalcolor:"#ff8f31"},
                ]
            },
            {
                name:"薇诺娜",id:"f1",normalcolor:"#2f7852",
                symbolsize:80,
                value:[
                    {name:"痘痘肌",id:"f6",gxname:"",normalcolor:"#736b78"},
                    {name:"油皮",id:"f7",gxname:"",normalcolor:"#1887b3"},
                    {name:"干皮",id:"f9",gxname:"",normalcolor:"#b058b3"},
                    {name:"敏感肌",id:"f8",gxname:"",normalcolor:"#6e8914"},
                ]
            },
            {
                name:"韩束",id:"f2",normalcolor:"#ffeaf2",
                symbolsize:40,
                value:[
                    {name:"干皮",id:"f6",gxname:"",normalcolor:"#b058b3"},
                    {name:"保湿",id:"f11",gxname:"",normalcolor:"#739185"}
                ]
            },
            {
                name:"OLAY",id:"f3",normalcolor:"#b31847",
                value:[
                    {name:"美白",id:"f10",gxname:"",normalcolor:"#AD3D25"},
                ]
            },
            {
                name:"片仔癀",id:"f4",normalcolor:"#ff8f31",
                value: [
                    {name:"痘痘肌",id:"f6",gxname:"关系1",normalcolor:"#736b78"},

                ]
            },
            {
                name:"痘痘肌",id:"f6",normalcolor:"#736b78",
                value: [
                    {name:"片仔癀",id:"f4",gxname:"关系2",normalcolor:"#ff8f31"},
                ]
            },

        ];

        this.setState({
            data:data,
            symboldata:symboldata
        })


    }

    componentDidMount() { }


    render() {

        const {data,styleparm,symboldata} = this.state;
        console.log("参数",styleparm)

        // let  cc={symbol:"image://"+icon111, symbolsize:70}


        return (
            <div style={{width: "100%", height: "100%",display:"flex",alignItems:"center",justifyContent:"center"}}>
                <GuanxiDemo relationdata={data}
                            //styleparam={styleparm}
                            //symboldata={[]}
                />
            </div>

        )
    }

}

