const path      = require('path')
const normalize = path.normalize
const resolve   = path.resolve
const dirname   = path.dirname
const join      = path.join
const nodeless  = require('less')

function renderLess(body, config) {
  return function(cb) {
    nodeless.render(body, config, function (err, css) {
      if (err) {
        return cb(err)
      }
      cb(null, css.css)
    })
  }
}

function less(opts) {
  return function *less(next) {
    yield next

    const body = this.body.toString()

    if (body == 'Not Found') {
      throw new Error('路径：' + this.path + ' 对应的文件没有找到')
    }

    let path = this.path
    let root = this.app.root
    root = normalize(resolve(root))
    path = normalize(join(root, path))
    path = dirname(path)

    opts = opts || {}
    opts.paths = [path]
    
    this.body = yield renderLess(body, opts)
    this.type = 'text/css'
  }
}

module.exports = less