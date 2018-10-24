/* 获取滚动条距离顶部的距离 */

const getScrollTop = () => {
  return document.documentElement.scrollTop || document.body.scrollTop
}


/* 获取当前可视范围的高度 */

const getClientHeight = () => {
  let clientHeight = 0
  if (document.body.clientHeight && document.documentElement.clientHeight) {
    clientHeight = Math.min(document.body.clientHeight, document.documentElement.clientHeight)
  } else {
    clientHeight = Math.max(document.body.clientHeight, document.documentElement.clientHeight)
  }
  return clientHeight
}


/* 获取文档完整的高度，包括超出屏幕可以滚动显示的部分 */

const getScrollHeight = () => {
  return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)
}

/* 获取元素距离页面顶部（不是浏览器顶部）的高度 */

function getElementTop(elem){
　　var elemTop=elem.offsetTop;//获得elem元素距相对定位的父元素的top
　　elem=elem.offsetParent;//将elem换成起相对定位的父元素
　　while(elem!=null){//只要还有相对定位的父元素 
　　　　//获得父元素 距他父元素的top值,累加到结果中
　　　　elemTop+=elem.offsetTop;
　　　　//再次将elem换成他相对定位的父元素上;
　　　　elem=elem.offsetParent;
　　}
　　return elemTop;
}
