function Domino() {
    Element3D.apply(this);

    this.dimension = new Coordinates3D(40, 60, 10);
    this.rotation = new Coordinates3D(0, 0, 0);
}

DominoJS.copyPrototype(Domino, Element3D);

Domino.prototype.setProperties = function (property, value) {
    if (Element3D.prototype.setPosition.call(this, property, value)) return;

    if (property.substring(0, 1) !== 'r')
        this.setDimension(property, value);
    else this.setRotation(property, value);

    DominoJS.editor.removeObject(this.object3D);
    DominoJS.editor.createObject(this);
};

Domino.prototype.setDimension = function (property, value) {
    if (property == 'W')  this.dimension._x = value;
    else if (property == 'L') this.dimension._y = value;
    else if (property == 'D') this.dimension._z = value;
};

Domino.prototype.setRotation = function (property, value) {
    if (property == 'rX')     this.rotation._x = value;
    else if (property == 'rY')this.rotation._y = value;
    else if (property == 'rZ')this.rotation._z = value;
};