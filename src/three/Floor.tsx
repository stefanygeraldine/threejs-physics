import { forwardRef, useEffect, useImperativeHandle } from "react";
import * as THREE from "three";
import CANNON from "cannon";
import { IObjectProps } from "../types.ts";
import { LineSegmentsGeometry } from "three/examples/jsm/lines/LineSegmentsGeometry";
import { LineMaterial } from "three/examples/jsm/lines/LineMaterial";
import { LineSegments2 } from "three/examples/jsm/lines/LineSegments2";

const Floor = forwardRef((props: IObjectProps, ref) => {
  const { scene, world, material } = props;

  let mesh: THREE.Mesh;
  let lines: THREE.LineSegments;
  let floorBody: CANNON.Body;

  const generateGeometry = (): void => {
    //const geometry = new THREE.PlaneGeometry(10, 10);
    const geometry = new THREE.CircleGeometry(5, 12);
    const material = new THREE.MeshBasicMaterial({
      color: 0x439968,
      side: THREE.DoubleSide,
    });
    mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.x = -Math.PI * 0.5;
    scene.add(mesh);

    const wireframe = new THREE.WireframeGeometry(geometry);
    const lineGeometry = new LineSegmentsGeometry().fromEdgesGeometry(
      wireframe,
    );

    // Create LineMaterial
    const lineMaterial = new LineMaterial({
      color: 0x000000,
      linewidth: 3, // Adjust the line width here
      resolution: new THREE.Vector2(window.innerWidth, window.innerHeight),
    });

    // Create LineSegments2
    lines = new LineSegments2(lineGeometry, lineMaterial);
    lines.rotation.x = -Math.PI * 0.5;
    scene.add(lines);
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

  const rotationAnimate = (sineValue) => {
    console.log(mesh);
    if (mesh && lines) {
      mesh.rotation.z = sineValue;
      lines.rotation.z = sineValue;
    }
  };

  useImperativeHandle(ref, () => ({
    rotationAnimate: (sineValue) => rotationAnimate(sineValue),
  }));

  useEffect(() => {
    generateGeometry();
    generatePhysics();
  }, []);

  return <></>;
});

export default Floor;
