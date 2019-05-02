const spinnerTemplate = document.createElement('template')

spinnerTemplate.innerHTML = `
    <style>
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        .yop-spinner {
            animation: spin 1s linear infinite;
            background-repeat: no-repeat;
            background-position: center;
            background-image: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10px' height='10px' viewBox='0 0 100 100'%3E%3Ccircle fill='white' cx='50' cy='10' r='5'/%3E%3Ccircle fill='white' cx='78' cy='22' r='7'/%3E%3Ccircle fill='white' cx='90' cy='50' r='12'/%3E%3C/svg%3E")
        }
        .yop-spinner::before {
            color: rgba(0, 0, 0, 0);
            content: ".";
        }
    </style>
    <div class="yop-spinner"></div>
`

class Spinner extends YopElement {

    constructor() {
        super()

        var size = this.getAttribute('size')
        this.treeStyle = `display:inline-block; width:${size}; height: ${size};`
    }
    connectedCallback() {
        events.register(this, this.getAttribute('listen'))
    }
    update(state) {
        if (state == 'start' ) {
            this.tree.style = this.treeStyle
            this.tree.appendChild(spinnerTemplate.content.cloneNode(true))
            this.styleComponent = this.tree.querySelector('style')
            
            var content = this.styleComponent.textContent
            content = content.split('white').join(this.getAttribute('color'))
            content = content.split('10px').join(this.getAttribute('size'))
            this.styleComponent.textContent = content
        }
        else {
            this.tree.style = ''
            this.tree.innerHTML = ''
        }
    }
}
customElements.define('yop-spinner', Spinner)
