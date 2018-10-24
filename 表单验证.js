// 三种表单验证模式--传统模式、策略设计模式、ES6的Proxy代理模式

// 现在有如下表单：

{
  /* <form action="a.php" id="registerForm" method="post">
      <div class="form-group">
        <label for="user">请输入用户名:</label>
        <input type="text" class="form-control" id="user" name="userName">
      </div>
      <div class="form-group">
        <label for="pwd">请输入密码:</label>
        <input type="password" class="form-control" id="pwd" name="passWord">
      </div>
      <div class="form-group">
        <label for="phone">请输入手机号码:</label>
        <input type="tel" class="form-control" id="phone" name="phoneNumber">
      </div>
      <div class="form-group">
        <label for="email">请输入邮箱:</label>
        <input type="text" class="form-control" id="email" name="emailAddress">
      </div>
      <input type="submit" value='提交'>
    </form> */
}


// 需要对表单内容进行验证，下面给出三种方法。

//0.0 传统模式

let registerForm = document.querySelector('#registerForm')
registerForm.addEventListener('submit', function() {
  if (registerForm.userName.value === '') {
    alert('用户名不能为空！')
    return false
  }
  if (registerForm.userName.length < 6) {
    alert('用户名长度不能少于6位！')
    return false
  }
  if (registerForm.passWord.value === '') {
    alert('密码不能为空！')
    return false
  }
  if (registerForm.passWord.value.length < 6) {
    alert('密码长度不能少于6位！')
    return false
  }
  if (registerForm.phoneNumber.value === '') {
    alert('手机号码不能为空！')
    return false
  }
  if (!/^1(3|5|7|8|9)[0-9]{9}$/.test(registerForm.phoneNumber.value)) {
    alert('手机号码格式不正确！')
    return false
  }
  if (registerForm.emailAddress.value === '') {
    alert('邮箱地址不能为空！')
    return false
  }
  if (!/^\w+([+-.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*
    $ / .test(registerForm.emailAddress.value)) {
    alert('邮箱地址格式不正确！')
    return false
  }
}, false)


// 优缺点：代码易于理解，但复用性不好，较多的`if...else` 业务判断

//1. 策略设计模式
window.onload = () => {
  let registerForm = document.querySelector('#registerForm')
  const strategies = {
    isNonEmpty(value, errorMsg) {
      return value === '' ? errorMsg : void 0
    },
    minLength(value, length, errorMsg) {
      return value.length < length ? errorMsg : void 0
    },
    isMoblie(value, errorMsg) {
      return !/^1(3|5|7|8|9)[0-9]{9}$/.test(value) ? errorMsg : void 0
    },
    isEmail(value, errorMsg) {
      return !/^\w+([+-.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value) ? errorMsg : void 0
    }
  }
  class Validator {
    constructor() {
      this.cache = [] //保存校验规则
    }
    add(dom, rules) {
      for (let rule of rules) {
        let strategyAry = rule.strategy.split(':') //例如['minLength',6]
        let errorMsg = rule.errorMsg //'用户名不能为空'
        this.cache.push(() => {
          let strategy = strategyAry.shift() //用户挑选的strategy
          strategyAry.unshift(dom.value) //把input的value添加进参数列表
          strategyAry.push(errorMsg) //把errorMsg添加进参数列表，[dom.value,6,errorMsg]
          return strategies[strategy].apply(dom, strategyAry)
        })
      }
    }
    start() {
      for (let validatorFunc of this.cache) {
        let errorMsg = validatorFunc() //开始校验，并取得校验后的返回信息
        if (errorMsg) { //r如果有确切返回值，说明校验没有通过
          return errorMsg
        }
      }
    }
  }
  const validatorFunc = () => {
    let validator = new Validator()

    validator.add(registerForm.userName, [{
      strategy: 'isNonEmpty',
      errorMsg: '用户名不能为空！'
    }, {
      strategy: 'minLength:6',
      errorMsg: '用户名长度不能小于6位！'
    }])

    validator.add(registerForm.passWord, [{
      strategy: 'isNonEmpty',
      errorMsg: '密码不能为空！'
    }, {
      strategy: 'minLength:6',
      errorMsg: '密码长度不能小于6位！'
    }])

    validator.add(registerForm.phoneNumber, [{
      strategy: 'isNonEmpty',
      errorMsg: '手机号码不能为空！'
    }, {
      strategy: 'isMoblie',
      errorMsg: '手机号码格式不正确！'
    }])

    validator.add(registerForm.emailAddress, [{
      strategy: 'isNonEmpty',
      errorMsg: '邮箱地址不能为空！'
    }, {
      strategy: 'isEmail',
      errorMsg: '邮箱地址格式不正确！'
    }])
    let errorMsg = validator.start()
    return errorMsg
  }


  registerForm.addEventListener('submit', function(e) {
    let errorMsg = validatorFunc()
    if (errorMsg) {
      // 注意，这里写 `return false;` 或者 `retirn;` 都是没什么卵用的，
      // 阻止表单默认提交动作，必须使用 preventDefault
      e.preventDefault()
      alert(errorMsg)
    }
  })
}
//优缺点：利用组合、委托和多态等技术思想，易于扩展、复用性好，缺点就是代码量比第一种稍多

// 3.`Proxy`代理模式


window.onload = () => {
  let validator = (target, validator, errorMsg) => {
    return new Proxy(target, {
      _validator: validator,
      set(target, key, value, proxy) {
        if (value === '') {
          alert(`${errorMsg[key]}不能为空！`)
          return target[key] = false
        }
        let va = this._validator[key]
        if (!!va(value)) {
          return Reflect.set(target, key, value, proxy)
        } else {
          alert(`${errorMsg[key]}格式不正确`)
          return target[key] = false
        }
      }
    })
  }

  const validators = {
    name(value) {
      return value.length > 6
    },
    password(value) {
      return value.length > 6
    },
    mobile(value) {
      return /^1(3|5|7|8|9)[0-9]{9}$/.test(value)
    },
    email(value) {
      return /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/.test(value)
    }
  }

  const errorMsg = {
    name: '用户名',
    password: '密码',
    mobile: '手机号码',
    email: '邮箱地址'
  }
  const vali = validator({}, validators, errorMsg)
  let registerForm = document.querySelector('#registerForm')
  registerForm.addEventListener('submit', (e) => {
    let validatorNext = function*() {
      yield vali.name = registerForm.userName.value
      yield vali.password = registerForm.passWord.value
      yield vali.mobile = registerForm.phoneNumber.value
      yield vali.email = registerForm.emailAddress.value
    }

    let validator = validatorNext()
    validator.next()
    let s = vali.name && validator.next() //上一步的校验通过才执行下一步
    s = s ? vali.password && validator.next() : s
    s = s ? vali.mobile && validator.next() : s
    s = s ? vali.email && validator.next() : s!s && e.preventDefault()
  })
}


// 优缺点：条件和对象本身完全隔离开,后续代码的维护,代码整洁度,以及代码健壮性和复用性变得非常强，缺点是兼容性不好，但可以通过使用Babel来进行代码转换