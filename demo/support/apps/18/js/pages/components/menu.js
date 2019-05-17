const menuTemplate = document.createElement('template')

menuTemplate.innerHTML = `
    <style>
        #menu-publish {
            color: red;
        }
    </style>
    <div class="ribbon">
        <ul>
            <yop-link to="/home">
                <li class="menu">HOME</li>
            </yop-link>
            <yop-link to="/download">
                <li class="menu with-separator" id="menu-download">DOWNLOAD</li>
            </yop-link>
            <if-authorized who="user">
                <yop-link to="/publish/type">
                    <li class="menu with-separator red" id="menu-publish">PUBLISH</li>
                </yop-link>
            </if-authorized>
        </ul>
    </div>
`

class Menu extends YopElement {

    connectedCallback() {
        this.appendChild(menuTemplate.content.cloneNode(true))
    }
}
customElements.define('yop-menu', Menu)
