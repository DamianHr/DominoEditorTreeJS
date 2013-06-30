var ELEMENT = {
    SPHERE: {value: 0, name: "sphere", code: "s"},
    DOMINO: {value: 1, name: "domino", code: "d"}
};

function Element3D() {
    this.id = "noID";
    this.position = new Coordinates3D(0, 0, 0);
    this.rotation = new Coordinates3D(0, 0, 0);
}