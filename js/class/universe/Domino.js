function Domino() {
    Domino.apply(this);
    this.width = 40;
    this.height = 60;
    this.depth = 10;
}

DominoJS.copyPrototype(Domino, Element3D);
