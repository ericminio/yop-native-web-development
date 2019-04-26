const { By, Keys } = require('selenium-webdriver')

var Page = function(driver, options) {
    this.driver = driver
}
Page.prototype.open = async function(url) {
    await this.driver.get(url)
}
Page.prototype.text = async function(selector) {
    let element = await this.findElement(selector)
    return await element.getText()
}
Page.prototype.input = async function(selector, value) {
    let field = await this.findElement(selector)
    await field.sendKeys(value)
}
Page.prototype.click = async function(selector) {
    let element = await this.findElement(selector)
    await element.click()
}
Page.prototype.list = async function(selector) {
    let elements = await this.findElement(selector)
    return elements
}
Page.prototype.wait = async function(ms) {
    await this.driver.sleep(ms)
}
Page.prototype.findElement = async function(selector) {
    return await this.driver.findElement(By.css(selector))
}

module.exports = { Page:Page }
