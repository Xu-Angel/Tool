/* 字母顺序排序字符串 */
const sortCharactersInString = str => [...str].sort((a, b) => a.localeCompare(b)).join('');
sortCharactersInString('cabbage'); // 'aabbceg'

/* 移除不是ASCII */
const removeNonASCII = str => str.replace(/[^\x20-\x7E]/g, '');
removeNonASCII('äÄçÇéÉêlorem-ipsumöÖÐþúÚ'); // 'lorem-ipsum'

/* 转义html */
const unescapeHTML = str =>
  str.replace(
    /&amp;|&lt;|&gt;|&#39;|&quot;/g,
    tag =>
      ({
        '&amp;': '&',
        '&lt;': '<',
        '&gt;': '>',
        '&#39;': "'",
        '&quot;': '"'
      }[tag] || tag)
  );
unescapeHTML('&lt;a href=&quot;#&quot;&gt;Me &amp; you&lt;/a&gt;'); // '<a href="#">Me & you</a>'

/* 反转义html */
const escapeHTML = str =>
  str.replace(
    /[&<>'"]/g,
    tag =>
      ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
      }[tag] || tag)
  );
escapeHTML('<a href="#">Me & you</a>'); // '&lt;a href=&quot;#&quot;&gt;Me &amp; you&lt;/a&gt;'

