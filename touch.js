function touch (ele,left,right) {
  ele.addEventListener("touchstart", function (e) {
    this.startX = e.touches[0].pageX
  });
  ele.addEventListener("touchmove", function (e) {
    this.isMove = true;
    this.endX = e.touches[0].pageX;
    this.distance = this.endX - this.startX
  });
  ele.addEventListener("touchend", function () {
    if (this.isMove) {
      this.isMove = false
        if (Math.abs(this.distance) > this.offsetWidth / 20) {
            if (this.distance > 0) {
              right();
            } else {
              left();
            }
        }
    }
  })
}

new Promise((resolve) => {
  Toast.success({
    message: '您的企业认证资料更新正在审核中，请耐心等候！'
  })
  resolve()
})


new Promise((resolve) => {
  Toast.success({
    message: '您的企业认证资料更新正在审核中，请耐心等候！'
  })
  resolve()
}).then(() => {
  setTimeout(() => {
    this.$router.push({
      path: '/auth'
    })
  }, 1000)
})


function safelyResolveThen (self, then) {
  let called = false
  try {
    then(function (value) {
      if (called) {
        return
      }
      called = true
      doResolve(self, value)
    }, function (error) {
      if (called) {
        return
      }
      called = true
      doReject(self, error)
    })
  } catch (error) {
    if (called) {
      return
    }
    called = true
    doReject(self, error)
  }
}