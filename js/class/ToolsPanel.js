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
    /*
     DOM.hookEvent(toolDiv, "mouseover", function (event) {
     switchClass(event, 'hovering')
     });
     DOM.hookEvent(toolDiv, "mouseout", function (event) {
     switchClass(event, '')
     });
     */
    //toolDiv.onclick = function(event) {return ToolsPanel.prototype.activate(event)};

    ToolsPanel.panel.appendChild(toolDiv);
};

ToolsPanel.prototype.activate = function (event) {
    if (!event) event = window.event;
    var object = DOM.getEventTarget(event, null);
    if (null == object) return false;

    var objectId = object.getAttribute("id");
    if (DominoJS.temp_var.activated) {
        if (objectId == DominoJS.temp_var.activated.getAttribute("id")) {
            ToolsPanel.prototype.deactivate();
            return false;
        } else {
            ToolsPanel.prototype.deactivate();
        }
    }
    DominoJS.temp_var.activated = object;
    DominoJS.temp_var.activated.className += "activeTool";
    DominoJS.temp_var.activated.style.border = "2px solid #ff0000";
    return false;
};

ToolsPanel.prototype.deactivate = function () {
    if (DominoJS.temp_var.activated) {
        DominoJS.temp_var.activated.className.replace("activeTool", "");
        DominoJS.temp_var.activated.style.border = "none";
        delete DominoJS.temp_var.activated;
    }
};