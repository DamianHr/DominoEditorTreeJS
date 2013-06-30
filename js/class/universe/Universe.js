/**
 * User: Damian
 * Date: 29/06/13
 * Time: 12:00
 */

function Universe() {
    Universe.elements = [];
}

Universe.prototype.addElement = function (element) {
    if (!Universe.elements[element.id]) {
        Universe.elements[element.id] = element;
        return true;
    }
    return false;
}

Universe.prototype.removeElement = function (id) {
    var idx = Universe.elements.indexOf(id);
    if (-1 != idx) Universe.elements.splice(idx, 1);
}

Universe.prototype.generateElementId = function () {
    var id = 'ID' + (new Date()).getTime();
    for (var i = 0; i < Universe.elements.length; i++) {
        if (!Universe.elements[id])
            setTimeout(Universe.generateElementId(), 500);
    }
    return id;
}