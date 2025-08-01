import { AnimationMixer } from "three";

export class Animator {
  /**
   * @param {THREE.Object3D} model - 3D model loaded
   * @param {THREE.AnimationClip[]} clips - Loaded animations
   */
  constructor(model, clips) {
    this.mixer = new AnimationMixer(model);
    this.clips = clips;
    this.actions = {};
    this.current = null;

    // Preload all animations by name
    for (const clip of clips) {
      this.actions[clip.name] = this.mixer.clipAction(clip);
    }
  }

  /**
   * Play an animation by name with smooth crossfade
   * @param {string} name - Animation name (ex: "Idle", "Run")
   * @param {number} duration - Crossfade duration (in seconds)
   */
  play(name, duration = 0.3) {
    const nextAction = this.actions[name];
    if (!nextAction) {
      console.warn(`Animação "${name}" não encontrada.`);
      return;
    }

    if (this.current === nextAction) return;

    nextAction.reset().fadeIn(duration).play();

    if (this.current) {
      this.current.fadeOut(duration);
    }

    this.current = nextAction;
  }

  /**
   * Updates the mixer in the main loop
   * @param {number} delta
   */
  update(delta) {
    this.mixer.update(delta);
  }
}
