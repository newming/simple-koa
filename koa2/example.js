let SimpleKoa = require('./application');
let app = new SimpleKoa();

// 对ctx进行扩展
// app.context.echoData = function (errno = 0, data = null, errmsg = '') {
//   this.res.setHeader('Content-Type', 'application/json;charset=utf-8');
//   this.body = {
//     errno: errno,
//     data: data,
//     errmsg: errmsg
//   };
// };

// app.use(async ctx => {
//   let data = {
//     name: 'tom',
//     age: 16,
//     sex: 'male'
//   }
//   // 这里使用扩展，方便的返回utf-8格式编码，带有errno和errmsg的消息体
//   ctx.echoData(0, data, 'success');
// });

// 使用中间件
let responseData = {};

app.use(async (ctx, next) => {
  // console.log(ctx.body) // undefined
  responseData.name = 'tom';
  await next();
  ctx.body = responseData;
});

app.use(async (ctx, next) => {
  responseData.age = 16;
  await next();
});

app.use(async ctx => {
  responseData.sex = 'male';
});

// error handler
// app.use(async ctx => {
//   throw new Error('ooops');
// });

// app.on('error', (err) => {
//   // console.log(err.stack);
// });

app.listen(3000, () => {
  console.log('listenning on 3000');
});