
// 兼容 forEach、
    // Production steps of ECMA-262, Edition 5, 15.4.4.18
    // Reference: http://es5.github.io/#x15.4.4.18
    if (!Array.prototype.forEach) {
        Array.prototype.forEach = function(fun /*, thisp*/){
            var len = this.length
            if (typeof fun != "function")
                throw new TypeError()
            var thisp = arguments[1];
            for (var i = 0; i < len; i++){
                if (i in this)
                    fun.call(thisp, this[i], i, this)
            }
        }
    }
    /**
    * fix-nodelist
    */
    function addForEachToNodeList () {
        if (window.NodeList && !NodeList.prototype.forEach) {
            NodeList.prototype.forEach = function (callback, thisArg) {
                thisArg = thisArg || window
                for (var i = 0; i < this.length; i++) {
                    callback.call(thisArg, this[i], i, this)
                }
            }
        }
    }
    addForEachToNodeList ()

// https://tc39.github.io/ecma262/#sec-array.prototype.findIndex
    if (!Array.prototype.findIndex) {
        Object.defineProperty(Array.prototype, 'findIndex', {
          value: function(predicate) {
           // 1. Let O be ? ToObject(this value).
            if (this == null) {
              throw new TypeError('"this" is null or not defined');
            }
      
            var o = Object(this);
      
            // 2. Let len be ? ToLength(? Get(O, "length")).
            var len = o.length >>> 0;
      
            // 3. If IsCallable(predicate) is false, throw a TypeError exception.
            if (typeof predicate !== 'function') {
              throw new TypeError('predicate must be a function');
            }
      
            // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.
            var thisArg = arguments[1];
      
            // 5. Let k be 0.
            var k = 0;
      
            // 6. Repeat, while k < len
            while (k < len) {
              // a. Let Pk be ! ToString(k).
              // b. Let kValue be ? Get(O, Pk).
              // c. Let testResult be ToBoolean(? Call(predicate, T, « kValue, k, O »)).
              // d. If testResult is true, return k.
              var kValue = o[k];
              if (predicate.call(thisArg, kValue, k, o)) {
                return k;
              }
              // e. Increase k by 1.
              k++;
            }
      
            // 7. Return -1.
            return -1;
          }
        });
      }
/*  如果您需要兼容不支持Object.defineProperty的JavaScript引擎，那么最好不要对Array.prototype方法进行 polyfill ，因为您无法使其成为不可枚举的。使用此方法需要注意你是否在uc浏览器环境,如果你的页面在支付宝上使用尤其注意,因为支付宝使用的就是uc浏览器环境. */