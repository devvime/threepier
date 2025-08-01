import { Vector3 } from "three";
import { Sky } from "three/examples/jsm/objects/Sky.js";

export default class DefaultSky extends Sky {
  scalar = 10000;
  turbidity = 10;
  rayleigh = 1.5;
  mieCoefficient = 0.009;
  mieDirectionalG = 0.8;
  sunPos = new Vector3(1, 2, 0);

  constructor() {
    super();
    this.scale.setScalar(this.scalar);
    this.material.uniforms["turbidity"].value = this.turbidity;
    this.material.uniforms["rayleigh"].value = this.rayleigh;
    this.material.uniforms["mieCoefficient"].value = this.mieCoefficient;
    this.material.uniforms["mieDirectionalG"].value = this.mieDirectionalG;
    this.setSunPos(this.sunPos);
  }

  setSunPos(value = new Vector3()) {
    this.sunPos.setFromSphericalCoords(value.x, Math.PI / value.y, value.z);
    this.material.uniforms["sunPosition"].value.copy(this.sunPos);
  }
}
