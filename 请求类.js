/* 自定义 `jsonp` */


// 在页面中动态插入 script标签
const loadScript = (url, func, clear=false)=> {
  let script = document.createElement('script')
  let bodyEle = document.body
  script.src = url
  script.onload = script.onreadystatechange = function(){
    if(!this.readyState || this.readyState === 'loaded' || this.readyState === 'complete') {
      func && typeof func === 'function' && func()
      clear ? bodyEle.removeChild(script) : (script.onload = script.onreadystatechange = null)
    }
  }
  bodyEle.appendChild(script)
}

// 自定义jsonp

const selfJsonp = (url, callback, cb='cb')=>{
  let cbname = cb + new Date().getTime()
  window[cbname] = (data)=>{
    callback(data)
    delete window[cbname]
  }
  url += url.indexOf('?') === -1 ? '?' : '&'
  url += (cb + '=' + cbname)
  loadScript(url, null, true)
}
