let express = require('express')
let app = express()
// http://localhost:8000
app.use(express.static(__dirname))
app.get('/clock', function (req, res) {
  res.header('Contnet-Type', 'text/html')
  res.write(`
    <script>
      parent.setTime('${new Date().toString()}')
    </script>
  `)
})
app.listen(8000)