module.exports = {
    'GET /': (ctx) => {
        console.log('test');
        ctx.render('index',{
            title: 'Koa-MVC'
        });
    }
};