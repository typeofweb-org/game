import { Scene } from "@babylonjs/core/scene";
import { Engine } from "@babylonjs/core/Engines/engine";
import { ArcRotateCamera } from "@babylonjs/core/Cameras/arcRotateCamera";
import { HemisphericLight } from "@babylonjs/core/Lights/hemisphericLight";
import { Vector3 } from "@babylonjs/core/Maths/math.vector";
import { MeshBuilder } from "@babylonjs/core/Meshes/meshBuilder";
import { SceneLoader } from "@babylonjs/core/Loading/sceneLoader";
import "@babylonjs/loaders/glTF";
import sceneGlb from "url:./models/scene.glb";

// http://localhost:1234/scene.c9d23b07.glb

const canvas = document.getElementById("renderCanvas") as HTMLCanvasElement;

const engine = new Engine(canvas, true);

const createScene = async (engine: Engine) => {
  const scene = new Scene(engine);

  const camera = new ArcRotateCamera(
    "camera",
    -Math.PI / 2,
    Math.PI / 2.5,
    3,
    new Vector3(0, 0, 0),
    scene
  );
  camera.attachControl(canvas, true);

  const light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);

  return scene;
};

(async function init() {
  const scene = await createScene(engine);
  const model = await SceneLoader.ImportMeshAsync("", sceneGlb, "", scene);

  scene.registerBeforeRender(() => {
    model.meshes[1]!.position.x = Math.sin(performance.now() / 300);
  });

  engine.runRenderLoop(() => {
    scene.render();
  });

  window.addEventListener(
    "resize",
    () => {
      engine.resize();
    },
    { passive: true }
  );
})();
