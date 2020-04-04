/**
 * https://github.com/lancedikson/bowser
 * 详细获取设备数据
 */
export function detectDeviceType() {
  // 权重：系统 + 系统版本 > 平台 > 内核 + 载体 + 内核版本 + 载体版本 > 外壳 + 外壳版本
  var ua = navigator.userAgent.toLowerCase();
  var testUa = function (regexp) { return regexp.test(ua); }
  var testVs = function (regexp) {
    return (ua.match(regexp) + "").replace(/[^0-9|_.]/ig, "")
      .replace(/_/ig, ".");
  }
  // 系统
  var system = "unknown";
  if (testUa(/windows|win32|win64|wow32|wow64/ig)) {
    system = "windows"; // window系统
  } else if (testUa(/macintosh|macintel/ig)) {
    system = "macos"; // macos系统
  } else if (testUa(/x11/ig)) {
    system = "linux"; // linux系统
  } else if (testUa(/android|adr/ig)) {
    system = "android"; // android系统
  } else if (testUa(/ios|iphone|ipad|ipod|iwatch/ig)) {
    system = "ios"; // ios系统
  }
  // 系统版本
  var systemVs = "unknown";
  if (system === "windows") {
    if (testUa(/windows nt 5.0|windows 2000/ig)) {
      systemVs = "2000";
    } else if (testUa(/windows nt 5.1|windows xp/ig)) {
      systemVs = "xp";
    } else if (testUa(/windows nt 5.2|windows 2003/ig)) {
      systemVs = "2003";
    } else if (testUa(/windows nt 6.0|windows vista/ig)) {
      systemVs = "vista";
    } else if (testUa(/windows nt 6.1|windows 7/ig)) {
      systemVs = "7";
    } else if (testUa(/windows nt 6.2|windows 8/ig)) {
      systemVs = "8";
    } else if (testUa(/windows nt 6.3|windows 8.1/ig)) {
      systemVs = "8.1";
    } else if (testUa(/windows nt 10.0|windows 10/ig)) {
      systemVs = "10";
    }
  } else if (system === "macos") {
    systemVs = testVs(/os x [\d._]+/ig);
  } else if (system === "android") {
    systemVs = testVs(/android [\d._]+/ig);
  } else if (system === "ios") {
    systemVs = testVs(/os [\d._]+/ig);
  }
  // 平台
  var platform = "unknow";
  if (system === "windows" || system === "macos" || system === "linux") {
    platform = "desktop"; // 桌面端
  } else if (system === "android" || system === "ios" || testUa(/mobile/ig)) {
    platform = "mobile"; // 移动端
  }
  // 内核和载体
  var engine = "unknow";
  var supporter = "unknow";
	if (testUa(/applewebkit/ig)) {
    engine = "webkit"; // webkit内核
    if (testUa(/edge/ig)) {
      supporter = "edge"; // edge浏览器
    } else if (testUa(/opr/ig)) {
      supporter = "opera"; // opera浏览器
    } else if (testUa(/chrome/ig)) {
      supporter = "chrome"; // chrome浏览器
    } else {
      supporter = "safari"; // safari浏览器
    }
  } else if (testUa(/gecko/ig)) {
    engine = "gecko"; // gecko内核
    supporter = "firefox"; // firefox浏览器
  } else if (testUa(/presto/ig)) {
    engine = "presto"; // presto内核
    supporter = "opera"; // opera浏览器
  } else if (testUa(/trident|compatible|msie/ig)) {
    engine = "trident"; // trident内核
    supporter = "iexplore"; // iexplore浏览器
  }
  // 内核版本
  var engineVs = "unknow";
  if (engine === "webkit") {
    engineVs = testVs(/applewebkit\/[\d.]+/ig);
  } else if (engine === "gecko") {
    engineVs = testVs(/gecko\/[\d.]+/ig);
  } else if (engine === "presto") {
    engineVs = testVs(/presto\/[\d.]+/ig);
  } else if (engine === "trident") {
    engineVs = testVs(/trident\/[\d.]+/ig);
  }
  // 载体版本
  var supporterVs = "unknow";
  if (supporter === "chrome") {
    supporterVs = testVs(/chrome\/[\d.]+/ig);
  } else if (supporter === "safari") {
    supporterVs = testVs(/version\/[\d.]+/ig);
  } else if (supporter === "firefox") {
    supporterVs = testVs(/firefox\/[\d.]+/ig);
  } else if (supporter === "opera") {
    supporterVs = testVs(/opr\/[\d.]+/ig);
  } else if (supporter === "iexplore") {
    supporterVs = testVs(/(msie [\d.]+)|(rv:[\d.]+)/ig);
  } else if (supporter === "edge") {
    supporterVs = testVs(/edge\/[\d.]+/ig);
  }
  // 外壳和外壳版本
  var shell = "none";
  var shellVs = "unknow";
  if (testUa(/micromessenger/ig)) {
    shell = "wechat"; // 微信浏览器
    shellVs = testVs(/micromessenger\/[\d.]+/ig);
  } else if (testUa(/qqbrowser/ig)) {
    shell = "qq"; // QQ浏览器
    shellVs = testVs(/qqbrowser\/[\d.]+/ig);
  } else if (testUa(/ubrowser/ig)) {
    shell = "uc"; // UC浏览器
    shellVs = testVs(/ubrowser\/[\d.]+/ig);
  } else if (testUa(/2345explorer/ig)) {
    shell = "2345"; // 2345浏览器
    shellVs = testVs(/2345explorer\/[\d.]+/ig);
  } else if (testUa(/metasr/ig)) {
    shell = "sougou"; // 搜狗浏览器
  } else if (testUa(/lbbrowser/ig)) {
    shell = "liebao"; // 猎豹浏览器
  } else if (testUa(/maxthon/ig)) {
    shell = "maxthon"; // 遨游浏览器
    shellVs = testVs(/maxthon\/[\d.]+/ig);
  } else if (testUa(/bidubrowser/ig)) {
    shell = "baidu"; // 百度浏览器
    shellVs = testVs(/bidubrowser [\d.]+/ig);
  }
  return {
    engine: engine, // webkit gecko presto trident
    engineVs: engineVs,
    platform: platform, // desktop mobile
    supporter: supporter, // chrome safari firefox opera iexplore edge
    supporterVs: supporterVs,
    system: system, // windows macos linux android ios
    systemVs: systemVs,
    shell: shell, // wechat qq uc 2345 sougou liebao maxthon baidu
    shellVs: shellVs
  };
}


