const { Builder, By } = require('selenium-webdriver')
const { expect } = require('chai')
const { HomePage } = require('./support/pages')
var { server, port } = require('./support/apps/09/server')

describe('Single-page app', function() {

    var driver

    beforeEach(async ()=> {
        driver = await new Builder().forBrowser('firefox').build()
    })

    afterEach(async ()=> {
        await server.close()
        await driver.quit()
    })

    it('usually requires a routing mechanism', async ()=> {
        page = await HomePage(driver, port)
        await page.click('#country-3')

        expect(await page.text('#welcome-message')).to.equal('Welcome people of Venezuela')
        expect(await page.text('#insight-message')).to.equal('Tell me more about Venezuela')
    })
})
