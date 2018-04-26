let express = require('express');
let app = express();
let bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json()); //将数据转换成对象放到req.body上
let session = require('express-session'); //session中间件
let mongoStore = require('connect-mongo')(session);
app.use(session({
    resave:true,
    saveUninitialized:true,
    secret:'zfpx',
    store:new mongoStore({
        url:'mongodb://localhost:27017/ketang'
    })
}));
app.listen(3000);
//跨域头
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:8080"); //允许8080端口访问
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With"); //允许接收的头
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS"); //允许的方法
    res.header('Access-Control-Allow-Credentials','true');
    // 允许跨域设置cookie
    //如果发的是options的请求 响应ok 即可
    if(req.method==="OPTIONS") res.send(200);/*让options请求快速返回*/
    else  next();
});
//获取轮播图数据
let sliders = require('./mock/slider');
app.get('/slider',function (req,res) {
   res.json(sliders);
});

//获取课程列表
let lessonList = require('./mock/lessonList');
app.get('/lessonList/:type/:offset/:limit',function (req,res) {
    let {type,offset,limit} = req.params;
    console.log(type,offset,limit);
    res.json(lessonList);
});

/*
* 注册和登录都需要返回用户信息和错误信息
* 1、注册时：通过查找用户名，在数据库中找到传入的用户信息的用户名，就告诉客户端，已经注册过了。
* 2、登录时：通过查找用户名和用户密码，找到了就将用户信息返回到客户端，找不到就告诉客户端“没有注册”
* */

//实现注册功能
let crypto = require('crypto');
//md5摘要算法
//1.任意字符串转换出来的大小都相同
//2.不同内容转化出来的值不同
//3.不可逆
let md5 = (val)=>{
    return crypto.createHash('md5').update(val).digest('hex')
};
let User = require('./model');
app.post('/reg',function (req,res) {
    // 1、注册的过程就是将fetch传递过来的数据中的密码，通过md5加密后，将整个用户信息传入数据库中，并且将这些数据存放到session中，并且将这个session数据返回前端，用作验证使用，
    // 2、如果fetch传递过来的用户信息中的用户名，在数据库中已经存在了，那么就向前端发送一个消息，告诉前端此用户已经注册了
    //加密密码
    req.body.password = md5(req.body.password);
    console.log(req.body);
    User.findOne({username:req.body.username}).then(doc=>{
        if(doc){
            res.json({err:'用户存在了'})
        }else{
            User.create(req.body).then(doc=>{
                req.session.user = doc;//将当前用户存入到session中
                res.json(req.session.user);//将当前session保存到数据库中
            });
        }
    });
});

//登录
app.post('/login',function (req,res) {
    req.body.password = md5(req.body.password);
    User.findOne(req.body).then(data=>{
        // console.log(data);
        if(data){
            req.session.user = data;
            res.json(req.session.user);
            console.log(req.session.user);
        }else{
            res.json({err:'校验你的用户名或密码'})
        }
    });
});

//验证用户是否登录
app.get('/auth',function (req,res) {
   if(req.session.user){
       res.json(req.session.user)
   }else{
       res.json({}); //没有登录过 => userInfo:{}
   }
});




