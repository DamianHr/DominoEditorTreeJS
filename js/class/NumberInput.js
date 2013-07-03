/**
 * User: Damian
 * Date: 01/07/13
 * Time: 21:10
 */

function NumberInput() {
}

NumberInput.prototype.createControl = function (name, width, value, onChangeHandler, min, max) {

    var container = DOM.createElement("DIV", "NumberInput", null);
    container.className = 'inputControl';

    var first = document.createElement("DIV");
    container.appendChild(first);
    first.style.cssFloat = "left";
    first.style.styleFloat = "left";
    first.className = 'inputContainer';

    var input = DOM.createElement("INPUT", "NumberInput", "text");
    input.id = name;
    input.setAttribute("maxlength", width);
    input.setAttribute("min", min ? min : '0');
    input.setAttribute("max", max ? max : 'unbounded');
    var v = parseInt(value);
    input.value = isNaN(v) ? 0 : v;
    if (onChangeHandler) {
        input.onChangeHandler = onChangeHandler;
        input.onchange = function (event) {
            var obj = DOM.getEventTarget(event);
            obj.onChangeHandler(obj, obj.id, obj.value);
        }
    }
    first.appendChild(input);

    var buttons = document.createElement("DIV");
    container.appendChild(buttons);
    buttons.style.cssFloat = "left";
    buttons.style.styleFloat = "left";

    var numberBtnUp = DOM.createElement("DIV", "button", null);
    numberBtnUp.className = 'inputButton';
    var image = document.createElement("IMG");
    image.src = "img/up.gif";
    numberBtnUp.appendChild(image);
    //NumberInput.buttonStyle(numberBtnUp);

    var numberBtnDown = DOM.createElement("DIV", "button", null);
    numberBtnDown.className = 'inputButton';
    image = document.createElement("IMG");
    image.src = "img/down.gif";
    numberBtnDown.appendChild(image);
    //NumberInput.buttonStyle(numberBtnDown);

    buttons.appendChild(numberBtnUp);
    buttons.appendChild(numberBtnDown);

    numberBtnUp.onmousedown = function (event) {
        NumberInput.depress(event);
        NumberInput.numberUp(event);
    };
    numberBtnUp.onmouseup = function (event) {
        NumberInput.unpress(event);
    };

    numberBtnDown.onmousedown = function (event) {
        NumberInput.depress(event);
        NumberInput.numberDown(event);
    };
    numberBtnDown.onmouseup = function (event) {
        NumberInput.unpress(event);
    };

    // callback function to update this control
    container.update = NumberInput.update;

    return container;
};

NumberInput.buttonStyle = function (button) {
    button.style.width = "12px";
    button.style.backgroundColor = "#DDDDDD";
    button.style.marginLeft = "4px";
    button.style.marginRight = "4px";
    button.style.border = "1px solid";
    button.style.borderLeftColor = "#FFFFFF";
    button.style.borderTopColor = "#FFFFFF";
    button.style.borderRightColor = "#AAAAAA";
    button.style.borderBottomColor = "#AAAAAA";
};

NumberInput.depress = function (event) {
    var button = DOM.getEventTarget(event, 'button');
    button.style.borderLeftColor = "#AAAAAA";
    button.style.borderTopColor = "#AAAAAA";
    button.style.borderRightColor = "#FFFFFF";
    button.style.borderBottomColor = "#FFFFFF";
};

NumberInput.unpress = function (event) {
    var button = DOM.getEventTarget(event, 'button');
    button.style.borderLeftColor = "#FFFFFF";
    button.style.borderTopColor = "#FFFFFF";
    button.style.borderRightColor = "#AAAAAA";
    button.style.borderBottomColor = "#AAAAAA";
};

NumberInput.numberUp = function (event) {
    var container = DOM.getEventTarget(event, 'NumberInput');
    var input = container.firstChild.firstChild;
    var max = parseInt(input.getAttribute("max"));
    var value = parseInt(input.value);
    if (isNaN(value)) input.value = 1;
    else {
        if (!isNaN(max)) input.value = value >= max ? max : ++value;
        else input.value = ++value;
    }
    input.onChangeHandler(input, input.id, input.value);
};

NumberInput.numberDown = function (event) {
    var container = DOM.getEventTarget(event, 'NumberInput');
    var input = container.firstChild.firstChild;
    var min = parseInt(input.getAttribute("min"));
    var value = parseInt(input.value);
    if (isNaN(value)) input.value = 1;
    else {
        if (isNaN(min)) min = 0;
        input.value = value <= min ? min : --value;
    }
    input.onChangeHandler(input, input.id, input.value);
};

NumberInput.update = function (obj, value) {
    var target = DOM.findNodeByName(obj, "INPUT", "NumberInput", true);
    if (target) target.value = value;
};

DominoJS._modules['NumberInput'] = true;
