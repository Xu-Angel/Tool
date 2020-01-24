/*  今年的第几天 */
const dayOfYear = date =>
  Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
dayOfYear(new Date()); // 272

/* 获取格林尼治时间 小时 分钟*/
const getColonTimeFromDate = date => date.toTimeString().slice(0, 8);
getColonTimeFromDate(new Date()); // "08:38:00"

/* 获取两日期的天数差距 */
const getDaysDiffBetweenDates = (dateInitial, dateFinal) =>
  (dateFinal - dateInitial) / (1000 * 3600 * 24);
getDaysDiffBetweenDates(new Date('2017-12-13'), new Date('2017-12-22')); // 9

/* 转成pm am 12小时制度*/
const getMeridiemSuffixOfInteger = num =>
  num === 0 || num === 24 ?
  12 + 'am' :
  num === 12 ?
  12 + 'pm' :
  num < 12 ?
  (num % 12) + 'am' :
  (num % 12) + 'pm';

getMeridiemSuffixOfInteger(0); // "12am"
getMeridiemSuffixOfInteger(11); // "11am"
getMeridiemSuffixOfInteger(13); // "1pm"
getMeridiemSuffixOfInteger(25); // "1pm"

/* 判断时间是否相同 */
const isSameDate = (dateA, dateB) => dateA.toISOString() === dateB.toISOString();
isSameDate(new Date(2010, 10, 20), new Date(2010, 10, 20)); // true
/* 
! 日期字符串格式 标准 https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date
Date.parse() 支持 https://www.ecma-international.org/ecma-262/5.1/#sec-15.9.1.15 https://tools.ietf.org/html/rfc2822#page-14
苹果IOS 不支持- （不支持ecma）
在非手机环境日期字符串推荐用parse
日期字符串推荐/ 而不是-
*/
/*比较时间是否为今天及以后 */
const isFuture = (date) => {
  const date = new Date()
  const year = date.getFullYear();
  const mon = date.getMonth() + 1;
  const day = date.getDate();
  const curTime = year + '/' + mon + '/' + day
  if (new Date(e) - new Date(curTime) < 0) {
    return false
  }
  return true
}
/* 
两个日期中间的有效日期
 */
function rangeDay(day1, day2) {
  const result = []
  const dayTimes = 24 * 60 * 60 * 1000
  const startTime = day1.getTime()
  const range = day2.getTime() - startTime
  let total = 0

  while (total <= range && range > 0) {
    result.push(new Date(startTime + total).toLocaleDateString().replace(/\//g, '-'))
    total += dayTimes
  }
  return result
};
rangeDay(new Date("2015-02-08"), new Date("2015-03-03"))

/* 日期格式化 */
// 版本1
function format1(x, y) {
  var z = {
    y: x.getFullYear(),
    M: x.getMonth() + 1,
    d: x.getDate(),
    h: x.getHours(),
    m: x.getMinutes(),
    s: x.getSeconds()
  }
  return y.replace(/(y+|M+|d+|h+|m+|s+)/g, function (v) {
    return ((v.length > 1 ? '0' : '') + z[v.slice(-1)]).slice(-(v.length > 2 ? v.length : 2))
  })
}
// 版本2
Date.prototype.format2 = function (fmt) {
  var o = {
    "M+": this.getMonth() + 1, //月份 
    "d+": this.getDate(), //日 
    "h+": this.getHours(), //小时 
    "m+": this.getMinutes(), //分 
    "s+": this.getSeconds(), //秒 
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
    "S": this.getMilliseconds() //毫秒 
  }
  if (/(y+)/.test(fmt)) {
    // 这里 RegExp的用法挺有意思的
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? o[k] : ('00' + o[k]).substr(('' + o[k]).length))
    }
  }
  return fmt
}

const formatTime = date => {
  date = new Date(date)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  return [year, month, day].map(formatNumber).join('/') + " " + [hour, minute, second].map(formatNumber).join(':')
}
const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
// 使用
format1(new Date(), 'yy-MM-dd hh:m:ss') // 18-08-23 11:46:11
new Date().format2('yyyy-M-d h:m:s') // 2018-8-23 11:46:11
console.log(formatTime('2018-8-23 11:30:20'));


/**
 * 倒计时
 * @param {*} time 传入倒计时，eg '2018/07/09 20:16:0'，返回天时分秒毫秒
 */
