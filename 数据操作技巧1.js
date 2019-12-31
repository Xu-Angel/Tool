// 星级评分
const StartScore = rate => "★★★★★☆☆☆☆☆".slice(5 - rate, 10 - rate);
const start = StartScore(3);
// start => "★★★"

// 时间戳
const timestamp = +new Date("2019-02-14");
// timestamp => 1550102400000

// config  对象字面量
const env = "prod";
const link = {
  dev: "Development Address",
  test: "Testing Address",
  prod: "Production Address"
} [env];
// link => "Production Address"

// 对象属性变量
const flag = false;
const obj = {
  a: 0,
  b: 1,
  [flag ? "c" : "d"]: 2
};
// obj => { a: 0, b: 1, d: 2 }

/* 
短网址函数
*/
function string10to62(number) {
  var chars = '0123456789abcdefghigklmnopqrstuvwxyzABCDEFGHIGKLMNOPQRSTUVWXYZ'.split(''),
    radix = chars.length,
    qutient = +number,
    arr = [];
  do {
    mod = qutient % radix;
    qutient = (qutient - mod) / radix;
    arr.unshift(chars[mod]);
  } while (qutient);
  return arr.join('');
}

function string62to10(number_code) {
  var chars = '0123456789abcdefghigklmnopqrstuvwxyzABCDEFGHIGKLMNOPQRSTUVWXYZ',
    radix = chars.length,
    number_code = String(number_code),
    len = number_code.length,
    i = 0,
    origin_number = 0;
  while (i < len) {
    origin_number += Math.pow(radix, i++) * chars.indexOf(number_code.charAt(len - i) || 0);
  }
  return origin_number;
}
console.log(string10to62(string62to10('udtrgdp')), 0)
console.log(string62to10('udtrgdp'), 1)

/**
 * 文件大小格式化
 * @param {*} size 
 */
function formatSize(size) {
  if (size < 1024) {
    return size + ' bytes';
  } else if (size < 1024 * 1024) {
    return (size / 1024.0).toFixed(0) + ' KB';
  } else if (size < 1024 * 1024 * 1024) {
    return (size / 1024.0 / 1024.0).toFixed(1) + ' MB';
  } else {
    return (size / 1024.0 / 1024.0 / 1024.0).toFixed(1) + ' GB';
  }
}
console.log(formatSize(50),
formatSize(500),
formatSize(5000),
formatSize(50000),
formatSize(50000000),
formatSize(500000000),
formatSize(5000000000),
formatSize(50000000000)
);