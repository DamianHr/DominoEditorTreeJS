function Sphere() {
    Element3D.apply(this);

    this.radius = 20;
}

MainController.copyPrototype(Sphere, Element3D);


/**
 *
 * @param property
 * @param value
 */
Sphere.prototype.setProperties = function (property, value) {
    if (Element3D.prototype.setPosition.call(this, property, value)) return;
    this.setRadius(value);
};

/**
 *
 * @param value
 */
Sphere.prototype.setRadius = function (value) {
    this.radius = value;
    MainController.editor.removeObject(this.object3D);
    MainController.editor.createObject(this);
};

// Persistance functions
/**
 *
 * @returns {*}
 */
Sphere.prototype.save = function () {
    var object = Element3D.prototype.save().call(this);
    object.radius = this.radius;
    return object;
};

/**
 *
 * @param object
 */
Sphere.prototype.load = function (object) {
    this.id = object.id;
    this.position = Coordinates3D.prototype.load(object.position);
};
