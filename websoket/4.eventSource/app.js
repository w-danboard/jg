let express = require('express')
let app = express()
// http://localhost:8000
let counter = 0
app.use(express.static(__dirname))
app.get('/clock', function (req, res) {
  res.header('Content-Type', 'text/event-stream')
  setInterval(function () {
    res.write(`id:${counter++}\nevent:message\ndata:${new Date().toLocaleString()}\n\n`)
  }, 1000)
})
app.listen(8000)