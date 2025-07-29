export const keys = {};

export function setKeys() {
  window.addEventListener("keydown", (event) => {
    keys[event.key.toLowerCase()] = true;
  });
  window.addEventListener("keyup", (event) => {
    keys[event.key.toLowerCase()] = false;
  });
}
