const { Builder, By } = require('selenium-webdriver')
const firefox = require('selenium-webdriver/firefox')
const { expect } = require('chai')
const { HomePage } = require('./support/pages')
var fs = require('fs')
var path = require('path')
var process = require('process')

var { server, port } = require('./support/apps/17/server')

describe('Authorization in the front end', function() {

    var driver

    beforeEach(async ()=> {
        if (process.env.SLIDE_SHOW_AND_WAIT) {
            driver = await new Builder().forBrowser('firefox').build()
        }
        else {

            var downloadFolder = path.join(process.cwd(), 'demo', 'download')

            let options = new firefox.Options()
                 .setPreference('browser.download.folderList', 2)
                 .setPreference('browser.download.manager.showWhenStarting', false)
                 .setPreference('browser.download.dir', downloadFolder)
                 .setPreference('browser.helperApps.neverAsk.saveToDisk', 'text/plain')
                 .setPreference('devtools.console.stdout.content', true)

            driver = await new Builder()
                    .forBrowser('firefox')
                    .setFirefoxOptions(options)
                    .build()
        }
    })

    afterEach(async ()=> {
        await server.close()
        await driver.quit()
    })

    it('is just another conditional rendering component', async ()=> {
        page = await HomePage(driver, port)
        if (process.env.SLIDE_SHOW_AND_WAIT) { await page.wait(15*60*1000) }

        await page.input('#username', 'Joe')
        await page.wait(1*1*1000)
        await page.click('#login')
        expect(await page.texts('.menu')).to.equal('HOMEDOWNLOAD')
        await page.wait(1*1*1000)

        await page.click('#logout')
        await page.input('#username', 'Boss')
        await page.wait(1*1*1000)
        await page.click('#login')
        expect(await page.texts('.menu')).to.equal('HOMEDOWNLOADPUBLISH')
        await page.wait(1*3*1000)
    })
})
