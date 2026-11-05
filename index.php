<?php
/* ════════════════════════════════════════════════════════════
   DANIEL REIN COSARE — PLAYER ONE PORTFOLIO
   Edit the data arrays below; the page renders from them.
   ════════════════════════════════════════════════════════════ */

function e($s) { return htmlspecialchars($s, ENT_QUOTES, 'UTF-8'); }

$stats = [
    ['value' => 38,   'label' => 'Projects shipped'],
    ['value' => 15,   'label' => 'Robots built'],
    ['value' => 20,   'label' => 'PCBs designed'],
    ['value' => 2500, 'label' => 'Hours coding'],
];

/* Skill tree — [name, tools, level 0–100] */
$skills = [
    'Robotics' => [
        ['Sumobot',      'Custom PCB · Fusion 360', 98],
        ['PCB Design',   'KiCad · EasyEDA',         95],
        ['Arduino',      'Nano BLE · Mega',         95],
        ['Line Tracing', 'IR array · PID',          95],
        ['ROS2',         'Linux · Gazebo',          85],
    ],
    'Code' => [
        ['Python', 'OpenCV · Flask · NumPy', 95],
        ['C++',    'STL · ROS2 · Embedded',  93],
        ['C',      'Bare-metal · GCC',       90],
        ['Java',   'Spring · OOP · Gradle',  80],
        ['PHP',    'Laravel · MySQL',        78],
    ],
    'Systems' => [
        ['Embedded',   'Fritzing · Tinkercad',    94],
        ['IoT',        'ESP32 · SIM900 · MQTT',   92],
        ['Full Stack', 'Flask · HTML · CSS · JS', 82],
    ],
    'AI & Make' => [
        ['3D Printing',      'Orca Slicer · Cura',   93],
        ['3D Modeling',      'Solid Edge · AutoCAD', 82],
        ['Machine Learning', 'NumPy · Pandas · HMMs', 80],
        ['Computer Vision',  'OpenCV · Raspberry Pi', 80],
    ],
];

