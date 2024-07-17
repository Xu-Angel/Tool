// 监听所有<script>标签的加载错误
document.querySelectorAll('script').forEach(function (script) {
  script.addEventListener('error', function (event) {
    console.error('Script failed to load:', event)
    // 刷新页面
    window.location.reload(true) // 注意：true 表示强制从服务器加载，而不是从缓存
  })
})

// 监听所有<link rel="stylesheet">标签的加载错误
document.querySelectorAll('link[rel="stylesheet"]').forEach(function (link) {
  link.addEventListener('error', function (event) {
    console.error('Stylesheet failed to load:', event)
    // 刷新页面
    window.location.reload(true)
  })
})

// 注意：上面的代码在页面加载完成后立即执行，它只会对当时已经存在于DOM中的<script>和<link>元素有效。
// 如果你的页面是动态添加这些元素的（例如，通过AJAX加载的内容），你需要在新元素添加到DOM后也为它们添加事件监听器。

// 如果你想要确保包括动态添加的元素也能被监听，你可能需要使用MutationObserver来观察DOM的变化，并为新添加的元素添加事件监听器。

// 示例：使用MutationObserver监听DOM变化
const observer = new MutationObserver(function (mutations) {
  mutations.forEach(function (mutation) {
    if (mutation.type === 'childList') {
      // 检查新添加的子元素，并添加事件监听器（这里只是一个简化的逻辑）
      mutation.addedNodes.forEach(function (node) {
        if (node.nodeType === Node.ELEMENT_NODE) {
          if (node.tagName === 'SCRIPT') {
            node.addEventListener('error', function (event) {
              console.error('Script failed to load (dynamic):', event)
              window.location.reload(true)
            })
          } else if (node.tagName === 'LINK' && node.getAttribute('rel') === 'stylesheet') {
            node.addEventListener('error', function (event) {
              console.error('Stylesheet failed to load (dynamic):', event)
              window.location.reload(true)
            })
          }
        }
      })
    }
  })
})

// 选择要观察变动的节点
const targetNode = document.body // 你可以根据需要选择其他节点

// 配置观察选项:
const config = { attributes: false, childList: true, subtree: true }

// 在目标节点上启动观察器实例
observer.observe(targetNode, config)

// 稍后，你可以根据需要停止观察
// observer.disconnect();
