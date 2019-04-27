const displayTemplate = document.createElement('template')

displayTemplate.innerHTML = `
    <style>

    </style>

    <label id="news-title"></label>
    <table>
        <thead>
            <th>Title</th>
        </thead>
        <tbody>
            <tr id="news-with-id">
                <td id="news-with-id-title">always good</td>
            </tr>
            <tr>
                <td id="news-empty-message">No news, good news</td>
            </tr>
        </tbody>
    </table>
`

class Display extends YafElement {

    static get observedAttributes() {
        return ['title', 'news', 'id-prefix', 'when-empty'];
    }
    constructor() {
        super()
        this.tree.appendChild(displayTemplate.content.cloneNode(true))
        this.newsTitle = this.tree.querySelector('label')
        this.list = this.tree.querySelector('tbody')
        this.templateNode = this.tree.querySelector('tr#news-with-id')
        this.template = this.templateNode.outerHTML
        this.mappings = [
            { replace: 'with-id', with: 'id' },
            { replace: 'always good', with: 'title' },
        ]
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if (name == 'title' && oldValue !== newValue) { this.setAttribute('title', newValue) }
        if (name == 'news' && oldValue !== newValue) { this.setAttribute('news', newValue) }
        if (name == 'when-empty' && oldValue !== newValue) { this.setAttribute('when-empty', newValue) }
        if (name == 'id-prefix' && oldValue !== newValue) { this.setAttribute('id-prefix', newValue) }
    }
    connectedCallback() {
        events.register(this, this.getAttribute('news'))
        this.newsTitle.id = this.newsTitle.id.split('news').join(this.getAttribute('id-prefix'))
        this.newsTitle.textContent = this.getAttribute('title')
    }
    update(news) {
        if (news.length == 0) {
            this.list.removeChild(this.templateNode)
            let empty = this.tree.querySelector('#news-empty-message')
            empty.id = empty.id.split('news').join(this.getAttribute('id-prefix'))
            empty.textContent = this.getAttribute('when-empty')
        }
        else {
            var children = ''
            for (var index = 0; index < news.length; index++) {
                var line = this.template.split('news').join(this.getAttribute('id-prefix'))
                for (var i = 0; i < this.mappings.length; i++) {
                    var mapping = this.mappings[i]
                    line = line.split(mapping.replace).join(news[index][mapping.with])
                }
                children += line
            }
            this.list.innerHTML = children
        }
    }
}
customElements.define('yop-display', Display)
