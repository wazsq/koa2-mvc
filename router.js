/**
 * @author: sce
 * @desc: 解析路由
 *  1、遍历controllers目录
 *  2、取得method，api，func注册到路由
 */

const fs = require('fs');
const join = require('path').join;
const {path: rootPath} = require('./config');

/**
 * 返回指定目录的文件名称数组
 * @param path 目录路劲
 * @returns {Array} 文件名数组
 */
function scanDirGetFileName(path){
    let result = [];
    const readDir = (_path) => {
        fs.readdirSync(_path).forEach((f) => {
            const fpath = join(_path, f);
            if(fs.statSync(fpath).isDirectory()){
                readDir(fpath)
            }else{
                result.push(fpath);
            }
        })
    };
    readDir(path);
    return result;
}

function addRoute(router, controller){
    for(const para in controller){
        const _para = para.split(' ');
        console.log(_para);
        console.log(controller[para]);
        router[_para[0].toLowerCase()](_para[1], controller[para]);
    }
}

/**
 * 获取controller，完成路由注册
 * @param router
 * @param dir
 */
function addController(router, dir) {
    scanDirGetFileName(`${rootPath}/${dir}`).filter((f) =>{
        return f.endsWith('.js');
    }).forEach((f) => {
        const controller = require(f);
        addRoute(router, controller);
    });
}

/**
 * @param dir 控制测代码路径
 * @returns {*} 路由中间件
 */
function server(dir='controllers'){
    let router = require('koa-router')();
    addController(router, dir);
    return router.routes();
}

module.exports = server;