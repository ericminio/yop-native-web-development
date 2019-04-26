const { By, Keys } = require('selenium-webdriver')

var Page = function(driver, options) {
    this.driver = driver
    this.elements = [
        'yop-country-selection',
        'yop-greetings',
        'yop-menu',
        'yop-route'
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
        for (let i=0; i<this.elements.length; i++) {
            let name = this.elements[i]

            let doms = await this.driver.findElements(By.css(name))
            for (let k=0; k<doms.length; k++) {
                let dom = doms[k]
                let script = 'return arguments[0].shadowRoot.querySelector("' + selector + '")'
                let element = await this.driver.executeScript(script, dom)

                if (element !== null) { return element }
            }
        }

        let children = []
        for (let i=0; i<this.elements.length; i++) {
            let name = this.elements[i]
            let doms = await this.driver.findElements(By.css(name))
            for (let k=0; k<doms.length; k++) {
                let dom = doms[k]
                children.push(dom)
            }
        }
        console.log(children.length, 'nested to search for', selector);
        var inspect = async (current)=> {
            console.log('inspect', await current.node.getTagName(), await current.node.getText());
            let search = 'return arguments[0].shadowRoot.querySelector("' + selector + '")'
            let element = await this.driver.executeScript(search, current.node)
            if (element !== null && element !== undefined) { return element }

            var children = []
            for (let k=0; k<this.elements.length; k++) {
                let name = this.elements[k]
                let script = 'return arguments[0].shadowRoot.querySelectorAll("' + name + '")'
                let doms = await this.driver.executeScript(script, current.node)
                children = children.concat(doms)
            }
            for (let i=0; i<children.length; i++) {
                let child = children[i]
                let element = await inspect({ node:child })
                if (element !== null && element !== undefined) { return element }
            }

        }
        for (let i=0; i<children.length; i++) {
            let child = children[i]
            console.log('inspect', await child.getTagName(), await child.getText());
            for (let k=0; k<this.elements.length; k++) {
                let name = this.elements[k]
                let script = 'return arguments[0].shadowRoot.querySelectorAll("' + name + '")'
                let doms = await this.driver.executeScript(script, child)
                if (doms.length > 0) {
                    console.log('doms', doms, name);
                    let element = await inspect({ node:child })
                    if (element !== null && element !== undefined) { return element }
                }
            }
        }

        throw new Error('Unable to locate element: ' + selector)
    }
}

module.exports = { Page:Page }
