class IfConnected extends YopElement {

    constructor() {
        super()
        this.connectedContent = this.innerHTML
        this.innerHTML = ''
        events.register(this, 'connected')
        events.register(this, 'disconnected')
    }

    update(user, event) {
        if (event == 'connected') {
            this.innerHTML = this.connectedContent
        }
        else {
            this.innerHTML = ''
        }
    }
}

customElements.define('if-connected', IfConnected)
