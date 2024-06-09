import {useEffect, useRef} from "react";
import * as THREE from "three";
import CANNON from 'cannon'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import gradienTexture3 from "../assets/textures/gradients/3.jpg";

import Floor from "./Floor.tsx";
import Sphere, {IForwardedRef} from "./Sphere.tsx";

import useSize from "../hooks/useSize.ts";



export interface IInitialParameters {
  materialColor: string;
  objectDistance: number;
  material?: THREE.MeshToonMaterial;
  texture?: THREE.Texture;
  currentSection: number;
}

const scene = new THREE.Scene();
// Canvas
const renderer = new THREE.WebGLRenderer();

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setClearAlpha(0);

// Base camera
document.body.appendChild(renderer.domElement);
const groupCamera = new THREE.Group();
scene.add(groupCamera);

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  100,
);

camera.position.z = 5;
groupCamera.add(camera);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;


/**
 * Physics
 */
const world = new CANNON.World()
world.gravity.set(0,  -9.82, 0)

/**
 * parameters
 */
const parameters: IInitialParameters = {
  materialColor: "#445567",
  objectDistance: 5,
  currentSection: 0,
};

parameters.material = new THREE.MeshToonMaterial({
  color: parameters.materialColor,
});

const textureLoader = new THREE.TextureLoader();
const gradienTexture = textureLoader.load(gradienTexture3);
gradienTexture.magFilter = THREE.NearestFilter;

parameters.texture = gradienTexture;




function Scene() {
  const {innerWidth, innerHeight, devicePixelRatio} = useSize()
  const sphereRef = useRef<IForwardedRef>();

  useEffect(() => {
    // Update camera
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
    // Update renderer
    renderer.setSize(innerWidth, innerHeight);
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));

  }, [innerWidth, innerHeight, devicePixelRatio]);




  const clock = new THREE.Clock()
  let oldElapsedTime = 0
  const tick = () => {
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - oldElapsedTime
    oldElapsedTime = elapsedTime

    // Update physics
    world.step(1 / 60, deltaTime, 3)

    // Update controls
    if (sphereRef.current) {
      sphereRef.current.updatePosition(); // Accede a un método en el componente hijo
    }
    controls.update()


    renderer.render(scene, camera);
    requestAnimationFrame(tick);
  };

  useEffect(() => {
    tick();
  }, []);

  return (
    <>
      <Floor
        initialParameters={parameters}
        scene={scene}
        world={world}
      />
      <Sphere ref={sphereRef}
        initialParameters={parameters}
        scene={scene}
        world={world}
      />

    </>
  );
}

export default Scene;