$projects = [
    [
        'num' => '01', 'type' => 'Competition Robot',
        'title' => 'Relief Goods Distributor',
        'mission' => 'Bluetooth-controlled robot that hands out relief goods without face-to-face contact during COVID-19, with a built-in hands-free alcohol dispenser.',
        'tech' => ['Bluetooth', 'Arduino', 'Auto Sensors'],
        'loot' => ['Top 3 — WRG Taiwan (Online)', "Top 1 & People's Choice — DOST Contest", 'Contactless dispenser module'],
    ],
    [
        'num' => '02', 'type' => 'Embedded / AI',
        'title' => 'ASL Translator (BLE Rev 2)',
        'mission' => 'Gesture-based ASL translator using flex sensors and an MPU6050 gyro for real-time letter recognition with tolerance-based matching.',
        'tech' => ['Arduino Nano BLE', 'Flex Sensors', 'MPU6050'],
        'loot' => ['Real-time letter recognition', 'Tolerance-based matching', 'Inertial + flex data fusion'],
    ],
    [
        'num' => '03', 'type' => 'Embedded / GUI',
        'title' => 'Python ASL Translator',
        'mission' => 'Python-based ASL translation system on an Arduino Mega with serial comms, a Tkinter GUI, and video playback output.',
        'tech' => ['Arduino Mega', 'Tkinter', 'Serial', 'Video'],
        'loot' => ['Large bold readable output', 'Video playback feedback', 'Reliable serial protocol'],
    ],
    [
        'num' => '04', 'type' => 'AI / Web',
        'title' => 'ASL Machine Learning Portal',
        'mission' => 'Advanced ASL translator combining supervised, semi-supervised and reinforcement learning with HMMs, served on a web dashboard.',
        'tech' => ['Flask', 'HMMs', 'Reinforcement Learning', 'Python'],
        'loot' => ['Multi-method ML pipeline', 'Hidden Markov Model filters', 'Responsive Flask portal'],
    ],
    [
        'num' => '05', 'type' => 'Computer Vision / IoT',
        'title' => 'Crab Detection System',
        'mission' => 'Crab detection and monitoring on a Raspberry Pi with computer vision and a SIM900 cellular module for SMS alerts.',
        'tech' => ['Raspberry Pi', 'SIM900 GSM', 'OpenCV', 'Python'],
        'loot' => ['Automated crab monitoring', 'SMS alerting', 'Edge CV processing'],
    ],
    [
        'num' => '06', 'type' => 'Assistive Tech',
        'title' => 'Smart Mobility Canes',
        'mission' => 'Smart canes with obstacle sensors and haptic feedback to help visually impaired users move around safely.',
        'tech' => ['Sensors', 'Haptics', 'Arduino', 'Fritzing'],
        'loot' => ['Obstacle distance warning', 'Tactile buzz alerts', 'Ergonomic sensor layout'],
    ],
    [
        'num' => '07', 'type' => 'Robotics / CV',
        'title' => 'Medical Waste Sorting Arm',
        'mission' => 'Computer vision classifies medical waste while a robotic arm car sorts and disposes of it automatically.',
        'tech' => ['Computer Vision', 'Robotic Arm', 'Motor Control', 'Arduino'],
        'loot' => ['Automated sorting', 'CV waste classification', 'Contactless disposal'],
    ],
    [
        'num' => '08', 'type' => 'Creative Tech',
        'title' => 'Desmos Math Art',
        'mission' => 'Intricate mathematical artwork built purely from equations and graphs for a freelance client.',
        'tech' => ['Desmos', 'Parametric Equations'],
        'loot' => ['Custom parametric curves', 'Clean coordinate bounds', 'High-precision graphing'],
    ],
    [
        'num' => '09', 'type' => 'Competition Robot',
        'title' => 'Sumobot Competitor',
        'mission' => 'Competition sumobot with motor control and sensor-based strategies to find opponents and push them out of the ring.',
        'tech' => ['Arduino', 'Custom PCB', 'Fusion 360'],
        'loot' => ['Ring boundary detection', 'Opponent tracking', 'High-torque drive'],
    ],
    [
        'num' => '10', 'type' => 'Control System',
        'title' => 'PID Line Tracer',
        'mission' => 'Line-tracing robot using PID control for fast, precise path following and sensor correction.',
        'tech' => ['PID', 'IR Sensor Array', 'Arduino', 'EasyEDA'],
        'loot' => ['Closed-loop feedback', 'Precise steering', 'Optimized lap times'],
    ],
    [
        'num' => '11', 'type' => 'IoT / Agriculture',
        'title' => 'IoT Pest Detection Car',
        'mission' => 'IoT robot car for automated crop pest detection and smart irrigation monitoring.',
        'tech' => ['ESP32', 'Sensors & Actuators', 'IoT Cloud'],
        'loot' => ['Automated pest alerts', 'Smart irrigation valves', 'Remote dashboard'],
    ],
];

$career = [
    ['year' => '2026', 'active' => true,  'role' => '3D Printing & Design Freelancer',  'org' => 'Blink Technology and Robotics', 'desc' => 'Designing and printing custom parts and chassis configurations.'],
    ['year' => '2026', 'active' => true,  'role' => 'Designer & 3D Printing Freelancer', 'org' => 'Prodigitality',                 'desc' => 'Rapid prototyping, structural design, and slicing for production parts.'],
    ['year' => '2025', 'active' => false, 'role' => 'IoT Lead',                          'org' => 'GDG On Campus PUP Manila',      'desc' => 'Organizing workshops and leading IoT student projects.'],
    ['year' => '2025', 'active' => false, 'role' => 'Associate Software Director',       'org' => '',                              'desc' => 'Managing software development lifecycles, full stack integrations, and coding standards.'],
    ['year' => '2025', 'active' => false, 'role' => 'Part-time Electronics Specialist',  'org' => 'Yuro Product Development and Design Solutions', 'desc' => 'Designing schematics, debugging prototype PCBs, and laying out circuits.'],
    ['year' => '2024', 'active' => false, 'role' => 'IoT Lead',                          'org' => 'AWS Cloud Club PUP',            'desc' => 'Teaching embedded systems, ESP32 MQTT integration, and cloud sensor pipelines.'],
    ['year' => '2023', 'active' => false, 'role' => 'Senior AI/ML Engineer',             'org' => 'AWS Cloud Club PUP',            'desc' => 'Model pipelines, data cleaning with Pandas, and computer vision training runs.'],
    ['year' => '2021', 'active' => false, 'role' => 'Robotics Vice Captain',             'org' => 'Tagaytay Science Robotics',     'desc' => 'Co-led robot design strategy, motor drive testing, and competition prep.'],
    ['year' => '2019', 'active' => false, 'role' => 'Philippine Robotics Team',          'org' => 'World Robot Games',             'desc' => 'Represented the country internationally — designing competition bots and tuning controllers.'],
];

