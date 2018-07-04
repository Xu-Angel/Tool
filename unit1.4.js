/*
 * 2018.07.04
 * author：Angel*/
/*
* 轮播结构                          CSS：container-->> position:relative; 
                                                     overflow:hidden;
<div class="container">                图片Ul----->> position：absolute;    
    <ul class="img">                                width：自动生成
        <li><img src="";></li>         图片li----->>float:left;
    </ul>                            
    <ul class="point">
    </ul>
    <ul class="arrow">
        <li class="left"><</li>
        <li class="right">></li>
    </ul>
</div>
 */
/**
 * 
 * @param {*} container div>carouse.div/ul>
 * @param {*} time 切换一张图片的时间 
 * @param {*} speed 移速
 * @param {*} arrowContainer 箭头容器
 * @param {*} pointStyle 圆点活动样式的类名
 */
function carousel(container, time, speed, arrowContainer, pointStyle, ) {
  var ul = container.children[0]; //图片ul
  var index = 0; //记录图片索引
  var newLi = ul.children[0].cloneNode(true); //在最后一幅图后面添加第一幅图 形成无缝轮播
  ul.appendChild(newLi);
  var liS = ul.children; //所有图片的集合
  ul.style.width = liS.length * 100 + '%'; //图片总宽度
  /*判断是否需要圆点*/
  if (pointStyle) {
    var point = container.children[1]; //小圆点ul
    //根据图片数量生成小圆点，初始化轮播圆点状态
    for (var i = 1; i < liS.length; i++) {
      var li = document.createElement('li');
      li.innerHTML = i;
      point.appendChild(li);
    }
    var points = point.children;
    light();
    /*
     * 圆点点击更换图片
     */
    for (var j = 0; j < points.length; j++) {
      points[j].index = j;
      points[j].onclick = function() {
        index = this.index;
        leftAnimate(ul, -index * container.offsetWidth, speed);
        light();
      };
    }

    /*
     * 圆点样式改变函数
     */
    function light() {
      for (var i = 0; i < points.length; i++) {
        points[i].className = "";
      }
      index > (points.length - 1) ? points[0].className = pointStyle : points[index].className = pointStyle;
    }
  }

  /*
   * 右键头函数
   */

  function rightPlay() {
    index++;
    if (index > liS.length - 1) {
      ul.style.left = 0;
      index = 1;
    }
    leftAnimate(ul, -index * container.offsetWidth, speed);
    if (pointStyle) {
      light();
    }
  }

  /*
   * 左键头函数
   */

  function leftPlay() {
    index--;
    if (index < 0) {
      ul.style.left = -(liS.length - 1) * container.offsetWidth + "px";
      index = liS.length - 2;
    }
    leftAnimate(ul, -index * container.offsetWidth, speed);
    if (pointStyle) {
      light();
    }
  }

  /*判断是否需要左右箭头*/
  if (arrowContainer) {
    var left = arrowContainer.children[0]; //左箭头
    var right = arrowContainer.children[1]; //右箭头
    left.onclick = leftPlay;
    right.onclick = rightPlay;
  }

  /*
   * 监听 visibility change 事件
   */
  const tmpTitle = document.title
  document.addEventListener('visibilitychange', function() {
    // 页面变为不可见时触发
    if (document.visibilityState == 'hidden') {
      document.title = document.title + 'bye';
      clearInterval(container.timer);
    }
    if (document.visibilityState == 'visible') {
      document.title = tmpTitle;
      clearInterval(container.timer);
      container.timer = setInterval(rightPlay, time);
    }
  });

  /*
   * 自动轮播函数
   */
  container.timer = setInterval(rightPlay, time);
  container.onmouseover = function() {
    clearInterval(container.timer);
  };
  container.onmouseout = function() {
    clearInterval(container.timer);
    container.timer = setInterval(rightPlay, time);
  };
}

/*
 * @水平动画函数
 * @运动对象，obj
 * @运动目标位置，target
 * @运动速度,speed
 *
 */
