const publishTypeTemplate = document.createElement('template')

publishTypeTemplate.innerHTML = `

    <yop-menu></yop-menu>

    <div class="step-context">
        <display-steps step="1"/></display-steps>
    </div>

    <div class="step-data">
        <div class="step-data-section-title">Publish news</div>
        <div class="field-label">Type</div>
        <input type="radio" id="good" name="type" value="good">Good
        <input type="radio" id="bad" name="type" value="bad">Bad
    </div>

    <div class="step-context">
        <table>
            <tbody>
                <tr>
                    <td>
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

class PublishType extends YopElement {

    connectedCallback() {
        this.appendChild(publishTypeTemplate.content.cloneNode(true))

    }
}
customElements.define('publish-type', PublishType)