$tools = ['Arduino IDE', 'VS Code', 'Git', 'Jupyter', 'Linux', 'Flask', 'KiCad', 'EasyEDA', 'Fritzing', 'Tinkercad', 'AutoCAD', 'Solid Edge', 'Orca Slicer', 'ROS2', 'MS Office'];

$socials = [
    ['label' => 'GitHub',    'handle' => 'Stobeeney',       'url' => 'https://github.com/Stobeeney'],
    ['label' => 'Facebook',  'handle' => 'rein.cosare.7',   'url' => 'https://www.facebook.com/rein.cosare.7/'],
    ['label' => 'Instagram', 'handle' => '@rein_cosare',    'url' => 'https://www.instagram.com/rein_cosare/'],
    ['label' => 'Phone',     'handle' => '0992 421 2845',   'url' => 'tel:09924212845'],
];
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Daniel Rein Cosare — Player One</title>
  <meta name="description" content="Daniel Rein Cosare — Robotics engineer, embedded systems builder and full stack developer from PUP Manila." />
  <meta property="og:title" content="Daniel Rein Cosare — Player One" />
  <meta property="og:description" content="Robotics · Embedded · PCB · AI · Full Stack" />
  <meta property="og:image" content="pics/me.jpg" />
  <meta name="theme-color" content="#0a0a0a" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Anton&family=JetBrains+Mono:wght@400;600;800&family=Space+Grotesk:wght@400;500;700&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="style.css" />
