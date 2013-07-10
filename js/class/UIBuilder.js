/**
 * User: Damian
 * Date: 29/06/13
 * Time: 13:09
 */

/**
 *
 * @constructor
 */
function UIBuilder() {
    // call all the call witch build the user interface

    try {
        MainController.header = new Header();
        MainController.editor = new Editor();
        MainController.toolsPanel = new ToolsPanel();
        MainController.toolsPanel.tools = [];
        MainController.toolsPanel.tools.push(ToolsPanel.prototype.addTool(ELEMENT.DOMINO, "./img/domino2.png"));
        MainController.toolsPanel.tools.push(ToolsPanel.prototype.addTool(ELEMENT.SPHERE, "./img/sphere.png"));
        MainController.propertypage = new Properties();
        MainController.listing = new Listing();
        MainController.footer = new Footer();
    } catch (e) {
        if (MainController.footer != undefined) {
            MainController.prototype.footer.displayMessage("Error catched :" + e.message);
        } else {
            alert("Error catched :" + e.message);
        }
    }
}