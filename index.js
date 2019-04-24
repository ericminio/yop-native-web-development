var log = function(document, message) {
    document.getElementById('log').innerHTML += message
}

var connections = []

var notify = function(document, source) {
    notifyList(document, source)
}
var notifyList = function(document, source) {
    for (var k=0; k < connections.length; k++) {
        var connection = connections[k]
        if (source.id === connection.id) {
            populateList(connection.parent, source.data, connection.template, connection.mappings)
        }
    }
}
var notifyValue = function(document, source) {
    for (var k=0; k < connections.length; k++) {
        var connection = connections[k]
        if (source.id === connection.id) {
            populateValue(connection.parent, source.data, connection.template, connection.mappings)
        }
    }
}
var connect = function(document, contract) {
    connectList(document, contract)
}
var connectList = function(document, contract) {
    var parent = document.querySelector(contract.selector).parentNode
    var template = document.querySelector(contract.selector).outerHTML
    var connection = {
        id:contract.id,
        data:contract.data,
        parent:parent,
        template:template,
        mappings:contract.mappings
    }
    connections.push(connection)
    populateList(parent, contract.data, template, contract.mappings)
}
var connectValue = function(document, contract) {
    var parent = document.querySelector(contract.selector).parentNode
    var template = document.querySelector(contract.selector).outerHTML
    var connection = {
        id:contract.id,
        data:contract.data,
        parent:parent,
        template:template,
        mappings:contract.mappings
    }
    connections.push(connection)
    populateValue(parent, contract.data, template, contract.mappings)
}
var populateValue = function(parent, data, template, mappings) {
    var line = template
    for (var i=0; i<mappings.length; i++) {
        var mapping = mappings[i]
        line = line.replace(mapping.replace, data[mapping.with])
    }
    parent.innerHTML = line
}
var populateList = function(parent, data, template, mappings) {
    var children = ''
    for(var index=0; index<data.length; index++) {
        var line = template
        for (var i=0; i<mappings.length; i++) {
            var mapping = mappings[i]
            line = line.replace(mapping.replace, data[index][mapping.with])
        }
        children += line
    }
    parent.innerHTML = children
}

var observers = []
var spread = function(document, selector, event) {
    var element = document.querySelector(selector)
    for (var i=0; i < observers.length; i++) {
        var observer = observers[i]
        if (observer.selector == selector && observer.event == event) {
            observer.callback(element.value)
        }
    }
}
listen = function(document, selector, event, callback) {
    var observer = {
        selector:selector,
        event:event,
        callback:callback
    }
    observers.push(observer)
}
