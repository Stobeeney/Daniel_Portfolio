<?php
$projects = [
    [
        'id' => 'proj-relief',
        'num' => '01',
        'type' => 'COMPETITION ROBOT',
        'icon' => 'WRG',
        'icon_class' => 'proj-ico-yellow',
        'title' => 'RELIEF goods DISTRIBUTOR',
        'mission' => 'Design a Bluetooth-controlled robot to distribute relief goods safely without face-to-face contact during COVID-19, integrating an automatic hand-free alcohol dispenser.',
        'roles' => ['Robotics Designer', 'Lead Engineer'],
        'tech' => ['Bluetooth', 'Arduino', 'Automatic Sensors'],
        'highlights' => ['Top 3 - WRG Taiwan (Online)', "Top 1 & People's Choice - DOST Contest", 'Integrated contactless dispenser']
    ],
    [
        'id' => 'proj-asl-ble',
        'num' => '02',
        'type' => 'EMBEDDED SYSTEM / AI',
        'icon' => 'EMB',
        'icon_class' => 'proj-ico-red',
        'title' => 'ASL TRANSLATOR (BLE REV 2)',
        'mission' => 'Build a gesture-based ASL translator using flex sensors and MPU6050 gyro, enabling real-time letter recognition (e.g. A and B) with tolerance-based matching.',
        'roles' => ['Firmware Developer', 'Hardware Designer'],
        'tech' => ['Arduino Nano BLE Rev 2', 'Flex Sensors', 'MPU6050 Gyro'],
        'highlights' => ['Real-time letter recognition', 'Tolerance-based matching', 'Inertial + Flex data fusion']
    ],
    [
        'id' => 'proj-asl-mega',
        'num' => '03',
        'type' => 'EMBEDDED / GUI',
        'icon' => 'GUI',
        'icon_class' => 'proj-ico-blue',
        'title' => 'PYTHON-BASED ASL TRANSLATOR',
        'mission' => 'Construct a Python-based ASL translation system with Arduino Mega, serial communications, Tkinter for GUI, and video playback representation.',
        'roles' => ['Python Developer', 'GUI Designer'],
        'tech' => ['Arduino Mega', 'Tkinter GUI', 'Serial Communication', 'Video Playback'],
        'highlights' => ['Larger bold font outputs', 'Video playback feedback', 'Reliable serial data protocol']
    ],
    [
        'id' => 'proj-asl-flask',
        'num' => '04',
        'type' => 'AI / WEB SYSTEM',
        'icon' => 'AI',
        'icon_class' => 'proj-ico-yellow',
        'title' => 'ASL MACHINE LEARNING PORTAL',
        'mission' => 'Create an advanced ASL translator leveraging supervised, semi-supervised, reinforcement learning, and HMMs, deployed on a web dashboard.',
        'roles' => ['ML Engineer', 'Backend Developer'],
        'tech' => ['Flask', 'HMMs', 'Reinforcement Learning', 'Python'],
        'highlights' => ['Multi-method ML pipeline', 'Hidden Markov Model filters', 'Responsive Flask portal']
    ],
    [
        'id' => 'proj-crab',
        'num' => '05',
        'type' => 'COMPUTER VISION / IOT',
        'icon' => 'CV',
        'icon_class' => 'proj-ico-green',
        'title' => 'CRAB DETECTION SYSTEM',
        'mission' => 'Engineered a crab detection and monitoring system using Raspberry Pi, computer vision, and SIM900 cellular modules for environmental alerts.',
        'roles' => ['CV Engineer', 'IoT Developer'],
        'tech' => ['Raspberry Pi', 'SIM900 GSM', 'OpenCV', 'Python'],
        'highlights' => ['Automated crab monitoring', 'SMS alert communication', 'Edge CV processing']
    ],
    [
        'id' => 'proj-mobility',
        'num' => '06',
        'type' => 'ASSISTIVE TECHNOLOGY',
        'icon' => 'IoT',
        'icon_class' => 'proj-ico-blue',
        'title' => 'SMART MOBILITY CANES',
        'mission' => 'Design smart mobility canes equipped with environmental obstacle sensors and haptic feedback mechanisms to assist visually impaired individuals.',
        'roles' => ['Electronics Designer', 'Firmware Developer'],
        'tech' => ['Sensors', 'Haptic feedback', 'Arduino', 'Fritzing'],
        'highlights' => ['Obstacle distance warning', 'Tactile haptic buzz alerts', 'Ergonomic sensor layouts']
    ],
    [
        'id' => 'proj-waste',
        'num' => '07',
        'type' => 'ROBOTICS / CV',
        'icon' => 'BOT',
        'icon_class' => 'proj-ico-red',
        'title' => 'MEDICAL WASTE SORTING ARM',
        'mission' => 'Develop a medical waste management system using computer vision to classify waste types and an automatic robotic arm car for sorting and disposal.',
        'roles' => ['Robotics Programmer', 'CV Specialist'],
        'tech' => ['Computer Vision', 'Robotic Arm', 'Motor Control', 'Arduino'],
        'highlights' => ['Automated waste sorting', 'CV waste classification', 'Contactless disposal system']
    ],
    [
        'id' => 'proj-desmos',
        'num' => '08',
        'type' => 'CREATIVE TECH',
        'icon' => 'CAD',
        'icon_class' => 'proj-ico-yellow',
        'title' => 'DESMOS MATHEMATICAL ART',
        'mission' => 'Create highly intricate mathematical art combining equations and graphs to deliver custom graphical designs for a freelance client.',
        'roles' => ['Mathematical Artist', 'Freelance Designer'],
        'tech' => ['Desmos Engine', 'Equations', 'Graphing'],
        'highlights' => ['Custom parametric curves', 'Clean coordinate boundaries', 'High precision graphing']
    ],
    [
        'id' => 'proj-sumobot-card',
        'num' => '09',
        'type' => 'COMPETITION ROBOT',
        'icon' => 'BOT',
        'icon_class' => 'proj-ico-red',
        'title' => 'SUMOBOT COMPETITOR',
        'mission' => 'Build a Sumobot for competitive robotics implementing motor control and sensor-based strategies to detect and push opponents out of the ring.',
        'roles' => ['Mechanical Designer', 'Embedded Developer'],
        'tech' => ['Arduino', 'Custom PCB', 'Fusion 360'],
        'highlights' => ['Ring boundary detection', 'Opponent tracking algorithms', 'High-torque motor drives']
    ],
    [
        'id' => 'proj-line-pid',
        'num' => '10',
        'type' => 'CONTROL SYSTEM',
        'icon' => 'LFR',
        'icon_class' => 'proj-ico-green',
        'title' => 'PID LINE TRACING ROBOT',
        'mission' => 'Construct a line-tracing robot utilizing PID control algorithms for high-speed precise path navigation and sensor correction.',
        'roles' => ['Control Programmer', 'PCB Designer'],
        'tech' => ['PID Control', 'IR Sensors array', 'Arduino', 'EasyEDA'],
        'highlights' => ['Closed-loop error feedback', 'Precise steering control', 'Optimized lap speeds']
    ],
    [
        'id' => 'proj-pest',
        'num' => '11',
        'type' => 'IOT / AGRICULTURE',
        'icon' => 'IoT',
        'icon_class' => 'proj-ico-blue',
        'title' => 'IOT PEST DETECTION CAR',
        'mission' => 'Design and build an IoT-based agricultural robot car for automated crop pest detection and smart irrigation monitoring.',
        'roles' => ['IoT Architect', 'Hardware Designer'],
        'tech' => ['Sensors & Actuators', 'ESP32', 'IoT Cloud'],
        'highlights' => ['Automated pest alerts', 'Smart irrigation valves', 'Remote agricultural dashboard']
    ]
];

