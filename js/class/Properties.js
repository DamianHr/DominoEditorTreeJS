/**
 * User: Damian
 * Date: 28/06/13
 * Time: 23:36
 */

function Properties() {

    var titleDiv, row, cell;
    this.groups = [];

    //this.element = DOM.createElement("DIV", "propertypageDiv");
    //this.element.className = "propertypage";
    this.element = document.getElementById("colright")

    titleDiv = DOM.createElement("DIV", "propertypageTitle", null);
    titleDiv.className = "propertypageTitle leftTitle";
    titleDiv.innerHTML = "Properties";
    this.element.appendChild(titleDiv);
/*
    this.table = DOM.createElement("table", "propertypage", null);
    this.table.className = "propertypage";
    this.element.appendChild(this.table);
*/


    // positon fields
    for (var i = 0; i < 3; i++) {
        row = this.table.insertRow(-1);
        cell = row.insertCell(-1);
        cell.className = "key";
        cell.innerHTML = "&nbsp;";
        cell = row.insertCell(-1);
        cell.className = "value";
        cell.innerHTML = "&nbsp;";
    }

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
 * @param value
 */
Properties.prototype.propertyChange = function (firer, action, value) {
    if ("select" == action) {
        this.table.setAttribute("id", firer.id);

        var className = DominoJS.getClassName(firer)
        var group;
        switch (className) {
            case "Domino" :
                group = this.createPropertiesGroup('Position', 'propertiesGroup', 'propertiesPosition');
                this.update('X', firer.position._x, group, this.numberInput.createControl('X', firer.position.x, Properties.prototype.onChangeHandler));
                this.update('Y', firer.position._y, group, this.numberInput.createControl('Y', firer.position.x, Properties.prototype.onChangeHandler));
                this.update('Z', firer.position._z, group, this.numberInput.createControl('Z', firer.position.x, Properties.prototype.onChangeHandler));
                group = this.createPropertiesGroup('Rotation', 'propertiesGroup', 'propertiesRotation');
                this.update('rX', firer.rotation._x, group, this.numberInput.createControl('rX', firer.position.x, Properties.prototype.onChangeHandler));
                this.update('rY', firer.rotation._y, group, this.numberInput.createControl('rY', firer.position.x, Properties.prototype.onChangeHandler));
                this.update('rZ', firer.rotation._z, group, this.numberInput.createControl('rZ', firer.position.x, Properties.prototype.onChangeHandler));
                group = this.createPropertiesGroup('Dimension', 'propertiesGroup', 'propertiesDimension');
                this.update('Width',  firer.position.x, group, this.numberInput.createControl('Width',  firer.position.x, Properties.prototype.onChangeHandler));
                this.update('Length', firer.position.x, group, this.numberInput.createControl('Length', firer.position.x, Properties.prototype.onChangeHandler));
                this.update('Depth',  firer.position.x, group, this.numberInput.createControl('Depth',  firer.position.x, Properties.prototype.onChangeHandler));
                break;
            case "Sphere" :
                group = this.createPropertiesGroup('Position', 'propertiesGroup', 'propertiesPosition');
                this.update('X', firer.position.x, group, this.numberInput.createControl('X', firer.position.x, Properties.prototype.onChangeHandler));
                this.update('Y', firer.position.x, group, this.numberInput.createControl('Y', firer.position.x, Properties.prototype.onChangeHandler));
                this.update('Z', firer.position.x, group, this.numberInput.createControl('Z', firer.position.x, Properties.prototype.onChangeHandler));
                group = this.createPropertiesGroup('Dimension', 'propertiesGroup', 'propertiesDimension');
                this.update('Radius', firer.position.x, group, this.numberInput.createControl('Radius', firer.position.x, Properties.prototype.onChangeHandler));
                break;
            default:
                break;
        }
    } else if (action == "deselect" || action == "delete") {
        this.table.setAttribute("id", "nil");
        this.clear();
    }
    else {
        this.forceUpdate(action, value);
    }

};

/**
 * Create a node to contain a group of Properties inputs
 * @param name
 * @param className
 * @param id
 * @returns {*}
 */
Properties.prototype.createPropertiesGroup = function(name, className, id) {
    var element = DOM.createElement("DIV", className, null);
    element.className = className;
    element.id = id;
    element.appendChild(document.createTextNode(name));
    this.groups[id] = element;
    return element;
}

/**
 * Update the elements of the 'propertypage' element
 * @param action
 * @param value
 * @param group
 * @param options
 */
Properties.prototype.update = function (action, value, group, options) {
    var rows = this.table.rows;
    var n = rows.length;
    if (value != "0" && !value) value = "none";

    // first pass
    for (var i = 1; i < n; i++) {
        if (rows[i].cells[0].innerHTML == action) {
            var input = rows[i].cells[1].firstChild;
            if (input.update) input.update(input, value);
            return;
        }
    }

    // construct the input field, if not provided
    if (!options) {
        options = DOM.createElement("INPUT", "textbox", "text");
        options.className = "value";
        options.onchange = Properties.prototype.onChangeHandler;
        options.value = value;
        options.id = action;
    }


    // second pass
    for (var y = 1; y < n; y++) {
        if (rows[y].cells[0].innerHTML == "&nbsp;") {
            rows[y].cells[0].innerHTML = action;

            // add the provided options element
            while (rows[y].cells[1].hasChildNodes()) {
                rows[y].cells[1].removeChild(rows[y].cells[1].firstChild);
            }
            rows[y].cells[1].appendChild(options);

            return;
        }
    }
};

/**
 * Clear the table of Properties
 */
Properties.prototype.clear = function () {
    var rows = this.table.rows;
    var n = rows.length;
    // first pass
    for (var i = 1; i < n; i++) {
        rows[i].cells[0].innerHTML = "&nbsp;";
        rows[i].cells[1].innerHTML = "&nbsp;";
    }
};

/*
 * Force the update of properties if and only if it exists in the Properties sheet.
 */
Properties.prototype.forceUpdate = function (property, value) {
    // get each table for every group
    var rows = this.table.rows;
    var n = rows.length;
    if (value != "0" && !value) value = "none";
    // first pass
    for (var i = 1; i < n; i++) {
        if (rows[i].cells[0].innerHTML == property) {
            var input = rows[i].cells[1].firstChild;
            if (input.update) input.update(input, value);
            return;
        }
    }
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
    this.element.style.display = "none";
};

/**
 * Show the properties DIV
 */
Properties.prototype.show = function () {
    this.element.style.display = "block";
};
