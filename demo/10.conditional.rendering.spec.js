const { Builder, By } = require('selenium-webdriver')
const { expect } = require('chai')
const { HomePage } = require('./support/pages')
var { server, port } = require('./support/apps/10/server')

describe('Conditional rendering', function() {

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

        expect(await page.text('#good-news-1-title')).to.equal('Gaining power')
        expect(await page.text('#good-news-2-title')).to.equal('Starting its adventure')

        expect(await page.text('#bad-news-empty-message')).to.equal('Nothing to report')
    })
})