$timeline = [
    [
        'id' => 'tl-blink',
        'year' => '2026',
        'side' => 'left',
        'active' => true,
        'icon' => 'NOW',
        'icon_class' => 'tl-ico-y',
        'title' => '3D PRINTING & DESIGN FREELANCER',
        'desc' => 'Blink Technology and Robotics — Designing and printing custom parts and chassis configurations.',
        'xp' => '● ACTIVE MISSION'
    ],
    [
        'id' => 'tl-prodigitality',
        'year' => '2026',
        'side' => 'right',
        'active' => true,
        'icon' => 'NOW',
        'icon_class' => 'tl-ico-y',
        'title' => 'DESIGNER & 3D PRINTING FREELANCER',
        'desc' => 'Prodigitality — Rapid prototyping, structural designs, and components slicing modeling.',
        'xp' => '● ACTIVE MISSION'
    ],
    [
        'id' => 'tl-gdgpup',
        'year' => '2025',
        'side' => 'left',
        'active' => false,
        'icon' => 'IoT',
        'icon_class' => 'tl-ico-b',
        'title' => 'GDG ON CAMPUS IoT LEAD',
        'desc' => 'Google Developers Group On Campus PUP Manila Technology Department — Organizing workshops and leading IoT student projects.',
        'xp' => '+1200 XP EARNED'
    ],
    [
        'id' => 'tl-dirsoft',
        'year' => '2025',
        'side' => 'right',
        'active' => false,
        'icon' => 'DIR',
        'icon_class' => 'tl-ico-g',
        'title' => 'ASSOCIATE SOFTWARE DIRECTOR',
        'desc' => 'Managing software system development lifecycles, full stack integrations, and coding standards.',
        'xp' => '+1000 XP EARNED'
    ],
    [
        'id' => 'tl-yuro',
        'year' => '2025',
        'side' => 'left',
        'active' => false,
        'icon' => 'HW',
        'icon_class' => 'tl-ico-r',
        'title' => 'PART-TIME ELECTRONICS SPECIALIST',
        'desc' => 'Yuro Product Development and Design Solutions — Designing schematics, debugging prototype PCBs, and circuit layouts.',
        'xp' => '+950 XP EARNED'
    ],
    [
        'id' => 'tl-awscc-iot',
        'year' => '2024',
        'side' => 'right',
        'active' => false,
        'icon' => 'IoT',
        'icon_class' => 'tl-ico-b',
        'title' => 'AWSCC IoT LEAD',
        'desc' => 'AWS Cloud Club PUP Department of IoT — Teaching embedded systems, ESP32 MQTT integration, and cloud sensor pipelines.',
        'xp' => '+1100 XP EARNED'
    ],
    [
        'id' => 'tl-awscc-ml',
        'year' => '2023',
        'side' => 'left',
        'active' => false,
        'icon' => 'AI',
        'icon_class' => 'tl-ico-y',
        'title' => 'SENIOR AI/ML ENGINEER',
        'desc' => 'AWS Cloud Club PUP Department of ML/AI — Implementing model pipelines, data cleaning with Pandas, and computer vision training runs.',
        'xp' => '+1000 XP EARNED'
    ],
    [
        'id' => 'tl-tagaytay',
        'year' => '2021',
        'side' => 'right',
        'active' => false,
        'icon' => 'BOT',
        'icon_class' => 'tl-ico-r',
        'title' => 'ROBOTICS VICE CAPTAIN',
        'desc' => 'Tagaytay Science Robotics — Co-directed robot projects design strategy, motor drive testing, and competition team preparations.',
        'xp' => '+900 XP EARNED'
    ],
    [
        'id' => 'tl-philrobotics',
        'year' => '2019',
        'side' => 'left',
        'active' => false,
        'icon' => 'TEAM',
        'icon_class' => 'tl-ico-g',
        'title' => 'PHILIPPINE ROBOTICS TEAM',
        'desc' => 'Representing the country in international robotics events (WRG), designing competition bots, and tuning controllers.',
        'xp' => '+1500 XP EARNED'
    ]
];
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Daniel Rein Cosare — Tech Explorer Magazine</title>
  <meta name="description" content="Portfolio of Daniel Rein Cosare — Robotics Engineer, Full Stack Developer & AI Enthusiast. Special Robotics Edition of Tech Explorer Magazine." />
  <meta property="og:title" content="Daniel Rein Cosare — Tech Explorer Magazine" />
  <meta property="og:description" content="Robotics Engineer · Full Stack Developer · AI Enthusiast" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Bangers&family=Anton&family=Orbitron:wght@400;700;900&family=Poppins:wght@300;400;500;600;700&family=Outfit:wght@300;400;600;700&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="style.css" />
