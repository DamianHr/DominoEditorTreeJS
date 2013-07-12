/**
 * User: Damian
 * Date: 29/06/13
 * Time: 11:56
 */

Header.DEFAULT_PROJECT_NAME_TEXT = "Insert your project name here";

/**
 *
 * @constructor
 */
function Header() {

    //this.element = DOM.createElement("DIV", "headerDiv");
    //this.element.className = "header";
    this.element = document.getElementById("header");

    this.saveButton = DOM.createElement("INPUT", "saveButton", "button");
    this.saveButton.className = "saveButton headerButton button";
    this.saveButton.value = "Save";
    DOM.hookEvent(this.saveButton, "click", function () {
        var jsonData = MainController.save();
        new JSONWindow(jsonData);
    });
    this.element.appendChild(this.saveButton);

    this.loadButton = DOM.createElement("INPUT", "loadButton", "button");
    this.loadButton.className = "loadButton headerButton button";
    this.loadButton.value = "Load";
    DOM.hookEvent(this.loadButton, "click", function () {
        new JSONWindow(null);
    });
    this.element.appendChild(this.loadButton);

    this.titleInput = DOM.createElement("INPUT", "nameInput", "text");
    this.titleInput.className = "nameInput";
    this.titleInput.id = "nameInput";
    this.titleInput.setAttribute("placeholder", Header.DEFAULT_PROJECT_NAME_TEXT);
    this.element.appendChild(this.titleInput);

    this.resetCameraButton = DOM.createElement("Input", "resetCameraButton", "button");
    this.resetCameraButton.className = "resetCamButton headerButton button";
    this.resetCameraButton.value = "Reset Camera";
    DOM.hookEvent(this.resetCameraButton, "click", function () {
        controls.reset();
    });
    this.element.appendChild(this.resetCameraButton);
}

/**
 *
 * @returns {*}
 */
Header.prototype.getProjetName = function () {
    var projectName = document.getElementById('nameInput');
    return projectName.value.trim();
};

/**
 *
 * @param projectName
 */
Header.prototype.setProjetName = function (projectName) {
    var titleInput = document.getElementById('nameInput');
    if (titleInput) titleInput.value = projectName;
};
