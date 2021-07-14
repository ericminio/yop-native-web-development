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
                    <div>welcome</div>
                    <button id="signout">signout</button>
                    <fetch-data></fetch-data>
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

                    class FetchData extends HTMLElement {
                        constructor() {
                            super();
                        }
                        connectedCallback() {
                            this.innerHTML = '<div id="data"></div>';
                            this.load();
                        }
                        load() {
                            let fetch = new Promise((resolve, reject)=>{
                                var xhr = new window.XMLHttpRequest();
                                xhr.onreadystatechange = ()=> {  
                                    if (xhr.readyState === 4) {  
                                        xhr.status === 200 
                                            ? resolve(xhr.responseText)
                                            : reject(xhr.responseText);
                                    }  
                                };
                                xhr.open('GET', '/data', true);
                                xhr.send();
                            });
                            fetch
                                .then(value => { this.querySelector('#data').innerHTML = value; } )
                                .catch(error => { this.querySelector('#data').innerHTML = error; } )
                                ;
                        }
                    }
                    customElements.define('fetch-data', FetchData);
                </script>
            </body>
        </html>
    `;
    let window;
    let document;
    let server;
    beforeEach((done)=>{
        server = require('http').createServer((request, response)=>{
            if (request.url == '/page') {
                response.setHeader('Content-Type', 'text/html');
                response.statusCode = 200;
                response.write(html)
            } else {
                response.setHeader('Content-Type', 'text/plain');
                response.statusCode = 403;
                response.write("forbidden")
            }
            response.end();
        });
        server.listen(5001, ()=>{
            JSDOM.fromURL('http://localhost:5001/page', { runScripts: 'dangerously', resources: 'usable' }).then(dom => {
                window = dom.window;
                document = window.document;
                done();    
            });
        });
    });
    afterEach(()=>{
        server.close();
    })
    it('can start with a fist layer on the client side', ()=>{
        expect(document.querySelector('when-not-authorized').innerHTML.trim()).not.to.equal('');
        expect(document.querySelector('when-authorized').innerHTML.trim()).to.equal('');
    });
    it('needs more than client-side logic to prevent client code hacking', (done)=>{
        window.store.saveObject('user', { authorized:true });
        window.events.notify('user changed');
        setTimeout(()=>{
            expect(document.querySelector('when-not-authorized').innerHTML.trim()).to.equal('');
            expect(document.querySelector('when-authorized').innerHTML.trim()).not.to.equal('');
            done();
        }, 150);
    });
    it('has to be enforced by the server eventually', (done)=>{
        window.store.saveObject('user', { authorized:true });
        window.events.notify('user changed');
        setTimeout(()=>{
            expect(document.querySelector('#data').innerHTML).to.equal('forbidden');
            done();
        }, 150);        
    })
});