function leftAnimate(obj, target, sp) {
  clearInterval(obj.timer);
  obj.timer = setInterval(function() {
    var speeds = (obj.offsetLeft > target ? -sp : sp);
    if (Math.abs(obj.offsetLeft - target) < sp) {
      obj.style.left = target + "px";
      clearInterval(obj.timer);
    } else {
      obj.style.left = obj.offsetLeft + speeds + "px";
    }
  }, 0)

}
/**
 * 
 * @param {*} time 传入倒计时，eg '2018/07/09 20:16:0'，返回天时分秒毫秒
 */
function Time(time) {
  let end = new Date(time).getTime()
  let now = Date.now()
  let range = end - now
  let day = parseInt(range / (24 * 3600000))
  range = range % (24 * 3600000)
  let hours = parseInt(range / 3600000)
  range = range % 3600000
  let minutes = parseInt(range / 60000)
  range = range % 60000
  let seconds = parseInt(range / 1000)
  let miles = Number((range+ '').substring((range+ '').length-2))
  if (range < 0) {
    minutes = day = hours = seconds = 0
  }
  return {
    day,
    hours,
    minutes,
    seconds,
    miles
  }
}

/**
 * 
 * @param {*} time 秒杀时间eg '2018/07/09 20:16:0'
 * @param {*} day  day填充元素
 * @param {*} hour hour填充元素
 * @param {*} min  min填充元素
 * @param {*} sec  sec填充元素
 */
function seckillTime(time, day, hour, min, sec) {
  Time(time)
  /**
   * 
   * @param {type:Number} val  units digit to tens digit
   */
  function convert(val) {
    return val >= 10 ? val : '0' + val
  }

  function show() {
    day.innerText = convert(Time().day)
    hour.innerText = convert(Time().hours)
    min.innerText = convert(Time().minutes)
    sec.innerText = convert(Time().seconds)
  }
  show()
  const timer = setInterval(function() {
    let zero = 0
    for (let key in Time()) {
      zero += Time()[key]
    }
    if (zero === 0) {
      clearInterval(timer)
    }
    show()
  }, 1000)
}
/**
 * 获取滚动条距离顶部和左侧的距离，兼容IE6+,Firefox,Chrome等
 */
function scroll() {
  // 判断是否有window.pageXOffset
  if (window.pageYOffset) {
    return {
      top: pageYOffset,
      left: pageXOffset
    };
  }
  // 再判断是否有声明DTD
  else if (document.compatMode == 'BackCompat') {
    return {
      top: document.body.scrollTop,
      left: document.body.scrollLeft
    }
  }
  // 默认使用documentElement
  else {
    return {
      top: document.documentElement.scrollTop,
      left: document.documentElement.scrollLeft
    }
  }
}
/*
 *
 *  兼容client*/
function client() {
  if (window.innerWidth) { // IE9+或其它浏览器
    return {
      width: window.innerWidth,
      height: window.innerHeight
    }
  } else if (document.compatMode === "CSS1Compat") {
    return {
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight
    }
  } else {
    return {
      width: document.body.clientWidth,
      height: document.body.clientHeight
    }
  }
}

/**
 * 缓动框架
 * @param obj       需要移动的标签
 * @param target    移动的参数JSON格式
 * @param callback  接收调用者传递的回调函数
 */
function animation(obj, target, callback) {
  clearInterval(obj.timer);
  obj.timer = setInterval(function() {
    var isClearInterval = true; // 记录是否需要清除定时
    for (var key in target) {
      var t = target[key]; // 目标位置
      var c = getStyle(obj, key); // 当前位置

      // 判断key有没有是opacity
      if (key === 'opacity') {
        c = Math.round(c * 100);
        // 如果传值取整是0，表示参数是小数需要*100，否则取数字本身
        t = parseInt(t) == 0 || parseInt(t) == 1 ? t * 100 : t;
      } else {
        c = parseInt(c); // 去除返回的单位
      }
      // (目标 - 当前) / 10
      var s = (t - c) / 10; // 每次移动的距离
      s = s > 0 ? Math.ceil(s) : Math.floor(s);
      if (key === 'opacity') {
        obj.style[key] = (c + s) / 100;
        obj.style.filter = '(alpha=' + (c + s) + ')';
      } else {
        obj.style[key] = c + s + 'px';
      }
      if (c + s != t) { // 判断是否移动到目录位置
        isClearInterval = false;
      }
    }
    if (isClearInterval) { // 只有所有的目标都到达预定位置才能清除定时器
      clearInterval(obj.timer);
      /*
      当动画执行完成以后，再判断是否有需要执行callback
      判断用户是否有传递回调函数，如果有执行回调函数
       */
      if (callback) {
        callback(); // 执行回调函数
      }
    }
  }, 30);
}

