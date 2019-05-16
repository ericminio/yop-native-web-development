const logoutTemplate = document.createElement('template')

logoutTemplate.innerHTML = `
    <style>
        #logout {
            border-left: 1px solid white;
            padding-left: 15px;
            margin-left: 15px;
            cursor: pointer;
        }
    </style>
    <span id="logout">logout</span>
`

class Logout extends YopElement {

    constructor() {
        super()
        this.innerHTML = ''
        events.register(this, 'connected')
    }
    connectedCallback() {
        this.appendChild(logoutTemplate.content.cloneNode(true))
    }
    update() {
        if (!this.isConnected) { return }

        this.querySelector('#logout').addEventListener('click', ()=>{
            store.delete('user')
            events.notify('disconnected')
            navigate.to('/')
        })
    }

}
customElements.define('yop-logout', Logout)
