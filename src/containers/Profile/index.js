import React,{Component} from 'react';
import './index.less';
import profile from '../../common/images/profile.png';
import {Link,NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import * as action from '../../redux/actions/user'

import {CSSTransition, TransitionGroup} from 'react-transition-group'

class Profile extends Component{
    componentDidMount(){
        this.props.auth();
    }
    render(){
        return (
            <div className="profile">
                <div className="profile_bg">
                    <img src={profile} width={"60px"}/>
                    {this.props.user.userInfo.username?<div><a className="login_btn">{this.props.user.userInfo.username}</a><a className="out">退出</a></div> : <NavLink to={'/login'} className="login_btn">登录</NavLink>}
                </div>

                <p>1</p>
                <p>1</p>
                <p>1</p>


            </div>

        )
    }
}
export default connect(state=>({...state}),action)(Profile);