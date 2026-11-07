/** Site content in one place. */

export const NAME = 'Daniel Cosare';
export const ROLES = ['Robotics Engineer', 'Embedded Systems', 'Full Stack Dev'] as const;

export const NAV = [
  { id: 'home', label: 'Home', href: '#home' },
  { id: 'work', label: 'Work', href: '#work' },
  { id: 'about', label: 'About', href: '#about' },
  { id: 'contact', label: 'Contact', href: '#contact' },
] as const;

/** TODO: drop your résumé at public/daniel-cosare-resume.pdf — both Résumé buttons point at it. */
export const RESUME_URL = '/daniel-cosare-resume.pdf';

export const LINKS = {
  github: 'https://github.com/Stobeeney',
  // TODO: replace with your profile, e.g. https://www.linkedin.com/in/<your-handle>
  linkedin: 'https://www.linkedin.com/',
  email: 'mailto:reincosare07@gmail.com',
} as const;

/** Rows in the background pattern. */
export const PATTERN_ROWS = 12;
export const PATTERN_TEXT = `${NAME} · `.repeat(10);

/* ─────────────── Work ─────────────── */
export type Project = { num: string; type: string; title: string; mission: string; tech: string[]; loot: string[] };

export const PROJECTS: Project[] = [
  { num: '01', type: 'Competition Robot', title: 'Relief Goods Distributor', mission: 'Bluetooth-controlled robot that hands out relief goods without face-to-face contact during COVID-19, with a built-in hands-free alcohol dispenser.', tech: ['Bluetooth', 'Arduino', 'Auto Sensors'], loot: ['Top 3 — WRG Taiwan (Online)', "Top 1 & People's Choice — DOST Contest", 'Contactless dispenser module'] },
  { num: '02', type: 'Embedded / AI', title: 'ASL Translator (BLE Rev 2)', mission: 'Gesture-based ASL translator using flex sensors and an MPU6050 gyro for real-time letter recognition with tolerance-based matching.', tech: ['Arduino Nano BLE', 'Flex Sensors', 'MPU6050'], loot: ['Real-time letter recognition', 'Tolerance-based matching', 'Inertial + flex data fusion'] },
  { num: '03', type: 'Embedded / GUI', title: 'Python ASL Translator', mission: 'Python-based ASL translation system on an Arduino Mega with serial comms, a Tkinter GUI, and video playback output.', tech: ['Arduino Mega', 'Tkinter', 'Serial', 'Video'], loot: ['Large bold readable output', 'Video playback feedback', 'Reliable serial protocol'] },
  { num: '04', type: 'AI / Web', title: 'ASL Machine Learning Portal', mission: 'Advanced ASL translator combining supervised, semi-supervised and reinforcement learning with HMMs, served on a web dashboard.', tech: ['Flask', 'HMMs', 'Reinforcement Learning', 'Python'], loot: ['Multi-method ML pipeline', 'Hidden Markov Model filters', 'Responsive Flask portal'] },
  { num: '05', type: 'Computer Vision / IoT', title: 'Crab Detection System', mission: 'Crab detection and monitoring on a Raspberry Pi with computer vision and a SIM900 cellular module for SMS alerts.', tech: ['Raspberry Pi', 'SIM900 GSM', 'OpenCV', 'Python'], loot: ['Automated crab monitoring', 'SMS alerting', 'Edge CV processing'] },
  { num: '06', type: 'Assistive Tech', title: 'Smart Mobility Canes', mission: 'Smart canes with obstacle sensors and haptic feedback to help visually impaired users move around safely.', tech: ['Sensors', 'Haptics', 'Arduino', 'Fritzing'], loot: ['Obstacle distance warning', 'Tactile buzz alerts', 'Ergonomic sensor layout'] },
  { num: '07', type: 'Robotics / CV', title: 'Medical Waste Sorting Arm', mission: 'Computer vision classifies medical waste while a robotic arm car sorts and disposes of it automatically.', tech: ['Computer Vision', 'Robotic Arm', 'Motor Control', 'Arduino'], loot: ['Automated sorting', 'CV waste classification', 'Contactless disposal'] },
  { num: '08', type: 'Creative Tech', title: 'Desmos Math Art', mission: 'Intricate mathematical artwork built purely from equations and graphs for a freelance client.', tech: ['Desmos', 'Parametric Equations'], loot: ['Custom parametric curves', 'Clean coordinate bounds', 'High-precision graphing'] },
  { num: '09', type: 'Competition Robot', title: 'Sumobot Competitor', mission: 'Competition sumobot with motor control and sensor-based strategies to find opponents and push them out of the ring.', tech: ['Arduino', 'Custom PCB', 'Fusion 360'], loot: ['Ring boundary detection', 'Opponent tracking', 'High-torque drive'] },
  { num: '10', type: 'Control System', title: 'PID Line Tracer', mission: 'Line-tracing robot using PID control for fast, precise path following and sensor correction.', tech: ['PID', 'IR Sensor Array', 'Arduino', 'EasyEDA'], loot: ['Closed-loop feedback', 'Precise steering', 'Optimized lap times'] },
  { num: '11', type: 'IoT / Agriculture', title: 'IoT Pest Detection Car', mission: 'IoT robot car for automated crop pest detection and smart irrigation monitoring.', tech: ['ESP32', 'Sensors & Actuators', 'IoT Cloud'], loot: ['Automated pest alerts', 'Smart irrigation valves', 'Remote dashboard'] },
];

