var path = require('path')
var express = require('express')
var webpack = require('webpack')
var config = require('../config')
var proxyMiddleware = require('http-proxy-middleware')
var webpackConfig = process.env.NODE_ENV === 'testing'
  ? require('./webpack.prod.conf')
  : require('./webpack.dev.conf')

// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.dev.proxyTable

var app = express()
var compiler = webpack(webpackConfig)

var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  noInfo: true,
  stats: {
    colors: true,
    chunks: false
  }
})

var hotMiddleware = require('webpack-hot-middleware')(compiler)
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(context, options))
})

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')({
    rewrites: [
        { from: /\/demo$/, to: '/demo.html'},
        { from: /\/test$/, to: '/demo.html'},
        { from: /\/issue([/]|$)/, to: '/demo.html'},
        { from: /\/plugin([/]|$)/, to: '/demo.html'},
        { from: /\/project([/]|$)/, to: '/demo.html'},
        { from: /\/component([/]|$)/, to: '/demo.html'},
        { from: /\/info$/, to: '/list.html'},
        { from: /\/results$/, to: '/refund.html'},
        //mdd
        { from: /\/play/, to: '/mdd.html'},
        { from: /\/mdd.html\/detail/, to: '/mdd.html'},
        { from: /\/playdetail/, to: '/mdd.html'},
        { from: /\/book/, to: '/mdd.html'},
        { from: /\/travelnotes/, to: '/mdd.html'},
        //find
        { from: /\/result/, to: '/find.html'},
        { from: /\/travaler/, to: '/find.html'},
        { from: /\/find.html\/detail/, to: '/find.html'},
        { from: /\/active/, to: '/find.html'},
        { from: /\/search/, to: '/find.html'},
        //visa
        { from: /\/visa.html\/detail/, to: '/find.html'},
        { from: /\/service/, to: '/find.html'},
        { from: /\/need/, to: '/find.html'},
        { from: /\/comment/, to: '/find.html'}

    ]
}))
// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// serve pure static assets
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('Listening at http://localhost:' + port + '\n')
})
