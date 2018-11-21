

/* 函数防抖 debounce  那么多秒执行一次*/
//1.0
function debounce(func, delay) {
  var timeout;
  return function(e) {
      console.log("清除",timeout,e.target.value)
      clearTimeout(timeout);
      var context = this, args = arguments
      console.log("新的",timeout, e.target.value)
      timeout = setTimeout(function(){
        console.log("----")
        func.apply(context, args);
      },delay)
  };
};

var validate = debounce(function(e) {
  console.log("change", e.target.value, new Date-0)
}, 380);

// 绑定监听
document.querySelector("input").addEventListener('input', validate);

// 2.0
const debounce = (fn, ms = 0) => {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
  };
};
window.addEventListener(
  'resize',
  debounce(() => {
    console.log(window.innerWidth);
    console.log(window.innerHeight);
  }, 250)
); // Will log the window dimensions at most every 250ms

/* Throttle 节流方法，用来返回一个新函数。只有当两次触发之间的时间间隔大于事先设定的值，这个新函数才会运行实际的任务。 */
// 1.0
function debounce(func, wait, immediateRun) {
    var timeout,
        startTime = new Date();

    return function() {
        var context = this,
            args = arguments,
            curTime = new Date();

        clearTimeout(timeout);
        // 如果达到了规定的触发时间间隔，触发 handler
        if(curTime - startTime >= immediateRun){
            func.apply(context,args);
            startTime = curTime;
        }else{
            // 没达到触发间隔，重新设定定时器，等待时间 wait秒之后再触发 
            timeout = setTimeout(func, wait);
        }
    };
};
// 实际想绑定在事件上的 handler
function realFunc(){
    console.log("Success");
}
// 如果两次输入之间间隔大于 1000ms ，则立即执行操作，否则就等待 500ms 之后再执行
$('input').on('keydown', debounce(realFunc, 500,1000));


//2.0
const throttle = (fn, wait) => {
  let inThrottle, lastFn, lastTime;
  return function() {
    const context = this,
      args = arguments;
    if (!inThrottle) {
      fn.apply(context, args);
      lastTime = Date.now();
      inThrottle = true;
    } else {
      clearTimeout(lastFn);
      lastFn = setTimeout(function() {
        if (Date.now() - lastTime >= wait) {
          fn.apply(context, args);
          lastTime = Date.now();
        }
      }, Math.max(wait - (Date.now() - lastTime), 0));
    }
  };
};
window.addEventListener(
  'resize',
  throttle(function(evt) {
    console.log(window.innerWidth);
    console.log(window.innerHeight);
  }, 250)
); // Will log the window dimensions at most every 250ms

/* 生成 `GUID` */

Math.guid = function(){
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    }).toUpperCase();
};

/*  重复做多少次 对一个函数 */

/* Iterates over a callback n times
Use Function.call() to call fn n times or until it returns false. Omit the last argument, context, to use an undefined object (or the global object in non-strict mode) */

const times = (n, fn, context = undefined) => {
  let i = 0;
  while (fn.call(context, i) !== false && ++i < n) {}
};

var output = '';
times(5, i => (output += i));
console.log(output); // 01234

/* 解柯西化 https://30secondsofcode.org/function */
const uncurry = (fn, n = 1) => (...args) => {
  const next = acc => args => args.reduce((x, y) => x(y), acc);
  if (n > args.length) throw new RangeError('Arguments too few!');
  return next(fn)(args.slice(0, n));
};
const add = x => y => z => x + y + z;
const uncurriedAdd = uncurry(add, 3);
uncurriedAdd(1, 2, 3); // 6


/* TODO:defer */
const defer = (fn, ...args) => setTimeout(fn, 1, ...args);
// Example A:
defer(console.log, 'a'), console.log('b'); // logs 'b' then 'a'

// Example B:
document.querySelector('#someElement').innerHTML = 'Hello';
longRunningFunction(); // Browser will not update the HTML until this has finished
defer(longRunningFunction); // Browser will update the HTML then run the function

/* runPromisesInSeries promise 队列 */

const runPromisesInSeries = ps => ps.reduce((p, next) => p.then(next), Promise.resolve());
const delay = d => new Promise(r => setTimeout(r, d));
runPromisesInSeries([() => delay(1000), () => delay(2000)]); // Executes each promise sequentially, taking a total of 3 seconds to complete

/* sleep 睡眠函数 */

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
async function sleepyWork() {
  console.log("I'm going to sleep for 1 second.");
  await sleep(1000);
  console.log('I woke up after 1 second.');
}