function getTime(time) {
  let end = new Date(time).getTime()
  let now = Date.now()
  let range = (+end) - (+now)
  let day = parseInt(range / (24 * 3600000))
  range = range % (24 * 3600000)
  let hours = parseInt(range / 3600000)
  range = range % 3600000
  let minutes = parseInt(range / 60000)
  range = range % 60000
  let seconds = parseInt(range / 1000)
  let miles = Number((range + '').substring((range + '').length - 2))
  if (range < 0) {
    minutes = day = hours = seconds = 0
  }
  return {
    day,
    hours,
    minutes,
    seconds,
    miles
  }
}


/**
 * 
 * @param {*} time 秒杀时间eg '2018/07/09 20:16:0'
 * @param {*} day  day填充元素
 * @param {*} hour hour填充元素
 * @param {*} min  min填充元素
 * @param {*} sec  sec填充元素
 */
function seckillTime(time, day, hour, min, sec, cb) {
  function convert(val) {
    return val >= 10 ? val : '0' + val
  }

  function show() {
    const Time = getTime(time)
    day.innerText = convert(Time.day)
    hour.innerText = convert(Time.hours)
    min.innerText = convert(Time.minutes)
    sec.innerText = convert(Time.seconds)
  }
  show()
  const timer = setInterval(function () {
    const Time = getTime(time)
    let zero = 0
    zero += Time['day']
    zero += Time['hours']
    zero += Time['minutes']
    zero += Time['seconds']
    if (zero === 0) {
      clearInterval(timer)
      cb && cb()
    }
    show()
  }, 1000)
}

/**
 * 封装的倒计时插件，异步回调方式使用
 * @param {*} targetTime 
 * @param {*} timing 
 * @param {*} timend 
 */
function countDown(targetTime, timing, timend) {
  var nowTime = new Date().getTime()
  targetTime = new Date(targetTime).getTime()
  var timeRemaining = (+targetTime) - (+nowTime)

  var numberCountTest = function (value) {
    var numberTest = /^\d{2}$/

    if (numberTest.test(value)) {
      return value
    } else {
      return '0' + value
    }
  }

  var getDay = function (millisecond) {
    return numberCountTest(Math.floor(millisecond / 1000 / 60 / 60 / 24))
  }

  var getHours = function (millisecond) {
    return numberCountTest(Math.floor(millisecond / 1000 / 60 / 60 % 24))
  }

  var getMinute = function (millisecond) {
    return numberCountTest(Math.floor(millisecond / 1000 / 60 % 60))
  }

  var getSecond = function (millisecond) {
    return numberCountTest(Math.floor(millisecond / 1000 % 60))
  }

  var timed = setInterval(function () {
    timeRemaining -= 1000
    if (timeRemaining <= 0) {
      clearInterval(timed)
      timend()
    } else {
      var timeObj = {
        day: getDay(timeRemaining),
        hours: getHours(timeRemaining),
        minute: getMinute(timeRemaining),
        second: getSecond(timeRemaining)
      }
      timing(timeObj)
    }
  }, 1000)
}
countDown('2017/11/4 17:21:00', function (timeObj) {
  // console.log(timeObj.day, timeObj.hours, timeObj.minute, timeObj.second)
}, function () {
  console.log('timed end')
})

/**
 * @desc   格式化${startTime}距现在的已过时间
 * @param  {Date} startTime 
 * @return {String}
 */
export function formatPassTime(startTime) {
  var currentTime = Date.parse(new Date()),
    time = currentTime - startTime,
    day = parseInt(time / (1000 * 60 * 60 * 24)),
    hour = parseInt(time / (1000 * 60 * 60)),
    min = parseInt(time / (1000 * 60)),
    month = parseInt(day / 30),
    year = parseInt(month / 12);
  if (year) return year + "年前"
  if (month) return month + "个月前"
  if (day) return day + "天前"
  if (hour) return hour + "小时前"
  if (min) return min + "分钟前"
  else return '刚刚'
}

/**
 * 补零
 * @param {*} num 
 * @param {*} len 
 */
const addZero1 = (num, len = 2) => (`0${num}`).slice(-len)
const addZero2 = (num, len = 2) => (`${num}`).padStart(len, '0')
addZero1(3) // 03
addZero2(32, 4) // 0032

/**
 * 时间戳转Date对象
 * @param {*} t 
 */
function setTime(t) {
  return new Date().setTime(t)
}

/**
 * 生成时间戳
 */
const timestamp = +new Date("2019-02-14");// timestamp => 1550102400000

// 日期整理str ='20160920145530';
str.replace(/(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/, '$1-$2-$3 $4:$5:$6') // => 2016-09-20 14:55:30