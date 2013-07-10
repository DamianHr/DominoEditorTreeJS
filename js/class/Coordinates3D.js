/**
 * User: Damian
 * Date: 29/06/13
 * Time: 00:28
 */

/**
 *
 * @param x
 * @param y
 * @param z
 * @constructor
 */
function Coordinates3D(x, y, z) {
    this._x = x;
    this._y = y;
    this._z = z;
}

// Persistence function
/**
 *
 * @returns {{}}
 */
Coordinates3D.prototype.save = function () {
    var object = {};
    object.x = this._x;
    object.y = this._y;
    object.z = this._z;
    return object;
};

/**
 *
 * @param object
 */
Coordinates3D.prototype.load = function (object) {
    this._x = object.x;
    this._y = object.y;
    this._z = object.z;
};
