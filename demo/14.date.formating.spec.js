const { Builder, By } = require('selenium-webdriver')
const { expect } = require('chai')
const { HomePage } = require('./support/pages')

var { server, port } = require('./support/apps/14/server')

describe('Date formating', function() {

    var driver

    beforeEach(async ()=> {
        driver = await new Builder().forBrowser('firefox').build()
    })

    afterEach(async ()=> {
        await server.close()
        await driver.quit()
    })

    it('is always a little plumbing', async ()=> {
        page = await HomePage(driver, port)
        if (process.env.YAF_SHOW_AND_WAIT) { await page.wait(15*60*1000) }
        var sutUtcTime = 14
        var offset = new Date().getTimezoneOffset() / 60
        var localTime = 14 - offset
        localTime = localTime < 10 ? '0'+localTime : ''+localTime

        expect(await page.text('#good-news-1-title')).to.equal('Gaining power')
        expect(await page.text('#good-news-1-date')).to.equal('2019-05-01 ' + localTime + ':33:14')
    })
})
