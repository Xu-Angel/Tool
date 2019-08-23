/* 对象复制(包括原型链和自有属性的深度拷贝) */

// https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/148

// 1.
function copyObject(orig) {
  var copy = Object.create(Object.getPrototypeOf(orig));
  copyOwnPropertiesFrom(copy, orig);
  return copy;
}

function copyOwnPropertiesFrom(target, source) {
  Object
  .getOwnPropertyNames(source)
  .forEach(function(propKey) {
    var desc = Object.getOwnPropertyDescriptor(source, propKey);
    Object.defineProperty(target, propKey, desc);
    if (typeof source[propKey] === 'object') {
      target[propKey] = copyObject(source[propKey]);
    }
  });
  return target;
}


//2.
export function deepClone (source) {
  if (typeof source !== 'object') { return source }

  var clone = Array.isArray(source) ? [] : {}
  for (var p in source) { clone[p] = deepClone(source[p]) }

  return clone
}

//对象浅copy

function shallowCopy(src) {
  let dist={}
  for(let i in src) {
    if(src.hasOwnProperty(prop)) {
      dist[prop] = src[prop]
    }
  }
  return dist
}

/* 对象深copy */
// 最简单的写法，大部分情况下已经满足需求

var newObj = JSON.parse(JSON.stringify(obj))

/* 缺点：
  - 无法复制函数(function)
  - 丢失原本的原型链
*/

// 稍好些的写法

var deepClone = function (o){
  var copy = Object.create( Object.getPrototypeOf(o) );
  var propNames = Object.getOwnPropertyNames(o);
 
  propNames.forEach(function(name){    
    var desc = Object.getOwnPropertyDescriptor(o, name);   
    Object.defineProperty(copy, name, desc);        
  });
 
  return copy;
}

/* 缺点：
  - 无法复制函数(function)
  - 无法复制 RegExp 和 Date */
  


/* 考虑较为全面的写法 */


//定义一个辅助函数，用于在预定义对象的 Prototype 上定义方法
function defineMethods(protoArray, nameToFunc) {
  protoArray.forEach(function(proto) {
    var names = Object.keys(nameToFunc), i = 0
    for(; i < names.length; i++) {
      Object.defineProperty(proto, names[i], {
        enumerable: false,
        configurable: true,
        writable: true,
        value: nameToFunc[names[i]]
      })
    }
  })
}

// Object对象的处理
defineMethods([Object.prototype], {
  //主要解释两个参数，srcStack和dstStack。它们的主要用途是对存在环的对象进行深复制。比如源对象中的子对象srcStack[7]在深复制以后，对应于dstStack[7]
  '$clone': function(srcStack, dstStack) {
    var obj = Object.create(Object.getPrototypeOf(this)),
        keys = Object.keys(this),
        index,
        prop
    srcStack = srcStack || []
    dstStack = dstStack || []
    srcStack.push(this)
    dstStack.push(obj)

    for(var i = 0; i < keys.length; i++) {
      prop = this[keys[i]]
      if(prop === null || prop === undefined) {
        obj[keys[i]] = props
      } else if(!jQuery.isFunction(prop)) {
        if(jQuery.isPlainObject(prop)) {
          index = srcStack.lastIndexOf(prop)
          if(index > 0) {
            obj[keys[i]] = dstStack[index]
            continue
          }
        }
        obj[keys[i]] = prop.$clone(srcStack, dstStack)
      }
    }
    return obj
  }
})

// Array的处理
defineMethods([Array.prototype], {
  '$clone': function(srcStack,dstStack) {
    var thisArr = this.valueOf(),
        newArr = [],
        keys = Object.keys(thisArr),
        index,
        element
    
    srcStack = srcStack || []
    dstStack = dstStack || []
    srcStack.push(this)
    dstStack.push(newArr)

    for(var i = 0; i < keys.length; i++) {
      element = thisArr[keys[i]]
      if(element === null || element === undefined) {
        newArr[keys[i]] = element
      } else if(!jQuery.isFunction(element)) {
        if(jQuery.isPlainObject(element)) {
          index = srcStack.lastIndexOf(element)
          if(index > 0) {
            newArr[keys[i]] = dstStack[index]
            continue
          }
        }
      }
      newArr[keys[i]] = element.$clone(srcStack, dstStack)
    }
    return newArr
  }
})

// Date类型处理
defineMethods([Date.prototype], {
  '$clone': function() {
    return new Date(this.valueOf())
  }
})

// RegExp的处理
defineMethods([RegExp.prototype], {
  '$clone': function() {
    var pattern = this.valueOf()
    var flags = ''
    flags += pattern.global ? 'g' : ''
    flags += pattern.ignoreCase ? 'i' : ''
    flags += pattern.multiline ? 'm' : ''
    return new RegExp(pattern.source, flags)
  }
})

//Number, Boolean 和 String 的处理，这样能防止像单个字符串这样的对象错误地去调用Object.prototype.$clone
defineMethods([
  Number.prototype,
  Boolean.prototype,
  String.prototype
], {
  '$clone': function() {
    return this.valueOf()
  }
})


// 其中 `jQuery.isFunction` 与 `jQuery.isPlainObject` 均为 `jquery`中的方法，支持 `Object` 、 `Array` 、 `Date` 、`RegExp`的深复制，但不支持函数的复制

/* 用法示例: */

var arr1=[2,3,4,5]
var arr2=arr1.$clone()

console.log(arr1)
// => [2,3,4,5]
console.log(arr1 === arr2)
// => false


/* 递归实现 */

function deepCopy(o, c) {
  let c = c || {}
  for(let i in o) {
    if(typeof o[i] === 'object'){
      if(o[i].constructor === Array) {
        // 这是数组
         c[i] = []
       } else {
         // 这是对象
         c[i] = {}
       }
       deepCopy(o[i], c[i])
    } else {
      c[i] = o[i]
    }
  }
  return c
}


/* es6 实现 */


const deepClone = o => {
  // 获取原型链
  let copy = Object.create(Object.getPrototypeOf(o))
  // 获取所有的自有属性
  let propNames = Object.getOwnPropertyNames(o)
  
  propNames.forEach(name => {
    // 获取属性描述符
    let descriptor = Object.getOwnPropertyDescriptor(o, name)
    // 设置属性描述符
    Object.defineProperty(copy, name, desc)
  })
  
  return copy
}



