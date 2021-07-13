class Navigation {

    constructor(window) {
        this.window = window;
        this.window.onpopstate = ()=> {
            events.notify('navigation');
        }
    }

    to(target) {
        history.pushState({}, null, target);
        events.notify('navigation');
    }
}
var navigate = new Navigation(window);
