import { Color } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";

export default class GltfLoader {
  constructor(
    name,
    path,
    scene,
    loadingManager,
    { posX = 0, posY = 0, posZ = 0, scale = 1, color = 0x707070 }
  ) {
    this.name = name;
    this.scene = scene;
    this.loader = new GLTFLoader(loadingManager);
    this.dracoLoader = new DRACOLoader();
    this.dracoLoader.setDecoderPath("draco/");
    this.loader.setDRACOLoader(this.dracoLoader);
    this.loader.load(
      path,
      (gltf) => {
        this.gltf = gltf.scene;
        this.gltf.position.x = posX;
        this.gltf.position.y = posY;
        this.gltf.position.z = posZ;
        this.gltf.scale.x = scale;
        this.gltf.scale.y = scale;
        this.gltf.scale.z = scale;
        this.scene.add(this.gltf);

        this.gltf.traverse(function (child) {
          if (child.isMesh) {
            child.material.emissive = new Color(color);
          }
        });
      },
      // called while loading is progressing
      (xhr) => {
        // console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
      },
      // called when loading has errors
      (error) => {
        // console.log("An error happened", error);
      }
    );
  }
}
