const loginTemplate = document.createElement('template')

loginTemplate.innerHTML = `
    <style>
        .login {
            width: 75%;
            margin: 25px 10% 10px 10%;
        }
        #login {
            width: 150px;
        }
    </style>

    <div class="section login">
        <label class="section-title">Login</label>
        <br/>
        <br/>
        <label>User name</label>
        <br/>
        <input id="username" />
        <br/>
        <br/>
        <div class="action" id="login">Login</div>
    </div>
`

class Login extends YopElement {

    connectedCallback() {
        this.appendChild(loginTemplate.content.cloneNode(true))
        this.querySelector('#username').focus()
        this.querySelector('#login').addEventListener('click', (e)=>{
            let username = this.querySelector('#username').value
            store.save('user', username)
            events.notify('connected')
            history.pushState({}, null, '/home');
            events.notify('navigation')
        })
    }
}
customElements.define('yop-login', Login)
