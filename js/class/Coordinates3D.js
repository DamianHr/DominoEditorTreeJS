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
function Coordinates3D(_x, _y, _z) {
    this.x = _x;
    this.y = _y;
    this.z = _z;
}

// Persistence function
/**
 *
 * @returns {{}}
 */
Coordinates3D.prototype.save = function () {
    var object = {};
    object.x = this.x;
    object.y = this.y;
    object.z = this.z;
    return object;
};