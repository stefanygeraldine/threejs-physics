import { useEffect } from "react";
import * as THREE from "three";
import CANNON from "cannon";
import { IObjectProps } from "../types.ts";

function Floor(props: IObjectProps) {
  const { scene, world, material } = props;

  let mesh: THREE.Mesh;
  let floorBody: CANNON.Body;

  const generateGeometry = (): void => {
    const geometry = new THREE.PlaneGeometry(10, 10);
    const material = new THREE.MeshBasicMaterial({
      color: 0xffff00,
      side: THREE.DoubleSide,
    });
    mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.x = -Math.PI * 0.5;
    scene.add(mesh);
  };

  const generatePhysics = (): void => {
    const floorShape = new CANNON.Plane();
    floorBody = new CANNON.Body();
    floorBody.addShape(floorShape);
    floorBody.mass = 0;
    floorBody.material = material;
    floorBody.quaternion.setFromAxisAngle(
      new CANNON.Vec3(-1, 0, 0),
      Math.PI * 0.5,
    );
    world.addBody(floorBody);
  };

  useEffect(() => {
    generateGeometry();
    generatePhysics();
  }, []);

  return <></>;
}

export default Floor;
