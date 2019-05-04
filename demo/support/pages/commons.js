const { Builder, logging } = require('selenium-webdriver')
const firefox = require('selenium-webdriver/firefox')

var fs = require('fs')
var path = require('path')
var process = require('process')
var downloadFolder = path.join(process.cwd(), 'demo', 'download')

let options = new firefox.Options()
     .setPreference('browser.download.folderList', 2)
     .setPreference('browser.download.manager.showWhenStarting', false)
     .setPreference('browser.download.dir', downloadFolder)
     .setPreference('browser.helperApps.neverAsk.saveToDisk', 'text/plain')
     .setPreference('devtools.console.stdout.content', true)

let loggingPrefs = new logging.Preferences()
loggingPrefs.setLevel(logging.Type.BROWSER, logging.Level.ALL)

module.exports = {
    base: 'http://localhost:5000',
    firefox: ()=> {
        return new Builder()
                .forBrowser('firefox')
                .setLoggingPrefs(loggingPrefs)
                .setFirefoxOptions(options)
                .setFirefoxService(
                    new firefox.ServiceBuilder()
                    .enableVerboseLogging()
                    .setStdio('stdout')
                )
                .build()
    },
    displayLogs: async (driver)=>{
        var logs = driver.manage().logs()
        return logs.get('browser').then(console.log).catch((error)=>{ console.log(error) })
    }
}
