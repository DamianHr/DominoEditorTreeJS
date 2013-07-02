function DominoJS() {
}

//global variables
DominoJS._modules = {};

//global functions
DominoJS.donothing = function () {
};
DominoJS.returntrue = function () {
    return true;
};
DominoJS.returnfalse = function () {
    return false;
};

// constants
DominoJS.LATENCY = 700;

// objects
DominoJS.univers = {};

// OOP
DominoJS.copyPrototype = function (descendant, parent) {
    for (var m in parent.prototype) {
        descendant.prototype[m] = parent.prototype[m];
    }
    descendant.parent = parent;
};

DominoJS.getClassName = function (obj) {
    if (!obj) return null;
    return obj.constructor.toString().replace(/^.*function\s+([^\s]*|[^\(]*)\([^\x00]+$/, "$1");
};

// modules to add to the HTML page
DominoJS.Modules = [];
// three.js libs
DominoJS.Modules.push('libs/three.min');
DominoJS.Modules.push('libs/three.keyboard');
DominoJS.Modules.push('libs/Detector');
DominoJS.Modules.push('libs/Stats');
DominoJS.Modules.push('libs/three.trackball');
DominoJS.Modules.push('libs/FirstPersonControl');
DominoJS.Modules.push('libs/threex.fullsize');
DominoJS.Modules.push('libs/threex.windowResize');
DominoJS.Modules.push('libs/scroller');
// domino.js libs
DominoJS.Modules.push('class/Coordinates3D');
DominoJS.Modules.push('class/ColorPalette');
DominoJS.Modules.push('class/DOM');
DominoJS.Modules.push('class/Editor');
DominoJS.Modules.push('class/Footer');
DominoJS.Modules.push('class/Header');
DominoJS.Modules.push('class/Listing');
DominoJS.Modules.push('class/NumberInput');
DominoJS.Modules.push('class/Properties');
DominoJS.Modules.push('class/ToolsPanel');
DominoJS.Modules.push('class/UIBuilder');
DominoJS.Modules.push('class/Utils');
// univers
DominoJS.Modules.push('class/universe/Element3D');
DominoJS.Modules.push('class/universe/Domino');
DominoJS.Modules.push('class/universe/Sphere');
DominoJS.Modules.push('class/universe/Univers');

// load sign displayer
DominoJS.showLoadingSign = function (scriptname) {
    var div = document.getElementById("throbber");
    if (!div) {
        div = document.createElement("DIV");
        div.id = "throbber";
        div.className = "throbber";
        var text = document.createElement("SPAN");
        text.innerHTML = "Loading component...";
        div.appendChild(text);
        document.body.appendChild(div);
    }
    else {
        div.childNodes[0].innerHTML = "Loading " + scriptname + "...";
    }
    if (div.style.display != "block") div.style.display = "block";
};

// module loader
DominoJS.LoadModule = function (scriptname) {
    if (!DominoJS._modules[scriptname]) {
        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = './js/' + scriptname + '.js';
        head.appendChild(script);
        DominoJS.showLoadingSign(scriptname);
    }
};

DominoJS.init = function () {
    if (DominoJS.ok) return; else DominoJS.ok = true;	// init only once

    // we load the modules
    try {
        for (var i = 0; i < DominoJS.Modules.length; i++) {
            DominoJS.LoadModule(DominoJS.Modules[i]);
        }

        setTimeout(DominoJS.hideSign = function () {
            document.getElementById("throbber").style.display = "none";
        }, DominoJS.LATENCY);


    } catch (e) {
        alert("Sorry, DominoJS did not complete loading of all modules." + "[" + e.message + "]");
    }

    // we call the callback function
    try {
        setTimeout("DominoJS.callback()", DominoJS.LATENCY);
    } catch (e) {
        alert("Sorry, error during the execution of the Callback function." + "[" + e.message + "]");
    }
};

// first method called
DominoJS.start = function (callback) {
    DominoJS.callback = callback;
    if (DominoJS.ready) DominoJS.init();
};

// hook event
DominoJS.hookEvent = function (obj, eventName, func) {
    if (obj.attachEvent) {
        obj.attachEvent("on" + eventName, func);
    }
    else if (obj.addEventListener) {
        obj.addEventListener(eventName, func, false);
    }
};

// hook the OnLoad event
DominoJS.hookEvent(window, "load", function () {
    if (DominoJS.callback) DominoJS.init();
    DominoJS.ready = true;
});

