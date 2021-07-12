const { expect } = require('chai');
const yop = require('./yop.js');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

describe('Link', ()=>{

    let html = `
        <html>
            <body>
                <yop-route when="/hello-world" then="yop-hello-world"></yop-route>
                <yop-route when="/see-you-there" then="yop-see-you-there"></yop-route>

                <yop-link to="/see-you-there">
                    <button id="go"></button>
                </yop-link>

                <script>${yop}</script>
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
    it('is a shortcut for registering client listener', ()=>{
        let button = document.getElementById('go');
        button.click();
        let div = document.querySelector('div');
        expect(div.innerHTML).to.equal('see you there');
    });
});