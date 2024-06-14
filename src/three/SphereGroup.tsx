import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  memo,
  useState,
  useCallback,
  createRef,
  useRef,
} from "react";
import * as THREE from "three";
import CANNON from "cannon";
import { IObjectProps, ISphereParameters } from "../types.ts";
import Sphere from "./Sphere.tsx";
import sphere from "./Sphere.tsx";

const SphereGropup = forwardRef((props: IObjectProps, ref) => {
  const { scene, world, material } = props;

  const sphereCollection = useRef([]);

  let sphere: THREE.Mesh;
  let sphereBody: CANNON.Body;

  const generateGeometry = ({ position, radius, mass }): void => {
    // Create a sphere
    const sphereGeometry = new THREE.SphereGeometry(radius, 32, 32);
    const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.position.x = position.x;
    sphere.position.y = position.y;
    sphere.position.z = position.z;
    scene.add(sphere);

    // Add Physics
    const sphereShape = new CANNON.Sphere(radius);
    sphereBody = new CANNON.Body({
      mass,
      position,
      material,
      shape: sphereShape,
    });
    world.addBody(sphereBody);

    // Save
    sphereCollection.current = [
      ...sphereCollection.current,
      { mesh: sphere, body: sphereBody },
    ];
    console.log(sphereCollection.current);
  };

  const updatePosition = (): void => {
    for (const object of sphereCollection.current) {
      object.mesh.position.copy(object.body.position);
    }
  };

  const addSphere = useCallback(() => {
    const x = (Math.random() - 0.5) * 3;
    const y = 3;
    const z = (Math.random() - 0.5) * 3;
    const sphere = {
      ref: createRef(),
      radius: Math.random() * 0.5,
      position: new CANNON.Vec3(x, y, z),
      mass: 6,
    };
    generateGeometry(sphere);
  }, []);

  useImperativeHandle(ref, () => ({
    updatePosition: () => updatePosition(),
    addSphere: () => addSphere(),
  }));

  return <></>;
});

export default SphereGropup;
