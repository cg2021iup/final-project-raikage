import * as THREE from './build/three.module.js';
import { OrbitControls } from './js/OrbitControls.js';

let scene, camera, renderer, pointLight, ambientLight;
let controls, cube;

function init(){
    scene = new THREE.Scene();

    renderer = new THREE.WebGLRenderer({antialias:true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 25);

    controls = new OrbitControls(camera, renderer.domElement);
    
    //Light Cube
    pointLight = new THREE.PointLight(0xffffff);    
    ambientLight = new THREE.AmbientLight({
        color: 0xffffff,
        intensity: 0.1
    });
    scene.add(pointLight, ambientLight);
    pointLight.position.set (0, 0, 0)

    animate();
}

function animate(){
    renderer.render(scene, camera);
    controls.update();
    requestAnimationFrame(animate);
}
init();