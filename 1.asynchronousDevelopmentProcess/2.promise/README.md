### 异步的缺陷
- 回调
```javascript
// 比如之前我们常用的ajax  
// 这样可能会导致代码的不好维护，回调地域
// 不好捕获错误 不能使用 try catch
ajax(function() {
  ajax(function() {
    ajax()
  })
})
```
- 同步”异步请求“需要自己维护计数器
- 代码不优雅

- promise解决以上问题