/**
 * User: Damian
 * Date: 29/06/13
 * Time: 12:00
 */

function Univers() {
    this.elements = [];
    this.firstToMove;
}

/**
 *
 * @param elementType
 * @param position
 * @param dimension
 * @param rotation
 * @returns {*}
 */
Univers.prototype.createElement = function (elementType, id, position, rotation, dimension) {
    var element;

    if (elementType === ELEMENT.DOMINO || elementType === ELEMENT.DOMINO.code)
        element = new Domino(position, dimension, rotation);
    else if (elementType === ELEMENT.SPHERE || elementType === ELEMENT.SPHERE.code)
        element = new Sphere(position, dimension, rotation);
    else return;

    element.id = id ? id : this.generateElementId();
    element.displayedName = this.generateElementRealName(element.type);

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
            MainController.propertypage.propertyChange(this.elements[firer.id]);
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

Univers.prototype.setFirstToMove = function (newFirstToMove) {
    if (this.firstToMove) {
        if (this.firstToMove == newFirstToMove) return true;
        if (!confirm("An element is already assigned to 'First to move'.\n Do you confirm the reassignment?")) return false;
    }

    if (this.elements[this.firstToMove]) this.elements[this.firstToMove].firstToMove = false;
    this.elements[newFirstToMove].firstToMove = true;
    this.firstToMove = newFirstToMove;
    return true;
};

/**
 * Stringify all the given object, for the JSON transformation
 * @return {*}
 */
Univers.prototype.save = function () {
    var elements = [];
    var allElements = this.elements;
    for (var element in allElements) {
        elements.push(allElements[element].save());
    }
    return elements;
};

/*
 * Parses the given JSON string and instantiates the corresponding
 * objects and adds them to the diagram.
 */
Univers.prototype.load = function (elements) {
    for (var index in elements) {
        var newElement = MainController.univers.createElement(elements[index].type,
            elements[index].id,
            elements[index].position,
            elements[index].rotation,
            elements[index].dimension);
        MainController.propertypage.propertyChange(newElement);
        MainController.temp_var.activated = newElement;
    }
};