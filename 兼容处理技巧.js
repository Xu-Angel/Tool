/* 通用的事件侦听器函数， 兼容 IE 与标准浏览器
 */
Event = {
    // 页面加载完成后
    readyEvent : function(fn) {
        if (fn==null) {
            fn=document;
        }
        var oldonload = window.onload;
        if (typeof window.onload != 'function') {
            window.onload = fn;
        } else {
            window.onload = function() {
                oldonload();
                fn();
            };
        }
    },
    // 视能力分别使用dom0||dom2||IE方式 来绑定事件
    // 参数： 操作的元素,事件名称 ,事件处理程序
    addEvent : function(element, type, handler) {
        if (element.addEventListener) {
            //事件类型、需要执行的函数、是否捕捉
            element.addEventListener(type, handler, false);
        } else if (element.attachEvent) {
            element.attachEvent('on' + type, function() {
                handler.call(element);
            });
        } else {
            element['on' + type] = handler;
        }
    },
    // 移除事件
    removeEvent : function(element, type, handler) {
        if (element.removeEventListener) {
            element.removeEventListener(type, handler, false);
        } else if (element.datachEvent) {
            element.detachEvent('on' + type, handler);
        } else {
            element['on' + type] = null;
        }
    },
    // 阻止事件 (主要是事件冒泡，因为IE不支持事件捕获)
    stopPropagation : function(ev) {
        if (ev.stopPropagation) {
            ev.stopPropagation();
        } else {
            ev.cancelBubble = true;
        }
    },
    // 取消事件的默认行为
    preventDefault : function(event) {
        if (event.preventDefault) {
            event.preventDefault();
        } else {
            event.returnValue = false;
        }
    },
    // 获取事件目标
    getTarget : function(event) {
        return event.target || event.srcElement;
    },
    // 获取event对象的引用，取到事件的所有信息，确保随时能使用event；
    getEvent : function(e) {
        var ev = e || window.event;
        if (!ev) {
            var c = this.getEvent.caller;
            while (c) {
                ev = c.arguments[0];
                if (ev && Event == ev.constructor) {
                    break;
                }
                c = c.caller;
            }
        }
        return ev;
    }
};

/* 在老版本浏览器中兼容 `bind()` 函数 */

if(!Function.prototype.bind) {
    Function.prototype.bind = function(obj) {
        var slice=[].slice,
            args=slice.call(arguments,1),
            self=this,
            nop=function(){},
            bound=function(){
                return self.apply(this instanceof nop ? this : (obj || {}),
                                    args.concat(slice.call(arguments)));
            };
        nop.prototype=self.prototype;
        bound.prototype=new nop();
        return bound;
    };
}


/* 使用 `js`获取兼容可用的 样式属性名 */

const getsuitablePropertyName = (name) => {
  let allPrefix = ['', '-webkit-', '-o-', '-ms-']
  let len = allPrefix.length
  let allStyle = document.body.style

  for (let i = 0; i < len; i++) {
    if (allPrefix[i] + name in allStyle) {
      return allPrefix[i] + name
    }
  }
  return null
}

// 用法示例
let suitTransform = getsuitablePropertyName('transform')
console.log(suitTransform)
// -> transform


/* 使用 `js` 获取 `translate`的浏览器合适写法 */

const getTranslate = () => {
  let allPrefix = ['', '-webkit-', '-o-', '-ms-']
  let len = allPrefix.length
  let ele = document.createElement('div')
  let eleTransform = getsuitablePropertyName('transform')
  let realTranslate = null
  for (let i = 0; i < len; i++) {
    realTranslate = `${allPrefix[i]}translate(0px, 0px)`
    ele.style[eleTransform] = realTranslate
    if (ele.style[eleTransform] === realTranslate) {
      return `${allPrefix[i]}translate`
    }
  }
  return null
}


/* 使用 `js` 获取 `transitionend`的浏览器合适写法 */

const getTransitionend = () => {
  let allOptions = ['ontransitionend', 'onWebkitTransitionEnd', 'onMozTransitionEnd', 'onOTransitionEnd']
  let len = allOptions.length

  for (let i = 0; i < len; i++) {
    if (allOptions[i] in window) {
      return allOptions[i]
    }
  }
  return null
}

// 事件的判断属性名称，与真实使用的时候的名称不一定是一样的，所以使用的时候，还要需要稍微处理一下:

let suitTransitionend = () => {
  let suitTransitionend = getTransitionend()
  if (suitTransitionend === 'ontransitionend') {
    suitTransitionend = 'transitionend'
  } else {
    suitTransitionend = suitTransitionend.slice(2, 3).toLowerCase() + suitTransitionend.slice(3)
  }
  return suitTransitionend
}

let suitTransitionend = setTransitionend()
document.body.addEventListener(suitTransitionend, ()=>{
    // ...
})


/* 页面链接跳转历史 `URL`不记录的兼容处理 */
// 同一个页面中链接的点击不记录 `history`
// 摘自 [张鑫旭](http://www.zhangxinxu.com/wordpress/2017/02/page-link-url-history-null-not-record/)

var fnUrlReplace = function(eleLink) {
  if(!eleLink) return
  var href = eleLink.href
  if(href && /^#|javascript/.test(href) === false) {
    if(history.replaceState()) {
      history.replaceState(null, document.title, href.split('#')[0] + '#')
      location.replace('')
    } else {
      location.replace(href)
    }
  }
}

// 使用如下
document.querySelector('a').onclick = function(event) {
  if(event && event.preventDefault) {
    event.preventDefault()
  }
  fnUrlReplace(this)
  return false
}