</head>
<body>
  <a class="skip" href="#character">Skip to content</a>

  <!-- ═══════════ HUD ═══════════ -->
  <header class="hud" id="hud">
    <a href="#start" class="logo" aria-label="Back to top">DRC<span>_</span></a>
    <nav class="hud-nav" aria-label="Main">
      <a href="#character">Character</a>
      <a href="#skills">Skills</a>
      <a href="#quests">Quests</a>
      <a href="#career">Career</a>
      <a href="#contact">Contact</a>
    </nav>
    <div class="hud-xp" aria-hidden="true">
      <span class="hud-lv">LV.22</span>
      <span class="xp-track"><span class="xp-fill" id="xp-fill"></span></span>
      <span class="xp-num" id="xp-num">0 XP</span>
    </div>
  </header>

  <main>
    <!-- ═══════════ HERO ═══════════ -->
    <section class="hero" id="start">
      <div class="hero-grid" aria-hidden="true"></div>
      <div class="wrap hero-inner">
        <div class="hero-copy">
          <p class="eyebrow"><span class="blink">●</span> PLAYER 1 — READY</p>
          <h1 class="hero-name">
            <span>Daniel</span>
            <span>Rein</span>
            <span class="outline">Cosare</span>
          </h1>
          <p class="hero-class">
            Robotics Engineer <i>/</i> Embedded Systems <i>/</i> Full Stack Dev
          </p>
          <div class="hero-actions">
            <a class="btn btn-primary" href="#quests">▶ Press Start</a>
            <a class="btn btn-ghost" href="#contact">Join my party</a>
          </div>
        </div>

        <figure class="hero-card">
          <div class="hero-photo">
            <img src="pics/me.jpg" alt="Portrait of Daniel Rein Cosare" width="900" height="1016" />
          </div>
          <figcaption class="nameplate">
            <span class="np-tag">P1</span>
            <span class="np-name">Rein</span>
            <span class="np-meta">CpE · PUP Manila</span>
          </figcaption>
          <span class="corner tl"></span><span class="corner tr"></span>
          <span class="corner bl"></span><span class="corner br"></span>
        </figure>
      </div>

      <ul class="wrap hero-stats">
        <?php foreach ($stats as $s): ?>
        <li>
          <span class="stat-val" data-count="<?= (int)$s['value'] ?>"><?= (int)$s['value'] ?></span><span class="stat-plus">+</span>
          <span class="stat-lbl"><?= e($s['label']) ?></span>
        </li>
        <?php endforeach; ?>
      </ul>
    </section>

    <!-- ═══════════ TICKER ═══════════ -->
    <div class="ticker" aria-hidden="true">
      <div class="ticker-track">
        <?php for ($i = 0; $i < 2; $i++): ?>
        <span>PCB Design</span><b>✦</b><span>Robotics</span><b>✦</b><span>Embedded</span><b>✦</b><span>AI / ML</span><b>✦</b><span>IoT</span><b>✦</b><span>3D Printing</span><b>✦</b><span>Full Stack</span><b>✦</b>
        <?php endfor; ?>
      </div>
    </div>

    <!-- ═══════════ CHARACTER ═══════════ -->
    <section class="section" id="character" data-area="Character Select">
      <div class="wrap split">
        <div>
          <p class="sec-num">01 / Character</p>
          <h2 class="sec-title">Builds robots.<br/><span class="acc">Writes the brains.</span></h2>
          <div class="prose">
            <p>I'm a Computer Engineering student who likes building intelligent robots and software that solves real problems.</p>
            <p>I combine <strong>electronics</strong>, <strong>firmware</strong>, <strong>mechanical design</strong> and <strong>AI</strong> into one working system. That can mean routing a PCB, tuning a PID loop, training a vision model or shipping a web app. Ideas don't stay on paper.</p>
          </div>
        </div>

        <aside class="char-sheet" aria-label="Character sheet">
          <div class="sheet-head"><span>Character Sheet</span><span class="mono dim">#0001</span></div>
          <dl>
            <div><dt>Age</dt><dd>22</dd></div>
            <div><dt>Class</dt><dd>Computer Engineer</dd></div>
            <div><dt>Base</dt><dd>PUP Manila, PH</dd></div>
            <div><dt>Languages</dt><dd>Filipino, English</dd></div>
            <div><dt>Perks</dt><dd>Teamwork · Problem-solving · Adaptability · Time management</dd></div>
            <div><dt>Status</dt><dd class="acc">● Open for missions</dd></div>
          </dl>
        </aside>
      </div>
    </section>

    <!-- ═══════════ SKILLS ═══════════ -->
    <section class="section" id="skills" data-area="Skill Tree">
      <div class="wrap">
        <p class="sec-num">02 / Skill Tree</p>
        <h2 class="sec-title">Stats <span class="acc">maxed</span> where it counts.</h2>

        <div class="skill-groups">
          <?php foreach ($skills as $group => $list): ?>
          <div class="skill-group">
            <h3 class="group-name"><?= e($group) ?></h3>
            <ul>
              <?php foreach ($list as [$name, $kit, $lvl]): ?>
              <li class="skill">
                <div class="skill-top">
                  <span class="skill-name"><?= e($name) ?></span>
                  <span class="skill-lv">LV <?= (int)$lvl ?></span>
                </div>
                <div class="bar" role="meter" aria-valuemin="0" aria-valuemax="100" aria-valuenow="<?= (int)$lvl ?>" aria-label="<?= e($name) ?> level">
                  <span style="--lvl: <?= (int)$lvl ?>%"></span>
                </div>
                <div class="skill-tools"><?= e($kit) ?></div>
              </li>
              <?php endforeach; ?>
            </ul>
          </div>
          <?php endforeach; ?>
        </div>

        <div class="inventory">
          <h3 class="group-name">Inventory</h3>
          <ul class="inv-grid">
            <?php foreach ($tools as $t): ?>
            <li><?= e($t) ?></li>
            <?php endforeach; ?>
          </ul>
        </div>
      </div>
    </section>

    <!-- ═══════════ QUESTS ═══════════ -->
    <section class="section" id="quests" data-area="Quest Log">
      <div class="wrap">
        <p class="sec-num">03 / Quest Log</p>
        <h2 class="sec-title"><?= count($projects) ?> quests <span class="acc">cleared.</span></h2>

        <div class="quest-grid">
          <?php foreach ($projects as $p): ?>
          <article class="quest">
            <div class="quest-head">
              <span class="quest-num"><?= e($p['num']) ?></span>
              <span class="quest-type"><?= e($p['type']) ?></span>
            </div>
            <h3 class="quest-title"><?= e($p['title']) ?></h3>
            <p class="quest-mission"><?= e($p['mission']) ?></p>
            <ul class="pills">
              <?php foreach ($p['tech'] as $t): ?><li><?= e($t) ?></li><?php endforeach; ?>
            </ul>
            <details class="loot">
              <summary>Loot <span aria-hidden="true">+</span></summary>
              <ul>
                <?php foreach ($p['loot'] as $l): ?><li><?= e($l) ?></li><?php endforeach; ?>
              </ul>
            </details>
            <span class="quest-badge" aria-hidden="true">Cleared</span>
          </article>
          <?php endforeach; ?>
        </div>
      </div>
    </section>

    <!-- ═══════════ CAREER ═══════════ -->
    <section class="section" id="career" data-area="Save Files">
      <div class="wrap">
        <p class="sec-num">04 / Save Files</p>
        <h2 class="sec-title">Level <span class="acc">history.</span></h2>

        <ol class="saves">
          <?php foreach ($career as $c): ?>
          <li class="save<?= $c['active'] ? ' is-active' : '' ?>">
            <span class="save-year"><?= e($c['year']) ?></span>
            <div class="save-body">
              <h3 class="save-role"><?= e($c['role']) ?></h3>
              <?php if ($c['org']): ?><p class="save-org"><?= e($c['org']) ?></p><?php endif; ?>
              <p class="save-desc"><?= e($c['desc']) ?></p>
            </div>
            <span class="save-state"><?= $c['active'] ? '● In progress' : 'Saved' ?></span>
          </li>
          <?php endforeach; ?>
        </ol>
      </div>
    </section>

    <!-- ═══════════ CONTACT ═══════════ -->
    <section class="section contact" id="contact" data-area="Continue Screen">
      <div class="wrap">
        <p class="sec-num">05 / Continue?</p>
        <div class="continue">
          <h2 class="continue-title">Continue?</h2>
          <span class="countdown" id="countdown" aria-hidden="true">9</span>
        </div>
        <p class="contact-lead">Need a robotics dev for your team? Insert coin.</p>

        <a class="mail" href="mailto:reincosare07@gmail.com">reincosare07@gmail.com <span aria-hidden="true">↗</span></a>

        <ul class="socials">
          <?php foreach ($socials as $s): $ext = strpos($s['url'], 'http') === 0; ?>
          <li>
            <a href="<?= e($s['url']) ?>"<?= $ext ? ' target="_blank" rel="noopener noreferrer"' : '' ?>>
              <span class="soc-label"><?= e($s['label']) ?></span>
              <span class="soc-handle"><?= e($s['handle']) ?></span>
              <span class="soc-arrow" aria-hidden="true">→</span>
            </a>
          </li>
          <?php endforeach; ?>
        </ul>
      </div>
    </section>
  </main>

  <footer class="footer">
    <div class="wrap footer-inner">
      <span>© <?= date('Y') ?> Daniel Rein Cosare</span>
      <span class="mono dim" title="Try it">↑ ↑ ↓ ↓ ← → ← → B A</span>
    </div>
  </footer>

  <!-- Achievement toasts land here -->
  <div class="toasts" id="toasts" aria-live="polite"></div>

  <script src="script.js"></script>
</body>
</html>
