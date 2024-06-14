import CANNON from "cannon";
import * as THREE from "three";
import { Vector3 } from "three";
import { Ref } from "react";

type TObject = "sphere" | "plane";

export interface IBody extends CANNON.Body {
  customType?: TObject;
}

export interface IForwardedRef {
  updatePosition?: () => void;
}

export interface ISphereParameters {
  radius: number;
  mass: number;
  position: CANNON.Vec3 | Vector3;
  ref?: Ref<any>;
}

export interface IObjectProps {
  scene: THREE.Scene;
  world: CANNON.World;
  material: CANNON.Material;
  parameters: ISphereParameters;
}
