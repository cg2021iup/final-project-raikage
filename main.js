import * as THREE from './build/three.module.js';
import { OrbitControls } from './js/OrbitControls.js';
import { GLTFLoader } from './js/GLTFLoader.js';

let scene, camera, renderer, pointLight, ambientLight;
let controls;

function init(){
    scene = new THREE.Scene();

    renderer = new THREE.WebGLRenderer({antialias:true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    camera = new THREE.PerspectiveCamera(55, window.innerWidth/window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 750);

    controls = new OrbitControls(camera, renderer.domElement);
    
    //Light Cube
    pointLight = new THREE.PointLight(0xffffff);    
    ambientLight = new THREE.AmbientLight({
        color: 0xffffff,
        intensity: 0.1
    });
    scene.add(pointLight, ambientLight);
    pointLight.position.set (0, 0, 0)

    //Planets
    var loader = new GLTFLoader();
    var sunMesh, mercuryMesh;

    loader.load('./gltf/0.0_Sun.glb', sun_forge, xhr, error);

    function sun_forge( gltf ){
        console.log( gltf );
        sunMesh = gltf.scene;
        sunMesh.scale.set( 0.4, 0.4, 0.4 );
        sunMesh.position.set( 0, 0, 0 );
        sunMesh.castShadow = true;
        sunMesh.receiveShadow = true;
        scene.add( sunMesh );
    }
    function mercury_forge( gltf ){
        console.log( gltf );
        mercuryMesh = gltf.scene;
        mercuryMesh.scale.set( 0.003, 0.003, 0.003 );
        mercuryMesh.position.set( 240, 0, 0 );
        mercuryMesh.castShadow = true;
        mercuryMesh.receiveShadow = true;
        scene.add( mercuryMesh );
    }

    function xhr ( xhr ) { console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' ); }
	function error ( error ) { console.log( 'An error happened' ); }

    animate();
}

function animate(){
    renderer.render(scene, camera);
    controls.update();
    requestAnimationFrame(animate);
}
init();