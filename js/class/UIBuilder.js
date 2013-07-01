/**
 * User: Damian
 * Date: 29/06/13
 * Time: 13:09
 */

function UIBuilder() {
    // call all the call witch build the user interface

    try {
        DominoJS.header = new Header();
        DominoJS.editor = new Editor();
        DominoJS.toolsPanel = new ToolsPanel();
        DominoJS.toolsPanel.tools = [];
        DominoJS.toolsPanel.tools.push(ToolsPanel.prototype.addTool(ELEMENT.DOMINO, "./img/domino.png"));
        DominoJS.toolsPanel.tools.push(ToolsPanel.prototype.addTool(ELEMENT.SPHERE, "./img/sphere.jpg"));
        DominoJS.propertypage = new Properties();
        DominoJS.listing = new Listing();
        DominoJS.footer = new Footer();
    } catch (e) {
        if (DominoJS.footer != undefined) {
            DominoJS.prototype.footer.displayMessage("Error catched :" + e.message);
        } else {
            alert("Error catched :" + e.message);
        }
    }
}