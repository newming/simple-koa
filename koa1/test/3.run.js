function run(gen) {
  var g;
  if (typeof gen.next === 'function') {
    g = gen;
  } else {
    g = gen();
  }
  function next() {
    var tmp = g.next();
    //如果tmp.done为true，那么证明generator执行结束，返回。
    if (tmp.done) {
      return;
    } else if (typeof g.next === 'function') {
      run(tmp.value);
      next(); // 注意这里的 next 需要等到上边的 run 执行完毕后(12 行 return 时)才往下走，这样就是保存了当时的 g 函数
    }
  }
  next();
}

function compose(middlewares) {
  return function(next) {
    var i = middlewares.length;
    var next = function*() {}();
    while (i--) {
      next = middlewares[i].call(this, next);
    }
    return next;
  }
}

var gen1 = function*(next) {
  console.log('begin!');
  yield next;
  console.log('end!');
}

var gen2 = function*(next) {
  console.log('begin 2');
  yield next;
  console.log('end 2');
}

var gen3 = function*(next) {
  console.log('this is another function!'); // 打印你的时候是在 g = gen()，这时 done = true
}

var bundle = compose([gen1, gen2, gen3]);

run(bundle);

// 对应源码中的 process_control.js