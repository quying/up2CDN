const Koa = require('koa');
const Router = require('koa-router');
const koaBody = require('koa-body');
const swig = require('koa-swig');
const co = require('co');
const path = require('path');
const static = require('koa-static');
const session = require('koa-session');
const mongoose = require('mongoose');

const route = require('./routes/index.js');

const app = new Koa();

app.keys = ['This is up2cdn secret hurr'];

app.use(session(app));
// 初始化配置
require('./config/init.js')(app, mongoose);

//mongod
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connect to mongo.');
});

app.use(static(path.join(__dirname, 'public')));


//模版引擎

app.context.render = co.wrap(swig({
	  root: path.join(__dirname, 'views'),
	  writeBody: false
}));


// const handler = async (ctx, next) => {
//   try {
//     await next();
//   } catch (err) {
//     ctx.response.status = err.statusCode || err.status || 500;
//     ctx.response.type = 'html';
//     ctx.response.body = '<p>Something wrong, please contact administrator.</p>';
//     ctx.app.emit('error', err, ctx);
//   }
// };


// 路由
const router = new Router();

route(router);

// const main = ctx => {
//   	// ctx.response.body = 'Hello World';
//   	// ctx.throw(500);
//   	const n = Number(ctx.cookies.get('view') || 0) + 1;
//   	ctx.cookies.set('view', n);
//   	ctx.response.body = n + ' views';
// };
// router.get('/', main)

app.use(router.routes());
// app.on('error', (err, ctx) => {
//   console.log('logging error ', err.message);
//   console.log(err);
// });

// app.use(handler);



const port = process.env.PORT || 3000
app.listen(port)

console.log('listening on port ' + port)

