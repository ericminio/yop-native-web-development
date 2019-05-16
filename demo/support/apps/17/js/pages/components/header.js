const headerTemplate = document.createElement('template')

headerTemplate.innerHTML = `
    <style>
        .title {
            text-align: center;
            background-color: #184896;
            color: white;
        }
        #header-table {
            width: 100%;
            color: white;
        }
        #header-table td {
            width: 30%;
        }
        .big {
            font-size: 42px;
            text-align: center;
        }
        .logout-cell {
            text-align: right;
            padding-right: 20px;
        }
    </style>
    <div class="title">
        <table id="header-table">
            <tbody>
                <tr>
                    <td></td>
                    <td class="big">News Post</td>
                    <td class="logout-cell">
                        <if-connected>
                            <yop-greetings></yop-greetings>
                            <yop-logout></yop-logout>
                        </if-connected>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
`

class Header extends YopElement {

    connectedCallback() {
        this.appendChild(headerTemplate.content.cloneNode(true))
    }
}
customElements.define('yop-header', Header)
