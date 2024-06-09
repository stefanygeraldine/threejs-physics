import { useEffect } from "react";
import * as THREE from "three";
import type { IInitialParameters } from "./Scene.tsx";

interface IProps {
  scene: THREE.Scene;
  initialParameters: IInitialParameters;
}



function Sphere(props: IProps) {
  const { scene } = props;


  const generateGeometry = (): void => {
    // Create a sphere
    const sphereGeometry = new THREE.SphereGeometry(0.5, 32, 32);
    const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.position.y = 0.59; // Position the sphere above the plane
    scene.add(sphere);
  };


  useEffect(() => {
    generateGeometry();
  }, []);

  return <></>;
}

export default Sphere;
