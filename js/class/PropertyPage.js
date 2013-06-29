/**
 * User: Damian
 * Date: 28/06/13
 * Time: 23:36
 */

function PropertyPage() {

    var row, cell;

    //this.element = DOM.createElement("DIV", "propertypageDiv");
    //this.element.className = "propertypage";
    this.element = document.getElementById("colright")
    this.table = DOM.createElement("table", "propertypage");
    this.table.className = "propertypage";
    this.element.appendChild(this.table);

    row = this.table.insertRow(-1);
    cell = document.createElement("TH");
    cell.setAttribute("colSpan", "2");
    row.appendChild(cell);
    cell.innerHTML = "Properties";

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
