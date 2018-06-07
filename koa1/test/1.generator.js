// demo 1 gererator 说明
// var gen=function*(){
//   console.log('begin!');
//   //yield语句，在这里跳出，将控制权交给anotherfunc函数。
//   yield anotherfunc;
//   //下次回来时候从这里开始执行
//   console.log('end!');
// }

// var anotherfunc = function () {
//   console.log('this is another function!');
// }

// var g=gen();
// var another=g.next();  //'begin!'
// //another是一个对象，其中value成员就是返回的anotherfunc函数
// another.value();  //'this is another function!'
// g.next();  //'end!';

// demo 2
var gen1=function*(){
  console.log('begin!');
  yield g2;
  console.log('end!');
}

var gen2=function*(){
  console.log('begin 2');
  yield anotherfunc;
  console.log('end 2');
}

var anotherfunc = function () {
  console.log('this is another function!');
}

var g = gen1();
var g2 = gen2();

var another1=g.next();  //'begin!';
var another2=another1.value.next(); //'begin 2';
another2.value(); //'this is another function!';
another1.value.next(); //'end 2';
g.next(); //'end!';