var config = require('rc')('bc-webplayer');
var http = require('http')
var st = require('st')

var mount = st({
  path: 'app/static',
  index: 'index.html',
  cache: config.cache
})

var app = http.createServer(function server(req, res) {
  mount(req, res)
})

app.listen(process.env.port, function listening() {
  var info = app.address()
  console.log('App running on http://%s:%s', info.address, info.port)
})
