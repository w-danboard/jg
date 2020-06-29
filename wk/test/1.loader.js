function cssloader(content) {
  // 处理导入的资源 import 图片 等
  return content
}

function styleloader(content) {
  let style = document.createElement('style')
  style.innerHTML = content
  document.head.appendChild(style)
}

// 最后完成是下面这个样子
(function(module, exports) {
  eval(`
    let style = document.createElement('style')
    style.innerHTML = content
    document.head.appendChild(style)
  `)
})