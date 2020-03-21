const Koa = require('koa')
const Router = require('koa-router')
const Multer = require('koa-multer')

const app = new Koa()
const upload = Multer({
    storage: Multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './uploads')
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname.replace(/(\.[a-zA-Z0-7]+)$/g,
            ($0, $1) => '-' + Date.now() + $1))
        }
    })
})

const router = new Router()

router.all('*', async (ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', '*')
    ctx.set('Access-Control-Allow-Methods', 'POST,OPTIONS')
    await next()
})

router.options('/upload', async ctx => {
    ctx.body = ''
})

router.post('/upload', upload.single('file'), async ctx => {
    ctx.body = '上传完成'
})

app.use(router.routes())

app.listen(9999)