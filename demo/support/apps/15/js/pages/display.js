const displayTemplate = document.createElement('template')

displayTemplate.innerHTML = `
    <table width="100%">
        <thead>
            <th style="text-align:left">Title</th>
            <th style="text-align:right">Date</th>
        </thead>
        <tbody>
            <tr id="news-with-id">
                <td id="news-with-id-title">always good</td>
                <td id="news-with-id-date" style="text-align:right">now</td>
            </tr>
        </tbody>
    </table>
`

class Display extends YopElement {

    constructor() {
        super()
        this.tree.appendChild(displayTemplate.content.cloneNode(true))
        this.list = this.tree.querySelector('tbody')
        this.template = this.tree.querySelector('tr#news-with-id').outerHTML
                            .split('news').join(this.getAttribute('news'))
        this.mappings = [
            { replace: 'with-id', with: (item)=>item.id },
            { replace: 'always good', with: (item)=>item.title },
            { replace: 'now', with: (item)=>dateLabelFrom(item.date) }
        ]
    }
    connectedCallback() {
        events.register(this, this.getAttribute('news'))
    }
    update(news) {        
        this.list.innerHTML = repeat(this.template, news, this.mappings)
    }
}
customElements.define('yop-display', Display)
