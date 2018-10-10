export function type(obj) {
  return Object.prototype.toString.call(obj).replace(/^\[object (.+)\]$/, '$1').toLowerCase()
}

export function addEvent(obj, event, fn) {
  obj.addEventListener(event, fn, false)
}

export function removeEvent(obj, event, fn) {
  obj.removeEventListener(event, fn, false)
}

export function hasClass(el, className) {
  if (el.classList) {
    return el.classList.contains(className)
  } else {
    return new RegExp('(^|\\s)' + className + '(\\s|$)', 'gi').test(el.className)
  }
}

export function addClass(el, className) {
  if (hasClass(el, className)) {
    return
  }

  if (el.classList) {
    el.classList.add(className)
  } else {
    el.className += ' ' + className
  }
}

export function removeClass(el, className) {
  if (!hasClass(el, className)) {
    return
  }

  if (el.classList) {
    el.classList.remove(className)
  } else {
    el.className = el.className.replace(className, '')
  }
}

/**
 * 类jquery的极简化版dom操作，只提供最常用的几个操作方法，不做低本的兼容，可用于移动端或者vue react需要操作dom的时候
 */

function Dom(arg) {
  this.elements = []

  switch (type(arg)) {
    case 'function':
      window.addEventListener('load', arg, false)
      break
    case 'string':
      switch (arg.charAt(0)) {
        case '#':
          this.elements.push(document.querySelectorAll(arg)[0])
          break
        case '.':
          this.elements = document.querySelectorAll(arg)
          break
        default:
          this.elements = document.getElementsByTagName(arg)
      }
      break
    case 'object':
      this.elements.push(arg)
  }
}

Dom.prototype.css = function(attr, value) {
  const length = this.elements.length
  if (arguments.length === 2) {
    for (let i = 0; i < length; i++) {
      this.elements[i].style[attr] = value
    }
  } else {
    if (typeof attr === 'string') {
      return window.getComputedStyle(this.elements[0], null)[attr]
    } else {
      for (let i = 0; i < length; i++) {
        let k = ''
        for (k in attr) {
          this.elements[i].style[k] = attr[k]
        }
      }
    }
  }

  return this
}

Dom.prototype.hasClass = function(className) {
  return hasClass(this.elements[0], className)
}

Dom.prototype.addClass = function(className) {
  const length = this.elements.length

  for (let i = 0; i < length; i++) {
    addClass(this.elements[i], className)
  }

  return this
}

Dom.prototype.removeClass = function(className) {
  const length = this.elements.length

  for (let i = 0; i < length; i++) {
    removeClass(this.elements[i], className)
  }

  return this
}

Dom.prototype.html = function(value) {
  if (!value) {
    return this.elements[0].innerHTML
  } else {
    this.elements[0].innerHTML = value
  }
  return this
}

Dom.prototype.show = function() {
  const length = this.elements.length

  for (let i = 0; i < length; i++) {
    this.elements[i].style.display = 'block'
  }

  return this
}

Dom.prototype.hide = function() {
  const length = this.elements.length

  for (let i = 0; i < length; i++) {
    this.elements[i].style.display = 'none'
  }

  return this
}

Dom.prototype.attr = function(attr, value) {
  if (arguments.length === 2) {
    const length = this.elements.length

    for (let i = 0; i < length; i++) {
      this.elements[i].setAttribute(attr, value)
    }
  } else {
    return this.elements[0].getAttribute(attr)
  }

  return this
}

Dom.prototype.offset = function() {
  const box = this.elements[0].getBoundingClientRect()
  return {
    top: box.top + window.pageYOffset - document.documentElement.clientTop,
    left: box.left + window.pageXOffset - document.documentElement.clientLeft
  }
}

Dom.prototype.on = function(event, fn) {
  const length = this.elements.length

  for (let i = 0; i < length; i++) {
    addEvent(this.elements[i], event, fn)
  }
}

Dom.prototype.off = function(event, fn) {
  let i = 0
  const length = this.elements.length

  for (; i < length; i++) {
    removeEvent(this.elements[i], event, fn)
  }
}

Dom.prototype.delegate = function(event, className, fn) {
  function loop(e, obj) {
    let target = e.target
    while (target !== obj) {
      if (hasClass(target, className)) {
        fn.call(target, e)
      }
      target = target.parentNode
    }
  }

  const length = this.elements.length

  for (let i = 0; i < length; i++) {
    let element = this.elements[i]
    addEvent(element, event, function(e) {
      loop(e, element)
    })
  }
}

Dom.prototype.extend = function(name, fn) {
  Dom.prototype[name] = fn
}

window.$ = $

export default function $(arg) {
  return new Dom(arg)
}
