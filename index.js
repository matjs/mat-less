var nodeless  = require('less')
var path      = require('path')
var normalize = path.normalize
var resolve   = path.resolve
var dirname   = path.dirname
var join      = path.join

function cobody(stream) {
  return function(cb){
    var buffers = []
    stream.on('data', function(chunk){
      buffers.push(chunk)
    })
    stream.on('end', function(){
      cb(null, Buffer.concat(buffers).toString('utf-8'))
    })
  }
}

function coless(body, config) {
  return function(cb) {
    nodeless.render(body, config, function (err, css) {
      if (err) {
        return cb(err)
      }
      cb(null, css.css)
    })
  }
}

function less(rules) {
  return function *less(next) {
    yield next

    var path = this.path
    var root = this.app.root
    root = normalize(resolve(root))
    path = normalize(join(root, path))
    path = dirname(path)
    var config = {
      paths: [path]
    }
    var body = yield cobody(this.body)
    this.body = yield coless(body, config)
    this.type = 'text/css'
  }
}

module.exports = less