import * as THREE from "three"
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { SkeletonHelper } from "three";
const scene = new THREE.Scene();
const aspect = window.innerWidth / window.innerHeight;
const camera = new THREE.PerspectiveCamera( 60, aspect, 0.1, 1000 );
camera.position.z = 5;
const renderer = new THREE.WebGLRenderer({antialias: true});

renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild(renderer.domElement)

const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 0, 0);
controls.update();


//add a 2D Grid
const size = 100;
const divisions = 100;
const gridHelper = new THREE.GridHelper( size, divisions );
gridHelper.translateY(-0.5)
gridHelper.translateX(0.5);
gridHelper.translateZ(0.5)
scene.add( gridHelper );

//Box
const geometry = new THREE.BoxGeometry(1,1,1);
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00, transparent: true, opacity: 0.75} );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );
var x = 1

renderer.render( scene, camera );


var animate = function(){
    renderer.render(scene,camera);
    requestAnimationFrame(animate);
}
function sleep() {
    return new Promise(resolve => setTimeout(resolve, 1000));
}
async function addCube()
{
    const new_cube = new THREE.Mesh(geometry, material)
    new_cube.translateX(x)
    x = x+1
    scene.add(new_cube)
    await sleep()
    addCube()
}
animate();
addCube();