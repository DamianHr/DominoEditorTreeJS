function Sphere() {
    Element3D.apply(this);

    this.radius = 20;
}

DominoJS.copyPrototype(Sphere, Element3D);