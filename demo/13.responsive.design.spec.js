const { Builder, By } = require('selenium-webdriver')
const { expect } = require('chai')
const { HomePage } = require('./support/pages')

var { server, port } = require('./support/apps/13/server')

describe('Responsive design', function() {

    var driver

    beforeEach(async ()=> {
        driver = await new Builder().forBrowser('firefox').build()
    })

    afterEach(async ()=> {
        await server.close()
        await driver.quit()
    })

    it('is also native', async ()=> {
        page = await HomePage(driver, port)

        await page.wait(1500)
        let rect = await driver.manage().window().getRect()
        await driver.manage().window().setRect({ width:600, height:rect.height })
        await page.wait(1000)

        if (process.env.YAF_SHOW_AND_WAIT) { await page.wait(15*60*1000) }

        expect(await page.text('#good-news-1-title')).to.equal('Gaining power')
        expect(await page.text('#good-news-2-title')).to.equal('Starting its adventure')
        expect(await page.text('#bad-news-empty-message')).to.equal('No bad news... very good news :)')
    })
})
