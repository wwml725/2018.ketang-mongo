import React, {Component} from 'react';

//路由所需组件
import Tab from "../components/Tab/index";
import Home from "../containers/Home/index";
import Profile from "../containers/Profile/index";
import Lesson from "../containers/Lesson/index";
import Detail from "../containers/Detail/index";
import Login from "../containers/Logins/index";
import Reg from "../containers/Reg/index";

//引入路由
import {HashRouter as Router, Route, Switch} from 'react-router-dom';
import {ConnectedRouter} from 'react-router-redux';  //注入history到每一个组件
import createHistory from 'history/createHashHistory';//创建历史
let history = createHistory();//之前的history只能在路由级页面找到

//受保护路由
import PrivateRoute from '../PrivateRoute';

//react动画效果
import './index.less'


export default class App extends Component {
    render() {
        return (
            <ConnectedRouter history={history}>
                <div className="contentt" >
                    <Switch>
                        <Route exact path={'/'} component={Home}/>
                        <PrivateRoute path={'/lesson'} component={Lesson}/>
                        <Route path={'/profile'} component={Profile}/>
                        <Route path={'/detail'} component={Detail}/>
                        <Route path={'/login'} component={Login}/>
                        <Route path={'/reg'} component={Reg}/>
                    </Switch>

                    <Tab/>
                </div>

            </ConnectedRouter>
        )
    }
}