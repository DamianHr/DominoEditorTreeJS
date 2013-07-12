/**
 * User: Damian
 * Date: 07/07/13
 * Time: 11:03
 */

/**
 *
 * @param data
 * @constructor
 */
function JSONWindow(data) {
    var mask = DOM.createElement("DIV", 'transparentMask', null);
    mask.className = 'transparentMask';
    document.body.appendChild(mask);

    var window = DOM.createElement("DIV", 'window', null);
    window.className = 'window';
    document.body.appendChild(window);

    var area = DOM.createElement("TEXTAREA", 'areaJson', null);
    area.className = 'areaJson';
    if (data) area.value = data;
    window.appendChild(area);

    var buttonContainer = DOM.createElement("DIV", 'buttonContainer', null);
    buttonContainer.className = 'buttonContainer';
    window.appendChild(buttonContainer);

    if (!data) {
        var loadButton = DOM.createElement("INPUT", 'loadButton', 'button');
        loadButton.className = 'loadButton button';
        loadButton.value = 'Load';
        DOM.hookEvent(loadButton, 'click', function () {
            try {
                var json = JSON.parse(area.value);
            }
            catch (e) {
                alert('Sorry, the JSON is invalid');
            }
            if (json) {
                MainController.load(json);
                JSONWindow.prototype.closeWindow();
            }
        });
        buttonContainer.appendChild(loadButton);
    }

    var closeButton = DOM.createElement("INPUT", 'closeButton', 'button');
    closeButton.className = 'closeButton button';
    closeButton.value = 'Close';
    DOM.hookEvent(closeButton, 'click', function () {
        JSONWindow.prototype.closeWindow();
    });
    buttonContainer.appendChild(closeButton);
}

JSONWindow.prototype.closeWindow = function () {
    document.body.removeChild(document.body.lastChild);
    document.body.removeChild(document.body.lastChild);
};
