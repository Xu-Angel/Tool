import { $, click } from 'common/js/dom'

/**
 * 选择弹窗
 */
export default class Picker {
  constructor(options) {
    // 构造html
    const compild = require('./picker.pug')
    const html = compild({
      title: options.title,
      pickerOne: options.pickerOne,
      pickerTwo: options.pickerTwo
    })

    // 唯一处理
    const array = new Uint16Array(1)
    window.crypto.getRandomValues(array)
    this.type = array
    let fragment = document.createDocumentFragment()
    let div = document.createElement('div')
    div.className = `picker_toast${this.type}`
    this.className = `.picker_toast${this.type}`
    div.innerHTML = html
    fragment.appendChild(div)
    $('body').appendChild(fragment)

    // 处理动画
    this.animate = () => {
      return new Promise((resolve, reject) => {
        $(`${this.className} ._picker_wrap`).style.animation = 'zoom-out .25s'
        $(`${this.className} ._picker_wrap`).style.transform = 'scale(0)'
        $(`${this.className} ._picker_wrap`).style.opacity = 0
        $(`${this.className} ._picker_modal`).style.opacity = 0
        setTimeout(() => {
          $('body').removeChild($(this.className))
          resolve()
        }, 200)
      })
    }

    // XX按钮
    click($('.js_picker_close'), this.animate)
  }

  // pickerOne
  one(cb) {
    click($(`${this.className} ._picker_sub_one`), () => {
      this.animate().then(
        cb && cb()
      )
    })
  }

  // pickerTwo
  two(cb) {
    click($(`${this.className} ._picker_sub_two`), () => {
      this.animate().then(
        cb && cb()
      )
    })
  }
}
