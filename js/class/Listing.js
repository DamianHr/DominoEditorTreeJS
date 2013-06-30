/**
 * User: Damian
 * Date: 30/06/13
 * Time: 00:22
 */

function Listing() {

    var titleDiv;

    //this.element = DOM.createElement("DIV", "listingDiv");
    //this.element.className = "listing";
    this.element = document.getElementById("colright")

    titleDiv = DOM.createElement("DIV", "listingTitle");
    titleDiv.className = "listingTitle leftTitle";
    titleDiv.innerHTML = "Elements";
    this.element.appendChild(titleDiv);
}