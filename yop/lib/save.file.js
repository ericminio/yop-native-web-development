var save = function(name, data) {
    var link = document.createElement('a')
    link.href = URL.createObjectURL(data)
    link.download = name
    var event = new MouseEvent('click')
    link.dispatchEvent(event)
}
