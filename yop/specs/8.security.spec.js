const { expect } = require('chai');
const yop = require('./yop.js');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

describe('Security', ()=>{

    let html = `
        <html>
            <body>
                <when-not-authorized>
                    <div id="alert">you need to sign in</div>
                    <button id="signin">signin</button>
                </when-not-authorized>
                <when-authorized>
                    <div id="content">welcome</div>
                    <button id="signout">signout</button>
                </when-authorized>

                <script>${yop}</script>
                <script>
                    class WhenNotAuthorized extends HTMLElement {
                        constructor() {
                            super();
                        }
                        connectedCallback() {
                            this.then = this.innerHTML;
                            this.update();
                            events.register(this, 'user changed');
                        }
                        update() {
                            let user = store.getObject('user');
                            if (user !== null && user.authorized) {
                                this.innerHTML = '';
                            }
                            else {
                                this.innerHTML = this.then;
                                this.querySelector('#signin').addEventListener('click', ()=>{
                                    store.saveObject('user', { authorized:true });
                                    events.notify('user changed');
                                });
                            }
                        }
                    }
                    customElements.define('when-not-authorized', WhenNotAuthorized);
                    
                    class WhenAuthorized extends HTMLElement {
                        constructor() {
                            super();
                        }
                        connectedCallback() {
                            this.then = this.innerHTML;
                            this.update();
                            events.register(this, 'user changed');
                        }
                        update() {
                            let user = store.getObject('user');
                            if (user !== null && user.authorized) {
                                this.innerHTML = this.then;
                                this.querySelector('#signout').addEventListener('click', ()=>{
                                    store.delete('user');
                                    events.notify('user changed');
                                });
                            }
                            else {
                                this.innerHTML = '';
                            }
                        }
                    }
                    customElements.define('when-authorized', WhenAuthorized);
                </script>
            </body>
        </html>
    `;
    let window;
    let document;
    beforeEach(()=>{
        window = new JSDOM(html, { url: 'https://localhost/hello-world', runScripts: 'dangerously' }).window;
        document = window.document;
    });
    it('can start with a fist layer on the client side', ()=>{
        expect(document.querySelector('when-not-authorized').innerHTML.trim()).not.to.equal('');
        expect(document.querySelector('when-authorized').innerHTML.trim()).to.equal('');
    });
    it('needs more than client-side logic to prevent client code hacking', ()=>{
        window.store.saveObject('user', { authorized:true });
        window.events.notify('user changed');
        expect(document.querySelector('when-not-authorized').innerHTML.trim()).to.equal('');
        expect(document.querySelector('when-authorized').innerHTML.trim()).not.to.equal('');
    });
});