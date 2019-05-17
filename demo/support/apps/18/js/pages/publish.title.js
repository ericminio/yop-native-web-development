const publishTitleTemplate = document.createElement('template')

publishTitleTemplate.innerHTML = `

    <yop-menu></yop-menu>

    <div class="step-context">
        <display-steps step="2"/></display-steps>
    </div>

    <div class="step-data">
        <div class="step-data-section-title">Publish news</div>
        <div class="field-label">Type</div>
        <div class="field-value" id="type">xxx</div>
        <div class="field-label">Title</div>
        <input id="title" size="42" />

    </div>

    <div class="step-context">
        <table>
            <tbody>
                <tr>
                    <td class="step-previous">
                        <yop-link to="/publish/type">
                            <div>Previous</div>
                        </yop-link>
                    </td>
                    <td class="step-next">
                        <yop-link to="/publish/review">
                            <div id="next">Next</div>
                        </yop-link>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
`

class PublishTitle extends YopElement {

    connectedCallback() {
        this.appendChild(publishTitleTemplate.content.cloneNode(true))
        let newNews = store.getObject('newNews')
        this.querySelector('#type').textContent = newNews.type
        newNews.title ? this.querySelector('#title').value = newNews.title : undefined
        this.querySelector('#title').focus()
        this.querySelector('#next').addEventListener('click', (e)=>{
            let newNews = store.getObject('newNews')
            newNews.title = this.querySelector('#title').value
            store.saveObject('newNews', newNews)
        })
    }
}
customElements.define('publish-title', PublishTitle)
