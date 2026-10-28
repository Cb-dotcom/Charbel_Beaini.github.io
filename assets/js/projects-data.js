/* Highlights: cards in "Get the highlights." and their detail views.
   Order here = order in the carousel. Edit text freely; layout comes from site.js + style.css.
   media.type: "image" | "video".  media.fit: "cover" (photos) | "contain" (diagrams on white).
   links.icon: Font Awesome class.  detail.gallery: extra figures shown in the detail view. */
window.PROJECTS = [
  {
    id: 'wirely',
    kind: 'publication',
    eyebrow: 'Next Materials 2026',
    title: 'WIRELY: An all-encompassing universal, scalable, corrective, digital twin for Additive Manufacturing systems',
    authors: [{ name: 'Charbel Beaini', me: true }, { name: 'Wajih-Georges El Tayar' }, { name: 'Kayssar Mikhael' }, { name: 'Noel Maalouf' }],
    short: 'A digital twin of the 3D printer that detects defects with a CNN in real time and corrects them in a closed loop, on both the physical and the virtual printer.',
    media: { type: 'image', src: 'images/wirely/overview.jpg', alt: 'From digital model, shadow and twin to WIRELY’s AI-based closed-loop control between the physical and digital printer', fit: 'contain' },
    links: [
      { label: 'Paper', icon: 'fa-regular fa-file-lines', href: 'https://doi.org/10.1016/j.nxmate.2026.102367' },
      { label: 'Code', icon: 'fa-brands fa-github', href: 'https://github.com/Wirely-Printer' },
      { label: 'Video', icon: 'fa-brands fa-youtube', href: 'https://youtu.be/UdZeJd_yxnM' },
      { label: 'In-depth video', icon: 'fa-solid fa-film', href: 'https://youtu.be/sFYz2P_4mUk' },
      { label: 'Poster', icon: 'fa-regular fa-image', href: 'https://drive.google.com/file/d/1cdYFXL2CWBvkQjMo9UiheKAws0iTdlxU/view?usp=sharing' }
    ],
    detail: {
      eyebrow: 'Next Materials 2026',
      meta: 'In Next Materials, vol. 12, 102367',
      hero: {
        interval: 7000,
        slides: [
          { src: 'images/wirely/twin-interface.jpg', caption: 'Digital twin interface: the Unity printer mirrors the physical one in real time.' },
          { src: 'images/wirely/correction-ui.jpg', caption: 'Automatic correction view: live sensor plots and dual camera feeds.' }
        ]
      },
      heading: 'Abstract',
      text: [
        'The practicality of material extrusion in Industry 4.0 has propelled it to grow fast as a way to enhance Fused Deposition Modeling (FDM) and Additive Manufacturing (AM) products. Recently, digitalization and Artificial Intelligence (AI) have been integrated into the FDM and AM 3D printing processes, boosting their efficiency and reducing both material and time loss. The main shortcomings of this digital and AI implementation lie in the (1) universality, (2) scalability, and (3) closed-loop integration of the overall systems. WIRELY targets all three issues through the development of a pioneering Digital Twin (DT) ecosystem, in an all-encompassing application. This novel architecture capitalizes on each of the listed aspects’ profile individually, ultimately combining them into a sweeping routine that elevates the AM 3D printed processes and products’ standards. WIRELY’s universality facet draws enhancements from a versatile Unity model, with a baseline implementation featuring one of the most accessible 3D printers today yet not limited to communicating with other 3D printers. The scalability facet bifurcates into a centralized gateway and multi-functional User Interface (UI) able to handle as many printers and features as desired. The closed-loop facet between the physical and virtual printers utilizes a trained Convolutional Neural Network (CNN) combined with a controller for automatic real-time defect detection and correction across both digital and physical systems. This allows for state mirroring and adaptive control decisions. This novel framework stands out as comprehensive and corrective by answering the need to develop a solution growing beyond traditional single-focus solutions.'
      ],
      points: [
        'Universal, scalable digital-twin framework spanning software, sensing, and actuation layers.',
        'Closed-loop corrective control with real-time defect detection integrated into the twin.',
        'Interoperability via middleware and G-code parsing for consistent physical/digital states.'
      ],
      figures: [
        { src: 'images/wirely/middleware.jpg', caption: 'WIRELY architecture: middleware integration and communication between the digital twin, the physical printer, automated correction and defect detection.' }
      ]
    }
  },
  {
    id: 'qlaun',
    kind: 'research',
    eyebrow: 'Undergraduate research · LAU',
    title: 'QLAUN: a modular, 3D printed research quadruped',
    short: 'A 12 DoF, fully 3D printed quadruped built to give labs in Lebanon and the MENA region an affordable, research grade robot.',
    media: { type: 'image', src: 'images/QLAUN.jpeg', alt: 'Render of QLAUN, a 3D printed 12 DoF quadruped robot', fit: 'cover' },
    links: [
      { label: 'Extended abstract', icon: 'fa-regular fa-file-lines', href: 'https://arxiv.org/abs/2609.03623' },
      { label: 'Code', icon: 'fa-brands fa-github', soon: true }
    ],
    detail: {
      eyebrow: 'Undergraduate research · 2024 to now',
      title: 'QLAUN: a modular, cost effective and agile research quadruped',
      meta: 'Lebanese American University',
      heading: 'Overview',
      text: [
        'QLAUN fills the gap in affordable, research grade quadrupeds in Lebanon and the MENA region. It is fully 3D printed with 12 degrees of freedom, designed for a payload to weight ratio above one, and modular: parts and legs swap out so researchers can customise and experiment with the design.',
        'We simulate it in ROS with RViz, Gazebo and the CHAMP framework, extracting torque and current data for battery sizing, state of charge estimation and energy optimization across gaits, and we are exploring Model Predictive Control and Reinforcement Learning for agile, adaptive locomotion.'
      ],
      points: [
        '12 DoF, each joint driven by a 3D printed quasi-direct-drive actuator with a belt transmission.',
        'Electronics-free, interchangeable legs and a compliant TPU foot.',
        'ROS, RViz, Gazebo and CHAMP simulation pipeline.'
      ],
      gallery: []
    }
  },
  {
    id: 'ingeniarius',
    kind: 'project',
    eyebrow: 'Robotics intern · Ingeniarius · Porto · Summer 2023',
    title: 'Autonomous robots for solar farms and wild food harvesting',
    short: 'Navigation and obstacle avoidance for an autonomous solar panel cleaning robot, a maze-solving robot, and drone communications and a ROS compass for the FEROX EU project.',
    media: { type: 'image', src: 'images/ingeniarius/solarcleano-rover.jpg', alt: 'SolarCleano cleaning robot driving across a row of solar panels', fit: 'cover', credit: 'Image: SolarCleano' },
    links: [
      { label: 'SolarCleano', icon: 'fa-solid fa-solar-panel', href: 'https://www.solarcleano.com/' },
      { label: 'FEROX', icon: 'fa-solid fa-globe', href: 'https://ferox.fbk.eu/' }
    ],
    detail: {
      eyebrow: 'Robotics intern · Ingeniarius · Jun to Sep 2023',
      title: 'Three autonomy problems in one summer',
      meta: 'Porto, Portugal',
      heading: 'Autonomous solar panel cleaning',
      text: ['I contributed to an autonomous robot that cleans solar panels, developing its navigation and obstacle avoidance modules so it could work across solar farms without an operator.'],
      points: ['Navigation for the autonomous cleaning robot.', 'Obstacle avoidance modules.', 'Built and tested on ROS.'],
      gallery: [],
      sections: [
        {
          label: 'Mazebot',
          title: 'An autonomous maze-solving robot',
          text: 'As part of a team, we developed an autonomous robot that solves complex mazes on its own: pathfinding, simulation, sensor fusion and firmware, built with Python, C++ and ROS.',
          img: 'images/hi.png'
        },
        {
          label: 'FEROX EU project',
          title: 'Connectivity for sustainable food harvesting',
          text: 'Within FEROX, which uses AI, data and drones to support people picking wild berries and mushrooms in Nordic forests, I did R&D on mesh Wi-Fi for drone communications and on LoRa/IoT links, supporting autonomy in remote areas.',
          note: 'On the same drones, I also implemented a ROS-based 3-axis geomagnetic compass, making the heading sensor more robust and better integrated into the stack.',
          img: 'images/ingeniarius/ferox.jpg', credit: 'Image: FEROX',
          link: { label: 'About FEROX', href: 'https://ferox.fbk.eu/' }
        }
      ]
    }
  },
  {
    id: 'pad',
    kind: 'project',
    eyebrow: 'Team leader · LAU Industrial Hub · 2023',
    title: 'Padvocates: a pad production line, designed from scratch',
    short: 'From a blank page to a working production line: a semi-automatic sanitary pad machine, designed and built for an NGO to fight period poverty in Lebanon.',
    media: { type: 'image', src: 'images/pad/padvocates-line.jpg', alt: 'Pad manufacturing line with control cabinet, material rolls and conveyor', fit: 'cover', credit: 'Image: LAU Industrial Hub' },
    links: [
      { label: 'Project', icon: 'fa-solid fa-industry', href: 'https://ih.lau.edu.lb/projects/padvocates-affordable-menstrual-care-manufacturing-unit' },
      { label: 'Article', icon: 'fa-regular fa-newspaper', href: 'https://news.lau.edu.lb/2023/vertically-integrated-projects-turn-heads-at-the-industry-academia-day.php' }
    ],
    detail: {
      eyebrow: 'LAU Industrial Hub · 2023',
      title: 'Padvocates: Affordable Menstrual Care Manufacturing Unit',
      meta: 'Team leader · with UN Women, ACTED and Australian Aid',
      heading: 'Overview',
      text: [
        'Period poverty rose sharply in Lebanon after the economic crisis, leaving many women and girls without safe, affordable menstrual care. The LAU Industrial Hub brought students, faculty and engineers together to design, automate and commission a complete pad manufacturing machine, built locally and benchmarked against international hygiene and quality standards.',
        'The line was deployed in Baalbeck with the NGO Nusaned, where it produces affordable hygienic pads for distribution across Lebanon.'
      ],
      points: [
        'Designed a fully functioning semi-automatic sanitary pad machine for an NGO in Lebanon.',
        'Led the team and contributed to every part of actuation, sensing and PLC programming.',
        'Took theory into a real industrial project with measurable social impact.'
      ],
      gallery: [
        { src: 'images/industry-academia-vip-2023-01.jpg', caption: 'Presenting the project at VIP+ Industry-Academia Day.' }
      ]
    }
  },
  {
    id: 'naboul',
    kind: 'heart',
    eyebrow: 'My first robot · 2022',
    title: 'Naboul: where robotics met magic & mentalism',
    short: 'The project that started it all. I combined robotics with magic & mentalism in a cardboard magician that listens, talks and performs three tricks on its own.',
    media: { type: 'image', src: 'images/naboul/naboul.jpg', alt: 'Naboul, a cardboard robot magician in a Santa hat, with sensors and servo wiring', fit: 'cover', position: '50% 12%' },
    links: [
      { label: 'Code', icon: 'fa-brands fa-github', href: 'https://github.com/Cb-dotcom/MSD1-Project-Magic-Robot' },
      { label: 'Watch a trick', icon: 'fa-brands fa-youtube', href: 'https://www.youtube.com/watch?v=bUpMKmXrISM' }
    ],
    detail: {
      eyebrow: 'My first robot · MSD1 · Nov to Dec 2022',
      title: 'Naboul, the magic robot',
      meta: 'Lebanese American University',
      heading: 'Where it started',
      text: [
        'Before quadrupeds and world models, there was Naboul. Magic & mentalism have been with me for years, and this was the first time I could combine them with robotics: a robot magician that listens, speaks and performs for an audience.',
        'We built him from scratch out of cardboard, wood and metal hinges, with speech recognition for the conversation and servos, a color sensor and a magnetic sensor hidden inside for the tricks.'
      ],
      points: [
        'Cap of the pencil: a quick sleight-of-hand trick with clever timing.',
        'Disappearing card: a servo under the table makes your chosen card vanish.',
        'Guess the card: color and magnetic sensors read your card.'
      ],
      watch: [
        { label: 'Cap of the pencil', href: 'https://www.youtube.com/shorts/MEe2J6TmTFI' },
        { label: 'Disappearing card', href: 'https://www.youtube.com/shorts/WZiCJ0c6ymg' },
        { label: 'Guess the card', href: 'https://www.youtube.com/watch?v=bUpMKmXrISM' }
      ],
      gallery: []
    }
  },
  {
    id: 'logic',
    kind: 'heart',
    eyebrow: 'Teaching assistant · Logic Design · LAU · Spring 2025',
    title: 'A logic-controlled board I designed for my students',
    short: 'As TA, I designed and wrote the semester project: a four-switch, four-lamp board that secretly rewires itself, built from an FSM, minimized logic and a 555 timer clock.',
    media: { type: 'image', src: 'images/logic/magic-switchboard.jpg', alt: 'The classic Magic Switchboard: a wooden board with four colored bulbs and four matching switches', fit: 'cover', position: '50% 35%' },
    links: [
      { label: 'Demo video', icon: 'fa-brands fa-youtube', href: 'https://youtu.be/wiJvar97xFE' },
      { label: 'Project manual', icon: 'fa-regular fa-file-pdf', href: 'docs/logic-design-lab-project.pdf' }
    ],
    detail: {
      eyebrow: 'Teaching assistant · Logic Design Lab · Spring 2025',
      media: { type: 'image', src: 'images/logic/board-demo.jpg', alt: 'My version: the logic-controlled board with four switches and four colored lamps', fit: 'cover' },
      title: 'The Logic-Controlled Board',
      meta: 'Semester project I designed and wrote as TA · Lebanese American University',
      heading: 'As a TA',
      text: [
        'I instructed students in designing, simulating and implementing digital logic circuits, and guided them in applying logic minimization and sequential logic techniques to solve practical engineering problems.',
        'To bring it all together I designed the semester project around a classic stage illusion, the Magic Switchboard, and had students rebuild it in pure digital logic. Four switches, four colored lamps: each switch looks wired to the lamp of its color, but the board quietly changes the mapping based on the last switch turned off, so the audience never catches the pattern. Remove a switch’s cap and it stops working; put it back and it comes alive again.'
      ],
      points: [
        'Students design an FSM with boot, locked, sequence detector, four sequences and a “capless switch” state.',
        'They minimize the logic, build a 555 timer clock, simulate in Quartus and solder a packaged final board.',
        'Bonus challenges: a scrolling “LOGIC” 7-segment display, a documented GitHub repo, and a new trick of their own.'
      ],
      figures: [
        { src: 'images/logic/fsm.jpg', caption: 'The state machine students design: boot, locked, sequence detector, four sequences and the capless switch state.' }
      ]
    }
  }
];

