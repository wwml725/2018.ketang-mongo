import React,{Component} from 'react';
import './index.less';
import profile from  '../../common/images/profile.png'
import MHeader from "../../components/MHeader/index";
import {connect} from 'react-redux';
import * as action from '../../redux/actions/user';
class Reg extends Component{
    reg=()=>{
        //调用这个函数，就是调用注册接口，fetch会通过这个接口，将传入的参数，传给后台，后台将这些数据保存在session中，再将session保存到数据库中，保存时执行一个回调函数，通过这个回调函数在将数据返回给客户端，我们将这个数据保存redux中
        //2、将这些数据放到派发到reducer中，并且保存到sessionStorage中一份
        //3、跳转到对应的页面 dispatch(push('/lesson')) 为甚这个还要dispatch
        this.props.reg({username:this.refs.username.value,password:this.password.value});
        console.log(this.refs.username.value,this.password.value);
    };

    /*
    * ref={(element)=>{this.username= element;}：获取无状态组件   this.username
    *
    * <input ref="input" />  : 获取input的dom元素  this.refs.username
    *
    * */
    render(){
        return (
            <div className="login">
                <MHeader title="注册"/>
                <img src={profile} alt="" width={'60px'}/>
                <ul>
                    <li>
                        <input
                            type="text"
                            placeholder="输入用户名"
                            ref="username"/>
                    </li>
                    <li>
                        <input
                            type="text"
                            placeholder="输入密码"
                            ref={(element)=>{this.password = element;}}/>
                    </li>
                    <li><a className="login_btn" onClick={this.reg}>注册</a></li>
                    <li>{this.props.user.err}</li>
                </ul>
            </div>
        )
    }
}
export default connect(state=>({...state}),action)(Reg)