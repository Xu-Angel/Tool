   /*
    * 查询节点方法：
    *       1、id：document.getElementById('id')
    *       2、element: document.getElementsByTagName('element')
    *       3、class：document.getElementsByClassName('className');IE678不兼容
    *       4、sibling：要求是元素节点，如何完成？
    *               next（下一个）：dom.nextElementSibling||dom.nextSibling
    *               previous（上一个）：dom.previousElementSibling||dom.previousSibling
    *       5、parent: dom.parentNode
    *       6、child:
    *            所有的子节点：node.childNodes
    *            节点类型：node.nodeType (1:元素  2：属性  3：文本   8：注释)
    *            所有的子元素节点：node.children    在ie678中包含注释
    *  * 节点：node
    *  查：根据id   document.getElementById(id);
    *      根据element   document.getElementsByTagName(element)
    *      根据className   document.getElementsByClassName(className)----有兼容性
    *      根据关系：父母，兄弟，子元素
    *      node的父元素：node.parentNode
    *      node的下一个兄弟：node.nextElementSibling||node.nextSibling
    *      node的子元素：node.childNodes   三种
    *                    node.children     元素
    *      node类型判断：node.nodeType:
    *                       1-元素节点
    *                       2-属性节点
    *                       3-文本节点
    *                       8-注释节点
    * 特殊节点获取方法：
    * html:document.documentElement
    * body:document.body
    *title:document.title
    * head:document.head
 
    * */
/* <body></body>
    <input type="text">
    <span></span>
    <div></div>
    <script>
        //创建节点：
        var node = document.createElement('a');
        node.innerHTML = "我是div前面的a标签";
        //在div前面插入
        var div = document.getElementsByTagName('div')[0];
        div.parentNode.insertBefore(node,div);         !TODO:div为参考位置 即在div前面插入
        div.parentNode.appendChild(node);      此子节点为最后位置
    </script>
</body>
。cloneNode（默认为false）  true  深度克隆  
                false 浅度克隆 
*/ 
/*  insertBefore  */
const insertBefore = (el, htmlString) => el.insertAdjacentHTML('beforebegin', htmlString)
insertBefore(document.getElementById('myId'), '<p>before</p>'); // <p>before</p> <div id="myId">...</div>

/* insertAfter */
const insertAfter = (el, htmlString) => el.insertAdjacentHTML('afterend', htmlString)
insertAfter(document.getElementById('myId'), '<p>after</p>'); // <div id="myId">...</div> <p>after</p>

/* getStyle */
const getStyle = (el, ruleName) => getComputedStyle(el)[ruleName];
getStyle(document.querySelector('p'), 'font-size'); // '16px'

/* hasClass */
const hasClass = (el, className) => el.classList.contains(className);
hasClass(document.querySelector('p.special'), 'special'); // true


/* istanbul ignore next */

import Vue from 'vue';

const isServer = Vue.prototype.$isServer;
const SPECIAL_CHARS_REGEXP = /([\:\-\_]+(.))/g;
const MOZ_HACK_REGEXP = /^moz([A-Z])/;
const ieVersion = isServer ? 0 : Number(document.documentMode);

/* istanbul ignore next */
const trim = function(string) {
  return (string || '').replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, '');
};
/* istanbul ignore next */
const camelCase = function(name) {
  return name.replace(SPECIAL_CHARS_REGEXP, function(_, separator, letter, offset) {
    return offset ? letter.toUpperCase() : letter;
  }).replace(MOZ_HACK_REGEXP, 'Moz$1');
};

/* istanbul ignore next */
export const on = (function() {
  if (!isServer && document.addEventListener) {
    return function(element, event, handler) {
      if (element && event && handler) {
        element.addEventListener(event, handler, false);
      }
    };
  } else {
    return function(element, event, handler) {
      if (element && event && handler) {
        element.attachEvent('on' + event, handler);
      }
    };
  }
})();

/* istanbul ignore next */
export const off = (function() {
  if (!isServer && document.removeEventListener) {
    return function(element, event, handler) {
      if (element && event) {
        element.removeEventListener(event, handler, false);
      }
    };
  } else {
    return function(element, event, handler) {
      if (element && event) {
        element.detachEvent('on' + event, handler);
      }
    };
  }
})();

/* istanbul ignore next */
export const once = function(el, event, fn) {
  var listener = function() {
    if (fn) {
      fn.apply(this, arguments);
    }
    off(el, event, listener);
  };
  on(el, event, listener);
};

