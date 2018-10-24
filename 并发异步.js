/* async/await 并发执行 */

// async/await并不一定必须单个顺序执行，配合 `Promise.all`可以并发：

function sleep(timer = 1000) {
  return new Promise(resolve => {
    setTimeout(()=>{ resolve(timer) }, timer)
  })
}
async function fn1() {
  const arr = [1, 2, 3, 4, 5, 6]
  // 并行执行所有的
  const down = await Promise.all(arr.map(i => sleep(i * 1000)))
  console.log('down:', down)
}

fn1()


  /**
   * 将回调函数改成 promise
   * @param {function} fn (必) 执行的函数，比如 fs.readFile
   * @param {object} receiver (必) 执行环境，比如 fs
   */
  // ES6
  const cb2Promise = (fn, receiver) => {
    return (...args) => {
      return new Promise((resolve, reject) => {
        fn.apply(receiver, [...args, (...cbData) => {
          if (cbData.length <= 1) {
            // 回调函数 cb的参数只有一个，说明只接收成功的回调，没有失败的回调
            return resolve(cbData)
          } else {
            // 回调函数 cb的第一个参数为失败的回调 err
            return cbData[0] ? reject(cbData[0]) : resolve(cbData[1])
          }
        }])
      })
    }
  }

  // ES5
  var promisify = function promisify(fn, receiver) {
    return function () {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return new Promise(function (resolve, reject) {
        fn.apply(receiver, [].concat(args, [function () {
          
          if (arguments.length <= 1) {
            // 回调函数 cb的参数只有一个，说明只接收成功的回调，没有失败的回调
            return resolve(arguments[0])
          } else {
            // 回调函数 cb的第一个参数为失败的回调 err
            return arguments[0] ? reject(arguments[0]) : resolve(arguments[1])
          }
        }]));
      });
    };
  };

/*  */