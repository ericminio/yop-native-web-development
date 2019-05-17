var zeroLeading = function(number) {
    return number < 10 ? '0'+number : '' + number
}
var dateLabelFromDate = function(value) {
    var label = value.getFullYear()
                + '-' + (zeroLeading(value.getMonth()+1))
                + '-' + (zeroLeading(value.getDate()))
                + ' ' +(zeroLeading(value.getHours()))
                + ':' +(zeroLeading(value.getMinutes()))
                + ':' +(zeroLeading(value.getSeconds()))

    return label
}
var dateLabelFrom = function(date) {
    return dateLabelFromDate(new Date(date))
}
