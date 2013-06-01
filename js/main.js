var ressources;

function init() {
    ressources = [
        '/class/Context',
        '/class/universe/Element',
        '/class/universe/Domino',
        '/class/universe/Sphere'
    ];
}

/**
 * <script src="js/libs/three.min.js"></script>
 <script src="js/libs/Detector.js"></script>
 <script src="js/libs/Stats.js"></script>
 <script src="js/libs/three.trackball.js"></script>
 <script src="js/libs/three.keyboard.js"></script>
 <script src="js/libs/threex.fullsize.js"></script>
 <script src="js/libs/threex.windowResize.js"></script>
 */
function autoload() {
    /*for(var i in ressources) {
     var node = document.createElement('script');
     node.setAttribute("type","text/javascript");
     node.setAttribute("src", "./js" + ressources[i] + ".js");
     document.getElementById("body").appendChild(node);
     }
     var c = Context();
     c.initContext();*/

    document.getElementById("body").setAttribute("style", "background-color:#FFF");
}

function rerender() {

}