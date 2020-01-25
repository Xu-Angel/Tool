/**
 * 获取滚动条距离顶部的距离
 */
const getScrollTop = () => {
  return document.documentElement.scrollTop || document.body.scrollTop
}

/**
 * 获取当前可视范围的高度
 */
const getClientHeight = () => {
  let clientHeight = 0
  if (document.body.clientHeight && document.documentElement.clientHeight) {
    clientHeight = Math.min(document.body.clientHeight, document.documentElement.clientHeight)
  } else {
    clientHeight = Math.max(document.body.clientHeight, document.documentElement.clientHeight)
  }
  return clientHeight
}

/**
 * 获取文档完整的高度，包括超出屏幕可以滚动显示的部分
 */
const getScrollHeight = () => {
  return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)
}

/**
 * 获取页面高度
 * @returns {number} 页面高度
 */
var getHeight = function () {
  var doc = document,
    body = doc.body,
    html = doc.documentElement,
    client = doc.compatMode == 'BackCompat' ? body : doc.documentElement;

  return Math.max(html.scrollHeight, body.scrollHeight, client.clientHeight);
};

/**
 * 获取元素距离页面顶部（不是浏览器顶部）的高度
 * @param {*} elem 
 */
function getElementTop(elem) {
  var elemTop = elem.offsetTop; //获得elem元素距相对定位的父元素的top
  elem = elem.offsetParent; //将elem换成起相对定位的父元素
  while (elem != null) { //只要还有相对定位的父元素 
    //获得父元素 距他父元素的top值,累加到结果中
    elemTop += elem.offsetTop;
    //再次将elem换成他相对定位的父元素上;
    elem = elem.offsetParent;
  }
  return elemTop;
}

/**
 * 获取纵向滚动量
 * @returns {number} 纵向滚动量
 */
var getScrollTop = function () {
  var d = document;
  return window.pageYOffset || d.documentElement.scrollTop || d.body.scrollTop;
};

/**
 * 获取横向滚动量
 * @return {number} 横向滚动量
 */
var getScrollLeft = function () {
  var d = document;
  return window.pageXOffset || d.documentElement.scrollLeft || d.body.scrollLeft;
};

/**
 * 取得当前页面里的目前鼠标所在的坐标（x y）
 * @return  {JSON}  当前鼠标的坐标值({x, y})
 */
var getMousePosition = function () {
  return {
    x: getScrollLeft() + xy.x,
    y: getScrollTop() + xy.y
  };
};

var xy = { x: 0, y: 0 };
// 监听当前网页的 mousemove 事件以获得鼠标的实时坐标
$(document).bind('mousemove', function (e) {
  xy.x = e.clientX;
  xy.y = e.clientY;
});

/**
 * 获取页面视觉区域高度
 * @returns {number} 页面视觉区域高度
 */
var getViewHeight = function () {
  var doc = document,
    client = doc.compatMode == 'BackCompat' ? doc.body : doc.documentElement;

  return client.clientHeight;
};

/**
 * 获取页面视觉区域宽度
 * @returns {number} 页面视觉区域宽度
 */
var getViewWidth = function () {
  var doc = document,
    client = doc.compatMode == 'BackCompat' ? doc.body : doc.documentElement;

  return client.clientWidth;
};

/**
 * 获取页面宽度
 * @returns {number} 页面宽度
 */
var getWidth = function () {
  var doc = document,
    body = doc.body,
    html = doc.documentElement,
    client = doc.compatMode == 'BackCompat' ? body : doc.documentElement;

  return Math.max(html.scrollWidth, body.scrollWidth, client.clientWidth);
};


const rect = ele.getBoundingClientRect()
/**
 * 判断元素是否出现在视窗中
 */
const inViewport = rect.bottom > 0 && rect.right > 0 &&
  rect.left < window.innerWidth &&
  rect.top < window.innerHeight