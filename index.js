var connections = []

var notify = function(document, source) {
    for (var k=0; k < connections.length; k++) {
        var connection = connections[k]
        if (source.id === connection.id) {
            populate(connection.parent, source.data, connection.template, connection.mappings)
        }
    }
}
var connect = function(document, contract) {
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
    populate(parent, contract.data, template, contract.mappings)
}
var populate = function(parent, data, template, mappings) {
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
