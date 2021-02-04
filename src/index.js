// import React,{Component} from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import MyRoute from "./routes/routeindex"
// import registerServiceWorker from './registerServiceWorker';
// import Loadable from "./routes/Loadable"

// ReactDOM.render(
//     <MyRoute />,
//     document.getElementById('root'));
// registerServiceWorker();

// const GuanxiDemo = Loadable({
//     loader: () => import('./components/charts_dyzg/GuanxiDemo'),
// });


import GuanxiDemo from "./components/charts_dyzg/GuanxiDemo"
export default GuanxiDemo
//多个组件的写法
export {
    GuanxiDemo
}

