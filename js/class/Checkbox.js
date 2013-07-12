/**
 * User: Damian
 * Date: 11/07/13
 * Time: 23:46
 */

function Checkbox() {
}

/**
 * Create a DIV for a specific checkbox input
 * @param name
 * @param value
 * @param onChangeHandler
 * @param label
 * @param title
 * @returns {*}
 */
Checkbox.prototype.createControl = function (name, value, onChangeHandler, label, title) {
    var checkbox = DOM.createElement("DIV", 'checkbox', null);
    checkbox.className = 'inputControl';

    var input = DOM.createElement("INPUT", name, 'checkbox');
    input.id = name;
    input.className = "check";
    input.title = title;
    input.style.zIndex = 1;
    checkbox.appendChild(input);

    var inputLabel = DOM.createElement("LABEL", 'label', null);
    inputLabel.for = name;
    inputLabel.innerHTML = label;
    inputLabel.title = title;
    checkbox.appendChild(inputLabel);

    if (onChangeHandler) {
        input.onChangeHandler = onChangeHandler;
        input.onchange = function (event) {
            var obj = DOM.getEventTarget(event, null);
            input.checked = obj.onChangeHandler(obj, obj.id, obj.value);
        }
    }

    return checkbox;
};