import * as THREE from './build/three.module.js';
import Stats from './js/stats.module.js';
import { OrbitControls } from './js/OrbitControls.js';
import { FlyControls } from './js/FlyControls.js';
import { GLTFLoader } from './js/GLTFLoader.js';

let container, stats;
let scene, camera, renderer, pointLight, ambientLight;
let controls;

var MoveSpeed = 1500;
var sunMesh, mercuryMesh, venusMesh, marsMesh, earthMesh, marsMesh, jupiterMesh, saturnMesh, uranusMesh, neptuneMesh;

const radius = 6371;

const clock = new THREE.Clock();

init();
animate();

function init(){
    container = document.createElement( 'div' );
    document.body.appendChild( container );

    camera = new THREE.PerspectiveCamera(55, window.innerWidth/window.innerHeight, 0.1, 1e7);
    camera.position.set(-1000, 800, 1050);
    camera.lookAt( 0, 0, 0 )

    scene = new THREE.Scene();

    // Light
    pointLight = new THREE.PointLight(0xffffff);    
    ambientLight = new THREE.AmbientLight({
        color: 0xffffff,
        intensity: 0.1
    });
    scene.add(ambientLight, pointLight);
    pointLight.position.set (0, 0, 0);
    
    // Planets
    var loader = new GLTFLoader();

    loader.load('./gltf/0.0_Sun.glb', sun_forge, xhr, error);
    loader.load('./gltf/1.0_Mercury.glb', mercury_forge, xhr, error);
    loader.load('./gltf/2.0_Venus.glb', venus_forge, xhr, error);
    loader.load('./gltf/3.0_Earth.glb', earth_forge, xhr, error);
    loader.load('./gltf/4.0_Mars.glb', mars_forge, xhr, error);
    loader.load('./gltf/5.0_Jupiter.glb', jupiter_forge, xhr, error);
    loader.load('./gltf/6.0_Saturn.glb', saturn_forge, xhr, error);
    loader.load('./gltf/7.0_Uranus.glb', uranus_forge, xhr, error);
    loader.load('./gltf/8.0_Neptune.glb', neptune_forge, xhr, error);

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
        mercuryMesh.position.set( 300, 0, 0 );
        mercuryMesh.castShadow = true;
        mercuryMesh.receiveShadow = true;
        scene.add( mercuryMesh );
    }
    function venus_forge( gltf ){
        console.log( gltf );
        venusMesh = gltf.scene;
        venusMesh.scale.set( 0.007, 0.007, 0.007 );
        venusMesh.position.set( 450, 0, 0 );
        venusMesh.castShadow = true;
        venusMesh.receiveShadow = true;
        scene.add( venusMesh );
    }
    function earth_forge( gltf ){
        console.log( gltf );
        earthMesh = gltf.scene;
        earthMesh.scale.set( 0.008, 0.008, 0.008 );
        earthMesh.position.set( 600, 0, 0 );
        earthMesh.castShadow = true;
        earthMesh.receiveShadow = true;
        scene.add( earthMesh );
    }
    function mars_forge( gltf ){
        console.log( gltf );
        marsMesh = gltf.scene;
        marsMesh.scale.set( 0.004, 0.004, 0.004 );
        marsMesh.position.set( 795, 0, 0 );
        marsMesh.castShadow = true;
        marsMesh.receiveShadow = true;
        scene.add( marsMesh );
    }
    function jupiter_forge( gltf ){
        console.log( gltf );
        jupiterMesh = gltf.scene;
        jupiterMesh.scale.set( 0.09, 0.09, 0.09 );
        jupiterMesh.position.set( 1455, 0, 0 );
        jupiterMesh.castShadow = true;
        jupiterMesh.receiveShadow = true;
        scene.add( jupiterMesh );
    }
    function saturn_forge( gltf ){
        console.log( gltf );
        saturnMesh = gltf.scene;
        saturnMesh.scale.set( 0.075, 0.075, 0.075 );
        saturnMesh.position.set( 2175, 0, 0 );
        saturnMesh.castShadow = true;
        saturnMesh.receiveShadow = true;
        scene.add( saturnMesh );
    }
    function uranus_forge( gltf ){
        console.log( gltf );
        uranusMesh = gltf.scene;
        uranusMesh.scale.set( 0.03, 0.03, 0.03 );
        uranusMesh.position.set( 3345, 0, 0 );
        uranusMesh.castShadow = true;
        uranusMesh.receiveShadow = true;
        scene.add( uranusMesh );
    }
    function neptune_forge( gltf ){
        console.log( gltf );
        neptuneMesh = gltf.scene;
        neptuneMesh.scale.set( 0.03, 0.03, 0.03 );
        neptuneMesh.position.set( 4515, 0, 0 );
        neptuneMesh.castShadow = true;
        neptuneMesh.receiveShadow = true;
        scene.add( neptuneMesh );
    }

    function xhr ( xhr ) { console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' ); }
	function error ( error ) { console.log( 'An error happened' ); }

    // Planet Line
    const lineMaterial = new THREE.MeshBasicMaterial( { color: 0x0BB5FF } );

    const mercuryLineGeo = new THREE.TorusGeometry( 300, 0.2, 16, 100 );
    const mercuryLine = new THREE.Mesh( mercuryLineGeo, lineMaterial );

    const venusLineGeo = new THREE.TorusGeometry( 450, 0.2, 16, 100 );
    const venusLine = new THREE.Mesh( venusLineGeo, lineMaterial );

    const earthLineGeo = new THREE.TorusGeometry( 600, 0.2, 16, 100 );
    const earthLine = new THREE.Mesh( earthLineGeo, lineMaterial );

    const marsLineGeo = new THREE.TorusGeometry( 795, 0.2, 16, 100 );
    const marsLine = new THREE.Mesh( marsLineGeo, lineMaterial );

    const jupiterLineGeo = new THREE.TorusGeometry( 1455, 0.2, 16, 100 );
    const jupiterLine = new THREE.Mesh( jupiterLineGeo, lineMaterial );

    const saturnLineGeo = new THREE.TorusGeometry( 2175, 0.2, 16, 100 );
    const saturnLine = new THREE.Mesh( saturnLineGeo, lineMaterial );

    const uranusLineGeo = new THREE.TorusGeometry( 3345, 0.2, 16, 100 );
    const uranusLine = new THREE.Mesh( uranusLineGeo, lineMaterial );

    const neptuneLineGeo = new THREE.TorusGeometry( 4515, 0.2, 16, 100 );
    const neptuneLine = new THREE.Mesh( neptuneLineGeo, lineMaterial );

    scene.add( mercuryLine, venusLine, earthLine, marsLine, jupiterLine, saturnLine, uranusLine, neptuneLine );
    mercuryLine.rotation.x = Math.PI/2;
    venusLine.rotation.x = Math.PI/2;
    earthLine.rotation.x = Math.PI/2;
    marsLine.rotation.x = Math.PI/2;
    jupiterLine.rotation.x = Math.PI/2;
    saturnLine.rotation.x = Math.PI/2;
    uranusLine.rotation.x = Math.PI/2;
    neptuneLine.rotation.x = Math.PI/2;

    // Background Stars
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


    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.outputEncoding = THREE.sRGBEncoding;
    container.appendChild( renderer.domElement );

    controls = new OrbitControls(camera, renderer.domElement);
    // controls = new FlyControls( camera, renderer.domElement );
    // controls.movementSpeed = MoveSpeed;
    // controls.domElement = container;
    // controls.rollSpeed = Math.PI / 6;
    // controls.autoForward = false;
    // controls.dragToLook = false;

    stats = new Stats();
    container.appendChild( stats.dom );

    window.addEventListener( 'resize', onWindowResize );
}