/* url拼接 */
const URLJoin = (...args) =>
  args
    .join('/')
    .replace(/[\/]+/g, '/')
    .replace(/^(.+):\//, '$1://')
    .replace(/^file:/, 'file:/')
    .replace(/\/(\?|&|#[^!])/g, '$1')
    .replace(/\?/g, '&')
    .replace('&', '?');
URLJoin('http://www.google.com', 'a', '/b/cd', '?foo=123', '?bar=foo'); // 'http://www.google.com/a/b/cd?foo=123&bar=foo'

/* 转驼峰命名 */
const toCamelCase = str => {
  let s =
    str &&
    str
      .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
      .map(x => x.slice(0, 1).toUpperCase() + x.slice(1).toLowerCase())
      .join('');
  return s.slice(0, 1).toLowerCase() + s.slice(1);
};
toCamelCase('some_database_field_name'); // 'someDatabaseFieldName'
toCamelCase('Some label that needs to be camelized'); // 'someLabelThatNeedsToBeCamelized'
toCamelCase('some-javascript-property'); // 'someJavascriptProperty'
toCamelCase('some-mixed_string with spaces_underscores-and-hyphens'); // 'someMixedStringWithSpacesUnderscoresAndHyphens'

/* 短横线命名 KebabCase */

const toKebabCase = str =>
  str &&
  str
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map(x => x.toLowerCase())
    .join('-');
toKebabCase('camelCase'); // 'camel-case'
toKebabCase('some text'); // 'some-text'
toKebabCase('some-mixed_string With spaces_underscores-and-hyphens'); // 'some-mixed-string-with-spaces-underscores-and-hyphens'
toKebabCase('AllThe-small Things'); // "all-the-small-things"
toKebabCase('IAmListeningToFMWhileLoadingDifferentURLOnMyBrowserAndAlsoEditingSomeXMLAndHTML'); // "i-am-listening-to-fm-while-loading-different-url-on-my-browser-and-also-editing-xml-and-html"

/* 下划线命名 */
const toSnakeCase = str =>
  str &&
  str
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map(x => x.toLowerCase())
    .join('_');
toSnakeCase('camelCase'); // 'camel_case'
toSnakeCase('some text'); // 'some_text'
toSnakeCase('some-mixed_string With spaces_underscores-and-hyphens'); // 'some_mixed_string_with_spaces_underscores_and_hyphens'
toSnakeCase('AllThe-small Things'); // "all_the_smal_things"
toSnakeCase('IAmListeningToFMWhileLoadingDifferentURLOnMyBrowserAndAlsoEditingSomeXMLAndHTML'); // "i_am_listening_to_fm_while_loading_different_url_on_my_browser_and_also_editing_some_xml_and_html"

/* 过滤html 标签 */
const stripHTMLTags = str => str.replace(/<[^>]*>/g, '');
stripHTMLTags('<p><em>lorem</em> <strong>ipsum</strong></p>'); // 'lorem ipsum'

/* 转标题格式 大写 */
const toTitleCase = str =>
  str
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map(x => x.charAt(0).toUpperCase() + x.slice(1))
    .join(' ');
toTitleCase('some_database_field_name'); // 'Some Database Field Name'
toTitleCase('Some label that needs to be title-cased'); // 'Some Label That Needs To Be Title Cased'
toTitleCase('some-package-name'); // 'Some Package Name'
toTitleCase('some-mixed_string with spaces_underscores-and-hyphens'); // 'Some Mixed String With Spaces Underscores And Hyphens'

/* 转译HTML */
const escapeHTML = str =>
  str.replace(
    /[&<>'"]/g,
    tag =>
      ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
      }[tag] || tag)
  );
escapeHTML('<a href="#">Me & you</a>'); // '&lt;a href=&quot;#&quot;&gt;Me &amp; you&lt;/a&gt;'

/* 相同字母异序单词 anagram */
const isAnagram = (str1, str2) => {
  const normalize = str =>
    str
      .toLowerCase()
      .replace(/[^a-z0-9]/gi, '')
      .split('')
      .sort()
      .join('');
  return normalize(str1) === normalize(str2);
};
isAnagram('iceman', 'cinema'); // true

/* 大写单词首字母 
Capitalizes the first letter of every word in a string.

Use String.prototype.replace() to match the first character of each word and String.prototype.toUpperCase() to capitalize it.
*/

const capitalizeEveryWord = str => str.replace(/\b[a-z]/g, char => char.toUpperCase());
capitalizeEveryWord('hello world!'); // 'Hello World!'

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

// 清空或截断数组
// 在不重新给数组赋值的情况下，清空或截断数组的最简单方法是更改​​其 length 属性值：
const arr = [11, 22, 33, 44, 55, 66];
// truncanting
arr.length = 3;
console.log(arr); //=> [11, 22, 33]
// clearing
arr.length = 0;
console.log(arr); //=> []
console.log(arr[2]); //=> undefined

// 数组最大值


const max = arr => Math.max(...arr)
max([1, 2, 3]) // 3


// 数组求和


const sum = arr => arr.reduce((a, b) => (a + b), 0)
sum([1, 2, 3]) // 6

// Returns the sum of two or more numbers/arrays.
const sum = (...arr) => [...arr].reduce((acc, val) => acc + val, 0);
sum(...[1, 2, 3, 4]); // 10
const sumBy = (arr, fn) =>
  arr.map(typeof fn === 'function' ? fn : val => val[fn]).reduce((acc, val) => acc + val, 0);

sumBy([{ n: 4 }, { n: 2 }, { n: 8 }, { n: 6 }], o => o.n); // 20
sumBy([{ n: 4 }, { n: 2 }, { n: 8 }, { n: 6 }], 'n'); // 20

// 数组拷贝

let array1 = [1, "3", { a: 1}, 666];
let copyArray = [ ...array1 ];
console.log(copyArray) // [1, "3", {…}, 666]

/* slice() 返回数组副本 */

/* 求中间值 Returns the median of an array of numbers. */
const median = arr => {
  const mid = Math.floor(arr.length / 2),
    nums = [...arr].sort((a, b) => a - b);
  return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
};
median([5, 6, 50, 1, -5]); // 5

/* 数组过滤 false null 0 '' undefined NaN */
//1.0 filter
const compact = arr => arr.filter(Boolean)
compact([0, 1, false, 2, '', 3, 'a', 'e' * 23, NaN, 's', 34]); // [ 1, 2, 3, 'a', 's', 34 ]

/* 数组分块 */
const chunk = (arr, size) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
    arr.slice(i * size, i * size + size)
  )
chunk([1, 2, 3, 4, 5], 2); // [[1,2],[3,4],[5]]


/* 数组中某个值的出现次数 */
const countOccurrences = (arr, val) => arr.reduce((a, v) => (v === val ? a + 1 : a), 0)
countOccurrences([1, 1, 2, 1, 2, 3], 1); // 3

/* 数组深度平铺 */

//1.0 cancat , ...运算符, 递归
const deepFlatten = arr => [].concat(...arr.map(v => Array.isArray(v) ? deepFlatten(v) : v))
deepFlatten([1, [2], [[3], 4], 5]); // [1,2,3,4,5]

/* 数组任意平铺 */

//1.0 isArray 加上reduce 函数 扩展
const flatten = (arr, depth = 1) => arr.reduce((a, v) => a.concat(depth > 1 && Array.isArray(v) ? flatten(v, depth -1) : v), [])
flatten([1, [2], 3, 4]); // [1, 2, 3, 4]
flatten([1, [2, [3, [4, 5], 6], 7], 8], 2); // [1, 2, 3, [4, 5], 6, 7, 8]

/*  找出两数组中不同的值 */
//1. Set数据结构中有 has()方法
const difference = (a, b) => {
  const s = new Set(b)
  return a.filter(v => !s.has(v))
}
difference([1, 2, 3], [1, 2, 4]); // [3]

/*  找出两数组中相同的值 */ // intersection 美 /,ɪntɚ'sɛkʃən/ 
//1. Set数据结构中有 has()方法
const common = (a, b) => {
  const s = new Set(b)
  return a.filter(v => s.has(v))
}
common([1, 2, 3], [1, 2, 4]); // [1, 2]
// 1.5 includes
const similarity = (arr, values) => arr.filter(v => values.includes(v))
similarity([1, 2, 3], [1, 2, 4]) // [1, 2]

//2. 符合规则的分组
const intersectionBy = (a, b, fn) => {
  const s = new Set(b.map(fn))
  return a.filter(v => s.has(fn(v)))
}
intersectionBy([2.1, 1.2], [2.3, 3.4], Math.floor); // [1.2]
intersectionBy([{ x: 2 }, { x: 1 }], [{ x: 1 }], v => v.x); // [ { x: 2 } ]

/* 数组中最长的项 */
//1.0 reduce
const longestItem = (...vals) => vals.reduce((pre, cur) => (cur.length > pre.length ? cur  : pre))
longestItem('this', 'is', 'a', 'testcase'); // 'testcase'
longestItem(...['a', 'ab', 'abc']); // 'abc'
longestItem(...['a', 'ab', 'abc'], 'abcd'); // 'abcd'
longestItem([1, 2, 3], [1, 2], [1, 2, 3, 4, 5]); // [1, 2, 3, 4, 5]
longestItem([1, 2, 3], 'foobar'); // 'foobar'

/* 找出数组中匹配指定值的第一值的索引 */
//1. findIndex
const index = (arr, val) => arr.findIndex( v => v === val)
index([1, 2, 4], 4)  // 2

/* 找出数组中匹配指定值的所有索引 若为空则返回空数组*/
//1. reduce() 方法
const indexOfAll = (arr, val) => arr.reduce((pre, cur, i) => (cur === val ? [...pre, i] : pre), [])
indexOfAll([1, 2, 3, 1, 2, 3], 1); // [0,3]
indexOfAll([1, 2, 3], 4); // []


/* 找去排序的索引 */
const sortedIndex = (arr, n) => {
  const isDescending = arr[0] > arr[arr.length - 1];
  const index = arr.findIndex(el => (isDescending ? n >= el : n <= el));
  return index === -1 ? arr.length : index;
};
sortedIndex([5, 3, 2, 1], 4); // 1
sortedIndex([30, 50], 40); // 1
sortedIndex([30, 50], 30); // 0

/* 该值中最后的一个值的索引 */
const sortedLastIndex = (arr, n) => {
  const isDescending = arr[0] > arr[arr.length - 1];
  const index = arr.reverse().findIndex(el => (isDescending ? n <= el : n >= el));
  return index === -1 ? 0 : arr.length - index;
};
sortedLastIndex([10, 20, 30, 30, 40], 30); // 4

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
//2. 通过索引来判断
arr.filter((v, i, arr)=> arr.indexOf(v) === arr.lastIndexOf(v))
//3. reduce
var arr = ["apple", "orange", "apple", "orange", "pear", "orange"];
arr.reduce((pre, next) => {
  pre[next] = (pre[next] + 1) || 1
  return pre
}, {})
function getWordCnt(){
  return arr.reduce(function(prev,next){
    prev[next] = (prev[next] + 1) || 1;
    return prev;
  },{});
}
console.log(getWordCnt());// { apple: 2, orange: 3, pear: 1 }
// 3.1
var newArr = arr.reduce(function (prev, cur) {
  prev.indexOf(cur) === -1 && prev.push(cur);
  return prev;
}, []);

/* 数组去重并且合并 */
const union = (a, b) => Array.from(new Set([...a, ...b]));
union([1, 2, 3], [4, 3, 2]); // [1,2,3,4]

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

/* 取出数组中从大到小排序，执行项数长度的数组 */
//1.0 Use Array.prototype.sort() combined with the spread operator (...) to create a shallow clone of the array and sort it in descending order. Use Array.prototype.slice() to get the specified number of elements. Omit the second argument, n, to get a one-element array.
const maxN = (arr, n = 1) => [...arr].sort((a, b) => b -a).slice(0, n)
maxN([1,2,3]) // [3]
maxN([1,2,3], 2) // [3, 2]
/* 取出数组中从小到大排序，指定项数长度的数组 */
const mixN = (arr, n = 1) => [...arr].sort((a, b) => a - b).slice(0, n)
minN([1, 2, 3]); // [1]
minN([1, 2, 3], 2); // [1,2]


/* 取出数组中指定位置的值 */
//1.0 slice方法
const nthElement = (arr, n =0) => (n === -1 ? arr.slice(n) : arr.slice(n, n + 1))[0]
nthElement(['a', 'b', 'c'], 1); // 'b'
nthElement(['a', 'b', 'b'], -3); // 'a'

/* converge  数组平均值 */
const converge = (converger, fns) => (...args) => converger(...fns.map(fn => fn.apply(null, args)));
const average = converge((a, b) => a / b, [
  arr => arr.reduce((a, v) => a + v, 0),
  arr => arr.length
]);
average([1, 2, 3, 4, 5, 6, 7]); // 4

// 2.0
const average = (...nums) => nums.reduce((acc, val) => acc + val, 0) / nums.length;
average(...[1, 2, 3]); // 2
average(1, 2, 3); // 2

/* 平均值 by */
const averageBy = (arr, fn) =>
  arr.map(typeof fn === 'function' ? fn : val => val[fn]).reduce((acc, val) => acc + val, 0) /
  arr.length;
averageBy([{ n: 4 }, { n: 2 }, { n: 8 }, { n: 6 }], o => o.n); // 5
averageBy([{ n: 4 }, { n: 2 }, { n: 8 }, { n: 6 }], 'n'); // 5
/* 数组偏移 */
//1.0 slice
const offset = (arr, offset) => [...arr.slice(offset), ...arr.offset(0, offset)]
offset([1, 2, 3, 4, 5], 2); // [3, 4, 5, 1, 2]
offset([1, 2, 3, 4, 5], -2); // [4, 5, 1, 2, 3]

/* 取出一个数组中的最大值和最小值 */

var numbers = [5, 458 , 120 , -215 , 228 , 400 , 122205, -85411]
var maxInNumbers = Math.max.apply(Math, numbers)
// => 12205
var minInNumbers = Math.min.apply(Math, numbers)
// => -85411

/* 初始化一个二维数组 */
//1.0 map方法
const initialize2DArray = (w, h, val = null) => Array.from({ length: h}).map(() => Array.from({ length: w}).fill(val))
initialize2DArray(2, 2, 0); // [[0,0], [0,0]]


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

/* forEach 右值循环 */
const forEachRight = (arr, callback) =>
  arr
    .slice(0)
    .reverse()
    .forEach(callback)

/* 数组自定义分组 */

const groupBy = (arr, fn) =>
  arr.map(typeof fn === 'function' ? fn : val => val[fn]).reduce((acc, val, i) => {
    acc[val] = (acc[val] || []).concat(arr[i]);
    return acc;
  }, {});
groupBy([6.1, 4.2, 6.3], Math.floor); // {4: [4.2], 6: [6.1, 6.3]}
groupBy(['one', 'two', 'three'], 'length'); // {3: ['one', 'two'], 5: ['three']}

/* 数组排序 升序 降序 */
// 1.0 entries 方法
const isSorted = arr => {
  let direction = -(arr[0] - arr[1])
  for(let [i, val] of arr.entries()) {
    direction = !direction ? -(arr[i -1] -arr[i]) : direction
    if (i === arr.length -1) return !direction ? 0 : direction
    else if (val- arr[i + 1] * direction > 0) return 0
  }
}
isSorted([0, 1, 2, 2]); // 1
isSorted([4, 3, 2]); // -1
isSorted([4, 3, 5]); // 0

/* TODO:列举数组所有组合可能性 */

const permutations = arr => {
  if (arr.length <= 2) return arr.length === 2 ? [arr, [arr[1], arr[0]]] : arr;
  return arr.reduce(
    (acc, item, i) =>
      acc.concat(
        permutations([...arr.slice(0, i), ...arr.slice(i + 1)]).map(val => [item, ...val])
      ),
    []
  );
};
permutations([1, 33, 5]); // [ [ 1, 33, 5 ], [ 1, 5, 33 ], [ 33, 1, 5 ], [ 33, 5, 1 ], [ 5, 1, 33 ], [ 5, 33, 1 ] ]

/* ES6 高仿splice 但不改变原数组*/
const shank = (arr, index = 0, delCount = 0, ...elements) =>
  arr
    .slice(0, index)
    .concat(elements)
    .concat(arr.slice(index + delCount));
const names = ['alpha', 'bravo', 'charlie'];
const namesAndDelta = shank(names, 1, 0, 'delta'); // [ 'alpha', 'delta', 'bravo', 'charlie' ]
const namesNoBravo = shank(names, 1, 1); // [ 'alpha', 'charlie' ]
  console.log(names); // ['alpha', 'bravo', 'charlie']

/* 数组操作取索引，值 for-of 在原生中最好  简单地说，for/of是遍历数组最可靠的方式，它比for循环简洁，并且没有for/in和forEach()那么多奇怪的特例。for/of的缺点是我们取索引值不方便，而且不能这样链式调用forEach(). forEach()。
4 种循环语法，其他 3 种循环语法，都会忽略非数字属性：只有for/in不会忽略非数字属性： 所以，使用for/in遍历数组并不好。
// 使用for/of获取数组索引，可以这样写：

for (const [i, v] of arr.entries()) {
    console.log(i, v);
  }

  for (var i = array.length; i--; ) {
    // process array[i]
  }

  /* values() */
  const myArr = [2,3,4]

  let it = myArr.values();
  
  console.log(it.next());
  console.log(it.next());
  console.log(it.next());
  console.log(it.next());

  /* 
  https://www.liayal.com/article/5a7177acfb1bf64cecfdee9e
  */