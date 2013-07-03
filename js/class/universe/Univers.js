/**
 * User: Damian
 * Date: 29/06/13
 * Time: 12:00
 */

function Univers() {
    this.elements = [];
}

Univers.prototype.createElement = function (elementType) {
    var element;

    switch (elementType) {
        case ELEMENT.DOMINO :
        {
            element = new Domino();
        }
            break;
        case ELEMENT.SPHERE :
        {
            element = new Sphere();
        }
            break;
        default :
            return;
            break;
    }

    element.id = this.generateElementId();
    element.displayedName = this.generateElementRealName(elementType);
    element.type = elementType;

    var objects3D = DominoJS.editor.createElement(element);
    element.geometry3D = objects3D[0];
    element.object3D = objects3D[1];
    this.addElement(element);
    DominoJS.listing.update();
    return element;
};

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

Univers.prototype.select = function (event) {
    var firer = DOM.getEventTarget(event, 'listingElement');
    if (!firer) return true;

    DominoJS.temp_var.activated = firer;

    for (var objectId in this.elements) {
        if (objectId === firer.id) {
            var object = this.elements[objectId];
            object.firePropertyChange('select', null);
            break;
        }
    }
    return false;
};

Univers.prototype.deselect = function () {
    DominoJS.temp_var.selected = null;
};

Univers.prototype.generateElementId = function () {
    var id = 'ID' + (new Date()).getTime();
    for (var i = 0; i < this.elements.length; i++) {
        if (!this.elements[id])
            setTimeout(this.generateElementId(), 500);
    }
    return id;
};

Univers.prototype.generateElementRealName = function (type) {
    var index = 0;
    for (var object in this.elements)
        if (type === this.elements[object].type) ++index;
    return type.name + ' ' + index;
};