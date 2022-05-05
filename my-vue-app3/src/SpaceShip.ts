import { SpaceObject } from './SpaceObject';

export class SpaceShip extends SpaceObject{
    constructor(model: THREE.Object3D , position = [0,0,0], mass = 1, movable = true)
    {
        super(model,position,mass,movable);
    }
}