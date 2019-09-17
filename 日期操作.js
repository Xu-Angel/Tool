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
  num === 0 || num === 24
    ? 12 + 'am'
    : num === 12
      ? 12 + 'pm'
      : num < 12
        ? (num % 12) + 'am'
        : (num % 12) + 'pm';

getMeridiemSuffixOfInteger(0); // "12am"
getMeridiemSuffixOfInteger(11); // "11am"
getMeridiemSuffixOfInteger(13); // "1pm"
getMeridiemSuffixOfInteger(25); // "1pm"

/* 判断时间是否相同 */
const isSameDate = (dateA, dateB) => dateA.toISOString() === dateB.toISOString();
isSameDate(new Date(2010, 10, 20), new Date(2010, 10, 20)); // true

/*比较时间是否为今天及以后 */
const isFuture = (date) => {
  const date = new Date()
  const year = date.getFullYear();
  const mon = date.getMonth() + 1;
  const day = date.getDate();
  const curTime = year + '-' + mon + '-' + day
  if (new Date(e) - new Date(curTime) < 0) {
      return false
  }
  return true

}

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
  return y.replace(/(y+|M+|d+|h+|m+|s+)/g, function(v) {
    return ((v.length > 1 ? '0' : '') + z[v.slice(-1)]).slice(-(v.length > 2 ? v.length : 2))
  })
}
// 版本2
Date.prototype.format2 = function(fmt) {
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
format1(new Date(), 'yy-MM-dd hh:m:ss')  // 18-08-23 11:46:11
new Date().format2('yyyy-M-d h:m:s')  // 2018-8-23 11:46:11
console.log(formatTime('2018-8-23 11:30:20'));
