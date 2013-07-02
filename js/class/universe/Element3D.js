var ELEMENT = {
    SPHERE: {value: 0, name: "sphere", code: "s"},
    DOMINO: {value: 1, name: "domino", code: "d"}
};

function Element3D() {
    this.id = "noID";
    this.position = new Coordinates3D(0, 0, 0);

    this.object3D;
    this.geometry3D;

    this.propertyListener = [];
}

Element3D.prototype.firePropertyChange = function (property, value) {
    var n = this.propertyListener.length;
    for (var i = 0; i < n; i++) {
        this.propertyListener[i].propertyChange(this, property, value);
    }
};

Element3D.prototype.propertyChange = function (firer, property, value) {

};

Element3D.addToArray = function (array, obj) {
    var n = array.length;
    for (var i = 0; i < n; i++) if (obj == array[i]) return;
    array.push(obj);
};

Element3D.prototype.addPropertyChangeListener = function (callback) {
    //this.propertyListener.push(callback);
    Element3D.addToArray(this.propertyListener, callback);		// prevent repetition
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
