/* eslint-disable */
let app = require('koa')()
let router = require('koa-router')()
let koaBody = require('koa-body')()
// koa 设置跨域
let cors = require('koa-cors');

app.use(cors({
    // origin: function (ctx) {
    //     if (ctx.url === '/test') {
    //         return "*"; // 允许来自所有域名请求
    //     }
    //     return 'http://localhost:8080'; // 这样就能只允许 http://localhost:8080 这个域名的请求了
    // },
    // origin: '*',
    // exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    // maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}));

router.get('/', function *(next) {
    this.body = 'hello koa !'
})

router.get('/api', function *(next) {
    this.body = 'test data'
})
router.get('/api/1', function *(next) {
    this.body = 'test data 1'
});
router.get('/api/2', function *(next) {
    this.body = {
        a: 1,
        b: '123'
    }
});

router.post('/api/post', koaBody, function *(next) {
    console.log('next', next)
    console.log('bbbb', this.request.body)
    // this.body = this.request.body
    this.body = JSON.stringify(this.request.body)
});

app.use(router.routes())
   .use(router.allowedMethods());

app.listen(3006);