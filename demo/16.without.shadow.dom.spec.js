const { Builder, By } = require('selenium-webdriver')
const firefox = require('selenium-webdriver/firefox')
const { expect } = require('chai')
const { HomePage } = require('./support/pages')
var fs = require('fs')
var path = require('path')
var process = require('process')

var { server, port } = require('./support/apps/16/server')

describe('Using shadow DOM', function() {

    var driver

    beforeEach(async ()=> {
        if (process.env.YAF_SHOW_AND_WAIT) {
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

    it('is not mandatory if scoping is not your primary concern', async ()=> {
        page = await HomePage(driver, port)
        if (process.env.YAF_SHOW_AND_WAIT) { await page.wait(15*60*1000) }

        await page.click('#menu-download')
        await page.click('#select-all-news-2')
        await page.click('#select-all-news-3')
        await page.click('#download-button')
        var content = fs.readFileSync(path.join(__dirname, 'download', 'news.txt')).toString()

        expect(content).to.equal(expected)
    })

    var expected = `{
    "news": [
        {
            "id": 2,
            "type": "good",
            "title": "Starting its adventure",
            "date": "2019-04-20T09:00:00Z"
        },
        {
            "id": 3,
            "type": "good",
            "title": "Still just a whisper",
            "date": "2019-04-10T09:00:00Z"
        }
    ]
}`
})
