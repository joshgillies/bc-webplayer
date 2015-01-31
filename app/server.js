var jadeStream = require('jade-stream')
var http = require('http')
var st = require('st')

var mount = st({
  path: 'app/assets',
  index: 'index.jade'
})

var app = http.createServer(function server(req, res) {
  if (req.url === '/')
    res.filter = jadeStream()

  mount(req, res)
})

app.listen(process.env.port, function listening() {
  var info = app.address()
  console.log('App running on http://%s:%s', info.address, info.port)
})
