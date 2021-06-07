const reg = {
  // 密码复杂度：必须包含X种类+ 长度：-> (?=.*[种类])  +  ^[所有种类]{6,12}$ 
  pas: /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@])^[0-9A-Za-z@]{6,12}$/.test('aAyyy@yy98'),
  // 昵称：限6-18个字符，限汉字、字母、数字，符号，字母不区分大小写(即匹配非空白字符)
  nickName: /^\S{6,18}$/,
  // 支持 GIF、JPG、JPEG、PNG 图片格式
  pic: /[jpg|gif|png|jpeg]$/g,
  // 只能填写中文或者只能填英文，限2-18个字符
  name: /^[\u4e00-\u9fa5]{2,18}$|^[A-Za-z]{2,18}$/,
  // 只能填写中文或者只能填英文，限20个字符
  company: /^[\u4e00-\u9fa5]{1,20}$|^[A-Za-z]{1,20}$/,
  // 需要符合邮箱格式，否则提示“邮箱格式有误！
  emial: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
  // 只能填写中文或英文，限2-18个字符
  name: /^[\u4e00-\u9fa5|A-Za-z]{2,18}$/,
  //验证密码 限6-18位字母或数字组合，区分大小写！
  password: function (element, param, field) {
    if (!/.{6,18}/.test(element.value)) {
      return false;
    }
    //纯数字
    if (/^\d+$/.test(element.value)) {
      return false;
    }
    //纯字母
    if (/^[a-z]+$/.test(element.value)) {
      return false;
    }
    //纯字母
    if (/^[A-Z]+$/.test(element.value)) {
      return false;
    }
    //纯标点符号
    if (/^[`~!@#$%^&*()\-=_+[\]\\{}|;':",./<>?]+$/.test(element.value)) {
      return false;
    }
    if (!/^[0-9a-zA-Z`~!@#$%^&*()\-=_+[\]\\{}|;':",./<>?]{6,18}$/.test(element.value)) {
      return false;
    }
    return true;
  }
}

module.exports = {
  reg
}

// 判断字符类型
String.prototype.kind = function () {
  if (strPunct.indexOf(this) != -1) {
      return 'punct';
  }
  var code = this.charCodeAt(0);
  if (code >= 65296 && code <= 65305) {
      return 'num-full';
  }
  if (code > 256) {
      return 'zh';
  }
  if (code >= 48 && code <= 57) {
      return 'num';
  } else if (code >= 65 && code <= 90) {
      return 'en-up';
  } else if (code >= 97 && code <= 133) {
      return 'en-low';
  }
  return 'unknown';
};