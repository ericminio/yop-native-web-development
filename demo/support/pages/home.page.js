const { base } = require('./commons')
const { Page } = require('./page')

module.exports = async (driver, port)=>{
    var page = new Page(driver)
    var url = port === undefined ? base : 'http://localhost:'+port
    await page.open(url)
    await page.wait(1000)

    return page
}
