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
                            var selection = {}
                        </script>
                    </head>
                    <body>
                        <div>
                            <label>Where do you live?</label>
                            <select id="countries" onchange="spread(document, '#countries', 'change')">
                                <option id="country-with-id" value="with-value">Wonderland</option>
                            </select>
                        </div>

                        <script>
                            connectList(document, { id:'countries', data:countries, selector:'option#country-with-id', mappings:[
                                { replace:'with-id', with:'id' },
                                { replace:'with-value', with:'name' },
                                { replace:'Wonderland', with:'name' },
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

                        <div>
                            <label id="greetings">Welcome people of Wonderland</label>
                        </div>
                        <script>
                            connectValue(document, { id:'selection', data:selection, selector:'#greetings', mappings:[
                                { replace:'Wonderland', with:'value' },
                            ]})
                        </script>

                        <div>
                            <label id="selection"></label>
                        </div>
                        <script>
                            listen(document, '#countries', 'change', function(value) {
                                document.getElementById('selection').innerHTML = 'You selected ' + value

                                selection = { value:value }
                                notifyValue(document, { id:'selection', data:selection })
                            })
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
        await page.click('#country-2')

        expect(await page.text('#selection')).to.equal('You selected Canada')
        expect(await page.text('#greetings')).to.equal('Welcome people of Canada')
    })
})
