import {  useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Floor from "./Floor.tsx";
import Sphere from "./Sphere.tsx";
import gradienTexture3 from "../assets/textures/gradients/3.jpg";
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
//renderer.setClearColor("#778899");
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

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;


  useEffect(() => {
    // Update camera
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
    // Update renderer
    renderer.setSize(innerWidth, innerHeight);
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));

  }, [innerWidth, innerHeight, devicePixelRatio]);



  const tick = () => {



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
      />
      <Sphere
        initialParameters={parameters}
        scene={scene}
      />

    </>
  );
}

export default Scene;
