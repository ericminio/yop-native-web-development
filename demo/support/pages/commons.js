const { Builder } = require('selenium-webdriver')
const firefox = require('selenium-webdriver/firefox')

var fs = require('fs')
var path = require('path')
var process = require('process')
var downloadFolder = path.join(process.cwd(), 'demo', 'download')

let options = new firefox.Options()
     .setPreference('browser.download.folderList', 2)
     .setPreference('browser.download.manager.showWhenStarting', false)
     .setPreference('browser.download.dir', downloadFolder)
     .setPreference('browser.helperApps.neverAsk.saveToDisk', 'application/zip')

module.exports = {
    base: 'http://localhost:5000',
    firefox: ()=> {
        return new Builder()
                .forBrowser('firefox')
                .setFirefoxOptions(options)
                .build()
    }
}
