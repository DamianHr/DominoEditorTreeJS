function MainController() {
    // TODO:
    // créer les fenetres de saisies des options
    // faire la persistence dans les deux sens
}

//global variables
MainController._modules = {};
MainController.temp_var = {};

//global functions
MainController.donothing = function () {
};
MainController.returntrue = function () {
    return true;
};
MainController.returnfalse = function () {
    return false;
};

// constants
MainController.LATENCY = 1500;

// objects
MainController.univers = {};

/**
 * Copy the prototype of a parent to a child object
 * @param descendant
 * @param parent
 */
MainController.copyPrototype = function (descendant, parent) {
    for (var m in parent.prototype) {
        descendant.prototype[m] = parent.prototype[m];
    }
    descendant.parent = parent;
};

/**
 * Return the class name of a JS object
 * @param obj
 * @returns {*}
 */
MainController.getClassName = function (object) {
    if (!object) return null;
    return object.constructor.toString().replace(/^.*function\s+([^\s]*|[^\(]*)\([^\x00]+$/, "$1");
};

// modules to add to the HTML page
MainController.Modules = [];
// three.js libs
MainController.Modules.push('libs/three.min');
MainController.Modules.push('libs/three.keyboard');
MainController.Modules.push('libs/three.trackball');
MainController.Modules.push('libs/threex.fullsize');
MainController.Modules.push('libs/threex.windowResize');
MainController.Modules.push('libs/Detector');
MainController.Modules.push('libs/Stats');
MainController.Modules.push('libs/FirstPersonControl');
MainController.Modules.push('libs/scroller');
// domino.js libs
MainController.Modules.push('class/Checkbox');
MainController.Modules.push('class/Coordinates3D');
MainController.Modules.push('class/DOM');
MainController.Modules.push('class/Editor');
MainController.Modules.push('class/Footer');
MainController.Modules.push('class/Header');
MainController.Modules.push('class/JSONWindow');
MainController.Modules.push('class/Listing');
MainController.Modules.push('class/NumberInput');
MainController.Modules.push('class/Properties');
MainController.Modules.push('class/ToolsPanel');
MainController.Modules.push('class/UIBuilder');
MainController.Modules.push('class/Utils');
// univers
MainController.Modules.push('class/universe/Element3D');
MainController.Modules.push('class/universe/Domino');
MainController.Modules.push('class/universe/Sphere');
MainController.Modules.push('class/universe/Univers');

/**
 * Display a informative box for the user
 * @param scriptname
 */
MainController.showLoadingSign = function (scriptname) {
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

/**
 * Create the DOM elements to the additional scripts
 * @param scriptname
 * @constructor
 */
MainController.LoadModule = function (scriptname) {
    if (!MainController._modules[scriptname]) {
        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = './js/' + scriptname + '.js';
        head.appendChild(script);
        MainController.showLoadingSign(scriptname);
    }
};

/**
 * Initialize all the elements of the script
 */
MainController.initialize = function () {
    if (MainController.ok) return; else MainController.ok = true;	// initialize only once

    // we load the modules
    try {
        for (var i = 0; i < MainController.Modules.length; i++) {
            MainController.LoadModule(MainController.Modules[i]);
        }

        setTimeout(MainController.hideSign = function () {
            document.getElementById("throbber").style.display = "none";
        }, MainController.LATENCY);


    } catch (e) {
        alert("Sorry, DominoJS did not complete loading of all modules." + "[" + e.message + "]");
    }

    // we call the callback function
    try {
        setTimeout("MainController.callback()", MainController.LATENCY);
    } catch (e) {
        alert("Sorry, error during the execution of the Callback function." + "[" + e.message + "]");
    }
};

/**
 * First method called in the process
 * @param callback
 */
MainController.start = function (callback) {
    MainController.callback = callback;
    if (MainController.ready) MainController.initialize();
};

/**
 * hook events for a object of the DOM
 * @param object
 * @param eventName
 * @param func
 */
MainController.hookEvent = function (object, eventName, func) {
    if (object.attachEvent) {
        object.attachEvent("on" + eventName, func);
    }
    else if (object.addEventListener) {
        object.addEventListener(eventName, func, false);
    }
};

/**
 * hook the OnLoad event of the window
 */
MainController.hookEvent(window, "load", function () {
    if (MainController.callback) MainController.initialize();
    MainController.ready = true;
});

MainController.save = function () {
    var persisted = {};
    persisted.projetName = this.header.getProjetName() ? this.header.getProjetName() : "Domino Engine Project";
    persisted.objects = this.univers.save();
    return JSON.stringify(persisted, undefined, 2)
};

MainController.load = function (persisted) {
    this.header.setProjetName(persisted.projetName);
    this.univers.load(persisted.objects);
};

