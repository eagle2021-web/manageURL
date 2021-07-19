//第一题
/**
 * undefined,undefined,undefined
 * 10,13,14
 * 100,13,200
 * 12,13,200
 */
//第二题
/**
 * 10
 * 10
 */
//第三题
/**
 * 1
 * {name:'jack'}
 */
//第四题
/**
 * undefined 做错 var 和 function都会变量提升 
 *  为啥没有function的时候不是undefined,
 *  有function的时候就是f a(){}
 */
//第五题
/**
 * undefined
 * undefined
 * 12
 * `````````
 * undefined
 * 12
 * 13
 * `````````
 * undefined  //做错
 * 12 
 * 13 
 */
//第六题
/**
 * undefined //做错
 * "world"
 * "hello"
 */
//第七题不会
//第八题
/**
 * 3
 * 3  //做错
 * ······
 * 3
 * 3  //做错
 * ······
 * 4
 * 1  //做错前面2题后，作对
 */
// var x = 1;
// function func(x,y=function f(){x=2}){
//     x = 3;
//     y();
//     console.log(x);
// };
// func(5);
// console.log(x);

//二
/**
 * 1. "NaNTencent[object Object]null9false"
 * 2."no"
 *   "ok"
 
 * 3."number"
 * 4.[27,0,13,14,123] //做错看了 百度会做了
 */
/**
 * 1.10 11 3
 * 2. 3 
 *   10 
 *   undefined
 * 3.5
 *   5
 *   6
 *   7
 * 4."4"
 * 5.9
 *   10
 *   10
 *   1
 * 6.11 6  
 *   13   
 *   10 6
 * 7.undefined 0
 *   1
 *   1
 * 8。闭包是一种机制。代码执行可能会形成新的私有上下文，该上下文里的
 *  私有变量会被保护，不受外界干扰;如果该上下文产生的堆被其他上下文占用
 *  ，那么该上下文的变量会被保存，占用的内存不被释放。这就是闭包的保护保存机制
 *  优点：防止代码冲突；
 *  缺点：过多闭包会占用过多内存，降低系统性能
 * 9.同；都用来声明变量
 *  异：1.var有变量提升，let无
 *      2.声明的变量可以提前使用，let声明的变量不能提前使用，这是暂时性死区
 *      3.let可以创建块级作用域
 *      4.var可以重复声明，let不行
 * 
 * 10. f b(){} 
 *     10
 *     改
 * var b = 10;
    (function b() {
        var b = 20;
        console.log(b);
    })();
    console.log(b);
 */
// 11
const fn = function fn(...arg){
    let sum = eval(arg.join('+'));
    const temp = function temp(...arg){
        sum += eval(arg.join('+'));
        return temp;
    };
    temp.toString = function(){
        return sum;
    };
    return temp;
};
let res = fn(1,2)(3);
console.log(res);
//四 
/**
 * 1题
 * 22
 * 23
 * 65 30
 * 
 * 2题
 * obj //做错到底是什么呢
 * window
 * 
 * 3题
 *  undefined
 *  "language"
 * 4题
 * 'window'
 * 
 * 5题
 * "24"
 * 
 * 6题
 * "12"
 */

var x = 1;
function func(x, y = function anonymous1(){x = 2}){
    x = 3;
    y();
    console.log(x);
};
func(5);
console.log(x);

var x = 1;
function func(x, y = function anonymous1(){x = 2}){
    var x = 3;
    y();
    console.log(x);
};
func(5);
console.log(x);

var x = 1;
function func(x, y = function anonymous1(){x=2}){
    var x = 3;
    var y = function anonymous1(){x = 4}
    y();
    console.log(x);
};
func(5);
console.log(x);

var obj = {n:1};
function func(x, y = function anonymous1(){x.m = 2}){
    var x = 3;
    // var y = function anonymous1(){x = 4}
    y();
    console.log(x);
};
func(obj);
console.log(obj);

console.log(foo);//undefined
{
    console.log(foo);//undefined
    function foo() {}
    console.log(foo);//undefined
    foo = 1;
    console.log(foo);//undefined
    function foo() {}
    console.log(foo);//undefined
    foo = 2;
    
}
console.log(foo);