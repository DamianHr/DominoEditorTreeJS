/**
 * User: Damian
 * Date: 28/06/13
 * Time: 23:36
 */

function PropertyPage() {

    var titleDiv, row, cell;

    //this.element = DOM.createElement("DIV", "propertypageDiv");
    //this.element.className = "propertypage";
    this.element = document.getElementById("colright")

    titleDiv = DOM.createElement("DIV", "propertypageTitle");
    titleDiv.className = "propertypageTitle leftTitle";
    titleDiv.innerHTML = "Properties";
    this.element.appendChild(titleDiv);

    this.table = DOM.createElement("table", "propertypage");
    this.table.className = "propertypage";
    this.element.appendChild(this.table);

    // positon fields
    for (var i = 0; i < 3; i++) {
        row = this.table.insertRow(-1);
        cell = row.insertCell(-1);
        cell.className = "key";
        cell.innerHTML = "&nbsp;";
        cell = row.insertCell(-1);
        cell.className = "value";
        cell.innerHTML = "&nbsp;";
    }
}

PropertyPage.prototype.hide = function () {
    this.element.style.display = "none";
}

PropertyPage.prototype.show = function () {
    this.element.style.display = "block";
}
