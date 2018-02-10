/**
 * @author: sce
 * @desc: 项目启动文件，注册各种中间（日志，模板解析，路由，错误处理等）
 */
const Koa = require('koa');
const path = require('path');
const bodyParser = require('koa-bodyparser');
const cors = require('koa2-cors');
const limit = require('koa-limit');

const config = require('./config'); //配置文件

const app = new Koa();

//ip提交速率限制
app.use(limit({
    interval: 1000 * 60,
    limit: 100,
    message: '频繁操作！'
}));
//跨域请求
app.use(cors());
//解析请求
app.use(bodyParser());
//静态文件
app.use(require('./static-file')('/static/',`${config.path}/public`));
//模板加载
app.use(require('./template-view')(`views`));
//REST接口注册统一处理中间件
app.use(require('./rest-api')());
//注册路由
app.use(require('./router')());
app.on('error', (err) => {
    console.log(err);
});

app.listen(config.port);