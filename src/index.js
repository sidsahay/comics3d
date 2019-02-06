import * as THREE from "three";
import * as THREEGLTFLoader from "three-gltf-loader";
import * as THREEOrbitControls from "threejs-orbit-controls";
import * as THREEFlyControls from "three-fly-controls"

function min(a, b) {
    if (a < b) {
        return a;
    }
    else {
        return b;
    }
}

function renderFrames(renderObj) {
    renderObj.renderer.render(renderObj.scene, renderObj.camera);

    requestAnimationFrame((timeStamp) => {
        renderFrames(renderObj);
    });
}

function initSystems(loadResult) {
    let container = document.createElement('div');
    document.body.appendChild(container);

    let scene = new THREE.Scene();
    scene.add(loadResult.scene);

    let camera = loadResult.cameras[0];
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    console.log(camera);
    
    let renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.gammaOutput = true;
    renderer.gammaFactor = 2.2;
    renderer.toneMapping = THREE.LinearToneMapping;
    renderer.physicallyCorrectLights = true;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);

    let clock = new THREE.Clock;
    clock.getDelta();

    return { renderer: renderer, scene: scene, camera: camera, clock: clock };
}

let loadModel = new Promise((resolve, reject) => {
    let loader = new THREEGLTFLoader();
    loader.load('models/test.gltf'
        , function (result) {
            result.scene.traverse((obj) => {
                if (obj.isMesh) {
                    obj.castShadow = true;
                    obj.receiveShadow = true;
                }

                if (obj.isLight) {
                    obj.castShadow = true;
                }
            });

            resolve(result);
        }
        , undefined
        , function (e) {
            console.error(e);
            reject("Bah, loader threw an error");
        }
    );
});

loadModel
    .then(initSystems)
    .then(renderFrames);


