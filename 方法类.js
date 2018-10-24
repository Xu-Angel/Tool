

/* 函数防抖 debounce  那么多秒执行一次*/

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


/* Throttle 节流方法，用来返回一个新函数。只有当两次触发之间的时间间隔大于事先设定的值，这个新函数才会运行实际的任务。 */

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


/* 生成 `GUID` */

Math.guid = function(){
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    }).toUpperCase();
};


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
