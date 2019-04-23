const { Builder, By } = require('selenium-webdriver')
const { expect } = require('chai')

describe('Selenium', function() {

    var server
    var driver

    beforeEach(async ()=> {
        server = require('http').createServer(function(request, response) {
            var index =
            `
                <html>
                    <head><title>hello</title></head>
                    <body>
                        <div id="greetings">welcome</div>
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

    it('is ready', async ()=> {
        await driver.get('http://localhost:5000')
        let element = await driver.findElement(By.id('greetings'))
        let value = await element.getText()

        expect(value).to.equal('welcome')
    })
})
