const publishReviewTemplate = document.createElement('template')

publishReviewTemplate.innerHTML = `

    <yop-menu></yop-menu>

    <div class="step-context">
        <display-steps step="3"/></display-steps>
    </div>

    <div class="step-data">
        <div class="step-data-section-title">Publish news</div>
        <div class="field-label">Type</div>
        <div class="field-value" id="type">xxx</div>
        <div class="field-label">Title</div>
        <div class="field-value" id="title">xxx</div>

    </div>

    <div class="step-context">
        <table>
            <tbody>
                <tr>
                    <td class="step-previous">
                        <yop-link to="/publish/title">
                            <div>Previous</div>
                        </yop-link>
                    </td>
                    <td class="step-next">
                        <yop-link to="/publish/save">
                            <div id="next">Save</div>
                        </yop-link>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
`

class PublishReview extends YopElement {

    connectedCallback() {
        this.appendChild(publishReviewTemplate.content.cloneNode(true))
        let newNews = store.getObject('newNews')
        this.querySelector('#type').textContent = newNews.type
        this.querySelector('#title').textContent = newNews.title
    }
}
customElements.define('publish-review', PublishReview)
