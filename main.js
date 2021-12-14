import * as THREE from './build/three.module.js';
import { OrbitControls } from './js/OrbitControls.js';
import { GLTFLoader } from './js/GLTFLoader.js';

let scene, camera, renderer, pointLight, ambientLight;
let controls;

const radius = 6371;

function init(){
    scene = new THREE.Scene();

    renderer = new THREE.WebGLRenderer({antialias:true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    camera = new THREE.PerspectiveCamera(55, window.innerWidth/window.innerHeight, 0.1, 1e7);
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
    loader.load('./gltf/1.0_Mercury.glb', mercury_forge, xhr, error);

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

    //Stars
    const r = radius, starsGeometry = [ new THREE.BufferGeometry(), new THREE.BufferGeometry() ];

    const vertices1 = [];
    const vertices2 = [];

    const vertex = new THREE.Vector3();

    for ( let i = 0; i < 250; i ++ ) {
        vertex.x = Math.random() * 2 - 1;
        vertex.y = Math.random() * 2 - 1;
        vertex.z = Math.random() * 2 - 1;
        vertex.multiplyScalar( r );
        vertices1.push( vertex.x, vertex.y, vertex.z );
    }

    for ( let i = 0; i < 1500; i ++ ) {
        vertex.x = Math.random() * 2 - 1;
        vertex.y = Math.random() * 2 - 1;
        vertex.z = Math.random() * 2 - 1;
        vertex.multiplyScalar( r );
        vertices2.push( vertex.x, vertex.y, vertex.z );
    }

    starsGeometry[ 0 ].setAttribute( 'position', new THREE.Float32BufferAttribute( vertices1, 3 ) );
    starsGeometry[ 1 ].setAttribute( 'position', new THREE.Float32BufferAttribute( vertices2, 3 ) );

    const starsMaterials = [
        new THREE.PointsMaterial( { color: 0x555555, size: 2, sizeAttenuation: false } ),
        new THREE.PointsMaterial( { color: 0x555555, size: 1, sizeAttenuation: false } ),
        new THREE.PointsMaterial( { color: 0x333333, size: 2, sizeAttenuation: false } ),
        new THREE.PointsMaterial( { color: 0x3a3a3a, size: 1, sizeAttenuation: false } ),
        new THREE.PointsMaterial( { color: 0x1a1a1a, size: 2, sizeAttenuation: false } ),
        new THREE.PointsMaterial( { color: 0x1a1a1a, size: 1, sizeAttenuation: false } )
    ];

    for ( let i = 10; i < 30; i ++ ) {
        const stars = new THREE.Points( starsGeometry[ i % 2 ], starsMaterials[ i % 6 ] );
        stars.rotation.x = Math.random() * 6;
        stars.rotation.y = Math.random() * 6;
        stars.rotation.z = Math.random() * 6;
        stars.scale.setScalar( i * 10 );
        stars.matrixAutoUpdate = false;
        stars.updateMatrix();
        scene.add( stars );
    }

    animate();
}

function animate(){
    renderer.render(scene, camera);
    controls.update();
    requestAnimationFrame(animate);
}
init();