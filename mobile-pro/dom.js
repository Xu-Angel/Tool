export function hasClass (el, className) {
  let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
  return reg.test(el.className)
}

export function removeClass (el, className) {
  if (!hasClass(el, className)) {
    return
  }
  el.className = el.className.replace(className, '')
}

export function addClass (el, className) {
  if (hasClass(el, className)) {
    return
  }

  let newClass = el.className.split(' ')
  newClass.push(className)
  el.className = newClass.join(' ')
}

export function getData (el, name, val) {
  const prefix = 'data-'
  if (val) {
    return el.setAttribute(prefix + name, val)
  }
  return el.getAttribute(prefix + name)
}

export function $ (obj, all) {
  if (all) {
    return document.querySelectorAll(obj)
  } else {
    return document.querySelector(obj)
  }
}

function getStyle (obj, property) {
  if (window.getComputedStyle) {
    return window.getComputedStyle(obj, null)[property]
  } else { // IE678
    return obj.currentStyle[property]
  }
}

export function fade (obj) {
  setTimeout(() => {
    obj.style.display = 'block'
    obj.style.opacity = '1'
  }, 100)
  setTimeout(() => {
    obj.style.display = 'none'
    obj.style.opacity = '0'
  }, 700)
}
/**
 * 缓动框架
 * @param obj       需要移动的标签
 * @param target    移动的参数JSON格式
 * @param callback  接收调用者传递的回调函数
 */
export function animation (obj, target, callback) {
  clearInterval(obj.timer)
  obj.timer = setInterval(function () {
    var isClearInterval = true
    for (var key in target) {
      var t = target[key]
      var c = getStyle(obj, key)
      if (key === 'opacity') {
        c = Math.round(c * 100)
        t = parseInt(t) === 0 || parseInt(t) === 1 ? t * 100 : t
      } else {
        c = parseInt(c)
      }
      var s = (t - c) / 10
      s = s > 0 ? Math.ceil(s) : Math.floor(s)
      if (key === 'opacity') {
        obj.style[key] = (c + s) / 100
        obj.style.filter = '(alpha=' + (c + s) + ')'
      } else {
        obj.style[key] = c + s + 'px'
      }
      if (c + s !== t) {
        isClearInterval = false
      }
    }
    if (isClearInterval) {
      clearInterval(obj.timer)
      if (callback) {
        callback()
      }
    }
  }, 30)
}
