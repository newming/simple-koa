async function m1(next) {
  console.log('m1');
  await next();
}

async function m2(next) {
  console.log('m2');
  await next();
}

async function m3() {
  console.log('m3');
}

// 方案一
// let next1 = async function () {
//   await m3();
// }

// let next2 = async function () {
//   await m2(next1);
// }

// m1(next2); // m1, m2, m3

// 方案二
// function createNext(middleware, oldNext) {
//   return async function () {
//     await middleware(oldNext);
//   }
// }

// let next1 = createNext(m3, null);
// let next2 = createNext(m2, next1);
// let next3 = createNext(m1, next2);

// next3(); // m1, m2, m3

// 方案三
// let middlewares = [m1, m2, m3];
// let len = middlewares.length;

// function createNext(middleware, oldNext) {
//   return async function () {
//     await middleware(oldNext);
//   }
// }
// 最后一个中间件的next设置为一个立即resolve的promise函数
// let next = async function () {
//   return Promise.resolve();
// }
// // 注意这里是 倒序
// for (let i = len - 1; i >= 0; i--) {
//   next = createNext(middlewares[i], next); // 一直在重写 next
// }
// 立即执行最后一次的 next
// next();