/* ─────────────── About ─────────────── */
export const ABOUT_STATEMENT =
  "I'm a Computer Engineering student who likes building intelligent robots and software that solves real problems. I combine electronics, firmware, mechanical design and AI into one working system — routing a PCB, tuning a PID loop, training a vision model or shipping a web app. Ideas don't stay on paper.";

export const SHEET: { k: string; v: string }[] = [
  { k: 'Age', v: '22' },
  { k: 'Class', v: 'Computer Engineer' },
  { k: 'Base', v: 'PUP Manila, PH' },
  { k: 'Languages', v: 'Filipino, English' },
  { k: 'Perks', v: 'Teamwork · Problem-solving · Adaptability · Time management' },
  { k: 'Status', v: 'Open for new projects' },
];

export const STATS = [
  { value: 38, label: 'Projects shipped' },
  { value: 15, label: 'Robots built' },
  { value: 20, label: 'PCBs designed' },
  { value: 2500, label: 'Hours coding' },
];

export const SKILLS: Record<string, [string, string, number][]> = {
  Robotics: [
    ['Sumobot', 'Custom PCB · Fusion 360', 98],
    ['PCB Design', 'KiCad · EasyEDA', 95],
    ['Arduino', 'Nano BLE · Mega', 95],
    ['Line Tracing', 'IR array · PID', 95],
    ['ROS2', 'Linux · Gazebo', 85],
  ],
  Code: [
    ['Python', 'OpenCV · Flask · NumPy', 95],
    ['C++', 'STL · ROS2 · Embedded', 93],
    ['C', 'Bare-metal · GCC', 90],
    ['Java', 'Spring · OOP · Gradle', 80],
    ['PHP', 'Laravel · MySQL', 78],
  ],
  Systems: [
    ['Embedded', 'Fritzing · Tinkercad', 94],
    ['IoT', 'ESP32 · SIM900 · MQTT', 92],
    ['Full Stack', 'Flask · HTML · CSS · JS', 82],
  ],
  'AI & Make': [
    ['3D Printing', 'Orca Slicer · Cura', 93],
    ['3D Modeling', 'Solid Edge · AutoCAD', 82],
    ['Machine Learning', 'NumPy · Pandas · HMMs', 80],
    ['Computer Vision', 'OpenCV · Raspberry Pi', 80],
  ],
};

export const TOOLS = ['Arduino IDE', 'VS Code', 'Git', 'Jupyter', 'Linux', 'Flask', 'KiCad', 'EasyEDA', 'Fritzing', 'Tinkercad', 'AutoCAD', 'Solid Edge', 'Orca Slicer', 'ROS2', 'MS Office'];

export type Job = { year: string; active: boolean; role: string; org: string; desc: string };
export const CAREER: Job[] = [
  { year: '2026', active: true, role: '3D Printing & Design Freelancer', org: 'Blink Technology and Robotics', desc: 'Designing and printing custom parts and chassis configurations.' },
  { year: '2026', active: true, role: 'Designer & 3D Printing Freelancer', org: 'Prodigitality', desc: 'Rapid prototyping, structural design, and slicing for production parts.' },
  { year: '2025', active: false, role: 'IoT Lead', org: 'GDG On Campus PUP Manila', desc: 'Organizing workshops and leading IoT student projects.' },
  { year: '2025', active: false, role: 'Associate Software Director', org: '', desc: 'Managing software development lifecycles, full stack integrations, and coding standards.' },
  { year: '2025', active: false, role: 'Part-time Electronics Specialist', org: 'Yuro Product Development and Design Solutions', desc: 'Designing schematics, debugging prototype PCBs, and laying out circuits.' },
  { year: '2024', active: false, role: 'IoT Lead', org: 'AWS Cloud Club PUP', desc: 'Teaching embedded systems, ESP32 MQTT integration, and cloud sensor pipelines.' },
  { year: '2023', active: false, role: 'Senior AI/ML Engineer', org: 'AWS Cloud Club PUP', desc: 'Model pipelines, data cleaning with Pandas, and computer vision training runs.' },
  { year: '2021', active: false, role: 'Robotics Vice Captain', org: 'Tagaytay Science Robotics', desc: 'Co-led robot design strategy, motor drive testing, and competition prep.' },
  { year: '2019', active: false, role: 'Philippine Robotics Team', org: 'World Robot Games', desc: 'Represented the country internationally — designing competition bots and tuning controllers.' },
];

/* ─────────────── Contact ─────────────── */
export const EMAIL = 'reincosare07@gmail.com';
export const SOCIALS = [
  { label: 'GitHub', handle: 'Stobeeney', url: LINKS.github },
  { label: 'LinkedIn', handle: 'Let’s connect', url: LINKS.linkedin },
  { label: 'Instagram', handle: '@rein_cosare', url: 'https://www.instagram.com/rein_cosare/' },
  { label: 'Facebook', handle: 'rein.cosare.7', url: 'https://www.facebook.com/rein.cosare.7/' },
];
