const { base } = require('./commons')
const { Page } = require('./page')

module.exports = async (driver)=>{
    var page = new Page(driver)
    await page.open(base)
    await page.wait(1000)

    page.name = async (value)=>{
        await page.input('#name', value)
    }
    page.greetings = async ()=>{
        let value = await page.text('#greetings')

        return value
    }
    page.message = async ()=>{
        let value = await page.text('#message')

        return value
    }

    return page
}
