const { expect } = require('chai');
const yop = require('./yop.js');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

describe('Brag', ()=>{

    describe('About store', ()=>{
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
        it('can be used to detect the need for authentication', ()=>{
            expect(document.querySelector('when-not-authorized').innerHTML.trim()).not.to.equal('');
            expect(document.querySelector('when-authorized').innerHTML.trim()).to.equal('');
        });
        it('can be used to keep info about connected user', ()=>{
            let button = document.getElementById('signin');
            button.click();
            expect(document.querySelector('when-not-authorized').innerHTML.trim()).to.equal('');
            expect(document.querySelector('when-authorized').innerHTML.trim()).not.to.equal('');
        });
    });
    describe('About store and events', ()=>{
        let html = `
            <html>
                <body>
                    <system-status>
                        <div id="status"></div>
                    </system-status>

                    <script>${yop}</script>
                    <script>
                        let api = {
                            ping: ()=> {
                                return new Promise((resolve, reject)=>{
                                    resolve();
                                })
                            }
                        }
                        class SystemStatus extends HTMLElement {
                            constructor() {
                                super();
                                this.count = 0;
                            }
                            connectedCallback() {
                                events.register(this, 'interval set');
                                store.save('interval', 5 * 60 * 1000);
                                events.notify('interval set');
                            }
                            update(value, event) {
                                this.interval = store.get('interval');
                                if (this.intervalId !== undefined) {
                                    clearInterval(this.intervalId);
                                }
                                this.intervalId = setInterval(()=>{ this.refresh(); }, this.interval);
                            }
                            refresh() {
                                this.count ++;
                                this.querySelector('#status').innerHTML = this.count;
                            }
                        }
                        customElements.define('system-status', SystemStatus);
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
        it('can be used to run a task regularly', (done)=>{
            window.store.save('interval', 150);
            window.events.notify('interval set');
            setTimeout(()=>{
                expect(document.querySelector('#status').innerHTML).to.equal('3');
                done();
            }, 500);
        });
    });
});