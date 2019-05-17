const { Builder, By } = require('selenium-webdriver')
const { expect } = require('chai')
const { HomePage } = require('./support/pages')

describe('Calling it a framework', function() {

    var server
    var driver

    var index =
    `
    <html>
        <head>
            <script src="/yaf.js"></script>
        </head>
        <body>
            <div>
                <label>Where do you live?</label>
                <select id="countries" onchange="spread(document, '#countries')">
                    <option id="country-with-id" value="with-value">Wonderland</option>
                </select>

                <script>
                    connect(document, { id:'countries', data:countries, selector:'option#country-with-id', mappings:[
                        { replace:'with-id', with:'id' },
                        { replace:'with-value', with:'name' },
                        { replace:'Wonderland', with:'name' },
                    ]})
                </script>
            </div>
            <div>
                <label id="greetings">Welcome people of Wonderland</label>

                <script>
                    listen(document, '#countries', function(value) {
                        document.getElementById('selection').innerHTML = 'You selected ' + value
                        selection = { value:value }
                        notify(document, { id:'selection', data:selection })
                    })
                </script>
            </div>
            <div>
                <label id="selection"></label>

                <script>
                    connect(document, { id:'selection', data:selection, selector:'#greetings', mappings:[
                        { replace:'Wonderland', with:'value' },
                    ]})
                </script>
            </div>

            <script>
                var countries = []
                var selection = {}

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

    beforeEach(async ()=> {
        server = require('http').createServer(function(request, response) {
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
        if (process.env.SLIDE_SHOW_AND_WAIT) { await page.wait(15*60*1000) }
        await page.click('#country-2')

        expect(await page.text('#selection')).to.equal('You selected Canada')
        expect(await page.text('#greetings')).to.equal('Welcome people of Canada')
    })
})
