const fs = require('node:fs')
const path = require('node:path')

const Koa = require('koa')
const static = require('koa-static')
const json = require('koa-json')
const cors = require('@koa/cors')

const app = new Koa()

app.use(static('./static'))

app.use(cors())

app.use(json({
  pretty: false,
  param: 'pretty'
}))

app.use(async (ctx)=> {
  try {
    let pathname = ctx.path
    if(pathname.endsWith('/')) {
      pathname += 'index'
    }

    const uri = path.join(path.dirname(__dirname), 'URIs')
    const pieces = [
      path.join(uri, `${pathname}.js`),
      path.join(uri, `${pathname}.json`)
    ]

    for(const i in pieces) {
      const filename = pieces.at(i)
      if(fs.existsSync(filename)) {
        const stacks = require(filename);
        // 默认匹配HTTP_METHOD
        if(ctx.method in stacks) {
          if(typeof stacks[ctx.method] === 'function') {
            ctx.body = await (stacks[ctx.method])(ctx)
          } else {
            ctx.body = stacks[ctx.method]
          }
          return
        }
        
        // 数据集中定义了默认方法或方法
        if(typeof stacks === 'function') {
          ctx.body = await stacks(ctx)
        }
        
        if(typeof stacks.default === 'function') {
          ctx.body = await stacks.default(ctx)
        }

        ctx.body = stacks
        return
      }
    }
  } catch (error) {
    // 没有资源匹配
    ctx.status = 500
    ctx.body = require('../URIs/error').serverError(error)
    return
  }

  // 没有资源匹配
  ctx.status = 404
  ctx.body = require('../URIs/error').notFound()
})

app.listen(4958);
console.log(`Server is running(http://localhost:4958)`)