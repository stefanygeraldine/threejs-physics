import { useEffect } from "react";
import * as THREE from "three";
import { type IInitialParameters } from "./Scene.tsx";
import CANNON from 'cannon'
import {IBody} from "../types.ts";

interface IProps {
  scene: THREE.Scene;
  world: CANNON.World
  initialParameters: IInitialParameters;
}


function Floor(props: IProps) {
  const { scene, world } = props;


  let mesh: THREE.Mesh;
  const generateGeometry = (): void => {
    const geometry = new THREE.PlaneGeometry( 3, 3 );
    const material= new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );

    mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.x = Math.PI / 1.5;
    scene.add(mesh);


  };

  const generatePhysics = (): void => {
    const floorShape = new CANNON.Plane()
    const floorBody: IBody  = new CANNON.Body()
    floorBody.mass = 0
    floorBody.customType = 'plane'
    floorBody.addShape(floorShape)
    world.addBody(floorBody)

  }

  useEffect(() => {
    generateGeometry();
    generatePhysics();
  }, []);

  return <></>;
}

export default Floor;
