const { expect } = require('chai');
const sut = require('./yop.js');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

describe('Route', ()=>{

    let html = `
        <html>
            <body>
                <yop-route when="/hello-world" then="yop-hello-world"></yop-route>
                <yop-route when="/see-you-there" then="yop-see-you-there"></yop-route>

                <button id="go"></button>

                <script>${sut}</script>
                <script>
                    const helloTemplate = document.createElement('template')
                    helloTemplate.innerHTML = '<div>hello world</div>';

                    class YopHelloWorld extends HTMLElement {
                        connectedCallback() {
                            this.appendChild(helloTemplate.content.cloneNode(true));
                        }
                    }
                    customElements.define('yop-hello-world', YopHelloWorld);

                    const seeYouThereTemplate = document.createElement('template')
                    seeYouThereTemplate.innerHTML = '<div>see you there</div>';

                    class YopSeeYouThere extends HTMLElement {
                        connectedCallback() {
                            this.appendChild(seeYouThereTemplate.content.cloneNode(true));
                        }
                    }
                    customElements.define('yop-see-you-there', YopSeeYouThere);

                    document.querySelector('#go').addEventListener('click', (e)=>{
                        history.pushState({}, null, "/see-you-there");
                        events.notify('navigation')
                    });
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
    it('will trigger when location pathname matches', ()=>{
        let div = document.querySelector('div');
        expect(div.innerHTML).to.equal('hello world');
    });
    it('will not trigger when location pathname does not match', ()=>{
        let div = document.querySelector('div');
        expect(div.innerHTML).not.to.equal('see you there');
    });
    it('will trigger when location pathname eventually matches', ()=>{
        let button = document.getElementById('go');
        button.click();
        let div = document.querySelector('div');
        expect(div.innerHTML).to.equal('see you there');
    });
});