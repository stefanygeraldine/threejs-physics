import CANNON from "cannon";

type TObject = 'sphere' | 'plane'

export interface IBody extends CANNON.Body{
    customType?: TObject
}
