module.exports = {

  get query() {
    return this.request.query;
  },

  get body() {
    return this.response.body;
  },

  set body(data) {
    this.response.body = data;
  },

  get status() {
    return this.response.status;
  },

  set status(statusCode) {
    this.response.status = statusCode;
  }

};

// 和上面注释代码功能相同，起到代理作用，但是我不太推荐  __defineSetter__ 这样的写法，好像要废
// let proto = {};

// // 为proto名为property的属性设置setter
// function delegateSet(property, name) {
//     proto.__defineSetter__(name, function (val) {
//         this[property][name] = val;
//     });
// }

// // 为proto名为property的属性设置getter
// function delegateGet(property, name) {
//     proto.__defineGetter__(name, function () {
//         return this[property][name];
//     });
// }

// // 定义request中要代理的setter和getter
// let requestSet = [];
// let requestGet = ['query'];

// // 定义response中要代理的setter和getter
// let responseSet = ['body', 'status'];
// let responseGet = responseSet;

// requestSet.forEach(ele => {
//     delegateSet('request', ele);
// });

// requestGet.forEach(ele => {
//     delegateGet('request', ele);
// });

// responseSet.forEach(ele => {
//     delegateSet('response', ele);
// });

// responseGet.forEach(ele => {
//     delegateGet('response', ele);
// });

// module.exports = proto;