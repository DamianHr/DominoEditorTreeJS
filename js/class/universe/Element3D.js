var ELEMENT = {
    SPHERE: {value: 0, name: "Sphere", code: "s"},
    DOMINO: {value: 1, name: "Domino", code: "d"}
};

function Element3D() {
    this.id = "noID";
    this.displayedName = "Element3D";
    this.position = new Coordinates3D(0, 0, 0);

    this.object3D;
    this.geometry3D;

}

Element3D.addToArray = function (array, obj) {
    var n = array.length;
    for (var i = 0; i < n; i++) if (obj == array[i]) return;
    array.push(obj);
};

// Persistance functions
Element3D.prototype.save = function () {
    var object = {};
    object.id = this.id;
    object.position = this.position.save();
    return object;
};

Element3D.prototype.load = function (object) {
    this.id = object.id;
    this.position = Coordinates3D.prototype.load(object.position);
};
