const { Builder, By } = require('selenium-webdriver')
const { expect } = require('chai')
const {
    HomePage
} = require('./support/pages')

describe('Moving data between elements', function() {

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
                            var spread = function(document) {
                                var name = document.getElementById('name').value
                                document.getElementById('greetings').innerHTML = 'Hello ' + name
                            }
                        </script>
                    </head>
                    <body>
                        <input id="name" oninput="spread(document)" />
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

    it('is built-in', async ()=> {
        page = await HomePage(driver)
        if (process.env.SLIDE_SHOW_AND_WAIT) { await page.wait(15*60*1000) }
        page.input('#name', 'World')

        expect(await page.text('#greetings')).to.equal('Hello World')
    })
})
