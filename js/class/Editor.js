/**
 * User: Damian
 * Date: 29/06/13
 * Time: 00:12
 */
var scene, camera, renderer, container, stats, controls, arrow;
var keyboard = new THREEx.KeyboardState();
var multiMaterial;

/**
 *
 * @constructor
 */
function Editor() {

    this.element = document.getElementById("colmid");

    // SCENE
    scene = new THREE.Scene();
    // CAMERA
    var SCREEN_WIDTH = window.innerWidth, SCREEN_HEIGHT = window.innerHeight;
    var VIEW_ANGLE = 45, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 0.1, FAR = 20000;
    camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
    scene.add(camera);
    camera.position.set(0, 150, 400);
    camera.lookAt(scene.position);

    // RENDERER
    if (Detector.webgl)
        renderer = new THREE.WebGLRenderer({antialias: true});
    else
        renderer = new THREE.CanvasRenderer();
    renderer.setSize(SCREEN_WIDTH - 20, SCREEN_HEIGHT - 50);
    container = document.createElement('div');
    this.element.appendChild(container);
    container.appendChild(renderer.domElement);
    // CONTROLS
    controls = new THREE.TrackballControls(camera, this.element);
    controls.rotateSpeed = 0.05;
    controls.minDistance = 150;
    controls.maxDistance = 1500;
    //controls = new THREE.FirstPersonControls(camera);
    // EVENTS
    THREEx.WindowResize(renderer, camera);
    //THREEx.FullScreen.bindKey({ charCode: 121 });
    // STATS
    stats = new Stats();
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.top = '50px';
    stats.domElement.style.zIndex = 100;
    container.appendChild(stats.domElement);

    // FOG
    scene.fog = new THREE.FogExp2(0xC0C0C0, 0.00045);

    // FLOOR
    var floorTexture = new THREE.ImageUtils.loadTexture('img/checkerboard.jpg');
    floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
    floorTexture.repeat.set(10, 10);

    var floorMaterial = new THREE.MeshBasicMaterial({ map: floorTexture, side: THREE.DoubleSide });
    //floorMaterial.color.setHex(0x68B5FF);
    var floorGeometry = new THREE.PlaneGeometry(1000, 1000, 10, 10);
    var floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.position.y = 0;
    floor.rotation.x = Math.PI / 2;
    scene.add(floor);

    // SKYBOX
    var skyBoxGeometry = new THREE.CubeGeometry(5000, 5000, 5000);
    var skyBoxMaterial = new THREE.MeshBasicMaterial({ color: 0xC0C0C0, side: THREE.BackSide });
    var skyBox = new THREE.Mesh(skyBoxGeometry, skyBoxMaterial);
    scene.add(skyBox);

    this.animate();
}

/**
 *
 */
Editor.prototype.animate = function () {
    requestAnimationFrame(Editor.prototype.animate);
    renderer.render(scene, camera);
    Editor.prototype.update();
};

/**
 *
 */
Editor.prototype.update = function () {
    if (keyboard.pressed("z")) {
        // do something
    }
    controls.update();
    stats.update();
};
/**
 *
 * @returns {Array}
 */
Editor.prototype.loadMultiMaterial = function () {
    var elementTexture = new THREE.ImageUtils.loadTexture('./img/wood.jpg');
    //var elementMaterial = new THREE.MeshBasicMaterial({ map: elementTexture });
    var elementMaterial = new THREE.MeshBasicMaterial({ color: 0x888888 });
    var wireframeMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true, transparent: true });
    return [ elementMaterial, wireframeMaterial ];
}

/**
 *
 * @param universElement
 */
Editor.prototype.createObject = function (universElement) {
    if (!multiMaterial) multiMaterial = this.loadMultiMaterial();
    var geometry, object3D;
    switch (universElement.type) {
        case ELEMENT.DOMINO : //x, y, z
            geometry = new THREE.CubeGeometry(universElement.dimension.x, universElement.dimension.y, universElement.dimension.z, 2, 2, 2);
            object3D = THREE.SceneUtils.createMultiMaterialObject(geometry.clone(), multiMaterial);
            object3D.position.set(universElement.position.x, geometry.height / 2 + universElement.position.y + 1, universElement.position.z);
            this.rotateAroundObjectAxis(object3D, new THREE.Vector3(1, 0, 0), universElement.rotation.x);
            this.rotateAroundObjectAxis(object3D, new THREE.Vector3(0, 1, 0), universElement.rotation.y);
            this.rotateAroundObjectAxis(object3D, new THREE.Vector3(0, 0, 1), universElement.rotation.z);
            break;
        case ELEMENT.SPHERE :
            geometry = new THREE.SphereGeometry(universElement.radius, 15, 15);
            object3D = THREE.SceneUtils.createMultiMaterialObject(geometry.clone(), multiMaterial);
            object3D.position.set(universElement.position.x, geometry.radius + universElement.position.y + 1, universElement.position.z);
            this.rotateAroundObjectAxis(object3D, new THREE.Vector3(0, 1, 0), universElement.rotation);
            break;
    }
    object3D.overdraw = true;
    scene.add(object3D);
    universElement.geometry3D = geometry;
    universElement.object3D = object3D;

    this.drawArrowHelper(universElement);
};

var rotObjectMatrix;
/**
 *
 * @param object
 * @param axis
 * @param radians
 */
Editor.prototype.rotateAroundObjectAxis = function (object, axis, radians) {
    rotObjectMatrix = new THREE.Matrix4;
    rotObjectMatrix.makeRotationAxis(axis.normalize(), radians);
    object.matrix.multiply(rotObjectMatrix);
    // new code for Three.js r50+
    object.rotation.setEulerFromRotationMatrix(object.matrix);
};

Editor.prototype.drawArrowHelper = function (universElement) {
    if (arrow) scene.remove(arrow);
    var normal = new THREE.Vector3(0, 0, 1);
    var origin = new THREE.Vector3(universElement.position.x,
        universElement.type === ELEMENT.DOMINO ? universElement.geometry3D.height / 2 + universElement.position.y + 1 : universElement.radius + universElement.position.y + 1,
        universElement.position.z);
    normal.normalize();

    var length = universElement.type == ELEMENT.DOMINO ? universElement.dimension.z * 2 : universElement.radius * 1.5;

    arrow = new THREE.ArrowHelper(normal, origin, length, 0xff0000);
    scene.add(arrow);
};

/**
 *
 * @param object
 */
Editor.prototype.removeObject = function (object) {
    scene.remove(object);
};