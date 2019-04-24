const { Builder, By } = require('selenium-webdriver')
const { expect } = require('chai')
const {
    HomePage
} = require('./support/pages')

describe.only('The work to magically populate a table', function() {

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
                            connect = function(document, selector, source) {

                            }
                        </script>
                    </head>
                    <body>
                        <table id="countries-list">
                            <tr id="row-id-?">
                                <td id="id-?" class="id-class">42</td>
                                <td id="name-?" class="name-class">Wonderland</td>
                            </tr>
                        </table>
                        <script>
                            connect(document, '#countries-list', countries)
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

    it('is not so difficult', async ()=> {
        page = await HomePage(driver)

        expect(await page.content('#name-1')).to.equal('France')
        expect(await page.content('#name-5')).to.equal('Spain')
    })
})
