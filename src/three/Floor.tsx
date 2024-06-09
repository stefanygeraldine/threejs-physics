import { useEffect } from "react";
import * as THREE from "three";
import { type IInitialParameters } from "./Scene.tsx";

interface IProps {
  scene: THREE.Scene;
  initialParameters: IInitialParameters;
}


function Floor(props: IProps) {
  const { scene } = props;


  let mesh: THREE.Mesh;
  const generateGeometry = (): void => {
    const geometry = new THREE.PlaneGeometry( 3, 3 );
    const material= new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );

    mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.x = Math.PI / 1.5;
    scene.add(mesh);
  };

  useEffect(() => {
    generateGeometry();
  }, []);

  return <></>;
}

export default Floor;
