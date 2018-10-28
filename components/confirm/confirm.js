
import { $, click } from 'common/js/dom'

/**
 * confirm 弹窗类
 */
export default class Confirm {
  constructor(options) {
    // 构造html
    const compild = require('./confirm.pug')
    const html = compild({
      title: options.title,
      content: options.content, // 可传富文本
      left: options.left,
      bottom: options.bottom,
      right: options.right,
      type: options.type // 1小图成功, 2小图失败, 3大图成功, 4大图失败
    })

    // 唯一处理
    const array = new Uint16Array(1)
    window.crypto.getRandomValues(array)
    let fragment = document.createDocumentFragment()
    this.type = options.type + array
    let div = document.createElement('div')
    div.className = `confirm_toast${this.type}`
    this.className = `.confirm_toast${this.type}`
    div.innerHTML = html
    fragment.appendChild(div)
    $('body').appendChild(fragment)

    // 无操作按钮，自动消失
    if (!options.left && !options.right && !options.bottom) {
      setTimeout(() => {
        this.animate()
      }, options.time || 2000)
    }

    // 处理动画
    this.animate = () => {
      return new Promise((resolve, reject) => {
        $(`${this.className} ._confrim_details`).style.animation = 'zoom-out .25s'
        $(`${this.className} ._confrim_details`).style.transform = 'scale(0)'
        $(`${this.className} ._confrim_details`).style.opacity = 0
        $(`${this.className} ._confirm_modal`).style.opacity = 0
        setTimeout(() => {
          $('body').removeChild($(this.className))
          resolve()
        }, 200)
      })
    }
  }

  // 确认
  sure(cb) {
    click($(`${this.className} .js_confirm_sure `), () => {
      this.animate().then(cb && cb())
    })
  }

  // 取消
  cancel(cb) {
    click($(`${this.className} .js_confirm_cancel `), () => {
      this.animate().then(cb && cb())
    })
  }
  // bottom
  bottom(cb) {
    click($(`${this.className} .js_confirm_bottom `), () => {
      this.animate().then(cb && cb())
    })
  }
}
