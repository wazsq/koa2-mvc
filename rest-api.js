/**
 * @author: sce
 * @desc: 为rest接口（请求json数据）注册统一处理的接口
 */

function restApiHandler(pathPrefix='/api/'){
    return async (ctx,next) => {
        if(ctx.request.path.startsWith(pathPrefix)){
            ctx.rest = (data) => {
                ctx.response.type='application/json';
                ctx.response.body={
                    code: 0,
                    data
                };
            };
        }
        await next();
    }
}

module.exports = restApiHandler;