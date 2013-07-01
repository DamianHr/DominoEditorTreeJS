/**
 * User: Damian
 * Date: 29/06/13
 * Time: 13:49
 */

ToolsPanel.temp_var = {};

function ToolsPanel() {

    ToolsPanel.panel = DOM.createElement("DIV", "toolspanel");
    ToolsPanel.panel.className = "toolspanel";
    DominoJS.editor.element.appendChild(ToolsPanel.panel);
}

ToolsPanel.prototype.addTool = function (type, imagePath) {
    var toolDiv = DOM.createElement("DIV", "tool" + type.name);
    toolDiv.className = "panelTool";

    DOM.hookEvent(toolDiv, "click", function () {
        Editor.prototype.createElement(type);
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
    var object = DOM.getEventTarget(event);
    if (null == object) return false;

    var objectId = object.getAttribute("id");
    if (ToolsPanel.temp_var.activated) {
        if (objectId == ToolsPanel.temp_var.activated.getAttribute("id")) {
            ToolsPanel.prototype.deactivate();
            return false;
        } else {
            ToolsPanel.prototype.deactivate();
        }
    }
    ToolsPanel.temp_var.activated = object;
    ToolsPanel.temp_var.activated.className += "activeTool";
    ToolsPanel.temp_var.activated.style.border = "2px solid #ff0000";
    return false;
};

ToolsPanel.prototype.deactivate = function () {
    if (ToolsPanel.temp_var.activated) {
        ToolsPanel.temp_var.activated.className.replace("activeTool", "");
        ToolsPanel.temp_var.activated.style.border = "none";
        delete ToolsPanel.temp_var.activated;
    }
};