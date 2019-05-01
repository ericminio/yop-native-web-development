const fs = require('fs')
const path = require('path')

let server = require('http').createServer(function(request, response) {
    if (request.url == '/all.js') {
        response.writeHead(200, { 'content-type':'application/javascript' })
        let js = ''
        let files = fs.readdirSync(path.join(__dirname, 'js', 'yop'))
        for (var i=0; i<files.length; i++) {
            js += fs.readFileSync(path.join(__dirname, 'js', 'yop', files[i]))
        }
        files = fs.readdirSync(path.join(__dirname, 'js'))
                    .filter((file)=> file.endsWith('.js'))
        for (var i=0; i<files.length; i++) {
            js += fs.readFileSync(path.join(__dirname, 'js', files[i]))
        }
        response.end(js)
    }
    else if (request.url == '/api/news.good') {
        response.writeHead(200, { 'content-type':'application/json' })
        setTimeout(function(){
            response.end(JSON.stringify({
                news: [
                    { id:1, title:'Gaining power', date:'2019-05-01T14:33:14Z' },
                    { id:2, title:'Starting its adventure', date:'2019-05-01T14:33:14Z' }
                ]
            }))
        }, 1000)
    }
    else if (request.url == '/api/news.bad') {
        response.writeHead(200, { 'content-type':'application/json' })
        setTimeout(function(){
            response.end(JSON.stringify({
                news: []
            }))
        }, 1500)
    }
    else if (request.url == '/all.css') {
        response.writeHead(200, { 'content-type':'text/css' })
        response.end(require('fs').readFileSync(path.join(__dirname, 'css', 'all.css')).toString())
    }
    else {
        response.writeHead(200, { 'content-type':'text/html' })
        response.end(require('fs').readFileSync(path.join(__dirname, 'index.html')).toString())
    }
})
let port = 5014
server.listen(port)

module.exports = {
    server:server,
    port:port
}
