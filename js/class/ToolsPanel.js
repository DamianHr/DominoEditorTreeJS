/**
 * User: Damian
 * Date: 29/06/13
 * Time: 13:49
 */


/**
 *
 * @constructor
 */
function ToolsPanel() {

    ToolsPanel.panel = DOM.createElement("DIV", "toolspanel", null);
    ToolsPanel.panel.className = "toolspanel";
    MainController.editor.element.appendChild(ToolsPanel.panel);
}

/**
 *
 * @param type
 * @param imagePath
 */
ToolsPanel.prototype.addTool = function (type, imagePath) {
    var toolDiv = DOM.createElement("DIV", "tool" + type.name, null);
    toolDiv.className = "panelTool";

    DOM.hookEvent(toolDiv, "click", function () {
        var newElement = MainController.univers.createElement(type);
        MainController.propertypage.propertyChange(newElement);
        MainController.temp_var.activated = newElement;
    });

    if (imagePath) {
        var image = new Image();
        image.src = imagePath;
        image.className = "toolImage";
        toolDiv.appendChild(image);
    }
    else {
        toolDiv.innerHtml = type.name;
    }

    ToolsPanel.panel.appendChild(toolDiv);
};