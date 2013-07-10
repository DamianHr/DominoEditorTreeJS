/**
 * User: Damian
 * Date: 29/06/13
 * Time: 12:00
 */

function Univers() {
    this.elements = [];
}

/**
 *
 * @param elementType
 * @returns {*}
 */
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

    MainController.editor.createObject(element);
    this.addElement(element);
    MainController.listing.update();
    MainController.listing.select(element.id);

    return element;
};

/**
 *
 * @param element
 * @returns {boolean}
 */
Univers.prototype.addElement = function (element) {
    if (!this.elements[element.id]) {
        this.elements[element.id] = element;
        return true;
    }
    return false;
};

/**
 *
 * @param id
 */
Univers.prototype.deleteElement = function (id) {
    MainController.editor.removeObject(this.elements[id].object3D);
    delete this.elements[id];
};

/**
 *
 * @param event
 * @returns {boolean}
 */
Univers.prototype.select = function (event) {
    var firer = DOM.getEventTarget(event, 'listingElement');
    if (!firer) return true;

    if (this.elements[firer.id]) {
        if (MainController.temp_var.activated != this.elements[firer.id]) {
            MainController.temp_var.activated = this.elements[firer.id]
            MainController.propertypage.propertyChange(this.elements[firer.id], 'select');
        }
    }
    return false;
};

/**
 *
 * @returns {string}
 */
Univers.prototype.generateElementId = function () {
    var id = 'ID' + (new Date()).getTime();
    for (var i = 0; i < this.elements.length; i++) {
        if (!this.elements[id])
            setTimeout(this.generateElementId(), 500);
    }
    return id;
};

/**
 *
 * @param type
 * @returns {string}
 */
Univers.prototype.generateElementRealName = function (type) {
    var index = 0;
    for (var object in this.elements)
        if (type === this.elements[object].type) ++index;
    return type.name + ' ' + index;
};

/**
 *
 * @return {*}
 */
Univers.prototype.persist = function () {
    var persisted = {};
    persisted.connections = [];
    persisted.blocks = [];
    for (var element in this.editor.elements) {
        if (this.editor.elements[element].type == ELEMENT.DOMINO)
            persisted.blocks.push(this.editor.elements[element].save());
        else if (this.editor.elements[element].type == ELEMENT.SPHERE)
            persisted.connections.push(this.editor.elements[element].save());
    }
    return JSON.stringify(persisted);
};

/*
 * Parses the given JSON string and instantiates the corresponding
 * objects and adds them to the diagram.
 */
Univers.prototype.load = function (jsonString) {

    var persisted = JSON.parse(jsonString);
    /*
     for (var i=0; i<persisted.blocks.length; i++) {
     var figure = Palette.factory.generateFigure(persisted.blocks[i]);
     var seq = parseInt(figure.id.substring(6));
     if (!isNaN(seq)) this.sequence = Math.max(seq, this.sequence);
     }

     for (var i=0; i<persisted.connections.length; i++) {
     var figure = Palette.factory.generateFigure(persisted.connections[i]);
     var seq = parseInt(figure.id.substring(6));
     if (!isNaN(seq)) this.sequence = Math.max(seq, this.sequence);
     }
     */
};