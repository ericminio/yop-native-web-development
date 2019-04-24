const { Builder, By } = require('selenium-webdriver')
const { expect } = require('chai')
const {
    HomePage
} = require('./support/pages')

describe('The work to magically populate a list', function() {

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

                            connect = function(document, source, selector, mappings) {
                                var parent = document.querySelector(selector).parentNode
                                var template = document.querySelector(selector).outerHTML
                                var children = ''
                                for(var index=0; index<source.length; index++) {
                                    var line = template
                                    for (var i=0; i<mappings.length; i++) {
                                        var mapping = mappings[i]
                                        line = line.replace(mapping.replace, source[index][mapping.with])
                                    }
                                    children += line
                                }
                                parent.innerHTML = children
                            }
                        </script>
                    </head>
                    <body>
                        <table>
                            <tr class="countries-table-template">
                                <td id="name-with-id">Wonderland</td>
                            </tr>
                        </table>
                        <script>
                            connect(document, countries, '.countries-table-template', [
                                { replace:'with-id', with:'id' },
                                { replace:'Wonderland', with:'name' }
                            ])
                        </script>

                        <ul>
                            <li id="country-with-id" class="countries-list-template">Wonderland</li>
                        </ul>
                        <script>
                            connect(document, countries, '.countries-list-template', [
                                { replace:'with-id', with:'id' },
                                { replace:'Wonderland', with:'name' }
                            ])
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

        expect(await page.content('#country-4')).to.equal('USA')
    })
})
