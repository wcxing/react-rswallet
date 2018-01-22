/* eslint-disable */
let app = require('koa')()
let router = require('koa-router')()
let koaBody = require('koa-body')()

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