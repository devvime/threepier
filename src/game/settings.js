export default {
  debug: true,
  world: {
    timestep: 1 / 60,
    iterations: 8,
    broadphase: 2, // 1 brute force, 2 sweep and prune, 3 volume tree
    worldscale: 1, // scale full world
    random: true, // randomize sample
    info: false, // calculate statistic or not
    gravity: [0, -9.8, 0],
  },
};
