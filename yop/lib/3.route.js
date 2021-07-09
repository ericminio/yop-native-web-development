class Route extends HTMLElement {

    connectedCallback() {
        events.register(this, 'navigation')
        this.update()
    }
    update() {
        if (window.location.pathname == this.getAttribute('when')) {
            let content = document.createElement(this.getAttribute('then'))
            this.innerHTML = content.outerHTML
        }
        else {
            this.innerHTML = ''
        }
    }
}
customElements.define('yop-route', Route);
