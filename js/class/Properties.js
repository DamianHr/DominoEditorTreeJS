/**
 * User: Damian
 * Date: 28/06/13
 * Time: 23:36
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


    var colors = [];
    colors[0] = new Array("#000000", "#808080", "#800000", "#808000");
    colors[1] = new Array("#008000", "#008080", "#000080", "#800080");
    colors[2] = new Array("#c0c0c0", "#ff0000", "#ffff00", "#00ff00");
    colors[3] = new Array("#00ffff", "#0000ff", "#ff00ff", "#ffffff");

    this.colorPalette = new ColorPalette(colors);
    this.numberInput = new NumberInput();
}

/**
 * Call the updates of all the elements of the needed properties
 * @param firer
 * @param action
 */
Properties.prototype.propertyChange = function (firer, action) {
    this.clear();

    if ("select" == action) {
        //this.table.setAttribute("id", firer.id);

        var className = DominoJS.getClassName(firer)
        var group;
        switch (className) {
            case "Domino" :
                group = this.createPropertiesGroup('Position', 'propertiesGroup', 'propertiesPosition');
                this.update(firer.position._x, group.id, this.numberInput.createControl('X', 20, firer.position._x, Properties.prototype.onChangeHandler, 'Position on the X axis for the object.', -9999, 9999));
                this.update(firer.position._y, group.id, this.numberInput.createControl('Y', 20, firer.position._y, Properties.prototype.onChangeHandler, 'Position on the Y axis for the object.', -9999, 9999));
                this.update(firer.position._z, group.id, this.numberInput.createControl('Z', 20, firer.position._z, Properties.prototype.onChangeHandler, 'Position on the Z axis for the object.', 0, 9999));
                group = this.createPropertiesGroup('Rotation', 'propertiesGroup', 'propertiesRotation');
                this.update(firer.rotation._x, group.id, this.numberInput.createControl('rX', 20, firer.rotation._x, Properties.prototype.onChangeHandler, 'Rotation around the X axis for the object.', -359, 359));
                this.update(firer.rotation._y, group.id, this.numberInput.createControl('rY', 20, firer.rotation._y, Properties.prototype.onChangeHandler, 'Rotation around the Y axis for the object.', -359, 359));
                this.update(firer.rotation._z, group.id, this.numberInput.createControl('rZ', 20, firer.rotation._z, Properties.prototype.onChangeHandler, 'Rotation around the Z axis for the object.', -359, 359));
                group = this.createPropertiesGroup('Dimension', 'propertiesGroup', 'propertiesDimension');
                this.update(firer.dimension._x, group.id, this.numberInput.createControl('W', 20, firer.dimension._x, Properties.prototype.onChangeHandler, 'Dimension on the X axis for the object.', 1, 500));
                this.update(firer.dimension._y, group.id, this.numberInput.createControl('L', 20, firer.dimension._y, Properties.prototype.onChangeHandler, 'Dimension on the Y axis for the object.', 1, 500));
                this.update(firer.dimension._z, group.id, this.numberInput.createControl('D', 20, firer.dimension._z, Properties.prototype.onChangeHandler, 'Dimension on the Z axis for the object.', 1, 500));
                break;
            case "Sphere" :
                group = this.createPropertiesGroup('Position', 'propertiesGroup', 'propertiesPosition');
                this.update(firer.position._x, group.id, this.numberInput.createControl('X', 20, firer.position._x, Properties.prototype.onChangeHandler, 'Position on the X axis for the object.', -9999, 9999));
                this.update(firer.position._y, group.id, this.numberInput.createControl('Y', 20, firer.position._y, Properties.prototype.onChangeHandler, 'Position on the Y axis for the object.', -9999, 9999));
                this.update(firer.position._z, group.id, this.numberInput.createControl('Z', 20, firer.position._z, Properties.prototype.onChangeHandler, 'Position on the Z axis for the object.', 0, 9999));
                group = this.createPropertiesGroup('Dimension', 'propertiesGroup', 'propertiesDimension');
                this.update(firer.radius, group.id, this.numberInput.createControl('R', 20, firer.radius, Properties.prototype.onChangeHandler, 'Radius of the object.', 2, 500));
                break;
            default:
                break;
        }
    }
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
Properties.prototype.clear = function () {
    while (this.containerDiv.firstChild) this.containerDiv.removeChild(this.containerDiv.firstChild);
};

/**
 * Create a checkbox input
 * @param name
 * @return {*}
 */
Properties.prototype.createCheckBox = function (name) {
    var input = DOM.createElement("INPUT", name, 'checkbox');
    input.id = name;
    input.className = "check";
    input.style.zIndex = 1;
    input.onchange = function (event) {
        var object = DOM.getEventTarget(event, null);
        Properties.prototype.onChangeHandler(object, object.id, object.value);
    };
    return input;
};

/**
 * Handle all change events
 * @param object
 * @param property
 * @param value
 */
Properties.prototype.onChangeHandler = function (object, property, value) {
    var table = DOM.bubbleToTarget(object, "propertypage");
    var element = DominoJS.univers.getElement(table.id);
    if (element) element.setProperty(property, value);
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
