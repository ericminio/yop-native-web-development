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

    it('can be done manually', async ()=> {
        page = await HomePage(driver, port)
        if (process.env.SLIDE_SHOW_AND_WAIT) { await page.wait(15*60*1000) }

        expect(await page.text('#good-news-1-title')).to.equal('Gaining power')
        expect(await page.text('#good-news-2-title')).to.equal('Starting its adventure')
        expect(await page.text('#bad-news-empty-message')).to.equal('No bad news, good news')
    })
})
