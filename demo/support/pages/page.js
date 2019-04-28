const { By, Keys } = require('selenium-webdriver')

var Page = function(driver, options) {
    this.driver = driver
    this.elements = [
        'yop-country-selection',
        'yop-greetings',
        'yop-menu',
        'yop-route',
        'yop-display',
        'yop-if-not-empty',
        'yop-if-empty'
    ]
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
    try {
        return await this.driver.findElement(By.css(selector))
    }
    catch (error) {
        let shadowRoots = []
        for (let i=0; i<this.elements.length; i++) {
            let name = this.elements[i]
            let doms = await this.driver.findElements(By.css(name))
            shadowRoots = shadowRoots.concat(doms)
        }
        for (let i=0; i<shadowRoots.length; i++) {
            let element = await this.inspect(shadowRoots[i], selector)
            if (element) { return element }
        }

        throw new Error('Unable to locate element: ' + selector)
    }
}
Page.prototype.inspect = async function(dom, selector) {
    let search = 'return arguments[0].shadowRoot.querySelector("' + selector + '")'
    let element = await this.driver.executeScript(search, dom)
    if (element) { return element }

    var children = []
    for (let k=0; k<this.elements.length; k++) {
        let name = this.elements[k]
        let script = 'return arguments[0].shadowRoot.querySelectorAll("' + name + '")'
        let doms = await this.driver.executeScript(script, dom)
        children = children.concat(doms)
    }
    for (let i=0; i<children.length; i++) {
        let element = await this.inspect(children[i], selector)
        if (element) { return element }
    }
}

module.exports = { Page:Page }
