/**
 * User: Damian
 * Date: 30/06/13
 * Time: 00:22
 */

function Listing() {

    var titleDiv;
    this.containerDiv = {};
    this.elements = [];

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

    DOM.hookEvent(suppressButton, 'click', function (event) {
        var element = DOM.getEventTarget(event, 'listingElement');
        DominoJS.univers.deleteElement(element.id);
        DominoJS.listing.deleteElement(element);
        DominoJS.propertypage.clearNodes();
    });

    DOM.hookEvent(element, 'click', function (event) {
        DominoJS.univers.select(event);
        DominoJS.listing.select(element.id);
    });

    this.elements.push(element);
    this.containerDiv.appendChild(element);
};

Listing.prototype.deleteElement = function (element) {
    var index = this.elements.indexOf(element);
    this.containerDiv.removeChild(this.elements[index]);
    this.elements.slice(index, 1);
};

Listing.prototype.clearNodes = function () {
    while (this.containerDiv.firstChild) this.containerDiv.removeChild(this.containerDiv.firstChild);
};

Listing.prototype.select = function (elementId) {
    if (this.active && elementId == this.active.id) return;
    // remove previous active css
    if (this.active) this.active.className = this.active.className.replace(' activeElement', '');

    // add to new active css
    for (var i in this.elements) if (this.elements[i].id == elementId) this.active = this.elements[i];

    this.active.className += ' activeElement';
};