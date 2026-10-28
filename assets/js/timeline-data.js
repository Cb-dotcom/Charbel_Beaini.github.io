/* "The journey": a branch graph read top to bottom.
   The trunk is life. Every place I went branches off it (to the right or the left),
   and the projects I did there are the steps on that branch.

   Row types:
     life    – a point on the trunk (clicking it shows nothing)
     place   – a new branch. col = lane: +1 right of the trunk, -1 left, -2 further left.
     project – a step on its place's branch. id = a project id from projects-data.js (PROJECTS or NOW).
               live: true → still running (pulses)
   slot = vertical position on wide screens (0 at the top, halves allowed). Left and right branches can
          share the same height, so they run side by side.
   On phones the rows simply stack in the order written here, so keep each branch's steps together.

   places.<id>: color, cards (shown when the place itself is clicked),
                merge (branch rejoins its parent after its last step), from (parent place), next (future, dim). */
window.TIMELINE = {
  places: {
    lau:   { color: '#d58693', cards: ['wirely', 'qlaun', 'mpc', 'pad'] },
    ing:   { color: '#ffb340', cards: ['ingeniarius'], merge: true },
    unige: { color: '#64d2ff', cards: ['rwm', 'kit'] },
    kit:   { color: '#bf5af2', cards: ['kit'], from: 'unige', next: true }
  },
  demo: ['lau', 'ing', 'rwm'],          // the hint walks through these after the graph lights up, and stops on the last
  rows: [
    { type: 'life',    id: 'start',  slot: 0,   label: 'Start', sub: 'Beirut, Lebanon' },

    { type: 'place',   id: 'lau',    slot: 1,   col: 1, label: 'LAU', sub: 'Lebanese American University' },
    { type: 'project', id: 'pad',    slot: 2,   place: 'lau', label: 'Padvocates', sub: 'LAU VIP · 2023' },
    { type: 'project', id: 'wirely', slot: 3,   place: 'lau', label: 'WIRELY', sub: 'Final year project · published 2026' },
    { type: 'project', id: 'qlaun',  slot: 4,   place: 'lau', label: 'QLAUN', sub: 'Research · since 2024' },
    { type: 'project', id: 'mpc',    slot: 5,   place: 'lau', label: 'MPC + RL on QLAUN', sub: 'Research · ongoing', live: true },

    { type: 'place',   id: 'ing',    slot: 2.5, col: -1, label: 'Robotics internship', sub: 'Ingeniarius · Porto · Summer 2023' },
    { type: 'project', id: 'ingeniarius', slot: 3.5, place: 'ing', label: 'Solar robots, Mazebot & FEROX', sub: 'Jun → Sep 2023' },

    { type: 'place',   id: 'unige',  slot: 5.5, col: -1, label: 'UniGe', sub: 'MSc Robotics Engineering · Genoa' },
    { type: 'project', id: 'rwm',    slot: 6.5, place: 'unige', label: 'World Models on the Go2', sub: 'Research · now', live: true },

    { type: 'life',    id: 'now',    slot: 7.5, label: 'Now', sub: '' },
    { type: 'place',   id: 'kit',    slot: 8.5, col: -2, label: 'KIT', sub: 'Master’s thesis · Karlsruhe' }
  ]
};
