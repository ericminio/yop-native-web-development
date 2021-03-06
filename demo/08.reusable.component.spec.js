const { Builder, By } = require('selenium-webdriver')
const { expect } = require('chai')
const { HomePage } = require('./support/pages')

describe('Creating scoped/isolated components', function() {

    var server
    var driver

    var index =
    `
    <html>
        <head>
            <script src="/apps/08.js"></script>
        </head>
        <body>
            <yop-country-selection save-selection-as="country.selection"></yop-country-selection>

            <yop-greetings id="welcome" listen-to="country.selection" prefix="Welcome people of "></yop-greetings>
            <yop-greetings id="insight" listen-to="country.selection" prefix="Tell me more about "></yop-greetings>
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
            if (request.url == '/apps/08.js') {
                response.writeHead(200, { 'content-type':'application/javascript' })
                response.end(require('fs').readFileSync('demo/support/apps/08/08.js').toString())
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

    it('is built-in with shadow DOM and custom HTML elements', async ()=> {
        page = await HomePage(driver)
        if (process.env.SLIDE_SHOW_AND_WAIT) { await page.wait(15*60*1000) }
        await page.click('#country-2')

        expect(await page.text('#welcome-message')).to.equal('Welcome people of Canada')
        expect(await page.text('#insight-message')).to.equal('Tell me more about Canada')
    })
})
