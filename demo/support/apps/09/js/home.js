class Home extends HTMLElement {

    constructor() {
        super();
        var shadow = this.attachShadow({
            mode: 'open'
        });
        var tree = document.createElement('div');
        shadow.appendChild(tree);

        tree.innerHTML = `
            <label>Home</label>
        `
    }
}
customElements.define('yop-home', Home)