/* 实现包含关系(`contains`) */

/*
 * target: 母字符串
 * str: 子字符串
 * separator: 可选，分隔符
 */
function contains(target, str, separator) {
    return separator ? 
           (separator + target + separator).indexOf(separator + str + separator) > -1 :
           target.indexOf(str) > -1;
}


/* 移除字符串中的 `html`标签 */

// 如果所需处理的 html字符串中含有 <script> 标签，则需要首先执行这个方法
function stripScripts(target) {
    return String(target || '').replace(/<script[^>]*>([\S\s]*?)<\/script>/img, '');
}
// 处理不包含 <script> 标签的 html字符串
function stripTags(target) {
    return String(target || '').replace(/<+>/g, '');
}


/*  给定一个范围（包括上下边界）以及一个数字n,输出以此范围内n个不重复数字组成的数组*/

// 以下代码没有对 n 是否存在、是否为数字、是否为整数等异常情况做校验，只是一个基本框架
function unique(min, max, n){
  var range = max - min;
  var o = Object.create(null), arr = [], i=0;
  if(n > range+1) {
    console.log('n超出范围');
    return;
  }
  var temp = Math.round(Math.random() * range + min);
  while(i < n){
    if(!o[temp]){
      o[temp] = true;
      arr.push(temp);
      i ++;
    } else {
      temp = Math.round(Math.random() * range + min);
    }
  }
  return arr;
}

/* 字符串去空格 */

//1. 简单好记版本
function trim(str) {
    return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
}

// 速度超快版本(其实还有比这个更快的)
//2. 前面的空格用正则，后面的用字符串原生方法
function trim(str) {
    str=str.replace(/^\s+/, '');
    var len=str.length-1;
    for(var i=len; i>=0; i--) {
        if(/\S/.test(str.charAt(i))) {
            str=str.substring(0, i+1);
            break;
        }
    }
    return str;
}


/* 简易版使用原生 `JS`判断浏览器是否支持 某个`CSS`属性 */
/*
 * attr: css属性
 * value: css属性的值，可选
 * ele: html标签元素，可选
 */
function isSupport(attr, value, ele){
  ele = ele ? ele : 'div'
  var element = document.createElement(ele)
  if(attr in element.style) {
    if(value) {
      element.style[attr] = value
      return element.style[attr] === value
    }
    return true
  }
  return false
}

// 使用
isSupport('textOverflow', 'ellipsis');
isSupport('height')


/* 如何优雅的取随机字符串 */

//1.0 13位
Math.random().toString(16).substring(2)
//2.0 11位
Math.random().toString(36).substring(2)


/* 判断是否 NaN */

// 依据 NaN 谁都不等于包括不等于自身的特性，即 NaN !== NaN：
function isNaN(value) { return value !== value }

/* 根据 url 动态创建加载 JS脚本 - come from 《高性能网站建设进阶指南》 */

var fnJsLoad = function(url, callback) {
  callback = callback || function(){}
  
  var eleScript = document.createElement('script')
  
  eleScript.onload = function() {
    // 防止多次创建
    if(!eleScript.isInited){
      eleScript.isInited = true
      callback()
    }
    
    // 低版本的 IE浏览器(IE9)使用这个函数加载
    eleScript.onreadystatechange = function() {
      if(!eleScript.isInited && /^loaded|complete$/) {
        eleScript.isInited = true
        callback()
      }
    }
    
    eleScript.src = url
    document.getElementsByTagName('head')[0].appendChild(eleScript)
  }
}

// 使用示例
fnJsLoad('https://cdn.bootcss.com/jquery/3.2.1/jquery.min.js', function(){
  // JS 脚本加载完成后的操作
})


/* 驼峰命名转下划线 */

function camel2Underline(name) {
  return name.match(/[a-z][0-9]+|[A-Z][a-z0-9]*/g).join('_').toLowerCase()
}


/* 异步链式调用 */
const chainAsync = fns => {
  let curr = 0;
  const next = () => fns[curr++](next);
  next();
};
chainAsync([
  next => {
    console.log('0 seconds');
    setTimeout(next, 1000);
  },
  next => {
    console.log('1 second');
  }
]);

/* curry 柯西化 */
const curry = (fn, arity = fn.length, ...args) =>
  arity <= args.length ? fn(...args) : curry.bind(null, fn, arity, ...args);
curry(Math.pow)(2)(10); // 1024
curry(Math.min, 3)(10)(50)(2); // 2