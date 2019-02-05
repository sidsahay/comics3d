import * as THREE from "three";
import * as THREEGLTFLoader from "three-gltf-loader";
import * as THREEOrbitControls from "threejs-orbit-controls";

function init() {
    let container = document.createElement('div');
    document.body.appendChild(container);

    let camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 2000);
    camera.position.set(15, 15, 15);

    let controls = new THREEOrbitControls(camera);
    controls.target.set(0, 0, 0);
    controls.update();

    let scene = new THREE.Scene();
    //scene.overrideMaterial = new THREE.MeshBasicMaterial(0xffffff);

    let light = new THREE.PointLight(0xffffff);
    light.position.set(0, 20, 0);
    scene.add(light);

    let loader = new THREEGLTFLoader();
    loader.load('models/house.gltf'
        , function (gltf) {
            scene.add(gltf.scene);
        }
        , undefined
        , function (e) {
            console.error(e);
        }
    );

    let renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.gammaOutput = true;

    container.appendChild(renderer.domElement);

    window.addEventListener('resize', onWindowResize, false);

    return {renderer: renderer, scene: scene, camera: camera, controls: controls};
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function renderFrames(renderObj) {
    renderObj.renderer.render(renderObj.scene, renderObj.camera);

    requestAnimationFrame((timeStamp) => {
        renderFrames(renderObj);
    });
}

let renderObj = init();
renderFrames(renderObj);