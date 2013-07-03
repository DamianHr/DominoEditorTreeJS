/**
 * User: Damian
 * Date: 30/06/13
 * Time: 00:22
 */

function Listing() {

    var titleDiv;
    this.elements = [];
    this.active = {};

    //this.element = DOM.createElement("DIV", "listingDiv");
    //this.element.className = "listing";
    this.element = document.getElementById("colright")

    titleDiv = DOM.createElement("DIV", "listingTitle", null);
    titleDiv.className = "listingTitle leftTitle";
    titleDiv.innerHTML = "Elements";
    this.element.appendChild(titleDiv);
}

Listing.prototype.update = function() {
    this.clearNodes();
    for(var object in DominoJS.univers.elements) {
        this.createListElement(object.displayedName, object.id);
    }
};

Listing.prototype.createListElement = function(displayedName, id) {
    var element = DOM.createElement('DIV', 'listElement', null);
    element.className = "listingElement";
    element.id = id;
    element.appendChild(document.createTextNode(displayedName));

    DOM.hookEvent(element, 'click', function() {
        Univers.prototype.select();
        Listing.prototype.select(element);
    });

    this.elements.push(element);
    this.element.appendChild(element);
};

Listing.prototype.clearNodes = function() {
    while (this.element.firstChild) this.element.removeChild(this.element.firstChild);
};

Listing.prototype.select = function(element) {

};