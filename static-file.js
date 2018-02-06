/**
 * @author: sce
 * @desc: 处理静态资源
 */
const path = require('path');
const mime = require('mime');
const fs = require('mz/fs');

/**
 * @param url 服务器允许请求静态资源的url头  如/static
 * @param dir 静态资源的路径 如 __dirname
 * @returns {function(*, *)}
 */
function staticFiles(url, dir) {
    return async (ctx, next) => {
        let reqPath = ctx.request.path;
        if (reqPath.startsWith(url)) {
            let filePath = path.join(dir, reqPath.substring(url.length));
            if (await fs.exists(filePath)) {
                ctx.response.type = mime.getType(reqPath); //设置相应类型（content-type）
                ctx.response.body = await fs.readFile(filePath); //输出静态文件
            } else {
                ctx.response.status = 404;
            }
        } else {
            await next();
        }
    };
}

module.exports = staticFiles;