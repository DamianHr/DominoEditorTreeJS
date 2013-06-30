/**
 * User: Damian
 * Date: 29/06/13
 * Time: 14:03
 */

function isIE() {
    return (navigator.userAgent.indexOf("MSIE") > -1);
}

function switchClass(evt, classname, elementname) {
    if (!evt) evt = window.event;
    try {
        var tgt;
        if (elementname) tgt = DOM.getEventTarget(evt, elementname);
        else tgt = DOM.getEventTarget(evt);
        if (tgt != null) tgt.className = classname;
    } catch (e) {
        alert("switchClass: " + e.message + "\n" + evt.type + "\n" + tgt);
    }
}