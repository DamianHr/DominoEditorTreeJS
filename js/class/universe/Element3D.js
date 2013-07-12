/**
 * Represent the two types of object available in the editor
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

    this.firstToMove = false;

    this.object3D = {};
    this.geometry3D = {};
}

/**
 * Add a object in the main collection of objects
 * @param array
 * @param obj
 */
Element3D.addToArray = function (array, obj) {
    var n = array.length;
    for (var i = 0; i < n; i++) if (obj == array[i]) return;
    array.push(obj);
};

/**
 *  Set the position on the current element
 * @param property
 * @param value
 * @returns {boolean}
 */
Element3D.prototype.setPosition = function (property, value) {

    var done = true;
    if (property == 'X') this.position.x = value;
    else if (property == 'Y') this.position.y = value;
    else if (property == 'Z') this.position.z = value;
    else done = false;

    if (done === true) {
        var y = this.type === ELEMENT.DOMINO ? this.dimension.y / 2 + this.position.y + 1 : this.radius + this.position.y + 1;
        this.object3D.position.set(this.position.x, y, this.position.z);
        arrow.position = new THREE.Vector3(this.position.x,
            this.type === ELEMENT.DOMINO ? this.geometry3D.height / 2 + this.position.y + 1 : this.radius + this.position.y + 1,
            this.position.z);
    }
    return done;
};

/**
 * Set the 'firstToMove' properti of the current object
 * @param property
 * @returns {boolean}
 */
Element3D.prototype.setFirstToMove = function (property) {

    var done = false;
    if (property == 'firstToMove') {
        this.firstToMove = true;
        done = true;
    }
    return done;
};


// Persistance functions
/**
 * Retrieve the object informations for the saving process
 * @returns {{}}
 */
Element3D.prototype.save = function () {
    var object = {};
    object.id = this.id;
    object.type = this.type.code;
    object.position = this.position.save();
    if (this.firstToMove) object.firstToMove = 1;
    return object;
};

/**
 * Set the object informations for the loading process
 * @param object
 */
Element3D.prototype.load = function (object) {
    this.id = object.id;
    this.type = object.type.code === ELEMENT.DOMINO.code ? ELEMENT.DOMINO : ELEMENT.SPHERE;
    this.position = new Coordinates3D(object.position.x, object.position.y, object.position.z);
    this.firstToMove = object.firstToMove === 1;
};
