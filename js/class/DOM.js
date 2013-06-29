/**
 * User: Damian
 * Date: 28/06/13
 * Time: 23:38
 */

function DOM() {
}

DOM.createElement = function (tagName, name, type) {
    var newEle;
    try {
        if (type) newEle = document.createElement("<" + tagName + " name='" + name + "' type='" + type + "'>");
        else newEle = document.createElement("<" + tagName + " name='" + name + "'>");
    }
    catch (e) {
        newEle = document.createElement(tagName);
        newEle.setAttribute("name", name);
        if (type) newEle.setAttribute("type", type);
    }
    return newEle;
}
