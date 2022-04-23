import * as THREE from "three"
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { ModelLoader } from './model_loader';
import { SpaceObject } from './SpaceObject';
import Vector3 from 'three';

const G = 0.0001
const scene = new THREE.Scene();
const aspect = 1920 / 1080;
const camera = new THREE.PerspectiveCamera( 60, aspect, 1, 1000 );
camera.position.z = 0;
camera.position.x = 0;
camera.position.y = 4;
const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setSize( 1920, 1080 );
renderer.setClearColor( 0x000000 );
document.body.appendChild(renderer.domElement)

const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 0, 0);
controls.update();
const light = new THREE.PointLight( 0xffffff, 1, 0);
light.position.set( 0, 4, -4 );
light.shadow.bias = -0.00012
light.castShadow = true; // default false
light.shadow.mapSize.width = 2048; // default
light.shadow.mapSize.height = 2048; // default
light.shadow.camera.near = 1; // default
light.shadow.camera.far = 1000; // default
scene.add( light );

let planets:SpaceObject[] = []

let geometry = new THREE.SphereGeometry( 0.5, 24, 16 );
const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
const sphere = new THREE.Mesh( geometry, material );
scene.add( sphere );
let sun1 = new SpaceObject(sphere,[0,5,0],7)

let geometry2 = new THREE.SphereGeometry( 0.5, 24, 16 );
const material2 = new THREE.MeshBasicMaterial( { color: 0x0000ff } );
const sphere2 = new THREE.Mesh( geometry2, material2 );
scene.add(sphere2)
let sun2 = new SpaceObject(sphere2,[1,0,0],3)
sun2.addSpeed(new THREE.Vector3(0,0.01,0))

let geometry3 = new THREE.SphereGeometry( 0.5, 24, 16 );
const material3 = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
const sphere3 = new THREE.Mesh( geometry3, material3 );
scene.add(sphere3)
let sun3 = new SpaceObject(sphere3,[0,0,3],4)

planets.push(sun1,sun2,sun3)

function force(obj1 : SpaceObject, obj2 : SpaceObject) : number{
	return G*obj1.mass*obj2.mass/obj1.distance(obj2)
}

function gravity(){

	for(let i = 0 ; i < planets.length; i ++)
	{	
		let curr_planet = planets[i]
		for(let j = i+1; j < planets.length; j++)
		{
			let next_planet = planets[j]
			let curr_gravity_force = force(curr_planet,next_planet)
			let x = curr_planet.findVector(next_planet)
			let y = next_planet.findVector(curr_planet)
			x.multiplyScalar(curr_gravity_force)
			y.multiplyScalar(curr_gravity_force)
			curr_planet.gravityVector.add(x)
			next_planet.gravityVector.add(y)
		}
	}
	for(const planet of planets)
	{
		planet.speedVector.add(planet.gravityVector.multiplyScalar(1/planet.mass));
		console.log(planet.position)
		planet.move()
		planet.gravityVector = new THREE.Vector3(0,0,0)
	}
}

var animate = async function(){
    renderer.render(scene,camera);
    requestAnimationFrame(animate);
	gravity()
}
animate();