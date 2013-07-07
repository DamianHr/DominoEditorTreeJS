/**
 * User: Damian
 * Date: 29/06/13
 * Time: 14:03
 */

function getMousePos(evt) {
    if (evt.pageX || evt.pageY) {
        return {
            x: parseInt(evt.pageX),
            y: parseInt(evt.pageY)
        };
    }
    return {
        x: parseInt(evt.clientX) + parseInt(document.body.scrollLeft) - parseInt(document.body.clientLeft),
        y: parseInt(evt.clientY) + parseInt(document.body.scrollTop) - parseInt(document.body.clientTop)
    };
}

function isIE() {
    return (navigator.userAgent.indexOf("MSIE") > -1);
}

function getMouseWheelEventName() {
    return (/Firefox/i.test(navigator.userAgent)) ? "DOMMouseScroll" : "mousewheel";
}

function switchClass(event, classname, elementname) {
    if (!event) event = window.event;
    var target = {};
    try {
        if (elementname) target = DOM.getEventTarget(event, elementname);
        else target = DOM.getEventTarget(event, null);
        if (target != null) target.className = classname;
    } catch (e) {
        alert("switchClass: " + e.message + "\n" + event.type + "\n" + target);
    }
}