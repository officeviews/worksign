var express = require('express')
var app = express()
var proxy = require('http-proxy-middleware');
var port = process.env.PORT || 3000;

//静态资源
app.use(express.static(__dirname + '/public'))

//xinrenxinshi 代理
app.use('/api', proxy({
    target: 'https://e.xinrenxinshi.com',
    changeOrigin: true,
    secure: false,
    pathRewrite: {
        '^/api': ''
    },
    headers: {
        Referer: 'https://e.xinrenxinshi.com/index'
    }
}));

//baidu api 代理
app.use('/bapi', proxy({
    target: 'http://api.map.baidu.com',
    changeOrigin: true,
    secure: false,
    pathRewrite: {
        '^/bapi': ''
    },
    headers: {
        Referer: 'http://api.map.baidu.com'
    }
}));

// app.set('port',80)
app.listen(port)