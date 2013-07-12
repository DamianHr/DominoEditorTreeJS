/**
 * Constructor of the Domino class
 * Represent a domino object on the scene
 * @constructor
 */
function Domino(position, dimension, rotation) {
    Element3D.apply(this);

    this.type = ELEMENT.DOMINO;

    this.position = position ? new Coordinates3D(position.x, position.y, position.z) : this.position;
    this.dimension = dimension ? new Coordinates3D(dimension.x, dimension.y, dimension.z) : new Coordinates3D(30, 50, 10);
    this.rotation = rotation ? new Coordinates3D(rotation.x, rotation.y, rotation.z) : new Coordinates3D(0, 0, 0);
}

MainController.copyPrototype(Domino, Element3D);

/**
 * Set a propety of the object
 * @param property
 * @param value
 */
Domino.prototype.setProperties = function (property, value) {
    if (Element3D.prototype.setPosition.call(this, property, value)) return;
    else if (Element3D.prototype.setFirstToMove.call(this, property)) return;

    if (property.substring(0, 1) !== 'r')
        this.setDimension(property, value);
    else this.setRotation(property, value);

    // refresh 3D canvas
    MainController.editor.removeObject(this.object3D);
    MainController.editor.createObject(this);
};

/**
 *  Set the dimension of the object
 * @param property
 * @param value
 */
Domino.prototype.setDimension = function (property, value) {
    if (property == 'W')  this.dimension.x = value;
    else if (property == 'L') this.dimension.y = value;
    else if (property == 'D') this.dimension.z = value;
};

/**
 * Set the rotation of the object
 * @param property
 * @param value
 */
Domino.prototype.setRotation = function (property, value) {
    if (property == 'rX')     this.rotation.x = value;
    else if (property == 'rY')this.rotation.y = value;
    else if (property == 'rZ')this.rotation.z = value;
};

// Persistance functions
/**
 * Retrieve the object informations for the saving process
 * @returns {*}
 */
Domino.prototype.save = function () {
    var object = Element3D.prototype.save.call(this);
    object.dimension = this.dimension.save();
    object.rotation = this.rotation.save();
    return object;
};

/**
 * Set the object informations for the loading process
 * @param object
 */
Domino.prototype.load = function (object) {
    Element3D.prototype.load.call(this, object);
    this.dimension = new Coordinates3D(object.dimension.x, object.dimension.y, object.dimension.z);
    this.rotation = new Coordinates3D(object.rotation.x, object.rotation.y, object.rotation.z);
};