const { Builder, By } = require('selenium-webdriver')
const { expect } = require('chai')
const { HomePage } = require('./support/pages')

var { server, port } = require('./support/apps/15/server')

describe('Downloading a file', function() {

    var driver

    beforeEach(async ()=> {
        driver = await new Builder().forBrowser('firefox').build()
    })

    afterEach(async ()=> {
        await server.close()
        await driver.quit()
    })

    it('is easy', async ()=> {
        page = await HomePage(driver, port)
        if (process.env.YAF_SHOW_AND_WAIT) { await page.wait(15*60*1000) }

        expect(await page.text('#good-news-1-title')).to.equal('Gaining power')
    })
})
