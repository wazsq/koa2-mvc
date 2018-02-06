module.exports = {
    'GET /api/test': (ctx) => {
        ctx.rest('test');
    },
    'GET /api/test2': (ctx) => {
        ctx.rest('test2');
    }
};