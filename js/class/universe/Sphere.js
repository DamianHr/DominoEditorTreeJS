function Sphere() {
    Sphere.apply(this);

    this.radius = 20;
}

DominoJS.copyPrototype(Sphere, Element3D);