/**
 * 获取标签的样式
 * @param obj       获取样式的对象
 * @param property  获取的属性名称
 */
function getStyle(obj, property) {
  if (window.getComputedStyle) {
    return window.getComputedStyle(obj, null)[property];
  } else { // IE678
    return obj.currentStyle[property];
  }
}

/**
 * 兼容ie678的事件添加
 * @param obj       需要添加事件的标签对象
 * @param event     添加的事件
 * @param fn        事件的处理过程
 */
function addEvent(obj, event, fn) {
  if (obj.addEventListener) {
    obj.addEventListener(event, fn);
  } else { // IE678
    obj.attachEvent('on' + event, fn);
  }
}



/*
兼容getElementsByClassName
*/
document.getElementsByClassName =
  document.getElementsByClassName ?
  document.getElementsByClassName : getByClassName;

/**
 * 根据id，类名或标签选择对应的dom对象
 * @param obj           需要查找的关键字
 * @returns {*}
 */
function $(obj) {
  // 获取第一个字符，如果是#使用的id选择器，如果是.使用类选择器，其它使用tagName
  var first = obj.substr(0, 1);
  var name = obj.slice(1); // 需要查找的名称
  if (first == '#') { // 使用id
    return document.getElementById(name);
  } else if (first == '.') { // 使用class
    return document.getElementsByClassName(name);
  } else { // tagName
    return document.getElementsByTagName(obj)
  }

}

/**
 * 根据类选择器查找标签
 * @param className           选择器的名称
 * @returns {Array}
 */
function getByClassName(className) {
  var result = [];
  // 获取所有标签元素
  var allElements = document.getElementsByTagName('*');
  for (var i = 0; i < allElements.length; i++) {
    var el = allElements[i];
    // 判断标签是否有class属性
    if (el.className && hasClass(el, className)) {
      result.push(el);
    }
  }
  return result;
}

/**
 * 检查元素是否使用了指定的类选择器
 * @param el                标签元素
 * @param className         类选择器的名称
 */
function hasClass(el, className) {
  // 使用' '把className的内容分隔为数组形式
  var arr = el.className.split(' ');
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] == className) {
      return true;
    }
  }
  return false;
}

/**
 * 给标签添加新的类选择器
 * @param el               标签对象
 * @param className        类选择器的名称
 */
function addClass(el, className) {
  // 检查元素是否已经在使用需要添加的类名，如果没有使用才能添加
  if (!hasClass(el, className)) {
    el.className += ' ' + className;
    //el.className = className + ' ' + el.className;
    /*var arr = el.className.split(' ');
    arr.push(className)
    el.className = arr.join(' ');*/
  }
}

/**
 * 删除标签指定的类名
 * @param el                标签对象
 * @param className         需要删除的类名
 */
function removeClass(el, className) {
  var arr = el.className.split(' ');
  var pos = -1; // 保存className出现在的位置
  // el.className='a b c d' className=c
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] == className) {
      pos = i; // 记录className在标签class中的位置
      break;
    }
  }
  if (pos == -1) { // 查找不到类名
    return; // 表示不再执行后面的代码（函数执行完成）
  } else if (pos == 0) { // 第1个
    arr.shift();
  } else if (pos == arr.length - 1) { // 最后1个
    arr.pop();
  } else {
    var arr1 = arr.slice(0, pos); // 从开始截取到需要删除元素之前
    var arr2 = arr.slice(pos + 1); // 从需要删除元素之后开始截取
    arr = arr1.concat(arr2); // arr1和arr2合拼为一个新的数组
  }

  el.className = arr.join(' ');
}

/**
 * 返回(0,1)之间的随机数
 * @returns {number}
 */
function random() {
  return Math.random();
}