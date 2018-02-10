module.exports = {
    'GET /': (ctx) => {
        ctx.render('test.html',{
            title: 'Koa-MVC'
        });
    }
};