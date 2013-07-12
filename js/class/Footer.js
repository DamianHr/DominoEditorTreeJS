/**
 * User: Damian
 * Date: 29/06/13
 * Time: 11:56
 */

function Footer() {

    //this.element = DOM.createElement("DIV", "footerDiv");
    //this.element.className = "footer";
    this.element = document.getElementById("footer");
    this.element.appendChild(document.createTextNode("Projet Domino Engine, ESGI 2013, HERCUN - CONSTANT - BELSON"));
}

/**
 *
 * @param text
 */
Footer.prototype.displayMessage = function (text) {
    this.clearNodes();
    this.element.appendChild(document.createTextNode(text));
}

/**
 *
 */
Footer.prototype.clearNodes = function () {
    while (this.element.firstChild) this.element.removeChild(this.element.firstChild);
}