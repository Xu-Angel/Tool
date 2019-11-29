(function(){
  const Device = {}
  const UA = window.navigator.userAgent.toLowerCase()

  /*
  * 是否移动设备：返回Boolean。
  */
  Device.isMobile = /(?:mobile|iphone|ipod|android|coolpad|mmp|smartphone|midp|wap|xoom|symbian|j2me|blackberry|windows phone|win ce)/.test(UA)

  /*
  * 是否苹果手机：返回Boolean。
  */
  Device.isiOS = /(?:iphone)/.test(UA)

  /*
  * 是否安卓手机：返回Boolean。
  */
  Device.isAndroid = /(?:android)/.test(UA)

  /*
  * 是否微信浏览器：返回Boolean。
  */
  Device.isWechat = /(?:micromessenger)/.test(UA)

  /*
  * 是否微信小程序：返回Boolean
  * 微信7.0.0开始，可以通过判断userAgent中包含miniProgram字样来判断小程序web-view环境。
  */
  Device.isMiniProgram = /miniProgram/.test(UA)
  
  /*注册全局变量*/
  window.Device = Device
})()