</head>
<body>

  <!-- ═══════════════════════════════════ NAV ═══════════════════════════════════ -->
  <nav class="mag-nav" id="main-nav" aria-label="Magazine navigation">
    <div class="nav-logo">
      <span class="nav-logo-text">Re<span class="nav-logo-accent">[i]</span>gn</span>
    </div>
    <ul class="nav-tabs" role="list">
      <li><a href="#cover"      class="nav-tab active" id="nav-cover"      aria-label="Cover page">COVER</a></li>
      <li><a href="#about"      class="nav-tab"        id="nav-about"      aria-label="Feature story">FEATURE</a></li>
      <li><a href="#skills"     class="nav-tab"        id="nav-skills"     aria-label="Tech Lab">LAB</a></li>
      <li><a href="#projects"   class="nav-tab"        id="nav-projects"   aria-label="Projects">PROJECTS</a></li>
      <li><a href="#experience" class="nav-tab"        id="nav-experience" aria-label="Career">CAREER</a></li>
      <li><a href="#contact"    class="nav-tab"        id="nav-contact"    aria-label="Contact">CONTACT</a></li>
    </ul>
    <div class="nav-issue">ISSUE #1 · 2026</div>
  </nav>

  <!-- ════════════════════════════════ SECTION 1: COVER ════════════════════════════════ -->
  <section class="section section-cover" id="cover" aria-label="Magazine cover">
    <canvas id="pcb-canvas" aria-hidden="true"></canvas>

    <div class="cover-stickers" aria-hidden="true">
      <span class="sticker sticker-new">NEW!</span>
      <span class="sticker sticker-featured">FEATURED</span>
      <span class="sticker sticker-level">LEVEL UP</span>
      <span class="sticker sticker-ai">AI</span>
      <span class="sticker sticker-robotics">ROBOTICS</span>
      <span class="sticker sticker-projects">PROJECTS</span>
      <span class="sticker sticker-hands">100% HANDS-ON</span>
    </div>

    <div class="cover-content">
      <div class="cover-masthead">
        <div class="masthead-bar" aria-hidden="true"></div>
        <h1 class="masthead-title">DANIEL REIN M. COSARE</h1>
        <div class="masthead-sub">ISSUE NO. 1 • 2026</div>
        <div class="masthead-bar" aria-hidden="true"></div>
      </div>

      <div class="cover-hero">
        <div class="cover-hero-text">
          <div class="cover-roles">
            <span class="cover-role">Robotics Engineer</span>
            <span class="cover-role">Full Stack Developer</span>
            <span class="cover-role">AI Enthusiast</span>
          </div>
          <a href="#about" class="cover-cta" id="cover-cta-btn" aria-label="Read my portfolio">
            <span>READ MY PORTFOLIO</span>
          </a>
          <div class="cover-headlines">
            <div class="headline-item"><span class="headline-star">★</span> PCB Design</div>
            <div class="headline-item"><span class="headline-star">★</span> Robotics</div>
            <div class="headline-item"><span class="headline-star">★</span> AI</div>
            <div class="headline-item"><span class="headline-star">★</span> IoT</div>
            <div class="headline-item"><span class="headline-star">★</span> Software Development</div>
          </div>
        </div>

        <div class="cover-hero-visual">
          <div class="hero-photo-wrap">
            <img src="pics/me.jpg" alt="Daniel Rein Cosare" class="hero-photo" id="cover-photo" style="border-radius: var(--radius-lg);" />
            <div class="hero-photo-badge">CpE STUDENT</div>
            <div class="speech-bubble cover-bubble" aria-label="Speech bubble">
              "Building the future, one robot at a time!"
            </div>
          </div>
        </div>
      </div>

      <div class="cover-scroll-hint" aria-label="Scroll to read more">
        <div class="scroll-text">SCROLL TO START</div>
        <div class="scroll-arrow">↓</div>
      </div>
    </div>

    <!-- Floating particles -->
    <div class="floating-particles" id="particles-cover" aria-hidden="true"></div>
  </section>

  <!-- ═══════════════════════════════ SECTION 2: ABOUT ═══════════════════════════════ -->
  <section class="section section-about" id="about" aria-label="About me feature story">
    <div class="section-label-tape" aria-hidden="true">FEATURE STORY</div>

    <div class="about-layout">
      <div class="about-article">
        <div class="article-header">
          <div class="article-issue-tag">ISSUE #1 EXCLUSIVE</div>
          <h2 class="article-title">Meet <span class="accent-yellow">Daniel Rein</span><br/>Cosare</h2>
          <div class="article-byline">WORDS BY THE ENGINEER HIMSELF</div>
          <div class="article-divider" aria-hidden="true"></div>
        </div>

        <div class="article-body">
          <p class="drop-cap">I'm a Computer Engineering student passionate about building intelligent robotic systems and creating software that solves real-world problems.</p>
          <p>I enjoy combining <strong>electronics</strong>, <strong>programming</strong>, <strong>mechanical design</strong>, and <strong>AI</strong> into one complete system. Whether it's designing PCBs, developing embedded software, building autonomous robots, or creating full stack applications — I love bringing ideas into reality.</p>

          <div class="about-interests">
            <h3 class="interests-title">CURRENT INTERESTS</h3>
            <div class="interests-grid">
              <div class="interest-chip">Robotics</div>
              <div class="interest-chip">Artificial Intelligence</div>
              <div class="interest-chip">Embedded Systems</div>
              <div class="interest-chip">PCB Design</div>
              <div class="interest-chip">Computer Vision</div>
              <div class="interest-chip">IoT</div>
              <div class="interest-chip">Full Stack Dev</div>
            </div>
          </div>

          <!-- Fun Stats Bar -->
          <div class="fun-stats-inline">
            <div class="stat-inline"><span class="stat-num" data-target="38">0</span><span class="stat-lbl">PROJECTS</span></div>
            <div class="stat-inline"><span class="stat-num" data-target="2500">0</span><span class="stat-lbl">HOURS CODING</span></div>
            <div class="stat-inline"><span class="stat-num" data-target="15">0</span><span class="stat-lbl">ROBOTS BUILT</span></div>
            <div class="stat-inline"><span class="stat-num" data-target="20">0</span><span class="stat-lbl">PCBs DESIGNED</span></div>
          </div>
        </div>
      </div>

      <div class="about-photo-col">
        <div class="about-photo-frame">
          <div class="photo-caption-top">ENGINEER · DEVELOPER · CREATOR</div>
          <div class="about-photo-inner">
            <img src="pics/me.jpg" alt="Daniel Rein Cosare — Profile photo" class="about-photo" />
          </div>
          <div class="speech-bubble about-bubble">
            Let's build something awesome!
          </div>
        </div>

        <div class="profile-card">
          <div class="profile-card-header">PLAYER PROFILE</div>
          <div class="profile-stat-row"><span>LEVEL</span><span class="profile-stat-val orbitron">22</span></div>
          <div class="profile-stat-row"><span>CLASS</span><span class="profile-stat-val">Computer Engineering</span></div>
          <div class="profile-stat-row"><span>CAMPUS</span><span class="profile-stat-val">PUP Manila</span></div>
          <div class="profile-stat-row"><span>LANGUAGES</span><span class="profile-stat-val">Filipino, English</span></div>
          <div class="profile-stat-row"><span>SOFT SKILLS</span><span class="profile-stat-val">Teamwork, Problem-Solving, Adaptability, Time Management</span></div>
          <div class="profile-stat-row"><span>COFFEE</span><span class="profile-stat-val">∞</span></div>
        </div>
      </div>
    </div>
  </section>

  <!-- ═══════════════════════════════ SECTION 3: SKILLS ═══════════════════════════════ -->
  <section class="section section-skills" id="skills" aria-label="Skills Tech Lab">
    <div class="section-label-tape accent-blue" aria-hidden="true">TECH LAB</div>
    <div class="section-inner">
      <div class="section-header-block">
        <h2 class="section-title">SKILL<span class="accent-yellow">CARDS</span></h2>
        <p class="section-sub">Collect them all — Trade 'em with your team!</p>
      </div>

      <div class="skills-categories">

        <!-- Robotics -->
        <div class="skill-category" id="skill-cat-robotics">
          <div class="skill-cat-header">
            <span class="skill-cat-icon cat-icon-robotics">BOT</span>
            <h3 class="skill-cat-title">ROBOTICS</h3>
          </div>
          <div class="skill-cards-row">
            <div class="skill-card" tabindex="0" aria-label="PCB Design - Expert">
              <div class="skill-card-front">
                <div class="skill-card-rarity EXPERT">EXPERT</div>
                <div class="skill-card-icon skill-ico">PCB</div>
                <div class="skill-card-name">PCB Design</div>
                <div class="skill-card-stars">★★★★★</div>
                <div class="skill-card-xp">95 XP</div>
              </div>
              <div class="skill-card-back">
                <div class="skill-card-back-title">PCB DESIGN</div>
                <div class="skill-card-back-tools">KiCad · EasyEDA</div>
                <div class="skill-card-back-desc">Schematic design, layout routing, custom PCB making and hardware integration.</div>
                <div class="skill-card-back-level">EXPERT</div>
              </div>
            </div>
            <div class="skill-card" tabindex="0" aria-label="Arduino - Expert">
              <div class="skill-card-front">
                <div class="skill-card-rarity EXPERT">EXPERT</div>
                <div class="skill-card-icon skill-ico">ARD</div>
                <div class="skill-card-name">Arduino</div>
                <div class="skill-card-stars">★★★★★</div>
                <div class="skill-card-xp">95 XP</div>
              </div>
              <div class="skill-card-back">
                <div class="skill-card-back-title">ARDUINO</div>
                <div class="skill-card-back-tools">Arduino Nano BLE · Mega</div>
                <div class="skill-card-back-desc">Firmware design, sensor integrations, motor control loops, serial communications.</div>
                <div class="skill-card-back-level">EXPERT</div>
              </div>
            </div>
            <div class="skill-card" tabindex="0" aria-label="ROS2 - Advanced">
              <div class="skill-card-front">
                <div class="skill-card-rarity ADVANCED">ADVANCED</div>
                <div class="skill-card-icon skill-ico">ROS</div>
                <div class="skill-card-name">ROS2</div>
                <div class="skill-card-stars">★★★★☆</div>
                <div class="skill-card-xp">85 XP</div>
              </div>
              <div class="skill-card-back">
                <div class="skill-card-back-title">ROS2</div>
                <div class="skill-card-back-tools">ROS2 · Linux · Gazebo</div>
                <div class="skill-card-back-desc">Robot Operating System 2 nodes, communication publishers/subscribers, SLAM navigation.</div>
                <div class="skill-card-back-level">ADVANCED</div>
              </div>
            </div>
            <div class="skill-card" tabindex="0" aria-label="Sumobot - Expert">
              <div class="skill-card-front">
                <div class="skill-card-rarity EXPERT">EXPERT</div>
                <div class="skill-card-icon skill-ico">SUM</div>
                <div class="skill-card-name">Sumobot</div>
                <div class="skill-card-stars">★★★★★</div>
                <div class="skill-card-xp">98 XP</div>
              </div>
              <div class="skill-card-back">
                <div class="skill-card-back-title">SUMOBOT</div>
                <div class="skill-card-back-tools">Custom PCB · Fusion360</div>
                <div class="skill-card-back-desc">Competition robot chassis design, strategy algorithms, physical optimizations.</div>
                <div class="skill-card-back-level">EXPERT</div>
              </div>
            </div>
            <div class="skill-card" tabindex="0" aria-label="Line Tracing - Expert">
              <div class="skill-card-front">
                <div class="skill-card-rarity EXPERT">EXPERT</div>
                <div class="skill-card-icon skill-ico">LFR</div>
                <div class="skill-card-name">Line Tracing</div>
                <div class="skill-card-stars">★★★★★</div>
                <div class="skill-card-xp">95 XP</div>
              </div>
              <div class="skill-card-back">
                <div class="skill-card-back-title">LINE TRACING</div>
                <div class="skill-card-back-tools">IR Sensor Array · PID</div>
                <div class="skill-card-back-desc">PID-controlled high speed tracing, feedback loops, steering algorithm optimization.</div>
                <div class="skill-card-back-level">EXPERT</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Programming -->
        <div class="skill-category" id="skill-cat-programming">
          <div class="skill-cat-header">
            <span class="skill-cat-icon cat-icon-prog">CODE</span>
            <h3 class="skill-cat-title">PROGRAMMING</h3>
          </div>
          <div class="skill-cards-row">
            <div class="skill-card" tabindex="0" aria-label="Python - Expert">
              <div class="skill-card-front">
                <div class="skill-card-rarity EXPERT">EXPERT</div>
                <div class="skill-card-icon skill-ico">PY</div>
                <div class="skill-card-name">Python</div>
                <div class="skill-card-stars">★★★★★</div>
                <div class="skill-card-xp">95 XP</div>
              </div>
              <div class="skill-card-back">
                <div class="skill-card-back-title">PYTHON</div>
                <div class="skill-card-back-tools">OpenCV · Flask · NumPy</div>
                <div class="skill-card-back-desc">Data processing with Pandas/NumPy, OpenCV logic, backend Flask development.</div>
                <div class="skill-card-back-level">EXPERT</div>
              </div>
            </div>
            <div class="skill-card" tabindex="0" aria-label="C++ - Expert">
              <div class="skill-card-front">
                <div class="skill-card-rarity EXPERT">EXPERT</div>
                <div class="skill-card-icon skill-ico">C++</div>
                <div class="skill-card-name">C++</div>
                <div class="skill-card-stars">★★★★★</div>
                <div class="skill-card-xp">93 XP</div>
              </div>
              <div class="skill-card-back">
                <div class="skill-card-back-title">C++</div>
                <div class="skill-card-back-tools">STL · ROS2 · Embedded</div>
                <div class="skill-card-back-desc">Systems programming, embedded controls, real-time ROS2 robot communication loops.</div>
                <div class="skill-card-back-level">EXPERT</div>
              </div>
            </div>
            <div class="skill-card" tabindex="0" aria-label="Java - Advanced">
              <div class="skill-card-front">
                <div class="skill-card-rarity ADVANCED">ADVANCED</div>
                <div class="skill-card-icon skill-ico">JVA</div>
                <div class="skill-card-name">Java</div>
                <div class="skill-card-stars">★★★★☆</div>
                <div class="skill-card-xp">80 XP</div>
              </div>
              <div class="skill-card-back">
                <div class="skill-card-back-title">JAVA</div>
                <div class="skill-card-back-tools">Spring · OOP · Gradle</div>
                <div class="skill-card-back-desc">OOP design patterns, backend applications, data structures and algorithms.</div>
                <div class="skill-card-back-level">ADVANCED</div>
              </div>
            </div>
            <div class="skill-card" tabindex="0" aria-label="C - Expert">
              <div class="skill-card-front">
                <div class="skill-card-rarity EXPERT">EXPERT</div>
                <div class="skill-card-icon skill-ico">C</div>
                <div class="skill-card-name">C Language</div>
                <div class="skill-card-stars">★★★★★</div>
                <div class="skill-card-xp">90 XP</div>
              </div>
              <div class="skill-card-back">
                <div class="skill-card-back-title">C LANGUAGE</div>
                <div class="skill-card-back-tools">Bare-metal · GCC</div>
                <div class="skill-card-back-desc">Low-level embedded architecture, direct registers manipulation, memory optimization.</div>
                <div class="skill-card-back-level">EXPERT</div>
              </div>
            </div>
            <div class="skill-card" tabindex="0" aria-label="PHP - Advanced">
              <div class="skill-card-front">
                <div class="skill-card-rarity ADVANCED">ADVANCED</div>
                <div class="skill-card-icon skill-ico">PHP</div>
                <div class="skill-card-name">PHP</div>
                <div class="skill-card-stars">★★★★☆</div>
                <div class="skill-card-xp">78 XP</div>
              </div>
              <div class="skill-card-back">
                <div class="skill-card-back-title">PHP</div>
                <div class="skill-card-back-tools">Laravel · MySQL · Web</div>
                <div class="skill-card-back-desc">Web backend systems integration, REST APIs, database queries.</div>
                <div class="skill-card-back-level">ADVANCED</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Software -->
        <div class="skill-category" id="skill-cat-software">
          <div class="skill-cat-header">
            <span class="skill-cat-icon cat-icon-web">WEB</span>
            <h3 class="skill-cat-title">SOFTWARE & WEB</h3>
          </div>
          <div class="skill-cards-row">
            <div class="skill-card" tabindex="0" aria-label="Full Stack - Advanced">
              <div class="skill-card-front">
                <div class="skill-card-rarity ADVANCED">ADVANCED</div>
                <div class="skill-card-icon skill-ico">FS</div>
                <div class="skill-card-name">Full Stack</div>
                <div class="skill-card-stars">★★★★☆</div>
                <div class="skill-card-xp">82 XP</div>
              </div>
              <div class="skill-card-back">
                <div class="skill-card-back-title">FULL STACK</div>
                <div class="skill-card-back-tools">Flask · HTML · CSS · JS</div>
                <div class="skill-card-back-desc">End-to-end web apps, responsive frontend layouts, interactive web databases.</div>
                <div class="skill-card-back-level">ADVANCED</div>
              </div>
            </div>
            <div class="skill-card" tabindex="0" aria-label="IoT - Expert">
              <div class="skill-card-front">
                <div class="skill-card-rarity EXPERT">EXPERT</div>
                <div class="skill-card-icon skill-ico">IoT</div>
                <div class="skill-card-name">IoT</div>
                <div class="skill-card-stars">★★★★★</div>
                <div class="skill-card-xp">92 XP</div>
              </div>
              <div class="skill-card-back">
                <div class="skill-card-back-title">IoT</div>
                <div class="skill-card-back-tools">ESP32 · SIM900 · MQTT</div>
                <div class="skill-card-back-desc">Smart sensor networks, cellular communications, wireless telemetry, agriculture bots.</div>
                <div class="skill-card-back-level">EXPERT</div>
              </div>
            </div>
            <div class="skill-card" tabindex="0" aria-label="Embedded Systems - Expert">
              <div class="skill-card-front">
                <div class="skill-card-rarity EXPERT">EXPERT</div>
                <div class="skill-card-icon skill-ico">EMB</div>
                <div class="skill-card-name">Embedded</div>
                <div class="skill-card-stars">★★★★★</div>
                <div class="skill-card-xp">94 XP</div>
              </div>
              <div class="skill-card-back">
                <div class="skill-card-back-title">EMBEDDED SYSTEMS</div>
                <div class="skill-card-back-tools">Fritzing · Tinkercad</div>
                <div class="skill-card-back-desc">Hardware prototyping, schematics layouts, breadboard simulation.</div>
                <div class="skill-card-back-level">EXPERT</div>
              </div>
            </div>
          </div>
        </div>

        <!-- AI & Engineering -->
        <div class="skill-category" id="skill-cat-ai">
          <div class="skill-cat-header">
            <span class="skill-cat-icon cat-icon-ai">AI</span>
            <h3 class="skill-cat-title">AI & ENGINEERING</h3>
          </div>
          <div class="skill-cards-row">
            <div class="skill-card" tabindex="0" aria-label="Machine Learning - Advanced">
              <div class="skill-card-front">
                <div class="skill-card-rarity ADVANCED">ADVANCED</div>
                <div class="skill-card-icon skill-ico">ML</div>
                <div class="skill-card-name">Machine Learning</div>
                <div class="skill-card-stars">★★★★☆</div>
                <div class="skill-card-xp">80 XP</div>
              </div>
              <div class="skill-card-back">
                <div class="skill-card-back-title">MACHINE LEARNING</div>
                <div class="skill-card-back-tools">NumPy · Pandas · ML</div>
                <div class="skill-card-back-desc">Basic Machine Learning models, HMMs, supervised/reinforcement learning.</div>
                <div class="skill-card-back-level">ADVANCED</div>
              </div>
            </div>
            <div class="skill-card" tabindex="0" aria-label="Computer Vision - Advanced">
              <div class="skill-card-front">
                <div class="skill-card-rarity ADVANCED">ADVANCED</div>
                <div class="skill-card-icon skill-ico">CV</div>
                <div class="skill-card-name">Computer Vision</div>
                <div class="skill-card-stars">★★★★☆</div>
                <div class="skill-card-xp">80 XP</div>
              </div>
              <div class="skill-card-back">
                <div class="skill-card-back-title">COMPUTER VISION</div>
                <div class="skill-card-back-tools">OpenCV · Python · RPi</div>
                <div class="skill-card-back-desc">Real-time object detection (crabs, medical waste sorting), video integrations.</div>
                <div class="skill-card-back-level">ADVANCED</div>
              </div>
            </div>
            <div class="skill-card" tabindex="0" aria-label="3D Printing - Expert">
              <div class="skill-card-front">
                <div class="skill-card-rarity EXPERT">EXPERT</div>
                <div class="skill-card-icon skill-ico">3DP</div>
                <div class="skill-card-name">3D Printing</div>
                <div class="skill-card-stars">★★★★★</div>
                <div class="skill-card-xp">93 XP</div>
              </div>
              <div class="skill-card-back">
                <div class="skill-card-back-title">3D PRINTING</div>
                <div class="skill-card-back-tools">Orca Slicer · Cura</div>
                <div class="skill-card-back-desc">Rapid prototyping, custom robotics chassis parts, model preparation.</div>
                <div class="skill-card-back-level">EXPERT</div>
              </div>
            </div>
            <div class="skill-card" tabindex="0" aria-label="3D Modeling - Advanced">
              <div class="skill-card-front">
                <div class="skill-card-rarity ADVANCED">ADVANCED</div>
                <div class="skill-card-icon skill-ico">CAD</div>
                <div class="skill-card-name">3D Modeling</div>
                <div class="skill-card-stars">★★★★☆</div>
                <div class="skill-card-xp">82 XP</div>
              </div>
              <div class="skill-card-back">
                <div class="skill-card-back-title">3D MODELING</div>
                <div class="skill-card-back-tools">Solid Edge · AutoCAD</div>
                <div class="skill-card-back-desc">CAD parts designs, mechanical assemblies, precision math drawings (Desmos).</div>
                <div class="skill-card-back-level">ADVANCED</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ═══════════════════════════════ SECTION 4: PROJECTS ═══════════════════════════════ -->
  <section class="section section-projects" id="projects" aria-label="Featured Projects">
    <div class="section-label-tape accent-red" aria-hidden="true">FEATURED PROJECTS</div>
    <div class="section-inner">
      <div class="section-header-block">
        <h2 class="section-title">PROJECT<span class="accent-yellow">FILES</span></h2>
        <p class="section-sub">Classified mission reports — Top level clearance required</p>
      </div>

      <div class="projects-grid">
        <?php foreach ($projects as $p): ?>
        <article class="project-card" id="<?php echo htmlspecialchars($p['id']); ?>" tabindex="0" aria-label="<?php echo htmlspecialchars($p['title']); ?> project">
          <div class="proj-card-top">
            <div class="proj-number"><?php echo htmlspecialchars($p['num']); ?></div>
            <div class="proj-type-badge"><?php echo htmlspecialchars($p['type']); ?></div>
          </div>
          <div class="proj-card-icon proj-ico <?php echo htmlspecialchars($p['icon_class']); ?>"><?php echo htmlspecialchars($p['icon']); ?></div>
          <h3 class="proj-title"><?php echo htmlspecialchars($p['title']); ?></h3>
          <div class="proj-mission">
            <div class="proj-mission-label">MISSION</div>
            <p><?php echo htmlspecialchars($p['mission']); ?></p>
          </div>
          <div class="proj-roles">
            <div class="proj-roles-label">ROLE</div>
            <?php foreach ($p['roles'] as $role): ?>
            <div class="proj-role-tag"><?php echo htmlspecialchars($role); ?></div>
            <?php endforeach; ?>
          </div>
          <div class="proj-tech">
            <div class="proj-tech-label">TECH STACK</div>
            <?php foreach ($p['tech'] as $t): ?>
            <div class="tech-pill"><?php echo htmlspecialchars($t); ?></div>
            <?php endforeach; ?>
          </div>
          <div class="proj-highlights">
            <?php foreach ($p['highlights'] as $highlight): ?>
            <div class="highlight-check">✔ <?php echo htmlspecialchars($highlight); ?></div>
            <?php endforeach; ?>
          </div>
        </article>
        <?php endforeach; ?>
      </div>
    </div>
  </section>

  <!-- ═══════════════════════════════ SECTION 5: EXPERIENCE ═══════════════════════════════ -->
  <section class="section section-experience" id="experience" aria-label="Career Timeline">
    <div class="section-label-tape accent-green" aria-hidden="true">CAREER TIMELINE</div>
    <div class="section-inner">
      <div class="section-header-block">
        <h2 class="section-title">LEVEL<span class="accent-yellow">UP</span></h2>
        <p class="section-sub">My journey from beginner to builder — one milestone at a time</p>
      </div>

      <div class="timeline-container">
        <div class="timeline-track" aria-hidden="true"></div>

        <?php foreach ($timeline as $item): ?>
        <div class="timeline-item timeline-<?php echo htmlspecialchars($item['side']); ?>" id="<?php echo htmlspecialchars($item['id']); ?>">
          <div class="timeline-badge"><?php echo htmlspecialchars($item['year']); ?></div>
          <div class="timeline-card<?php echo $item['active'] ? ' tl-card-active' : ''; ?>">
            <div class="tl-card-icon tl-ico <?php echo htmlspecialchars($item['icon_class']); ?>"><?php echo htmlspecialchars($item['icon']); ?></div>
            <h3 class="tl-card-title"><?php echo htmlspecialchars($item['title']); ?></h3>
            <p class="tl-card-desc"><?php echo htmlspecialchars($item['desc']); ?></p>
            <div class="tl-card-xp<?php echo $item['active'] ? ' status-active' : ''; ?>"><?php echo htmlspecialchars($item['xp']); ?></div>
          </div>
        </div>
        <?php endforeach; ?>
      </div>

      <!-- Toolbox -->
      <div class="toolbox-section">
        <h3 class="toolbox-title">MY TOOLBOX</h3>
        <div class="toolbox-grid">
          <div class="tool-icon-card" aria-label="Arduino IDE"><div class="tool-icon tool-ico">ARD</div><div class="tool-name">Arduino IDE</div></div>
          <div class="tool-icon-card" aria-label="VS Code"><div class="tool-icon tool-ico">VSC</div><div class="tool-name">VS Code</div></div>
          <div class="tool-icon-card" aria-label="Git/GitHub"><div class="tool-icon tool-ico">GIT</div><div class="tool-name">Git/GitHub</div></div>
          <div class="tool-icon-card" aria-label="Jupyter Notebook"><div class="tool-icon tool-ico">JYP</div><div class="tool-name">Jupyter</div></div>
          <div class="tool-icon-card" aria-label="Linux"><div class="tool-icon tool-ico">LNX</div><div class="tool-name">Linux</div></div>
          <div class="tool-icon-card" aria-label="Flask"><div class="tool-icon tool-ico">FLK</div><div class="tool-name">Flask</div></div>
          <div class="tool-icon-card" aria-label="Tinkercad"><div class="tool-icon tool-ico">CAD</div><div class="tool-name">Tinkercad</div></div>
          <div class="tool-icon-card" aria-label="Fritzing"><div class="tool-icon tool-ico">FRZ</div><div class="tool-name">Fritzing</div></div>
          <div class="tool-icon-card" aria-label="AutoCAD"><div class="tool-icon tool-ico">ACD</div><div class="tool-name">AutoCAD</div></div>
          <div class="tool-icon-card" aria-label="Solid Edge"><div class="tool-icon tool-ico">SE</div><div class="tool-name">Solid Edge</div></div>
          <div class="tool-icon-card" aria-label="KiCad"><div class="tool-icon tool-ico">KCD</div><div class="tool-name">KiCad</div></div>
          <div class="tool-icon-card" aria-label="EasyEDA"><div class="tool-icon tool-ico">EDA</div><div class="tool-name">EasyEDA</div></div>
          <div class="tool-icon-card" aria-label="Orca Slicer"><div class="tool-icon tool-ico">ORC</div><div class="tool-name">Orca Slicer</div></div>
          <div class="tool-icon-card" aria-label="ROS2"><div class="tool-icon tool-ico">ROS</div><div class="tool-name">ROS2</div></div>
          <div class="tool-icon-card" aria-label="Microsoft Office"><div class="tool-icon tool-ico">MS</div><div class="tool-name">MS Office</div></div>
        </div>
      </div>

      <!-- Workflow -->
      <div class="workflow-section">
        <h3 class="workflow-title">MY WORKFLOW</h3>
        <div class="workflow-flow">
          <div class="flow-step"><div class="flow-icon flow-ico">01</div><div class="flow-label">IDEA</div></div>
          <div class="flow-arrow">→</div>
          <div class="flow-step"><div class="flow-icon flow-ico">02</div><div class="flow-label">RESEARCH</div></div>
          <div class="flow-arrow">→</div>
          <div class="flow-step"><div class="flow-icon flow-ico">03</div><div class="flow-label">DESIGN PCB</div></div>
          <div class="flow-arrow">→</div>
          <div class="flow-step"><div class="flow-icon flow-ico">04</div><div class="flow-label">PROTOTYPE</div></div>
          <div class="flow-arrow">→</div>
          <div class="flow-step"><div class="flow-icon flow-ico">05</div><div class="flow-label">PROGRAM</div></div>
          <div class="flow-arrow">→</div>
          <div class="flow-step"><div class="flow-icon flow-ico">06</div><div class="flow-label">TEST</div></div>
          <div class="flow-arrow">→</div>
          <div class="flow-step"><div class="flow-icon flow-ico">07</div><div class="flow-label">IMPROVE</div></div>
          <div class="flow-arrow">→</div>
          <div class="flow-step flow-final"><div class="flow-icon flow-ico flow-ico-final">08</div><div class="flow-label">FINAL PRODUCT</div></div>
        </div>
      </div>
    </div>
  </section>

  <!-- ═══════════════════════════════ SECTION 6: CONTACT ═══════════════════════════════ -->
  <section class="section section-contact" id="contact" aria-label="Contact section">
    <div class="section-label-tape accent-yellow-dark" aria-hidden="true">LAST PAGE</div>
    <canvas id="confetti-canvas" aria-hidden="true"></canvas>

    <div class="section-inner contact-inner">
      <div class="contact-mag-page">
        <div class="contact-header">
          <div class="contact-issue-end">END OF ISSUE #1</div>
          <h2 class="contact-title">LET'S BUILD SOMETHING<br/><span class="accent-yellow">AMAZING!</span></h2>
          <p class="contact-sub">Need a robotics developer? Let's connect and create something incredible.</p>
        </div>

        <div class="contact-layout">
          <div class="contact-links">
            <a href="mailto:reincosare07@gmail.com" class="contact-link-card" id="contact-email" aria-label="Send email">
              <div class="contact-link-icon contact-ico">@</div>
              <div class="contact-link-info">
                <div class="contact-link-label">EMAIL</div>
                <div class="contact-link-val">reincosare07@gmail.com</div>
              </div>
            </a>
            <a href="https://github.com/Stobeeney" target="_blank" rel="noopener noreferrer" class="contact-link-card" id="contact-github" aria-label="Visit GitHub profile">
              <div class="contact-link-icon contact-ico">GH</div>
              <div class="contact-link-info">
                <div class="contact-link-label">GITHUB</div>
                <div class="contact-link-val">github.com/Stobeeney</div>
              </div>
            </a>
            <a href="tel:09924212845" class="contact-link-card" id="contact-phone" aria-label="Call contact numbers">
              <div class="contact-link-icon contact-ico">PH</div>
              <div class="contact-link-info">
                <div class="contact-link-label">PHONE</div>
                <div class="contact-link-val">09924212845 / 09287296597</div>
              </div>
            </a>
            <a href="https://www.facebook.com/rein.cosare.7/" target="_blank" rel="noopener noreferrer" class="contact-link-card" id="contact-facebook" aria-label="Visit Facebook profile">
              <div class="contact-link-icon contact-ico">FB</div>
              <div class="contact-link-info">
                <div class="contact-link-label">FACEBOOK</div>
                <div class="contact-link-val">facebook.com/rein.cosare.7</div>
              </div>
            </a>
            <a href="https://www.instagram.com/rein_cosare/" target="_blank" rel="noopener noreferrer" class="contact-link-card" id="contact-instagram" aria-label="Visit Instagram profile">
              <div class="contact-link-icon contact-ico">IG</div>
              <div class="contact-link-info">
                <div class="contact-link-label">INSTAGRAM</div>
                <div class="contact-link-val">@rein_cosare</div>
              </div>
            </a>
          </div>

          <div class="contact-photo-col">
            <div class="contact-photo-wrap">
              <img src="pics/me.jpg" alt="Daniel Rein Cosare" class="contact-photo" />
              <div class="speech-bubble contact-bubble">
                Need a robotics developer?<br/>
                <strong>Let's connect!</strong>
              </div>
            </div>

            <div class="contact-game-stats">
              <div class="stats-header">PLAYER STATS</div>
              <div class="stats-row"><span class="stats-label">LEVEL</span><span class="stats-val orbitron">22</span></div>
              <div class="stats-row"><span class="stats-label">PROJECTS</span><span class="stats-val orbitron">38+</span></div>
              <div class="stats-row"><span class="stats-label">HOURS CODING</span><span class="stats-val orbitron">2500+</span></div>
              <div class="stats-row"><span class="stats-label">ROBOTS BUILT</span><span class="stats-val orbitron">15+</span></div>
              <div class="stats-row"><span class="stats-label">PCBs DESIGNED</span><span class="stats-val orbitron">20+</span></div>
              <div class="stats-row"><span class="stats-label">COFFEE</span><span class="stats-val orbitron">∞</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ═══════════════════════════════ FOOTER ═══════════════════════════════ -->
  <footer class="mag-footer" aria-label="Footer">
    <div class="footer-content">
      <div class="footer-end">END OF ISSUE</div>
      <div class="footer-thanks">Thanks for reading!</div>
      <div class="footer-see">See you in the next project.</div>
      <div class="footer-copy">© 2026 Daniel Rein Cosare · Tech Explorer Magazine · All Rights Reserved</div>
      <div class="footer-tags">
        <span class="footer-tag">ROBOTICS</span>
        <span class="footer-tag">AI</span>
        <span class="footer-tag">PCB</span>
        <span class="footer-tag">IoT</span>
        <span class="footer-tag">FULLSTACK</span>
      </div>
    </div>
  </footer>

  <div class="robot-mascot" id="robot-mascot" aria-hidden="true">
    <img src="pics/robot_mascot.jpg" alt="" class="mascot-img" />
    <div class="mascot-speech" id="mascot-speech"></div>
  </div>

  <!-- Hover FX Popups -->
  <div class="fx-popup" id="fx-popup" aria-hidden="true">POW!</div>

  <!-- Floating Guestbook & Live Counter Widget -->
  <div class="floating-widget" id="comments-widget">
    <div class="widget-header" id="widget-header">
      <div class="widget-live-indicator">
        <span class="live-dot"></span>
        <span class="live-text"><span id="active-count">3</span> ACTIVE NOW</span>
      </div>
      <div class="widget-title">GUESTBOOK</div>
      <button class="widget-toggle-btn" id="widget-toggle" aria-label="Toggle guestbook">▲</button>
    </div>
    <div class="widget-content">
      <div class="comments-list" id="comments-list">
        <!-- Comments list render -->
      </div>
      <form class="comment-form" id="comment-form">
        <input type="text" id="comment-name" placeholder="CODENAME" required maxlength="15" />
        <textarea id="comment-text" placeholder="LEAVE A NOTE..." required maxlength="80" rows="2"></textarea>
        <button type="submit" class="comment-submit-btn">TRANSMIT</button>
      </form>
    </div>
  </div>

  <script src="script.js"></script>
</body>
</html>
