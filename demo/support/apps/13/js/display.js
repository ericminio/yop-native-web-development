const displayTemplate = document.createElement('template')

displayTemplate.innerHTML = `
    <table>
        <thead>
            <th>Title</th>
        </thead>
        <tbody>
            <tr id="news-with-id">
                <td id="news-with-id-title">always good</td>
            </tr>
        </tbody>
    </table>
`

class Display extends YafElement {

    constructor() {
        super()
        this.tree.appendChild(displayTemplate.content.cloneNode(true))
        this.list = this.tree.querySelector('tbody')
        this.template = this.tree.querySelector('tr#news-with-id').outerHTML
        this.mappings = [
            { replace: 'with-id', with: 'id' },
            { replace: 'always good', with: 'title' },
        ]
    }
    connectedCallback() {
        events.register(this, this.getAttribute('news'))
    }
    update(news) {
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
customElements.define('yop-display', Display)
