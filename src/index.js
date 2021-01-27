import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import MyRoute from "./routes/routeindex"
import registerServiceWorker from './registerServiceWorker';
import "video-react/dist/video-react.css";
import  Hello from "./components/Hello"
import  GuanxiDemo from "./components/charts_dyzg/GuanxiDemo"

ReactDOM.render(
    <MyRoute />,
    document.getElementById('root'));
registerServiceWorker();



/*
export default GuanxiDemo
//多个组件的写法
export {
    Hello,
    GuanxiDemo
}

*/
