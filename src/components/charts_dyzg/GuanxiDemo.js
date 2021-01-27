import React, {Component} from 'react';
import ReactEcharts from 'echarts-for-react';
import * as echarts from 'echarts'
import Graph from 'echarts/lib/data/Graph'
import PropTypes from 'prop-types';
import icon111 from '../images/icon111.png';

const Edge = Graph.Edge
const Node = Graph.Node

function generateNodeKey(id) {
    return '_EC_' + id;
}



export default class GuanxiDemo extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }

    }

    componentWillMount() {
        //重写echarts的内置方法
        Graph.prototype.addEdge = function (n1, n2, dataIndex) {
            console.log("adddd",n1, n2, dataIndex,this)
            let nodesMap = this._nodesMap;
            let edgesMap = this._edgesMap; // PNEDING

            if (typeof n1 === 'number') {
                console.log("121",this,"n1")
                n1 = this.nodes[n1];
            }

            if (typeof n2 === 'number') {

                n2 = this.nodes[n2];
            }

            if (!Node.isInstance(n1)) {
                n1 = nodesMap[generateNodeKey(n1)];
            }

            if (!Node.isInstance(n2)) {
                n2 = nodesMap[generateNodeKey(n2)];
            }

            if (!n1 || !n2) {
                return;
            }

            let key = n1.id + '-' + n2.id; // PENDING

            // if (edgesMap[key]) {
            //     console.log("重复了",edgesMap[key])
            //   return;
            // }

            let edge = new Edge(n1, n2, dataIndex);
            edge.hostGraph = this;

            if (this._directed) {
                n1.outEdges.push(edge);
                n2.inEdges.push(edge);
            }

            n1.edges.push(edge);

            if (n1 !== n2) {
                n2.edges.push(edge);
            }

            this.edges.push(edge);
            edgesMap[key] = edge;
            return edge;
        }
    }

    componentDidMount() {


    }

    static propTypes = {
        /**
         *定义属性,number,string,boolean,array
         styleparam: PropTypes.shape({
            symbol:PropTypes.object,
            symbolsize:PropTypes.number,
            fontcolor:PropTypes.string,
            fontsize:PropTypes.number,
        }),
         */

        relationdata:PropTypes.array,
        styleparam: PropTypes.object,
        symboldata:PropTypes.array,
    };

    //定义属性的默认值
    static defaultProps = {
        styleparam: {
            symbol:"circle", symbolsize:80,fontcolor:"#2c3239",fontsize:14,linecolor:"#1887b3",opacity:1,linelightcolor:"#0e67b3",
            repulsion:1500,edgeLength:200,layoutAnimation:true,edgeSymbol:['', 'arrow'],edgelabfontsize:12,strlen:3,edgelabfontcolor:"#063c66"
        }
    };

    //判断id是否存在
    exsitsid=(value,data)=>{
        let flag=false;
        data.map((item)=>{
            if( value == item.id){
                flag=true
            }
        })
        return flag
    }

    //判断name是否存在
    exsitsname=(value,data)=>{
        let flag=false;
        data.map((item)=>{
            if(value == item.name){
                flag=true
            }
        })

        return flag
    }



    getchart=()=>{

        const {relationdata,styleparam,symboldata}=this.props;

        let graphdata=[];//每个节点的di以及对应的名称
        let categoriesdata=[];//每个节点对应的颜色
        let linkdata=[];//链接对应数据

        let stparams=this.assembleparams(styleparam);

        /**
         * 生成边曲度优先使用列表
         * @return  [0.2, -0.2, 0.4, -0.4, 0.6, -0.6, 0.8, -0.8, 1, -1, 0.1, -0.1, 0.3, -0.3, 0.5, -0.5, 0.7, -0.7, 0.9, -0.9]
         */
        const CURVENESS_LIST=[];
        CURVENESS_LIST.push(0)
        Array.from({ length: 20 })
            .map((_, i) =>{
                CURVENESS_LIST.push((((i < 10 ? i + 2 : i - 9) - (i % 2)) / 10) * (i % 2 ? -1 : 1))
            })

        // 2. 预期生成的优化曲度后的列表
        const linkechartLinks = []


        relationdata.map((item)=>{

            let graphobj={id: item.id,name: item.name, category:item.name};
            if(!this.exsitsid(item.id,graphdata)){
                graphdata.push(graphobj,);//每个节点的di以及对应的名称
            }


            let catercolor={name: item.name, itemStyle: {normal: {color: item.normalcolor}}};//每个节点对应的颜色
            if(item.symbolsize){
                catercolor.symbolSize=item.symbolsize
            }else {
                catercolor.symbolSize=stparams.symbolsize
            }
            if(!this.exsitsname(item.name,categoriesdata)){
                categoriesdata.push(catercolor);
            }


            let value=item.value;
            value.map((v)=>{
                let obj={source: item.id, target: v.id, name:v.gxname,
                    lineStyle: {
                        normal: {
                             color: stparams.linecolor,
                             width: 1,
                             type: "solid",
                             curveness:Math.random()/3,
                             opacity: stparams.opacity,
                         },
                        emphasis: {
                             //高亮状态
                             width: "2",
                             color: stparams.linelightcolor,
                             type: "solid",
                             opacity: 1,
                         },
                    },
                }
                linkdata.push(obj);

                let graphobjtwo={id: v.id,name: v.name, category:v.name};
                if(!this.exsitsid(v.id,graphdata)){
                    graphdata.push(graphobjtwo,);//每个节点的di以及对应的名称
                }

                let catercolortwo={name: v.name, itemStyle: {normal: {color: v.normalcolor}}};//每个节点对应的颜色
                if(v.symbolsize){
                    catercolortwo.symbolSize=v.symbolsize
                }else {
                    catercolortwo.symbolSize=stparams.symbolsize
                }
                if(!this.exsitsname(v.name,categoriesdata)){
                    categoriesdata.push(catercolortwo);
                }

            })

        })



        linkdata.forEach(link => {
            // 3. 查询已优化的列表中，已存在的两个顶点相同的边
            const sameLink = linkechartLinks.filter(
                item =>
                    (item.source === link.source &&
                    item.target === link.target)||(item.source === link.target &&
                    item.target === link.source)
            )
            console.log("曲度",CURVENESS_LIST[sameLink.length])

            // 4. 优化曲度
            if(CURVENESS_LIST.length>sameLink.length&&CURVENESS_LIST[sameLink.length]==0){
                link.lineStyle.normal.curveness=0
            }else {
                link.lineStyle.normal.curveness =CURVENESS_LIST[sameLink.length]|| Math.random()
            }
            console.log("设置之后的",link.lineStyle.normal.curveness)

            linkechartLinks.push(link)
        })
        console.log("设置之后的数据",linkdata)


        let option = {
                tooltip: {
                    show: false,
                    formatter: function(params) {},
                    textStyle: {
                        align: "left",
                    },
                },
                series: [{
                    type: 'graph',
                    layout: 'force',// circular,force
                    force: {
                        initLayout:"circular",
                        repulsion: stparams.repulsion,
                        edgeLength:stparams.edgeLength,
                        layoutAnimation: stparams.layoutAnimation,
                    },
                    //可以自己设置图片：image://url,
                    // 或者自带参数，'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none',
                    // 也可以使用回调函数
                    // symbolSize: stparams.symbolsize,//节点图标大小
                    draggable: true,
                    roam: true,
                    focusNodeAdjacency: true,
                    edgeSymbol:  stparams.edgeSymbol,//节点图标两端的标记类型，['','arrow']
                    edgeLabel: {
                        normal: {
                            show: true,
                            textStyle: {
                                fontSize: stparams.edgelabfontsize,
                                color:stparams.edgelabfontcolor
                            },
                            formatter(x) {
                                return x.data.name;
                            },
                            align:"center"
                        }
                    },
                    data: graphdata,
                    links: linkdata,
                    categories:categoriesdata,
                    label: {
                        normal: {
                            show: true,
                            textStyle: {
                                //标签的字体样式
                                color: stparams.fontcolor,
                                fontStyle: "normal",
                                fontWeight: "bolder",
                                fontFamily: "sans-serif",
                                fontSize: stparams.fontsize,
                            },
                            formatter:function(parm){
                                let name=parm.name;
                                if(name.length<=stparams.strlen){
                                    return name
                                }else{
                                    let c="\\S{"+stparams.strlen+"}";
                                    let reg=new RegExp(c,"g");
                                    let str = name.replace(reg, function(match) {
                                        return match + '\n'
                                    })
                                    return str
                                }
                            }
                        },
                    },
           /*         lineStyle: {
                        normal: {
                            color: stparams.linecolor,
                            width: 1,
                            type: "solid",
                            curveness: 0.1,
                            opacity: stparams.opacity,
                        },
                        emphasis: {
                            //高亮状态
                            width: "2",
                            color: stparams.linelightcolor,
                            type: "solid",
                            curveness: 0,
                            opacity: 1,
                        },
                    },*/
                }]
            };

        if(symboldata && symboldata.length>0){
            //大于0，不采取前面的styleparam
            option.series[0].symbol=function (value,params) {
                let symic = "circle"
                symboldata.map((item) => {
                    if (item.name == params.name) {
                        if (item.symbolicon) {
                            symic = item.symbolicon;
                        }
                    }
                })
                return symic
            }
        }
        else{
            option.series[0].symbol=stparams.symbol;//节点图标
        }


        return option


    }


    assembleparams=(styleparam)=>{
        let obj={symbol:"circle", symbolsize:80,fontcolor:"#2c3239",fontsize:14,linecolor:"#1887b3",opacity:1,linelightcolor:"#0e67b3",
            repulsion:1500,edgeLength:200,layoutAnimation:true,edgeSymbol:['', 'arrow'],edgelabfontsize:12,strlen:3,edgelabfontcolor:"#063c66"
        };
        if(styleparam){
            obj.symbol=styleparam.symbol?styleparam.symbol:obj.symbol;
            obj.symbolsize=styleparam.symbolsize?styleparam.symbolsize:obj.symbolsize;
            obj.fontcolor=styleparam.fontcolor?styleparam.fontcolor:obj.fontcolor;
            obj.fontsize=styleparam.fontsize?styleparam.fontsize:obj.fontsize;
            obj.linecolor=styleparam.linecolor?styleparam.linecolor:obj.linecolor;
            obj.opacity=styleparam.opacity?styleparam.opacity:obj.opacity;
            obj.linelightcolor=styleparam.linelightcolor?styleparam.linelightcolor:obj.linelightcolor;
            obj.repulsion=styleparam.repulsion?styleparam.repulsion:obj.repulsion;
            obj.edgeLength=styleparam.edgeLength?styleparam.edgeLength:obj.edgeLength;
            obj.layoutAnimation=styleparam.layoutAnimation?styleparam.layoutAnimation:obj.layoutAnimation;
            obj.edgeSymbol=styleparam.edgeSymbol?styleparam.edgeSymbol:obj.edgeSymbol;
            obj.edgelabfontsize=styleparam.edgelabfontsize?styleparam.edgelabfontsize:obj.edgelabfontsize;
            obj.strlen=styleparam.strlen?styleparam.strlen:obj.strlen;
            obj.edgelabfontcolor=styleparam.edgelabfontcolor?styleparam.edgelabfontcolor:obj.edgelabfontcolor;
        }
        return obj
    }

    render() {

        const {} = this.state;


        let bluebarClick = {
            "click": this.barblueClick
        };

        return (
            <div style={{width: "100%", height: "100%",display:"flex",alignItems:"center",justifyContent:"center"}}>
                <ReactEcharts option={this.getchart()} style={{height:"100%",width:"100%"}}  refs={(re)=>{this.graph=re}}  />
            </div>

        )
    }

}