/* istanbul ignore next */
export function hasClass(el, cls) {
  if (!el || !cls) return false;
  if (cls.indexOf(' ') !== -1) throw new Error('className should not contain space.');
  if (el.classList) {
    return el.classList.contains(cls);
  } else {
    return (' ' + el.className + ' ').indexOf(' ' + cls + ' ') > -1;
  }
};

/* istanbul ignore next */
export function addClass(el, cls) {
  if (!el) return;
  var curClass = el.className;
  var classes = (cls || '').split(' ');

  for (var i = 0, j = classes.length; i < j; i++) {
    var clsName = classes[i];
    if (!clsName) continue;

    if (el.classList) {
      el.classList.add(clsName);
    } else if (!hasClass(el, clsName)) {
      curClass += ' ' + clsName;
    }
  }
  if (!el.classList) {
    el.className = curClass;
  }
};

/* istanbul ignore next */
export function removeClass(el, cls) {
  if (!el || !cls) return;
  var classes = cls.split(' ');
  var curClass = ' ' + el.className + ' ';

  for (var i = 0, j = classes.length; i < j; i++) {
    var clsName = classes[i];
    if (!clsName) continue;

    if (el.classList) {
      el.classList.remove(clsName);
    } else if (hasClass(el, clsName)) {
      curClass = curClass.replace(' ' + clsName + ' ', ' ');
    }
  }
  if (!el.classList) {
    el.className = trim(curClass);
  }
};

/* istanbul ignore next */
export const getStyle = ieVersion < 9 ? function(element, styleName) {
  if (isServer) return;
  if (!element || !styleName) return null;
  styleName = camelCase(styleName);
  if (styleName === 'float') {
    styleName = 'styleFloat';
  }
  try {
    switch (styleName) {
      case 'opacity':
        try {
          return element.filters.item('alpha').opacity / 100;
        } catch (e) {
          return 1.0;
        }
      default:
        return (element.style[styleName] || element.currentStyle ? element.currentStyle[styleName] : null);
    }
  } catch (e) {
    return element.style[styleName];
  }
} : function(element, styleName) {
  if (isServer) return;
  if (!element || !styleName) return null;
  styleName = camelCase(styleName);
  if (styleName === 'float') {
    styleName = 'cssFloat';
  }
  try {
    var computed = document.defaultView.getComputedStyle(element, '');
    return element.style[styleName] || computed ? computed[styleName] : null;
  } catch (e) {
    return element.style[styleName];
  }
};

/* istanbul ignore next */
export function setStyle(element, styleName, value) {
  if (!element || !styleName) return;

  if (typeof styleName === 'object') {
    for (var prop in styleName) {
      if (styleName.hasOwnProperty(prop)) {
        setStyle(element, prop, styleName[prop]);
      }
    }
  } else {
    styleName = camelCase(styleName);
    if (styleName === 'opacity' && ieVersion < 9) {
      element.style.filter = isNaN(value) ? '' : 'alpha(opacity=' + value * 100 + ')';
    } else {
      element.style[styleName] = value;
    }
  }
};

export const isScroll = (el, vertical) => {
  if (isServer) return;

  const determinedDirection = vertical !== null || vertical !== undefined;
  const overflow = determinedDirection
    ? vertical
      ? getStyle(el, 'overflow-y')
      : getStyle(el, 'overflow-x')
    : getStyle(el, 'overflow');

  return overflow.match(/(scroll|auto)/);
};

export const getScrollContainer = (el, vertical) => {
  if (isServer) return;

  let parent = el;
  while (parent) {
    if ([window, document, document.documentElement].includes(parent)) {
      return window;
    }
    if (isScroll(parent, vertical)) {
      return parent;
    }
    parent = parent.parentNode;
  }

  return parent;
};

export const isInContainer = (el, container) => {
  if (isServer || !el || !container) return false;

  const elRect = el.getBoundingClientRect();
  let containerRect;

  if ([window, document, document.documentElement, null, undefined].includes(container)) {
    containerRect = {
      top: 0,
      right: window.innerWidth,
      bottom: window.innerHeight,
      left: 0
    };
  } else {
    containerRect = container.getBoundingClientRect();
  }

  return elRect.top < containerRect.bottom &&
    elRect.bottom > containerRect.top &&
    elRect.right > containerRect.left &&
    elRect.left < containerRect.right;
};