/**
 * User: Damian
 * Date: 29/06/13
 * Time: 11:56
 */

function Footer() {

    //this.element = DOM.createElement("DIV", "footerDiv");
    //this.element.className = "footer";
    Footer.element = document.getElementById("footer");
}

/**
 *
 * @param text
 */
Footer.prototype.displayMessage = function (text) {
    Footer.prototype.clearNodes();
    Footer.element.appendChild(document.createTextNode(text));
}

/**
 *
 */
Footer.prototype.clearNodes = function () {
    while (Footer.element.firstChild) Footer.element.removeChild(Footer.element.firstChild);
}