/**
 * User: Damian
 * Date: 28/06/13
 * Time: 23:38
 */

function DOM() {
}

/**
 * Hook an event to a DOM element
 * @param obj
 * @param eventName
 * @param func
 */
DOM.hookEvent = function (obj, eventName, func) {
    if (obj.attachEvent) {
        obj.attachEvent("on" + eventName, func);
    }
    else if (obj.addEventListener) {
        obj.addEventListener(eventName, func, true);
    }
}

/**
 * Look for a Node witch fire a event
 * @param event
 * @param tgtName
 * @return {*}
 */
DOM.getEventTarget = function (event, tgtName) {
    if (!event) event = window.event;
    if (!event) return null;
    var object = event.srcElement;
    if (!object) object = event.target;
    if (!object) return null;

    if (!tgtName) return object;
    try {
        if (object.getAttribute("name") == tgtName) return object;

        if (object.tagName == "HTML") return null;
        while (object && object.tagName != "BODY") {
            object = object.parentNode;
            if (object && object.getAttribute("name") == tgtName) return object;
        }
    }
    catch (e) { /*TODO*/
    }
    return null;
};

/**
 * Look for a Node by Name
 * @param chunk
 * @param tagname
 * @param idOrName
 * @param recurse
 * @return {*}
 */
DOM.findNodeByName = function (chunk, tagname, idOrName, recurse) {
    return DOM.findNodeByIdOrName(chunk, tagname, idOrName, recurse, "name");
};

/**
 * Look for a Node by Id
 * @param chunk
 * @param tagname
 * @param idOrName
 * @param recurse
 * @return {*}
 */
DOM.findNodeById = function (chunk, tagname, idOrName, recurse) {
    return DOM.findNodeByIdOrName(chunk, tagname, idOrName, recurse, "id");
};

/**
 * Look for a Node by Name or Id
 * @param chunk
 * @param tagname
 * @param idOrName
 * @param recurse
 * @param type
 * @return {*}
 */
DOM.findNodeByIdOrName = function (chunk, tagname, idOrName, recurse, type) {
    if (chunk.childNodes == null) return null;

    for (var i = 0; i < chunk.childNodes.length; i++) {
        if ((tagname == null || chunk.childNodes[i].tagName == tagname) &&
            (idOrName == null || chunk.childNodes[i].getAttribute(type) == idOrName)) {
            return chunk.childNodes[i];
        }
        if (recurse) {
            var rec = DOM.findNodeByIdOrName(chunk.childNodes[i], tagname, idOrName, recurse, type);
            if (rec) return rec;
        }
    }
    return null;
};

/**
 * Create a DOM element
 * @param tagName
 * @param name
 * @param type
 * @return {*}
 */
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
};

/**
 * Up the tree looking for a given node
 * @param object
 * @param name
 * @return {*}
 */
DOM.bubbleToTarget = function (object, name) {
    if (!name) return object;
    try {
        if (object.getAttribute('name') == name) return object;
        if (object.tagName == "HTML") return null;
        while (object && object.tagName != "BODY") {
            object = object.parentNode;
            if (object.getAttribute('name') == name) return object;
        }
    } catch (e) {
        alert(e.message);
        /*TODO*/
    }
    return null;
};
