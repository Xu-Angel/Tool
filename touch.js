/* 
https://github.com/xd-tayde/mtouch/blob/master/README_ZH.md
*/

function touch(ele, option) {
  ele.addEventListener("touchstart", function(e) {
    this.startX = e.touches[0].pageX
    this.startY = e.touches[0].pageY
  })
  ele.addEventListener("touchmove", function(e) {
    this.isMove = true;
    this.endX = e.touches[0].pageX
    this.endY = e.touches[0].pageY
    this.distanceX = this.endX - this.startX
    this.distanceY = this.endY - this.startY
  })
  ele.addEventListener("touchend", function() {
    if (this.isMove) {
      this.isMove = false
      //如果滑动距离太短
      if (Math.abs(this.distanceX) < 2 && Math.abs(this.distanceY) < 2) {
        return false;
      }
      let angle = Math.atan2(this.distanceY, this.distanceX) * 180 / Math.PI
      const EVENT = {
        self: this,
        distanceX: this.distanceX || 0,
        distanceY: this.distanceY || 0,
        startX: this.startX,
        startY: this.startY,
        endX: this.endX,
        endY: this.endY
      }
      if (angle >= -45 && angle < 45) {
        // console.log('向右')
        option.right(EVENT)
      } else if (angle >= 45 && angle < 135) {
        // console.log('向下')
        option.down(EVENT)
      } else if (angle >= -135 && angle < -45) {
        // console.log('向s上')
        option.up(EVENT)
      } else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
        // console.log('向左')
        option.left(EVENT)
      }
    }
  })
}


function safelyResolveThen(self, then) {
  let called = false
  try {
    then(function(value) {
      if (called) {
        return
      }
      called = true
      doResolve(self, value)
    }, function(error) {
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