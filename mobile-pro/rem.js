(function (doc, win) {
  let docElement = doc.documentElement
  let resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize'
  let recalc = function () {
    let clientWidth = docElement.clientWidth
    if (!clientWidth) return
    if (clientWidth > 640) {
      clientWidth = 640
    }
    docElement.style.fontSize = clientWidth / 6.4 + 'px'
  }
  if (!doc.addEventListener) return
  win.addEventListener(resizeEvt, recalc, false)
  doc.addEventListener('DOMContentLoaded', recalc, false)
})(document, window)
