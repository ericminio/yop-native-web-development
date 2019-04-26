const fs = require('fs')
const path = require('path')

let server = require('http').createServer(function(request, response) {
    if (request.url == '/') {
        response.writeHead(200, { 'content-type':'text/html' })
        response.end(require('fs').readFileSync('demo/support/apps/09/index.html').toString())
    }
    if (request.url == '/all.js') {
        response.writeHead(200, { 'content-type':'application/javascript' })
        let js = ''
        let files = fs.readdirSync(path.join(__dirname, 'js', 'yaf'))
        for (var i=0; i<files.length; i++) {
            js += fs.readFileSync(path.join(__dirname, 'js', 'yaf', files[i]))
        }
        files = fs.readdirSync(path.join(__dirname, 'js'))
                    .filter((file)=> file.endsWith('.js'))
        for (var i=0; i<files.length; i++) {
            js += fs.readFileSync(path.join(__dirname, 'js', files[i]))
        }
        response.end(js)
    }
    if (request.url == '/api/countries') {
        response.writeHead(200, { 'content-type':'application/json' })
        response.end(JSON.stringify({
            countries: [
                { id:1, name:'France' },
                { id:2, name:'Canada' },
                { id:3, name:'Venezuela' },
                { id:4, name:'USA' },
                { id:5, name:'Spain' }
            ]
        }))
    }
})
let port = 5005
server.listen(port)

module.exports = {
    server:server,
    port:port
}
