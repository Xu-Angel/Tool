// 变量交换

 let a = 'word', b = 'hello'
 [a, b] = [b, a]
 console.log(a) // hello
 console.log(b) // word

// 接收函数返回的多个结果 使用async/await，函数会把返回值放在一个数组中。使用数组解构后就可以把返回值直接赋给相应的变量。

const [user, account] = await Promise.all([
  fetch('/user'),
  fetch('/account')
])

// 数组最大值


const max = arr => Math.max(...arr)
max([1, 2, 3]) // 3


// 数组求和


const sum = arr => arr.reduce((a, b) => (a + b), 0)
sum([1, 2, 3]) // 6


// 数组拷贝

let array1 = [1, "3", { a: 1}, 666];
let copyArray = [ ...array1 ];
console.log(copyArray) // [1, "3", {…}, 666]


/* 数组连接 */

const one = ['a', 'b']
const two = ['c', 'd']
const three = ['g', 'f']

//1. concat方法
const result = one.concat(two, three)
const result = [].concat(one, two, three)
//2. 展开运算符
const result = [...one, ...two, ...three]

/* 数组去重 */
const arr = [1, 1, 2, 2, 3]

//1. Set()
Array.from(new Set(arr))
//1.1 ... === Array.form : ...运算符会把 Set 转换为 Array
const arr = [...new Set(arr)]

/* 删除对象中不需要的参数 || 抽取对象中某部分*/
const Obj =  { boy1: "sunshine", boy2: "sunshine", girl1: "beautiful", girl2: "very beautiful", girl2: "very beautiful", girl2: "very very beautiful" }
// 拿出除了 boy类外 girl

//1. 展开运算符
console.log(Obj) // { boy1: 'sunshine',boy2: 'sunshine',girl1: 'beautiful',girl2: 'very very beautiful' }
const {boy1, boy2, ...others} = Obj
console.log(others) //{ girl1: 'beautiful', girl2: 'very very beautiful' }

/* 实现数组的随机排序 */

//1. sort自定义函数
var arr = [1,2,3,4,5,6,7,8,9,10];
arr.sort(function(){
    return Math.random() - 0.5;
})
console.log(arr);

/* 取出一个数组中的最大值和最小值 */

var numbers = [5, 458 , 120 , -215 , 228 , 400 , 122205, -85411]
var maxInNumbers = Math.max.apply(Math, numbers)
// => 12205
var minInNumbers = Math.min.apply(Math, numbers)
// => -85411





/*  将浮点数点左边的数每三位添加一个逗号，如12000000.11转化为『12,000,000.11 */
// 1. 正则
function commafy(num){
  return num && num
      .toString()
      .replace(/(\d)(?=(\d{3})+\.)/g, function($1, $2){
          return $2 + ',';
      });
}


/* 判断是否为整数 */

// 1. 最优雅
function isInteger(x) { return (x^0) === x; }
// 2. 常用（`Math.round` 也可以换成 `Math.ceil Math.floor`）
function isInteger(x) { return Math.round(x) === x; }
// 3. 稍微复杂一点
function isInteger(x) { return (typeof x === 'number') && (x % 1 === 0);


/* 数字四舍五入 */

// v: 值， p: 精度
function round(v, p) {
  p = Math.pow(10, p >>> 31 ? 0 : p | 0)
  v *= p
  return (v + 0.5 + (v >> 31) | 0) / p
}
// 使用
round(123.456788, 2)  // 123.46