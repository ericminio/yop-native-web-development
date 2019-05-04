const newsListTemplate = document.createElement('template')

newsListTemplate.innerHTML = `
    <style>
        .align-left {
            text-align:left;
        }
        .align-right {
            text-align:right;
        }
        .align-center {
            text-align:center;
        }
    </style>
    <table width="100%">
        <thead>
            <tr>
                <th class="align-left">Title</th>
                <th class="align-right">Date</th>
            </tr>
        </thead>
        <tbody>
            <tr id="news-with-id">
                <td id="news-with-id-title">always good</td>
                <td id="news-with-id-date" style="text-align:right">now</td>
            </tr>
        </tbody>
    </table>
`

class NewsList extends YopElement {

    constructor() {
        super()
        this.tree.appendChild(newsListTemplate.content.cloneNode(true))
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
customElements.define('yop-news-list', NewsList)
