const { Builder, By } = require('selenium-webdriver')
const { expect } = require('chai')
const {
    HomePage
} = require('./support/pages')

describe('Getting data asynchronously', function() {

    var server
    var driver

    beforeEach(async ()=> {
        server = require('http').createServer(function(request, response) {
            var index =
            `
                <html>
                    <head>
                        <title>hello</title>
                        <script>
                            var countries = []

                            var connections = []
                            var notify = function(document, source) {
                                for (var k=0; k < connections.length; k++) {
                                    var connection = connections[k]
                                    if (source.id === connection.id) {
                                        populate(connection.parent, source.data, connection.template, connection.mappings)
                                    }
                                }
                            }
                            var connect = function(document, contract) {
                                var parent = document.querySelector(contract.selector).parentNode
                                var template = document.querySelector(contract.selector).outerHTML
                                var connection = {
                                    id:contract.id,
                                    data:contract.data,
                                    parent:parent,
                                    template:template,
                                    mappings:contract.mappings
                                }
                                connections.push(connection)
                                populate(parent, contract.data, template, contract.mappings)
                            }
                            var populate = function(parent, data, template, mappings) {
                                var children = ''
                                for(var index=0; index<data.length; index++) {
                                    var line = template
                                    for (var i=0; i<mappings.length; i++) {
                                        var mapping = mappings[i]
                                        line = line.replace(mapping.replace, data[index][mapping.with])
                                    }
                                    children += line
                                }
                                parent.innerHTML = children
                            }
                        </script>
                    </head>
                    <body>
                        <ul>
                            <li id="country-with-id" class="countries-list-template">Wonderland</li>
                        </ul>
                        <script>
                            connect(document, { id:'countries', data:countries, selector:'.countries-list-template', mappings:[
                                { replace:'with-id', with:'id' },
                                { replace:'Wonderland', with:'name' }
                            ]})
                        </script>

                        <script>
                            setTimeout(function(){
                                fetch('/api/countries').then(function(response){
                                    response.json().then(function(json){
                                        countries = json.countries
                                        notify(document, { id:'countries', data:countries })
                                    })
                                })
                            }, 100)
                        </script>
                    </body>
                </html>
            `
            if (request.url == '/') {
                response.writeHead(200, { 'content-type':'text/html' })
                response.end(index)
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
        await server.listen(5000)
        driver = await new Builder().forBrowser('firefox').build()
    })

    afterEach(async ()=> {
        await server.close()
        await driver.quit()
    })

    it('is not a point', async ()=> {
        page = await HomePage(driver)

        expect(await page.text('body')).to.contain('USA')
    })
})