/**
 * 简单获取浏览器类型（全兼容）
 */
export function getBrowserType() {
  var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串  
  var isOpera = userAgent.indexOf("Opera") > -1; //判断是否Opera浏览器  
  var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera; //判断是否IE浏览器  
  var isEdge = (userAgent.indexOf("Windows NT 6.1; Trident/7.0;") > -1 || userAgent.indexOf("Windows NT 6.1; WOW64; Trident/7.0;")) && !isIE; //判断是否IE的Edge浏览器  
  var isFF = userAgent.indexOf("Firefox") > -1; //判断是否Firefox浏览器  
  var isSafari = userAgent.indexOf("Safari") > -1 && userAgent.indexOf("Chrome") === -1; //判断是否Safari浏览器  
  var isChrome = userAgent.indexOf("Chrome") > -1 && userAgent.indexOf("Safari") > -1; //判断Chrome浏览器  

  if (isIE) {
    var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
    reIE.test(userAgent);
    var fIEVersion = parseFloat(RegExp["$1"]);
    if (fIEVersion === 7) {
      return "IE7";
    } else if (fIEVersion === 8) {
      return "IE8";
    } else if (fIEVersion === 9) {
      return "IE9";
    } else if (fIEVersion === 10) {
      return "IE10";
    } else if (fIEVersion === 11) {
      return "IE11";
    } else {
      //IE版本过低  
      return "0";
    }
  } //isIE end  

  if (isFF) {
    return "FF";
  }
  if (isOpera) {
    return "Opera";
  }
  if (isSafari) {
    return "Safari";
  }
  if (isChrome) {
    return "Chrome";
  }
  if (isEdge) {
    return "Edge";
  }
}

/**
 * 移动业务常用，获取设备环境
 */
export function getDeviceType() {

  var UA = window.navigator.userAgent.toLowerCase()

  /*
   * 是否移动设备
   */
  var isMobile = /(?:mobile|iphone|ipod|ipad|android|coolpad|mmp|smartphone|midp|wap|xoom|symbian|j2me|blackberry|windows phone|win ce)/i.test(UA)

  /*
   * 是否苹果手机
   */
  var isIOS = /iphone|mac|ipod|ipad/i.test(UA)

  /*
   * 是否安卓手机
   */
  var isAndroid = /(?:android)/i.test(UA)

  /*
   * 是否微信环境
   */
  var isWechat = /(?:micromessenger)/i.test(UA)

  /*
   * 是否移动设备微信环境
   */
  var isPhoneWechat = /(?:micromessenger)/i.test(UA) && isMobile

  /*
   * 是否PC微信环境
   */
  var isPCWechat = /(?:micromessenger)/i.test(UA) && !isMobile

  /*
   * 是否微信小程序
   * 微信7.0.0开始，可以通过判断userAgent中包含miniProgram字样来判断小程序web-view环境。
   */
  var isWechatMiniProgram = /miniProgram/i.test(UA) && isWechat
  return {
    isIOS,
    isAndroid,
    isWechat,
    isPhoneWechat,
    isPCWechat,
    isWechatMiniProgram
  }
}