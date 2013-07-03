/**
 * User: Damian
 * Date: 30/06/13
 * Time: 00:22
 */

function Listing() {

    var titleDiv;
    this.containerDiv = {};
    this.elements = [];
    this.active = {};

    //this.element = DOM.createElement("DIV", "listingDiv");
    //this.element.className = "listing";
    this.column = document.getElementById("colright")

    titleDiv = DOM.createElement("DIV", "listingTitle", null);
    titleDiv.className = "listingTitle leftTitle";
    titleDiv.innerHTML = "Elements";
    this.column.appendChild(titleDiv);

    this.containerDiv = DOM.createElement("DIV", "listingContainer", null);
    this.containerDiv.className = "listingContainer";
    this.column.appendChild(this.containerDiv);
}

Listing.prototype.update = function () {
    this.clearNodes();
    for (var objectID in DominoJS.univers.elements) {
        var object = DominoJS.univers.elements[objectID];
        this.createListElement(object.displayedName, object.id);
    }
};

Listing.prototype.createListElement = function (displayedName, id) {
    var element = DOM.createElement('DIV', 'listingElement', null);
    element.className = "listingElement";
    element.id = id;
    element.appendChild(document.createTextNode(displayedName));

    var suppressButton = new Image();
    suppressButton.src = './img/delete.png';
    suppressButton.className = 'miniIcon';
    element.appendChild(suppressButton);

    DOM.hookEvent(element, 'click', function (event) {
        DominoJS.univers.select(event);
        DominoJS.listing.select(element);
    });

    this.elements.push(element);
    this.containerDiv.appendChild(element);
};

Listing.prototype.clearNodes = function () {
    while (this.containerDiv.firstChild) this.containerDiv.removeChild(this.containerDiv.firstChild);
};

Listing.prototype.select = function (element) {

};