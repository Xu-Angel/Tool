
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
