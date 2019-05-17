const greetingsTemplate = document.createElement('template')

greetingsTemplate.innerHTML = `
    <span id="greetings">Welcome</span>
`

class Greetings extends YopElement {

    constructor() {
        super()
        this.innerHTML = ''
        events.register(this, 'connected')
    }
    connectedCallback() {
        this.appendChild(greetingsTemplate.content.cloneNode(true))
    }
    update(user, event) {
        if (!this.isConnected) { return }

        if ('connected' == event) {
            this.querySelector('#greetings').textContent = 'Welcome, ' + user
        }
    }

}
customElements.define('yop-greetings', Greetings)
