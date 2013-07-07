function Sphere() {
    Element3D.apply(this);

    this.radius = 20;
}

DominoJS.copyPrototype(Sphere, Element3D);

Sphere.prototype.setProperties = function (property, value) {
    if (Element3D.prototype.setPosition.call(this, property, value)) return;
    this.setRadius(value);
};

Sphere.prototype.setRadius = function (value) {
    this.radius = value;
    DominoJS.editor.removeObject(this.object3D);
    DominoJS.editor.createObject(this);
};
