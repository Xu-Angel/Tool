/*
  @author: tyler(zhangdechao)
  @decription: jquery ajax  Interceptor
  @version: 0.0.1
  @date 2018-8-21

  说明：此插件为多次并发请求互相之间有依赖时使用
  $.ajaxAll(@sendData, function(msg) {
    console.log('return all data: ', msg)
  })
  @sendData: {
    name: {
      ...ajaxSetting //标准jquery ajax设置
    }
  }
  @callback为注入数据后的回调
*/

;+function($) {
    if ($.ajaxAll) {
      throw 'jquery has function name of ajaxAll';
    }
  
    function MultiAjax(sendData, callback) {
      this.msg = {};
      this.count = 0;
      this.returnFunc = callback;
      var self = this;
      this.getData(sendData, function(param, name) {
        var sucFunc = param.success;
        param.success = function(res) {
          self.setMsg(name, res);
          sucFunc(res);
        }
        $.ajax(param);
      })
    }
    MultiAjax.prototype = {
      getData: function(params, callfunc) {
        for (var i in params) {
          this.msg[i] = null;
          ++this.count;
          callfunc(params[i], i);
        }
      },
      setMsg: function(attr, val) {
        this.msg[attr] = val;
        var num = 1;
        for (var i in this.msg) {
          if (this.msg[i])
            num++;
        }
        if (this.count == num) {
          this.returnFunc(this.msg);
        }
      }
    }
    MultiAjax.prototype.constructor = MultiAjax;
  
    function ajaxAll(params, func) {
      new MultiAjax(params, func);
    }
    $.ajaxAll = ajaxAll;
  }(jQuery)