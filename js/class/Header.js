/**
 * User: Damian
 * Date: 29/06/13
 * Time: 11:56
 */

Header.DEFAULT_INPUT_TEXT = "Insert your project name here";

function Header() {

    //this.element = DOM.createElement("DIV", "headerDiv");
    //this.element.className = "header";
    this.element = document.getElementById("header");

    this.saveButton = DOM.createElement("INPUT", "saveButton", "button");
    this.saveButton.className = "saveButton headerButton";
    this.saveButton.value = "Save";
    DOM.hookEvent(this.saveButton, "click", function () {
    });
    this.element.appendChild(this.saveButton);

    this.loadButton = DOM.createElement("INPUT", "loadButton", "button");
    this.loadButton.className = "loadButton headerButton";
    this.loadButton.value = "Load";
    DOM.hookEvent(this.loadButton, "click", function () {
    });
    this.element.appendChild(this.loadButton);

    this.titleInput = DOM.createElement("INPUT", "titleInput", "text");
    this.titleInput.className = "titleInput";
    this.titleInput.setAttribute("placeholder", Header.DEFAULT_INPUT_TEXT);
    this.element.appendChild(this.titleInput);

}