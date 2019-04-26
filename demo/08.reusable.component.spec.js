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
            <script src="/yaf.js"></script>
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
        // await page.wait(30 * 60 * 1000)

        let root = await driver.findElement(By.css('yop-country-selection'))
        let element = await driver.executeScript('return arguments[0].shadowRoot.querySelector("#country-2")', root)
        await element.click()

        root = await driver.findElement(By.css('yop-greetings#welcome'))
        element = await driver.executeScript('return arguments[0].shadowRoot.querySelector("#welcome-message")', root)
        let message = await element.getText()

        expect(message).to.equal('Welcome people of Canada')

        root = await driver.findElement(By.css('yop-greetings#insight'))
        element = await driver.executeScript('return arguments[0].shadowRoot.querySelector("#insight-message")', root)
        message = await element.getText()

        expect(message).to.equal('Tell me more about Canada')
    })
})