function onWindowResize() {
    renderer.setSize( window.innerWidth, window.innerHeight );
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
}

// Planet rotation time
function planetRotation(){
    sunMesh.rotation.y += 9.6e-5; // 25 * earth days
    mercuryMesh.rotation.y += 4.12e-5; // 58.6 * earth days
    venusMesh.rotation.y += 9.9e-6; // 243 * earth days
    earthMesh.rotation.y += 24e-4;
    marsMesh.rotation.y += 25e-4; // earth days + 1
    jupiterMesh.rotation.y += 1e-3; // 10/earth days
    saturnMesh.rotation.y += 1.15e-3; // 10.5/earth days
    uranusMesh.rotation.y += 1.725e-3; // 17.25/earth days
    neptuneMesh.rotation.y += 1.6e-3; // 16/earth days
}

function animate(){
    requestAnimationFrame(animate);
    planetRotation();
    render();
    stats.update();
}

function render(){
    document.addEventListener( 'keydown', onDocumentKeyDown, false );
    function onDocumentKeyDown(event) {
        if ( event.key == 'w' ){
            if ( event.key == 'Shift' ){
                MoveSpeed = 1500;
            }
        }
    }
    const delta = clock.getDelta();
    controls.update( delta );
    renderer.render( scene, camera );
}