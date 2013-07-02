function Domino() {
    Element3D.apply(this);

    this.dimension = new Coordinates3D(40, 60, 10);
    this.rotation = new Coordinates3D(0, 0, 0);
}

DominoJS.copyPrototype(Domino, Element3D);
