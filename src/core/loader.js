import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { AnimationMixer, Group } from "three";

/**
 * Loads a GLTF model with shadows enabled and animation support.
 * @param {string} path - .glb or .gltf file path
 * @returns {Promise<{ model: Group, mixer: AnimationMixer|null, animations: AnimationClip[] }>}
 */
export async function loader(path) {
  const loader = new GLTFLoader();

  return new Promise((resolve, reject) => {
    loader.load(
      path,
      (gltf) => {
        const model = gltf.scene;
        const animations = gltf.animations;
        model.traverse((child) => {
          if (child.isMesh) {
            // child.castShadow = true;
            child.receiveShadow = true;
          }
        });
        const mixer = animations.length > 0 ? new AnimationMixer(model) : null;
        resolve({ model, mixer, animations });
      },
      undefined,
      (error) => {
        console.error("Error loading model:", error);
        reject(error);
      }
    );
  });
}
