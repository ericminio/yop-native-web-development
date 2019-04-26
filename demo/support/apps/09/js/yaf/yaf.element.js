class YafElement extends HTMLElement {

    constructor() {
        super();
        var shadow = this.attachShadow({
            mode: 'open'
        });
        this.tree = document.createElement('div');
        shadow.appendChild(this.tree);
    }
}
