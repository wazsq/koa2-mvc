module.exports = {
    'GET /': (ctx) => {
        console.log('test');
        ctx.render('test.html',{
            title: 'Koa-MVC'
        });
    }
};