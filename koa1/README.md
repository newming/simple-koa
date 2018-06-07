# koa1 相关分析

koa1 主要还是利用 gererate 来实现 middleware 流程控制，但是有两种实现，早期的 thunk 及后来的 promise

co thunk 实现可以看这里 [前端乱炖](http://www.html-js.com/article/Analysis-of-JS-series-single-row-koa-source-from-zero-two-the-implementation-of-CO)

涉及到 co promise 的分析可以查看这里 [阮一峰](http://es6.ruanyifeng.com/#docs/generator-async#co-%E6%A8%A1%E5%9D%97)

[博客](https://github.com/mly-zju/blog/issues/5)