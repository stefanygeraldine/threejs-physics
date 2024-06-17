import { forwardRef, useEffect, useImperativeHandle } from "react";
import * as THREE from "three";
import CANNON from "cannon";
import { IObjectProps } from "../types.ts";
import { LineSegmentsGeometry } from "three/examples/jsm/lines/LineSegmentsGeometry";
import { LineMaterial } from "three/examples/jsm/lines/LineMaterial";
import { LineSegments2 } from "three/examples/jsm/lines/LineSegments2";

const FloorGroup = forwardRef((props: IObjectProps, ref) => {
  const { scene } = props;

  const group = new THREE.Group();
  const generateGeometry = (): THREE.Mesh => {
    //const geometry = new THREE.PlaneGeometry(10, 10);
    const geometry = new THREE.CircleGeometry(5, 12);
    const material = new THREE.MeshBasicMaterial({
      color: 0x439968,
      side: THREE.DoubleSide,
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.x = -Math.PI * 0.5;
    return mesh;
  };

  const positionGroup = () => {
    scene.add(group);

    for (let i = 0; i < 50; i++) {
      const angle = Math.random() * Math.PI * 2; // Random angle
      const radius = 9 + Math.random() * 9; // Random radius
      const x = Math.cos(angle) * radius; // Get the x position using cosinus
      const z = Math.sin(angle) * radius; // Get the z position using sinus
      // Position
      //Graves
      const mesh = generateGeometry();
      mesh.position.set(x, 0, z);
      mesh.castShadow = true;
      // Add to the graves container
      group.add(mesh);
    }
  };

  const rotationAnimate = (sineValue) => {
    //mesh.rotation.z = sineValue;
    //lines.rotation.z = sineValue;
  };

  useImperativeHandle(ref, () => ({
    rotationAnimate: (sineValue) => rotationAnimate(sineValue),
  }));

  useEffect(() => {
    positionGroup();
  }, []);

  return <></>;
});

export default FloorGroup;