/* In progress: the single rotating card in the Bio section. Same fields as above, plus:
   status (label next to the dot), org + orgHref, soon ("in-progress" / "starting" shows the coming-soon treatment),
   media can be omitted for a typographic panel (panel: big text shown instead of an image). */
window.NOW = [
  {
    id: 'rwm',
    status: 'Now', soon: 'Coming soon',
    title: 'Robotic World Models on the Unitree Go2',
    org: 'TheEngineRoom, UniGe', orgHref: 'https://theengineroom.dibris.unige.it/',
    text: 'Reproducing and extending ETH Zurich’s Robotic World Model and its uncertainty-aware variant (Li, Krause & Hutter) on the Go2 in Isaac Lab, to learn whether a world model can see a fall coming before it happens.',
    media: { type: 'image', src: 'images/rwm/go2-isaaclab.jpg', alt: 'Unitree Go2 quadruped in NVIDIA Isaac Lab', credit: 'Image: Isaac Lab (BSD-3-Clause)' },
    links: [
      { label: 'RWM', icon: 'fa-regular fa-file-lines', href: 'https://arxiv.org/abs/2501.10100' },
      { label: 'RWM-U', icon: 'fa-regular fa-file-lines', href: 'https://arxiv.org/abs/2504.16680' }
    ]
  },
  {
    id: 'kit',
    status: 'Next', soon: 'Starting soon',
    title: 'Master’s thesis: world models & RL',
    org: 'MaiRo Lab, KIT', orgHref: 'https://www.imi.kit.edu/english/4418.php',
    text: 'Master’s thesis on world models and reinforcement learning at the Machine Intelligence and Robotics Lab, Karlsruhe Institute of Technology.',
    panel: { big: 'KIT', small: 'Machine Intelligence and Robotics Lab' },
    links: []
  },
  {
    id: 'mpc',
    status: 'Ongoing',
    title: 'MPC + RL for agile legged locomotion',
    org: 'LAU School of Engineering', orgHref: 'https://soe.lau.edu.lb/',
    text: 'Exploring Model Predictive Control and Reinforcement Learning for agile, energy-efficient legged locomotion on QLAUN.',
    media: { type: 'image', src: 'images/QLAUN.jpeg', alt: 'Render of the QLAUN quadruped' },
    links: []
  }
];
