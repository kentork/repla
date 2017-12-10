const fs = require('fs'),
  path = require('path')

const koa = require('koa'),
  logger = require('koa-logger'),
  serve = require('koa-static'),
  body = require('koa-body'),
  Router = require('koa-router')

const repl = require('./lib/repl')
const docker = require('./lib/docker')

const app = new koa()
const router = new Router()

app.use(body())
app.use(logger())
app.use(serve('./public'))

router.get('/api/repls', async (ctx, next) => {
  ctx.body = await repl.readRepls('./repls')
  return next()
})

router.get('/api/repls/:repl/template', async (ctx, next) => {
  ctx.body = await repl.readTemplate(ctx.params.repl)
  return next()
})

router.post('/api/run/:repl', async (ctx, next) => {
  ctx.body = await docker.run(ctx.params.repl, ctx.request.body)
  return next()
})

app.use(router.routes()).use(router.allowedMethods())

app.listen(7070)
