/**
 * User: Damian
 * Date: 29/06/13
 * Time: 12:00
 */

function Univers() {
    this.elements = [];
}

Univers.prototype.addElement = function (element) {
    if (!this.elements[element.id]) {
        this.elements[element.id] = element;
        return true;
    }
    return false;
};

Univers.prototype.removeElement = function (id) {
    var idx = this.elements.indexOf(id);
    if (-1 != idx) this.elements.splice(idx, 1);
};

Univers.prototype.getElement = function (id) {
    if (id) return this.elements[id];
    return null;
};

Univers.prototype.generateElementId = function () {
    var id = 'ID' + (new Date()).getTime();
    for (var i = 0; i < this.elements.length; i++) {
        if (!this.elements[id])
            setTimeout(this.generateElementId(), 500);
    }
    return id;
};