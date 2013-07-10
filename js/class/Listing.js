/**
 * User: Damian
 * Date: 30/06/13
 * Time: 00:22
 */

/**
 *
 * @constructor
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

/**
 *
 */
Listing.prototype.update = function () {
    this.clearNodes();
    for (var objectID in MainController.univers.elements) {
        var object = MainController.univers.elements[objectID];
        this.createListElement(object.displayedName, object.id);
    }
};

/**
 *
 * @param displayedName
 * @param id
 */
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
        MainController.univers.deleteElement(element.id);
        MainController.listing.deleteElement(element);
        MainController.propertypage.clearNodes();
    });

    DOM.hookEvent(element, 'click', function (event) {
        MainController.univers.select(event);
        MainController.listing.select(element.id);
    });

    this.elements.push(element);
    this.containerDiv.appendChild(element);
};

/**
 *
 * @param element
 */
Listing.prototype.deleteElement = function (element) {
    var index = this.elements.indexOf(element);
    this.containerDiv.removeChild(this.elements[index]);
    this.elements.slice(index, 1);
};

/**
 *
 */
Listing.prototype.clearNodes = function () {
    while (this.containerDiv.firstChild) this.containerDiv.removeChild(this.containerDiv.firstChild);
};

/**
 *
 * @param elementId
 */
Listing.prototype.select = function (elementId) {
    if (this.active && elementId == this.active.id) return;
    // remove previous active css
    if (this.active) this.active.className = this.active.className.replace(' activeElement', '');

    // add to new active css
    for (var element in this.elements) if (this.elements[element].id == elementId) this.active = this.elements[element];

    this.active.className += ' activeElement';
};