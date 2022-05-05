import THREE from "three";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import modelsJson from '../src/models.json';

let modelsArray: any[] = [];
export class ModelLoader{

 loader = new GLTFLoader();
 arr :THREE.Group[] ;
 constructor(){
   this.arr = []
   for(const model of modelsJson.items){
      this.loader.load( '/src/models/'+model.path, function ( gltf ) {
      let curr_model  = gltf.scene;
      curr_model.scale.x = model.scale;
      curr_model.scale.y = model.scale;
      curr_model.scale.z = model.scale;
      gltf.scene.traverse( function( node ) {

        if ( node.type === 'Mesh' ) 
        { 
          node.receiveShadow = true;
          node.castShadow = true; 
        }

    } );
      curr_model.rotateX(model.rotation[0] * Math.PI/180)
      curr_model.rotateY(model.rotation[1] * Math.PI/180)
      curr_model.rotateZ(model.rotation[2] * Math.PI/180)
      curr_model.translateX(model.position[0])
      curr_model.translateY(model.position[1])
      curr_model.translateZ(model.position[2])
      modelsArray.push(curr_model)
    }, undefined, function ( error ) {
    console.error( error );
     } );
     this.#getModels()
   }
 }
  #getModels():void{
    this.arr = modelsArray;
 }
}


