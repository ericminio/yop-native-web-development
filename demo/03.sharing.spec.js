const { Builder, By } = require('selenium-webdriver')
const { expect } = require('chai')
const {
    HomePage
} = require('./support/pages')

describe('Inventing your own shared store/state/scope', function() {

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
                            var observers = []
                            var spread = function(document, selector, event) {
                                var element = document.querySelector(selector)
                                element.addEventListener(event, function(e) {
                                    var value = e.target.value
                                    observers.forEach(function (observer){
                                        if (observer.selector == selector && observer.event == event) {
                                            observer.callback(value)
                                        }
                                    })
                                })
                            }
                            listen = function(document, selector, event, callback) {
                                var observer = {
                                    selector:selector,
                                    event:event,
                                    callback:callback
                                }
                                observers.push(observer)
                            }
                        </script>
                    </head>
                    <body>
                        <input id="name" />
                        <script>
                            spread(document, '#name', 'input')
                        </script>

                        <div id="greetings">welcome</div>
                        <script>
                            listen(document, '#name', 'input', function(value) {
                                document.getElementById('greetings').innerHTML = 'Hello ' + value
                            })
                        </script>

                        <div id="message">welcome</div>
                        <script>
                            listen(document, '#name', 'input', function(value) {
                                document.getElementById('message').innerHTML = 'Welcome ' + value
                            })
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

    it('is up to you', async ()=> {
        page = await HomePage(driver)
        page.name('World')
        await page.wait(500)

        expect(await page.greetings()).to.equal('Hello World')
        expect(await page.message()).to.equal('Welcome World')
    })
})
