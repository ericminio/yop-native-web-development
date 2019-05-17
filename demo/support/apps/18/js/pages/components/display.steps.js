const stepsTemplate = document.createElement('template')

stepsTemplate.innerHTML = `
    <style>
        .step {
            text-align: center;
        }
        .step-black {
            font-weight: bold;
        }
        .step-gray {
            font-weight: normal;
            color: gray;
        }
    </style>

    <table width="100%">
        <thead>
            <tr>
                <th class="step step-gray">.</th>
                <th class="step step-gray">.</th>
                <th class="step step-gray">.</th>
                <th class="step step-gray">.</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td class="step step-gray">Type</td>
                <td class="step step-gray">Title</td>
                <td class="step step-gray">Description</td>
                <td class="step step-gray">Review</td>
            </tr>
        </tbody>
    </table>

`

class DisplaySteps extends YopElement {

    connectedCallback() {
        this.appendChild(stepsTemplate.content.cloneNode(true))
        var current = parseInt(this.getAttribute('step'))
        var headers = this.querySelectorAll('th.step')
        var titles = this.querySelectorAll('td.step')
        var i = 0
        while (i < current) {
            headers[i].setAttribute('class', 'step step-black')
            titles[i].setAttribute('class', 'step step-black')
            i++
        }
    }
}
customElements.define('display-steps', DisplaySteps)
