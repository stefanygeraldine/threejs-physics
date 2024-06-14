import { createRef, Fragment, useCallback, useEffect, useRef } from "react";
import * as THREE from "three";
import * as dat from "dat.gui";
import CANNON from "cannon";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import gradienTexture3 from "../assets/textures/gradients/3.jpg";

import Floor from "./Floor.tsx";
import SphereGroup from "./SphereGroup.tsx";

import useSize from "../hooks/useSize.ts";

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

camera.position.x = 0;
camera.position.y = 2;
camera.position.z = 8;
groupCamera.add(camera);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

/**
 * Physics
 */
const world = new CANNON.World();
world.gravity.set(0, -9.82, 0);
/**
 * Materials
 */
const defaultMaterial = new CANNON.Material("defaultMaterial");
const defaultContactMaterial = new CANNON.ContactMaterial(
  defaultMaterial,
  defaultMaterial,
  {
    friction: 0.1,
    restitution: 0.7,
  },
);
world.addContactMaterial(defaultContactMaterial);

const textureLoader = new THREE.TextureLoader();
const gradienTexture = textureLoader.load(gradienTexture3);
gradienTexture.magFilter = THREE.NearestFilter;

function Scene() {
  const { innerWidth, innerHeight, devicePixelRatio } = useSize();
  const sphereGroupRef = useRef(null);
  const floorRef = useRef(null);

  const addSphere = useCallback(() => {
    if (sphereGroupRef.current) {
      sphereGroupRef.current.addSphere();
    }
  }, []);

  console.log("Parent rendered");

  const clock = new THREE.Clock();
  let oldElapsedTime = 0;
  const tick = () => {
    const elapsedTime = clock.getElapsedTime();
    const deltaTime = elapsedTime - oldElapsedTime;
    oldElapsedTime = elapsedTime;

    // Update physics
    world.step(1 / 60, deltaTime, 3);

    // Update Position
    if (sphereGroupRef.current) {
      sphereGroupRef.current.updatePosition();
    }

    // Update position
    if (floorRef.current) {
      const speed = 0.5;
      const halfRotation = Math.PI / 8; // Half rotation in radians (90 degrees)
      const sineValue = Math.sin(elapsedTime * speed) * halfRotation;
      floorRef.current.rotationAnimate(sineValue); // Accede a un método en el componente hijo
    }

    // Update controls
    controls.update();

    renderer.render(scene, camera);
    requestAnimationFrame(tick);
  };
  /*
  const gui = new dat.GUI();
  const cameraFolder = gui.addFolder("Camera");
  cameraFolder.add(camera.position, "x", -10, 10);
  cameraFolder.add(camera.position, "y", -10, 10);
  cameraFolder.add(camera.position, "z", 0, 20);
 */

  useEffect(() => {
    tick();
  }, []);

  useEffect(() => {
    // Update camera
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();

    // Update renderer
    renderer.setSize(innerWidth, innerHeight);
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  }, [innerWidth, innerHeight, devicePixelRatio]);

  return (
    <>
      <Floor
        ref={floorRef}
        scene={scene}
        world={world}
        material={defaultMaterial}
      />
      <SphereGroup
        material={defaultMaterial}
        ref={sphereGroupRef}
        scene={scene}
        world={world}
      />
      <button onClick={addSphere}>Add Sphere</button>
    </>
  );
}

export default Scene;
