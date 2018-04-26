import {post ,get} from './index';

let url = 'http://localhost:3000';
//注册接口
export const regs = (userInfo) =>{
    return post(url+'/reg',userInfo)
};

//验证是否登录
export const auths = () =>{
    return get(url+'/auth');
};

//登录接口  执行这个函数，会将所传的参数作为数据传给后台，后台用md5,将用户信息中的密码加密，再在后台查找到对应用户信息，如果找到了，就把用户的用户名信息{ username: '11', password: '6512bd43d9caa6e02c990b0a82652dca' }，返回到客户端，
export const logins = (userInfo) =>{
    return post(url+'/login',userInfo)
};