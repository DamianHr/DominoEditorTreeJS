/**
 * User: Damian
 * Date: 29/06/13
 * Time: 00:12
 */
var scene, camera, renderer, container, stats, controls;
var keyboard = new THREEx.KeyboardState();

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
    //controls = new THREE.FirstPersonControls(camera);
    // EVENTS
    THREEx.WindowResize(renderer, camera);
    THREEx.FullScreen.bindKey({ charCode: 'm'.charCodeAt(0) });
    // STATS
    stats = new Stats();
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.top = '50px';
    stats.domElement.style.zIndex = 100;
    container.appendChild(stats.domElement);
    // LIGHT
    var light = new THREE.PointLight(0xffffff);
    light.position.set(0, 250, 0);
    scene.add(light);

    // FLOOR
    var floorTexture = new THREE.ImageUtils.loadTexture('img/checkerboard.jpg');
    floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
    floorTexture.repeat.set(10, 10);

    var floorMaterial = new THREE.MeshBasicMaterial({ map: floorTexture, side: THREE.DoubleSide });
    //floorMaterial.color.setHex(0x68B5FF);
    var floorGeometry = new THREE.PlaneGeometry(2000, 2000, 10, 10);
    var floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.position.y = 0;
    floor.rotation.x = Math.PI / 2;
    scene.add(floor);

    // SKYBOX
    var skyBoxGeometry = new THREE.CubeGeometry(15000, 15000, 15000);
    var skyBoxMaterial = new THREE.MeshBasicMaterial({ color: 0xC0C0C0, side: THREE.BackSide });
    var skyBox = new THREE.Mesh(skyBoxGeometry, skyBoxMaterial);
    scene.add(skyBox);

    this.animate();
}

Editor.prototype.animate = function () {
    requestAnimationFrame(Editor.prototype.animate);
    renderer.render(scene, camera);
    Editor.prototype.update();
};

Editor.prototype.update = function () {
    if (keyboard.pressed("z")) {
        // do something
    }
    controls.update();
    stats.update();
};

var elementTexture = new THREE.ImageUtils.loadTexture('./img/crate.gif');
var elementMaterial = new THREE.MeshBasicMaterial({ map: elementTexture });
var wireframeMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true, transparent: true });
var multiMaterial = [ elementMaterial, wireframeMaterial ];

Editor.prototype.createObject = function (universElement) {
    var geometry, object3D;
    switch (universElement.type) {
        case ELEMENT.DOMINO : //x, y, z
            geometry = new THREE.CubeGeometry(universElement.dimension._x, universElement.dimension._y, universElement.dimension._z, 2, 2, 2);
            object3D = THREE.SceneUtils.createMultiMaterialObject(geometry.clone(), multiMaterial);
            object3D.position.set(universElement.position._x, geometry.height / 2 + universElement.position._y + 1, universElement.position._z);
            this.rotateAroundObjectAxis(object3D, new THREE.Vector3(1, 0, 0), universElement.rotation._x);
            this.rotateAroundObjectAxis(object3D, new THREE.Vector3(0, 1, 0), universElement.rotation._y);
            this.rotateAroundObjectAxis(object3D, new THREE.Vector3(0, 0, 1), universElement.rotation._z);
            break;
        case ELEMENT.SPHERE :
            geometry = new THREE.SphereGeometry(universElement.radius, 80, 80);
            object3D = THREE.SceneUtils.createMultiMaterialObject(geometry.clone(), multiMaterial);
            object3D.position.set(universElement.position._x, geometry.radius + universElement.position._y + 1, universElement.position._z);
            break;
    }

    scene.add(object3D);
    universElement.geometry3D = geometry;
    universElement.object3D = object3D;
};

var rotObjectMatrix;
Editor.prototype.rotateAroundObjectAxis = function (object, axis, radians) {
    rotObjectMatrix = new THREE.Matrix4;
    rotObjectMatrix.makeRotationAxis(axis.normalize(), radians);
    object.matrix.multiply(rotObjectMatrix);

    // new code for Three.js r50+
    object.rotation.setEulerFromRotationMatrix(object.matrix);

};

Editor.prototype.removeObject = function (object) {
    scene.remove(object);
};