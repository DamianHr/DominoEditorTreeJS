/**
 * User: Damian
 * Date: 28/06/13
 * Time: 23:38
 */

function DOM() {
}

DOM.hookEvent = function (obj, eventName, func) {
    if (obj.attachEvent) {
        obj.attachEvent("on" + eventName, func);
    }
    else if (obj.addEventListener) {
        obj.addEventListener(eventName, func, true);
    }
}

DOM.getEventTarget = function (evt, tgtName) {
    if (!evt) evt = window.event;
    if (!evt) return null;
    var obj = evt.srcElement;
    if (!obj) obj = evt.target;
    if (!obj) return null;

    if (!tgtName) return obj;
    try {
        if (obj.getAttribute("name") == tgtName) return obj;

        if (obj.tagName == "HTML") return null;
        while (obj && obj.tagName != "BODY") {
            obj = obj.parentNode;
            if (obj && obj.getAttribute("name") == tgtName) return obj;
        }
    }
    catch (e) { /*TODO*/
    }
    return null;
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
