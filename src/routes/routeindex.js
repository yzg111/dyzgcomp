import React, {Component} from 'react'
import {Router, Route, Switch} from 'react-router-dom'
import history from "../components/common/history"
import Home from "../components/common/home"
import zh_CN from "antd/lib/locale-provider/zh_CN";
import {Layout, LocaleProvider} from 'antd';
import moment from 'moment';
import 'moment/locale/zh-cn';
import TestHello from "../components/TestHello"
import ChartestIndex from "../components/charts_dyzg/ChartestIndex"

moment.locale('zh-cn');


export default class MyRoute extends Component {
    componentDidMount() {


    }
    render() {
        return (
                <Router history={history}>
                    <LocaleProvider locale={zh_CN}>
                        <Switch>
                            <Route exact path="/" component={TestHello}></Route>
                            <Route exact path="/ChartestIndex" component={ChartestIndex}></Route>

                        </Switch>
                    </LocaleProvider>
                </Router>
        );
    }
}



