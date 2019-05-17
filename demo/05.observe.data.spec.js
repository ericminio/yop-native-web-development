const { Builder, By } = require('selenium-webdriver')
const { expect } = require('chai')
const {
    HomePage
} = require('./support/pages')

describe('Changing data to magically update a list', function() {

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
                            var countries = [
                                { id:1, name:'France' },
                                { id:2, name:'Canada' },
                                { id:3, name:'Venezuela' },
                                { id:4, name:'USA' },
                                { id:5, name:'Spain' },
                            ]

                            var connections = []
                            var notify = function(document, data) {
                                for (var k=0; k < connections.length; k++) {
                                    var connection = connections[k]
                                    if (data === connection.data) {
                                        populate(connection.parent, data, connection.template, connection.mappings)
                                    }
                                }
                            }
                            var connect = function(document, data, selector, mappings) {
                                var parent = document.querySelector(selector).parentNode
                                var template = document.querySelector(selector).outerHTML
                                var connection = {
                                    data:data,
                                    parent:parent,
                                    template:template,
                                    mappings:mappings
                                }
                                connections.push(connection)
                                populate(parent, data, template, mappings)
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
                            connect(document, countries, '.countries-list-template', [
                                { replace:'with-id', with:'id' },
                                { replace:'Wonderland', with:'name' }
                            ])
                        </script>

                        <button id="modify" onclick="modify()">modify</button>
                        <script>
                            var modify = function() {
                                countries[3].name = 'United States'
                                notify(document, countries)
                            }
                        </script>
                    </body>
                </html>
            `
            response.writeHead(200, { 'content-type':'text/html' })
            response.end(index)
        })
        await server.listen(5000)
        driver = await new Builder().forBrowser('firefox').build()
    })

    afterEach(async ()=> {
        await server.close()
        await driver.quit()
    })

    it('requires a little more plumbing', async ()=> {
        page = await HomePage(driver)
        if (process.env.SLIDE_SHOW_AND_WAIT) { await page.wait(15*60*1000) }
        expect(await page.text('body')).to.contain('USA')

        page.click('#modify')
        expect(await page.text('body')).to.contain('United States')
    })
})
