/**
 * User: Damian
 * Date: 01/07/13
 * Time: 21:25
 */

function ColorPalette(colorArray) {

    this.id = "ColorPalette_" + ColorPalette.sequence++;

    // we use an iframe which can cover IE controls like select boxes
    var iframe = DOM.createElement("IFRAME", "sneaky_iframe", null);
    iframe.frameBorder = 0;
    iframe.style.position = "absolute";
    iframe.style.border = "1px solid black";
    iframe.style.borderStyle = "solid";
    iframe.style.display = "none";
    iframe.scrolling = "no";
    document.body.appendChild(iframe);

    var doc;
    if (iframe.contentDocument)
        doc = iframe.contentDocument;
    else if (iframe.contentWindow)
        doc = iframe.contentWindow.document;
    else
        doc = iframe.document;


    doc.open("text/html");
    doc.write("<html><body/></html>");
    doc.close();
    doc.body.style.margin = "0px";
    doc.body.style.backgroundColor = "#FFFFFF";
    doc.body.style.padding = "0px";

    var palette = doc.createElement("DIV");
    doc.body.appendChild(palette);
    palette.id = this.id;

    var colors;
    if (colorArray) colors = colorArray;
    else {
        colors = [];
        colors[0] = new Array("#FF0000", "#FF3300", "#FF6600", "#FF9900", "#FFCC00", "#FFFF00");
        colors[1] = new Array("#009900", "#00CC00", "#66CC00", "#00FF00", "#99FF00", "#99FF99");
        colors[2] = new Array("#0000FF", "#0033FF", "#0066FF", "#0099FF", "#00CCFF", "#00FFFF");
        colors[3] = new Array("#000000", "#777777", "#AAAAAA", "#DDDDDD", "#FFFFFF");
    }

    var row, cell;
    var table = doc.createElement("TABLE");
    table.style.backgroundColor = "#FFFFFF";

    palette.appendChild(table);

    for (var i = 0; i < colors.length; i++) {
        row = table.insertRow(-1);
        row.style.height = ColorPalette.HEIGHT + "px";
        for (var j = 0; j < colors[i].length; j++) {
            cell = row.insertCell(-1);
            cell.style.width = ColorPalette.WIDTH + "px";
            cell.innerHTML = '<img src="./img/nothing.gif"/>';
            cell.style.backgroundColor = colors[i][j];
            cell.style.border = "1px solid black";
        }
    }

    // add transparent color
    row = table.insertRow(-1);
    row.style.height = ColorPalette.HEIGHT + "px";
    cell = row.insertCell(-1);
    cell.style.width = ColorPalette.WIDTH + "px";
    cell.innerHTML = '<img src="../../img/nothing.gif"/>';
    cell.style.backgroundImage = "url(./img/nocolor.gif)";
    cell.style.border = "1px solid black";

    palette.onclick = function (event) {
        if (!event)
            event = event || ((this.ownerDocument || this.document || this).parentWindow || window).event;
        var obj = DOM.getEventTarget(event);
        if (obj.tagName != "TD") return;

        var paletteObj = ColorPalette.activePalette;

        var color = obj.style.backgroundColor;
        if (color == "")
            paletteObj.activeControl.style.backgroundImage = "url(./img/nocolor.gif)";
        else
            paletteObj.activeControl.style.backgroundImage = "";

        var colorHex = ColorPalette.hexify(color);
        paletteObj.activeControl.style.backgroundColor = color;
        paletteObj.activeControl.firstChild.value = colorHex;
        paletteObj.activeControl.firstChild.onchange(
            paletteObj.activeControl,
            paletteObj.activeControl.firstChild.id,
            paletteObj.activeControl.firstChild.value);
        delete paletteObj.activeControl;
        paletteObj.palette.style.display = "none";
        ColorPalette.activePalette = null;
        DominoJS.mousedownHandler = DominoJS.returntrue;

        return false;
    };

    iframe.style.width = (ColorPalette.WIDTH + 4) * colors[0].length + 10;
    iframe.style.height = (ColorPalette.HEIGHT + 4) * colors.length + 20;


    this.paletteDiv = palette;
    this.palette = iframe;

    ColorPalette.registry[this.id] = this;
}

ColorPalette.WIDTH = 10;
ColorPalette.HEIGHT = 14;

ColorPalette.prototype.createControl = function (name, value, onChangeHandler) {
    var control = DOM.createElement("DIV", "ColorControl", null);
    control.setAttribute('id', this.id);
    control.style.border = "1px solid black";
    control.style.padding = "0px";
    if (isIE()) {
        control.style.width = 14 + "px";
        control.style.height = 14 + "px";
    } else {
        control.style.width = 12 + "px";
        control.style.height = 12 + "px";
    }
    control.style.overflow = "hidden";

    if (!value || value == "transparent")
        control.style.backgroundImage = "url(./img/nocolor.gif)";
    else
        control.style.backgroundColor = value;

    control.onclick = function (event) {
        if (!event) event = window.event;
        var con = DOM.getEventTarget(event);
        if (con) {
            var paletteObj = ColorPalette.registry[con.getAttribute('id')];
            var pos = getMousePos(event);
            paletteObj.palette.style.top = pos.y + "px";
            paletteObj.palette.style.left = pos.x + "px";
            paletteObj.palette.style.display = "block";

            paletteObj.activeControl = con;
            ColorPalette.activePalette = paletteObj;
            DominoJS.mousedownHandler = ColorPalette.loseFocus;
            Dnd.bringToFront(paletteObj.palette);
        }
    };

    var hiddenInput = DOM.createElement("INPUT", name, "hidden");
    hiddenInput.id = name;
    hiddenInput.value = value;
    hiddenInput.onchange = onChangeHandler;
    control.appendChild(hiddenInput);

    // callback function to update this control
    control.update = ColorPalette.update;

    return control;
};

ColorPalette.loseFocus = function (event) {
    var obj = DOM.getEventTarget(event, "ColorPalette");
    if (obj) return false;

    ColorPalette.activePalette.palette.style.display = "none";
    ColorPalette.activePalette = null;
    DominoJS.mousedownHandler = DominoJS.returntrue;
    return true;
};

ColorPalette.activePalette = null;
ColorPalette.registry = [];
ColorPalette.sequence = 0;

ColorPalette.update = function (obj, value) {
    if (obj.firstChild) {
        obj.firstChild.value = value;
        obj.firstChild.onchange(obj.firstChild);
    }
    if (value == "")
        obj.style.backgroundImage = "url(./img/nocolor.gif)";
    else
        obj.style.backgroundImage = "";
    obj.style.backgroundColor = value;
};

ColorPalette.hexify = function (value) {
    if (value == "") return value;
    if (value.substring(0, 1) == "#") return value;
    var str = value.replace(/rgb\(|\)/g, "").split(",");
    str[0] = parseInt(str[0], 10).toString(16).toLowerCase();
    str[1] = parseInt(str[1], 10).toString(16).toLowerCase();
    str[2] = parseInt(str[2], 10).toString(16).toLowerCase();
    str[0] = (str[0].length == 1) ? '0' + str[0] : str[0];
    str[1] = (str[1].length == 1) ? '0' + str[1] : str[1];
    str[2] = (str[2].length == 1) ? '0' + str[2] : str[2];
    return ('#' + str.join(""));
};

