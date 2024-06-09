import { forwardRef, useEffect, useImperativeHandle} from "react";
import * as THREE from "three";
import type { IInitialParameters } from "./Scene.tsx";
import CANNON from 'cannon'

interface IProps {
  scene: THREE.Scene;
  initialParameters: IInitialParameters;
  world: CANNON.World
}

export interface IForwardedRef {
  updatePosition: () => void
}

const  Sphere = forwardRef((props: IProps, ref) => {
  const { scene, world } = props;
  let sphere: THREE.Mesh
  let sphereBody: CANNON.Body

  const generateGeometry = (): void => {
    // Create a sphere
    const sphereGeometry = new THREE.SphereGeometry(0.5, 32, 32);
    const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.position.y = 0.59; // Position the sphere above the plane
    scene.add(sphere);
  };

  const generatePhysics = (): void => {
    const sphereShape = new CANNON.Sphere(0.5)
    sphereBody =  new CANNON.Body({
      mass: 1,
      position: new CANNON.Vec3(0, 3, 0),
      shape: sphereShape,
    })
    world.addBody(sphereBody)
  }

  const updatePosition = (): void => {
    sphere.position.y = sphereBody.position.y;
  }

  useImperativeHandle(ref, () => ({
    updatePosition: ()=> updatePosition()
  }));

  useEffect(() => {
    generateGeometry();
    generatePhysics()
  }, []);

  return <></>;
})

export default Sphere;
