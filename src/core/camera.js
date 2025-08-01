import { PerspectiveCamera } from "three";

export class MainCamera extends PerspectiveCamera {
  constructor() {
    super(75, innerWidth / innerHeight, 0.1, 1000);
    this.position.set(0, 4, 8);
    this.lookAt(0, 0, 0);
  }
}
