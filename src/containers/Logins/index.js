import React,{Component} from 'react';
import './index.less';
import profile from  '../../common/images/profile.png'
import MHeader from "../../components/MHeader/index";
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import * as action from '../../redux/actions/user'
//只有通过路由渲染的页面才有history属性
class Logins extends Component{
    constructor(){
        super();
        //这是要提交给后台的数据，又因为input是受控组件，所以我们需要将所有数据放进当前组件的状态中，然后在
        this.state = {username:'',password:''}
    }
    componentWillMount(){
        this.props.validate();//验证如果登录过 去课程页面
    }
    login =()=>{//点击登录按钮执行这个函数
        //dispatch(action)
        this.props.login(this.state);
        //这个之后就更改了redux中的state
    };
    render(){
        return (
            <div className="login">
                <MHeader title="登录"/>
                <img src={profile} alt="" width={'60px'}/>
                <ul>
                    <li>
                        <input
                        type="text"
                        placeholder="请输入用户名"
                        value={this.state.username}
                        onChange={(e)=>{this.setState({username:e.target.value})}}/>
                    </li>
                    <li>
                        <input
                            type="text"
                            placeholder="请输入密码"
                            value={this.state.password}
                            onChange={(e)=>{this.setState({password:e.target.value})}}/>
                    </li>

                    <li><Link to={'/reg'}>前往注册</Link></li>
                    <li><a className="login_btn" onClick={this.login}>登录</a></li>
                    {/*点击登录之前，err是一个空字符串，如果执行异步的action函数，通过接口获取到了数据，就派发数据到reducer中，如果没有获取数据，就直接将错误信息派发给reducer*/}
                    <li>{this.props.user.err}</li>
                </ul>
            </div>
        )
    }
}

export default connect(state=>({...state}),action)(Logins)

//将这个组件导入cennect中，那么在这个组件中就可以调用那个封装了dispatch的函数了（actions中）

//...state:把reducer中的state扩展出来，可以直接调用通过this.props.user.err直接调用