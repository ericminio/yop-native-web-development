const { Builder, By } = require('selenium-webdriver')
const { expect } = require('chai')
const {
    HomePage
} = require('./support/pages')

describe('Calling it a framework', function() {

    var server
    var driver

    beforeEach(async ()=> {
        server = require('http').createServer(function(request, response) {
            var index =
            `
                <html>
                    <head>
                        <script src="/yaf.js"></script>
                        <script>
                            var countries = []
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

                        <label id="log"></label>
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
            if (request.url == '/yaf.js') {
                response.writeHead(200, { 'content-type':'application/javascript' })
                response.end(require('fs').readFileSync('index.js').toString())
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

    it('is one ExtractFile away', async ()=> {
        page = await HomePage(driver)

        expect(await page.text('body')).to.contain('USA')
    })
})
