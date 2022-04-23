import * as THREE from 'three';
import Vector3 from 'three';

export class SpaceObject{
    mass : number;
    position : number[]
    model : THREE.Mesh
    speedVector : THREE.Vector3
    gravityVector : THREE.Vector3
    movable : boolean
    constructor(model: THREE.Mesh, position = [0,0,0], mass = 1, movable = true){
        this.model = model;
        this.mass = mass;
        this.position = position;
        this.speedVector = new THREE.Vector3(0,0,0)
        this.gravityVector = new THREE.Vector3(0,0,0)
        this.model.position.set(position[0],position[1],position[2])
        this.movable = movable
    }
    distance(other: SpaceObject) : number {
        return 0.01 + Math.sqrt(Math.pow(this.position[0] - other.position[0],2) + Math.pow(this.position[1] - other.position[1],2) + Math.pow(this.position[2] - other.position[2],2)) 
    }

    addSpeed(vector : THREE.Vector3){
        this.speedVector.add(vector)
    }

    findVector(other: SpaceObject) : THREE.Vector3{
        let arr = []
        let dist = this.distance(other)
        for(let i = 0 ; i < 3 ; i ++){
            arr[i] = (other.position[i] - this.position[i])/dist
        }
        return new THREE.Vector3(arr[0], arr[1], arr[2])
    }
    move() : void{
        this.position[0] += this.speedVector.x
        this.position[1] += this.speedVector.y
        this.position[2] += this.speedVector.z
        this.model.position.set(this.position[0],this.position[1],this.position[2])
    }

}