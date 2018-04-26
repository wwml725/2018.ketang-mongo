
import {regs,auths,logins} from '../../api/user';
import * as Types from '../action-types';
import util from '../../common/util';
import {push} from 'react-router-redux';

//异步action

//登录
export const login = (userInfo) => (dispatch)=>{
    //异步调用登录接口获取后台返回的数据，把这些数据放到actions中，把dispatch（action）封装成一个函数，在登录组件中调用这个函数，就相当于将action派发到reducer中，经过reducer的加工运算，更新reducer中的状态

    //实际就是：从后台调用接口，返回数据，将数据派发给reducer
    logins(userInfo).then(data=>{
        if(data.err){
            dispatch({
                type:Types.SET_ERROR,
                err:data.err
            });
        }else{
            util.set('user',data);
            dispatch({
                type:Types.SET_USER_INFO,
                userInfo:data
            });
            dispatch(push('/lesson'));
        }
    })
};
//注册
export const reg = (userInfo) => (dispatch)=>{
    //调用注册接口，传入注册时候填入的用户信息
    //1、第一次注册的时候，是将填入的数据通过regs()这个api中的fetch，传递给后台，后台将用户信息密码进行加密，并且将用户信息保存到session中，命名为user，然后将用户信息返回到前端
    //2、第二次注册的时候，将用户信息传入后台，加密之后，在判断数据库中是否存在相同的用户名，如果已经存在，告诉客户端用户信息已经存在，如果不存在，那么就像第一次一样保存数据到数据库

    regs(userInfo).then(data=>{
        console.log(data);
        if(data.err){
            dispatch({
                type:Types.SET_ERROR,
                err:data.err
            })
        }else{
            //将用户信息保存到sessionStorage中，点击注册之后跳转到lesson页面
            util.set('user',data); //这里备用一份数据信息,以后做同步验证的时候可以使用 这个数据
            dispatch({
                type:Types.SET_USER_INFO,
                userInfo:data,
            });
            dispatch(push('/lesson')); //跳转路由
            //由于 redux中没有push方法，要引入  import {push} from 'react-router-redux';
        }
    })
};
// 验证是否登录
export const auth = () => (dispatch) =>{
    auths().then(data=>{
       if(data.username){
           util.set('user',data); //存入到sessionStorage中
           dispatch({
               type:Types.SET_USER_INFO,
               userInfo:data
           })
       }else{
           //如果没登录 取到登录页
       }
    });
};

export const validate = ()=> (dispatch)=>{
    auths().then(data=>{
        if(data.username){
            util.set('user',data); //存入到sessionStorage中
            dispatch({
                type:Types.SET_USER_INFO,
                userInfo:data
            });
            dispatch(push('/lesson'));
        }
    });
};
