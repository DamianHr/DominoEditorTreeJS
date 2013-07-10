/**
 *
 * @constructor
 */
function Domino() {
    Element3D.apply(this);

    this.dimension = new Coordinates3D(30, 50, 10);
    this.rotation = new Coordinates3D(0, 0, 0);
}

MainController.copyPrototype(Domino, Element3D);

/**
 *
 * @param property
 * @param value
 */
Domino.prototype.setProperties = function (property, value) {
    if (Element3D.prototype.setPosition.call(this, property, value)) return;

    if (property.substring(0, 1) !== 'r')
        this.setDimension(property, value);
    else this.setRotation(property, value);

    MainController.editor.removeObject(this.object3D);
    MainController.editor.createObject(this);
};

/**
 *
 * @param property
 * @param value
 */
Domino.prototype.setDimension = function (property, value) {
    if (property == 'W')  this.dimension._x = value;
    else if (property == 'L') this.dimension._y = value;
    else if (property == 'D') this.dimension._z = value;
};

/**
 *
 * @param property
 * @param value
 */
Domino.prototype.setRotation = function (property, value) {
    if (property == 'rX')     this.rotation._x = value;
    else if (property == 'rY')this.rotation._y = value;
    else if (property == 'rZ')this.rotation._z = value;
};

// Persistance functions
/**
 *
 * @returns {*}
 */
Domino.prototype.save = function () {
    var object = Element3D.prototype.save().call(this);
    object.dimension = this.dimension.save();
    object.rotation = this.rotation.save();
    return object;
};

/**
 *
 * @param object
 */
Domino.prototype.load = function (object) {
    this.position = Coordinates3D.prototype.load(object.position);
};