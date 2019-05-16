const fs = require('fs')
const path = require('path')

var folder = function(...name) {
    let content = ''
    let fullName = path.join.apply(null, name)
    let files = fs.readdirSync(fullName)
    for (var i=0; i<files.length; i++) {
        if (files[i].endsWith('.js')) {
            var file = path.join.apply(null, name.concat(files[i]))
            content += fs.readFileSync(file)
        }
    }
    return content
}

var news = [
    { id:1, type:'good', title:'Gaining power', date:'2019-05-01T14:33:14Z' },
    { id:2, type:'good', title:'Starting its adventure', date:'2019-04-20T09:00:00Z' },
    { id:3, type:'good', title:'Still just a whisper', date:'2019-04-10T09:00:00Z' },

    { id:10, type:'bad', title:'Still feeling shy...', date:'2019-03-01T07:07:07Z' }
]

let server = require('http').createServer((request, response)=> {
    var parts = require('url').parse(request.url)

    if (request.url == '/all.js') {
        response.writeHead(200, { 'content-type':'application/javascript' })
        let js = ''
        js += folder(__dirname, 'js', 'yop')
        js += folder(__dirname, 'js', 'api')
        js += folder(__dirname, 'js', 'pages', 'components')
        js += folder(__dirname, 'js', 'pages')
        js += folder(__dirname, 'js')
        response.end(js)
    }
    else if (request.url == '/api/news.good') {
        response.writeHead(200, { 'content-type':'application/json' })
        response.end(JSON.stringify({
            news: news.filter((candidate)=> candidate.type=='good')
        }))
    }
    else if (request.url == '/api/news.bad') {
        response.writeHead(200, { 'content-type':'application/json' })
        response.end(JSON.stringify({
            news: news.filter((candidate)=> candidate.type=='bad')
        }))
    }
    else if (request.url == '/api/news.all') {
        response.writeHead(200, { 'content-type':'application/json' })
        response.end(JSON.stringify({
            news: news
        }))
    }
    else if (parts.pathname == '/api/download') {
        var ids = require('querystring').parse(parts.query).id
        ids = typeof ids == 'object' ? ids : [ids]
        ids = ids.map((id)=> parseInt(id))
        response.writeHead(200, { 'content-type':'text/plain' })
        response.end(JSON.stringify({
            news: news.filter((candidate)=> ids.includes(candidate.id))
        }, null, 4))
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
let port = 5016
server.listen(port)

module.exports = {
    server:server,
    port:port
}
