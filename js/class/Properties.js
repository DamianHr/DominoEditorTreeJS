/**
 * User: Damian
 * Date: 28/06/13
 * Time: 23:36
 */

/**
 * Constructor of the Properties class
 * Manage the properties DIV
 * @constructor
 */
function Properties() {

    var titleDiv;
    this.groups = [];

    //this.column = DOM.createElement("DIV", "propertypageDiv");
    //this.column.className = "propertypage";
    this.column = document.getElementById("colright")

    titleDiv = DOM.createElement("DIV", "propertypageTitle", null);
    titleDiv.className = "propertypageTitle leftTitle";
    titleDiv.innerHTML = "Properties";
    this.column.appendChild(titleDiv);

    this.containerDiv = DOM.createElement("DIV", "propertiesContainer", null);
    this.containerDiv.className = "propertiesContainer";
    this.column.appendChild(this.containerDiv);

    this.numberInput = new NumberInput();
    this.checkbox = new Checkbox();
}

/**
 * Call the updates of all the elements of the needed properties
 * @param firer
 * @param action
 */
Properties.prototype.propertyChange = function (firer) {
    this.clearNodes();

    var className = MainController.getClassName(firer)
    var group;

    group = this.createPropertiesGroup('Position', 'propertiesGroup', 'propertiesPosition');
    this.update(firer.position.x, group.id, this.numberInput.createControl('X', 20, firer.position.x, Properties.prototype.numberOnChangeHandler, 'Position on the X axis for the object.', -9999, 9999));
    this.update(firer.position.y, group.id, this.numberInput.createControl('Y', 20, firer.position.y, Properties.prototype.numberOnChangeHandler, 'Position on the Y axis for the object.', 0, 9999));
    this.update(firer.position.z, group.id, this.numberInput.createControl('Z', 20, firer.position.z, Properties.prototype.numberOnChangeHandler, 'Position on the Z axis for the object.', -9999, 9999));

    switch (className) {
        case "Domino" :
            group = this.createPropertiesGroup('Rotation', 'propertiesGroup', 'propertiesRotation');
            this.update(firer.rotation.x, group.id, this.numberInput.createControl('rX', 20, firer.rotation.x, Properties.prototype.numberOnChangeHandler, 'Rotation around the X axis for the object.', -50, 50));
            this.update(firer.rotation.y, group.id, this.numberInput.createControl('rY', 20, firer.rotation.y, Properties.prototype.numberOnChangeHandler, 'Rotation around the Y axis for the object.', -50, 50));
            this.update(firer.rotation.z, group.id, this.numberInput.createControl('rZ', 20, firer.rotation.z, Properties.prototype.numberOnChangeHandler, 'Rotation around the Z axis for the object.', -50, 50));
            group = this.createPropertiesGroup('Dimension', 'propertiesGroup', 'propertiesDimension');
            this.update(firer.dimension.x, group.id, this.numberInput.createControl('W', 20, firer.dimension.x, Properties.prototype.numberOnChangeHandler, 'Dimension on the X axis for the object.', 1, 500));
            this.update(firer.dimension.y, group.id, this.numberInput.createControl('L', 20, firer.dimension.y, Properties.prototype.numberOnChangeHandler, 'Dimension on the Y axis for the object.', 1, 500));
            this.update(firer.dimension.z, group.id, this.numberInput.createControl('D', 20, firer.dimension.z, Properties.prototype.numberOnChangeHandler, 'Dimension on the Z axis for the object.', 1, 500));
            break;
        case "Sphere" :
            group = this.createPropertiesGroup('Dimension', 'propertiesGroup', 'propertiesDimension');
            this.update(firer.radius, group.id, this.numberInput.createControl('R', 20, firer.radius, Properties.prototype.numberOnChangeHandler, 'Radius of the object.', 2, 500));
            //group = this.createPropertiesGroup('Rotation', 'propertiesGroup', 'propertiesRotation');
            //this.update(firer.rotation, group.id, this.numberInput.createControl('rY', 20, firer.rotation, Properties.prototype.numberOnChangeHandler, 'Rotation around the Y axis for the object.', -50, 50));
            break;
        default:
            break;
    }
    group = this.createPropertiesGroup('Action', 'propertiesGroup', 'propertiesAction');
    this.update(firer.firstToMove, group.id, this.checkbox.createControl('firstToMove', firer.firstToMove, Properties.prototype.checkboxOnChangeHandler, 'First to move', 'Designates the first element that starts the simulation'));
};

/**
 * Create a node to contain a group of Properties inputs
 * @param name
 * @param className
 * @param id
 * @returns {*}
 */
Properties.prototype.createPropertiesGroup = function (name, className, id) {
    var element = DOM.createElement("DIV", className, null);
    element.className = className;
    element.id = id;

    var groupNameContainer = DOM.createElement("DIV", 'groupName', null);
    groupNameContainer.className = 'groupName';
    groupNameContainer.innerHTML = name;

    element.appendChild(groupNameContainer);
    this.groups[id] = element;
    this.containerDiv.appendChild(element);
    return element;
}

/**
 * Update the elements of the 'propertypage' element
 * @param value
 * @param groupId
 * @param input
 */
Properties.prototype.update = function (value, groupId, input) {
    var group = this.groups[groupId];

    var propertyLine = DOM.createElement('DIV', 'propertyLine', null);
    propertyLine.className = 'propertyLine';

    propertyLine.appendChild(input);

    group.appendChild(propertyLine);
};

/**
 * Clear the table of Properties
 */
Properties.prototype.clearNodes = function () {
    while (this.containerDiv.firstChild) this.containerDiv.removeChild(this.containerDiv.firstChild);
};

/**
 * Handle all change events for the input number
 * @param object
 * @param property
 * @param value
 */
Properties.prototype.numberOnChangeHandler = function (object, property, value) {
    value = parseInt(value);
    var element = MainController.temp_var.activated;
    if (element) return element.setProperties(property, value);
    return false;
};

/**
 * Handle all change events for the checkbox
 * @param object
 * @param property
 */
Properties.prototype.checkboxOnChangeHandler = function () {
    var element = MainController.temp_var.activated;
    if (element) return MainController.univers.setFirstToMove(element.id);
    else return false;
};

/**
 * Hide the properties DIV
 */
Properties.prototype.hide = function () {
    this.column.style.display = "none";
};

/**
 * Show the properties DIV
 */
Properties.prototype.show = function () {
    this.column.style.display = "block";
};
