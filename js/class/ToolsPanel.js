/**
 * User: Damian
 * Date: 29/06/13
 * Time: 13:49
 */



function ToolsPanel() {

    ToolsPanel.panel = DOM.createElement("DIV", "toolspanel", null);
    ToolsPanel.panel.className = "toolspanel";
    DominoJS.editor.element.appendChild(ToolsPanel.panel);
}

ToolsPanel.prototype.addTool = function (type, imagePath) {
    var toolDiv = DOM.createElement("DIV", "tool" + type.name, null);
    toolDiv.className = "panelTool";

    DOM.hookEvent(toolDiv, "click", function () {
        var newElement = DominoJS.univers.createElement(type);
        DominoJS.propertypage.propertyChange(newElement, 'select');
        DominoJS.temp_var.activated = newElement;
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