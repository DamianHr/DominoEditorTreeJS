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
            element = new Domino();
            break;
        case ELEMENT.SPHERE :
            element = new Sphere();
            break;
        default :
            break;
    }

    element.id = this.generateElementId();
    element.displayedName = this.generateElementRealName(elementType);
    element.type = elementType;

    DominoJS.editor.createObject(element);
    this.addElement(element);
    DominoJS.listing.update();
    DominoJS.listing.select(element.id);

    return element;
};

Univers.prototype.addElement = function (element) {
    if (!this.elements[element.id]) {
        this.elements[element.id] = element;
        return true;
    }
    return false;
};

Univers.prototype.deleteElement = function (id) {
    DominoJS.editor.removeObject(this.elements[id].object3D);
    delete this.elements[id];
};

Univers.prototype.select = function (event) {
    var firer = DOM.getEventTarget(event, 'listingElement');
    if (!firer) return true;

    DominoJS.temp_var.activated = firer;

    for (var objectId in this.elements) {
        if (objectId === firer.id) {
            var object = this.elements[objectId];
            DominoJS.propertypage.propertyChange(object, 'select');
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