function Sphere(position, rotation, radius) {
    Element3D.apply(this);

    this.type = ELEMENT.SPHERE;

    this.position = position ? new Coordinates3D(position.x, position.y, position.z) : this.position;
    this.rotation = rotation ? rotation : 0;
    this.radius = radius ? radius : 20;
}

MainController.copyPrototype(Sphere, Element3D);

/**
 *
 * @param property
 * @param value
 */
Sphere.prototype.setProperties = function (property, value) {
    if (Element3D.prototype.setPosition.call(this, property, value)) {
    }
    else if (Element3D.prototype.setFirstToMove.call(this, property)) {
    }
    else if (property.substring(0, 1) === 'r')  this.setRotation(value);
    else this.setRadius(value);

    // refresh 3D canvas
    MainController.editor.removeObject(this.object3D);
    MainController.editor.createObject(this);
};

/**
 *
 * @param value
 */
Sphere.prototype.setRotation = function (value) {
    this.rotation = value;
};

/**
 *
 * @param value
 */
Sphere.prototype.setRadius = function (value) {
    this.radius = value;
};

// Persistance functions
/**
 *
 * @returns {*}
 */
Sphere.prototype.save = function () {
    var object = Element3D.prototype.save.call(this);
    //object.rotation = this.rotation;
    object.radius = this.radius;
    return object;
};

/**
 *
 * @param object
 */
Sphere.prototype.load = function (object) {
    Element3D.prototype.load.call(this, object);
    //this.rotation = object.rotation;
    this.radius = object.radius;
};
