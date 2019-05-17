const publishTitleTemplate = document.createElement('template')

publishTitleTemplate.innerHTML = `

    <yop-menu></yop-menu>

    <div class="step-context">
        <display-steps step="2"/></display-steps>
    </div>

    <div class="step-data">
        <div class="step-data-section-title">Publish news</div>
        <div class="field-label">Type</div>
        <div class="field-value">xxx</div>
        <div class="field-label">Title</div>
        <input id="title" />

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
                        <yop-link to="/publish/title">
                            <div>Next</div>
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

    }
}
customElements.define('publish-title', PublishTitle)
