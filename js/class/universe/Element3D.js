/**
 *
 * @type {{SPHERE: {value: number, name: string, code: string}, DOMINO: {value: number, name: string, code: string}}}
 */
var ELEMENT = {
    SPHERE: {value: 0, name: "Sphere", code: "s"},
    DOMINO: {value: 1, name: "Domino", code: "d"}
};

/**
 *
 * @constructor
 */
function Element3D() {
    this.id = "noID";
    this.displayedName = "Element3D";
    this.position = new Coordinates3D(0, 0, 0);

    this.object3D = {};
    this.geometry3D = {};
}

/**
 *
 * @param array
 * @param obj
 */
Element3D.addToArray = function (array, obj) {
    var n = array.length;
    for (var i = 0; i < n; i++) if (obj == array[i]) return;
    array.push(obj);
};

/**
 *
 * @param property
 * @param value
 * @returns {boolean}
 */
Element3D.prototype.setPosition = function (property, value) {

    var done = true;
    if (property == 'X') this.position._x = value;
    else if (property == 'Y') this.position._y = value;
    else if (property == 'Z') this.position._z = value;
    else done = false;

    if (done === true) {
        var y = this.type === ELEMENT.DOMINO ? this.dimension._y / 2 + this.position._y + 1 : this.radius + this.position._y + 1;
        this.object3D.position.set(this.position._x, y, this.position._z);
    }
    return done;
};

// Persistance functions
/**
 *
 * @returns {{}}
 */
Element3D.prototype.save = function () {
    var object = {};
    object.id = this.id;
    object.position = this.position.save();
    return object;
};

/**
 *
 * @param object
 */
Element3D.prototype.load = function (object) {
    this.id = object.id;
    this.position = Coordinates3D.prototype.load(object.position);
};
