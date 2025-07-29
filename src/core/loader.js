import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

export async function loader(path) {
  const loader = new GLTFLoader();
  let object = null;
  await loader.load(
    path,
    function (gltf) {
      object = gltf.scene;
    },
    undefined,
    function (error) {
      console.error(error);
    }
  );
  return object;
}
