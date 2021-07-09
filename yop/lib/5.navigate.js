class Navigation {

    to(target) {
        history.pushState({}, null, target);
        events.notify('navigation')
    }
}
var navigate = new Navigation()
