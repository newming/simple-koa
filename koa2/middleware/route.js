// 参考文章
// https://zhuanlan.zhihu.com/p/38555047
// https://github.com/hardo/koa-router-demo

const methods = ['GET', 'POST', 'PUT', 'DELETE'];

class Router {
  constructor () {
    this.routesMap = new Map()
    const rm = this.routesMap

    methods.map(method => {
      rm.set(method, new Map())
    })
  }
  // 路由函数注册事件
  register(method, pattern, handler) {
    let routes = this.routesMap.get(method);
    if (!routes) {
      throw new Error('该HTTP方法不受支持！');
    }
    routes.set(pattern, handler);
  }
  // 匹配路由处理函数的函数
  matchHandler(method, url, ctx) {
    let routes = this.routesMap.get(method);

    // 路由映射不存在（没实现该HTTP方法）
    if (!routes) {
      return null;
    }
    for (let [key, value] of routes) {
      let matchs;
      if (matchs = key.exec(url)) {
        // 将匹配到的路径参数添加到`ctx`的`params`属性，以便路由处理函数使用
        ctx.params = matchs.slice(1);
        return value;
      }
    }
    return null;
  }
  // 中间件的函数
  middleware() {
    // 返回一个供Koa使用的中间件函数
    return async (ctx, next) => {
      const method = ctx.request.method;
      const url = ctx.request.url;
      const handler = this.matchHandler(method, url, ctx);
      if (handler) {
        await handler(ctx);
      } else {
        // handler对象为空，则说明没有匹配的路由，响应404状态
        ctx.status = 404;
        ctx.body = '404 Not Found!\n';
      }
      // 调用next函数以继续执行其他中间件
      await next();
    }
  }
}

methods.map((method) => {
  Router.prototype[method.toLowerCase()] = function(pattern, handler) {
    this.register(method, pattern, handler)
  }
});

module.exports = Router;

/**
 * 生成Router类对象
 *
 * @example
 *
 * ```javascript
 * const app = new Koa();
 * const router = new Router();
 *
 * app.use(router.middleware());
 * ```
 *
 * @constructor
 */