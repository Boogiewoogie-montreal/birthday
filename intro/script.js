/* ==========================================================================
   HAND-DRAWN CRAYON INTRO SCRIPT - "SOMETHING JUST LIKE THIS" STYLE
   Synced to audio.currentTime with fallback timer and stop-motion crayon feel
   ========================================================================== */

// ==========================================================================
// ENDING SEQUENCE CONFIGURATION (ALL TEXTS, LABELS, BUBBLES & MESSAGES)
// Easily customize all ending texts, question, buttons & messages here!
// ==========================================================================
const ENDING_CONFIG = {
  question: "Did you like it? 🥹💖",
  initialBubble: "Tell me! 🥺✨",
  yesInitialLabel: "Yes 💖",
  yesFinalLabel: "Yes, obviously 😌💖",
  noSteps: [
    { label: "Are you sure? 🥺", bubble: "Hmm? 🤔", mood: "confused" },
    { label: "Really? 😢", bubble: "Awww... 🥺", mood: "sad" },
    { label: "Please think again 🥹", bubble: "Pleaseee 🥹", mood: "pleading" },
    { label: "Last chance... 💔", bubble: "Don't do this to me 😭", mood: "teary" },
    { label: "No 🥺", bubble: "My heart is breaking 💔😿", mood: "crying" }
  ],
  celebrationTitle: "Yayyy! I knew it! 🥳💖",
  celebrationSubtitle: "I'm so happy you liked it, Malkin 🌸",
  magicReplayLabel: "Wanna watch it again? ✨",
  footerLoveText: "💌 Made with love for Malkin"
};

// ==========================================================================
// SOFT PROCEDURAL WEB AUDIO SFX (RESPECTS AUDIO MUTE SETTING)
// ==========================================================================
class EndingSoundFX {
  constructor() {
    this.ctx = null;
  }
  getContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }
  isMuted() {
    try {
      const savedMute = localStorage.getItem('birthday_music_muted');
      if (savedMute === 'true') return true;
      if (window.crayonIntro && window.crayonIntro.isMuted) return true;
    } catch (e) { }
    return false;
  }
  pop() {
    if (this.isMuted()) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(420, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(840, ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.09);
    } catch (e) { }
  }
  sparkle() {
    if (this.isMuted()) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      [523.25, 659.25, 783.99, 1046.5].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.06);
        gain.gain.setValueAtTime(0.05, ctx.currentTime + i * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.06 + 0.18);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + i * 0.06);
        osc.stop(ctx.currentTime + i * 0.06 + 0.2);
      });
    } catch (e) { }
  }
  whoosh() {
    if (this.isMuted()) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(260, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(680, ctx.currentTime + 0.14);
      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.16);
    } catch (e) { }
  }
}

// ==========================================================================
// 1. CONFIGURATION ARRAY - EDIT TEXT, TIMINGS, COLORS & DOODLES HERE!
// ==========================================================================
const INTRO_CONFIG = {
  bpm: 125,            // "Make You Mine" BPM (PUBLIC) for rhythmic pulse
  totalDuration: 26.5, // Total duration in seconds before revealing scrapbook gallery
  mainPageUrl: '../index.html',       // Path to your main birthday page

  // Scenes list (approx 3-4s per scene, drawn word-by-word)
  scenes: [
    {
      id: 1,
      startTime: 0.0,
      endTime: 3.4,
      text: "Hey Malkin...",
      highlightWord: "Malkin...",
      color: "#E63946",       // Crayon Coral Red
      doodle: "cats_peeking", // The cats peek in from bottom
      bgAccent: "#FFF8F0"
    },
    {
      id: 2,
      startTime: 3.4,
      endTime: 6.8,
      text: "Today is a special day",
      highlightWord: "special",
      color: "#F77F00",       // Crayon Sunshine Orange
      doodle: "sparkles_stars",
      bgAccent: "#FFFBF2"
    },
    {
      id: 3,
      startTime: 6.8,
      endTime: 10.2,
      // Placeholder about her (easily editable!)
      text: "A year brighter, kinder, and more wonderful",
      highlightWord: "wonderful",
      color: "#3A86FF",       // Crayon Sky Blue
      doodle: "sun_sparkle",
      bgAccent: "#F5FAFF"
    },
    {
      id: 4,
      startTime: 10.2,
      endTime: 13.5,
      // Placeholder about her (easily editable!)
      text: "You bring so much warmth to the world",
      highlightWord: "warmth",
      color: "#FF4D6D",       // Crayon Berry Pink
      doodle: "hearts_flower",
      bgAccent: "#FFF4F7"
    },
    {
      id: 5,
      startTime: 13.5,
      endTime: 17.0,
      text: "Two ordinary people who became important to each other",
      highlightWord: "important",
      color: "#489972",       // Crayon Meadow Green
      doodle: "cats_walking", // The two cats walk side by side
      bgAccent: "#F3FAF6"
    },
    {
      id: 6,
      startTime: 17.0,
      endTime: 20.4,
      text: "Make a wish...",
      highlightWord: "wish...",
      color: "#8338EC",       // Crayon Purple
      doodle: "balloons_rising",
      bgAccent: "#FAF5FF"
    },
    {
      id: 7,
      startTime: 20.4,
      endTime: 24.2,
      text: "Happy Birthday Malkin! 🎉",
      highlightWord: "Birthday",
      color: "#E63946",       // Festive Crayon Coral
      doodle: "birthday_cake",
      bgAccent: "#FFF9F4"
    },
    {
      id: 8,
      startTime: 24.2,
      endTime: 26.5,
      text: "Here's your special celebration...",
      highlightWord: "celebration...",
      color: "#2A9D8F",       // Crayon Teal
      doodle: "final_balloons",
      bgAccent: "#FDF3E5"
    }
  ]
};

// ==========================================================================
// 2. STATE MANAGEMENT & CLOCK ENGINE
// ==========================================================================
class CrayonIntroController {
  constructor(config) {
    this.config = config;
    this.audio = this.getSharedAudio();
    if (this.audio) {
      this.audio.loop = true;
      if (typeof this.audio.volume === 'number' && (this.audio.volume < 0.4 || this.audio.volume > 0.45)) {
        this.audio.volume = 0.42;
      }
    }
    this.isPlaying = false;
    this.isMuted = this.audio ? !!this.audio.muted : false;
    this.hasEnded = false;
    this.currentTime = 0;
    this.introStartTime = null;
    this.activeSceneIndex = -1;
    this.renderedWords = new Set();
    this.renderedDoodles = new Set();

    // DOM Elements
    this.stage = document.getElementById('paperStage');
    this.scenesContainer = document.getElementById('scenesContainer');
    this.doodleArea = document.getElementById('doodleArea');
    this.wipeOverlay = document.getElementById('wipeOverlay');
    this.paperLiftOverlay = document.getElementById('paperLiftOverlay');
    this.startGate = document.getElementById('startGate');
    this.loader = document.getElementById('crayonLoader');
    this.muteBtn = document.getElementById('muteBtn');

    this.initAudio();
    this.bindEvents();
    this.preloadAssets();
  }

  getSharedAudio() {
    try {
      if (window.parent && window.parent.document) {
        const parentAudio = window.parent.document.querySelector('.song') || window.parent.document.getElementById('bgMusic');
        if (parentAudio) return parentAudio;
      }
    } catch (e) { }
    return document.querySelector('.song') || document.getElementById('bgMusic') || new Audio('../public_make_you_mine.mp3');
  }

  initAudio() {
    if (!this.audio) return;
    this.audio.loop = true;

    // Restore saved mute preference
    try {
      const savedMute = localStorage.getItem('birthday_music_muted');
      if (savedMute !== null) {
        this.audio.muted = (savedMute === 'true');
      }
    } catch (e) { }

    this.isMuted = !!this.audio.muted;
    this.updateMuteUI();

    // Sync mute button in real-time with the single shared audio
    this.audio.addEventListener('volumechange', () => {
      this.isMuted = !!this.audio.muted;
      this.updateMuteUI();
      try {
        localStorage.setItem('birthday_music_muted', this.isMuted ? 'true' : 'false');
      } catch (e) { }
    });
  }

  updateMuteUI() {
    if (!this.muteBtn) return;
    const icon = this.muteBtn.querySelector('.btn-icon');
    const label = this.muteBtn.querySelector('.btn-label');
    if (this.isMuted) {
      if (icon) icon.textContent = '🔇';
      if (label) label.textContent = 'Unmute';
      this.muteBtn.classList.add('is-muted');
    } else {
      if (icon) icon.textContent = '🔊';
      if (label) label.textContent = 'Sound';
      this.muteBtn.classList.remove('is-muted');
    }
  }

  bindEvents() {
    if (window.self !== window.top) {
      // Embedded mode: hide startGate so the paper background is clean for the slide-down
      if (this.startGate) {
        this.startGate.style.display = 'none';
      }
    } else {
      // Standalone mode: Start Gate Tap
      if (this.startGate) {
        this.startGate.addEventListener('click', () => {
          this.startIntro();
        });
      }
    }

    // Mute Button (controls the single shared song)
    if (this.muteBtn) {
      this.muteBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.toggleMute();
      });
    }

    // Back to Page 1 Button
    const btnBack = document.getElementById('btnBackToPage1');
    if (btnBack) {
      btnBack.addEventListener('click', (e) => {
        e.stopPropagation();
        if (window.parent && window.parent !== window) {
          window.parent.postMessage({ action: 'goToPage1' }, '*');
        } else {
          window.history.back();
        }
      });
    }

    // Gallery Back to Page 1 Button (safety fallback for any alternate ID)
    const btnGalleryBack = document.getElementById('btnGalleryBackToIntro');
    if (btnGalleryBack) {
      btnGalleryBack.addEventListener('click', (e) => {
        e.stopPropagation();
        if (window.parent && window.parent !== window) {
          window.parent.postMessage({ action: 'goToPage1' }, '*');
        } else {
          window.history.back();
        }
      });
    }

    // Mobile orientation / resize refresh
    window.addEventListener('resize', () => {
      // Re-align props if needed
    });
  }

  updateTopControlsUI(view) {
    const btnBack = document.getElementById('btnBackToPage1');
    if (!btnBack) return;
    const label = btnBack.querySelector('.btn-label');
    if (label) label.textContent = 'Back';
    btnBack.setAttribute('title', 'Back to Birthday Card');
  }

  preloadAssets() {
    // Preload image assets
    const imagesToPreload = [
      '../card_cats_top.png',
      '../cat.png',
      '../bulb_yellow.png',
      '../bulb_red.png',
      '../bulb_blue.png',
      '../bulb_pink.png',
      '../bulb_green.png'
    ];

    let loadedCount = 0;
    const total = imagesToPreload.length;

    const onAssetLoaded = () => {
      loadedCount++;
      if (loadedCount >= total) {
        setTimeout(() => {
          if (this.loader) this.loader.classList.add('done');
        }, 300);
      }
    };

    imagesToPreload.forEach(src => {
      const img = new Image();
      img.onload = onAssetLoaded;
      img.onerror = onAssetLoaded;
      img.src = src;
    });

    // Safety timeout in case of slow network
    setTimeout(() => {
      if (this.loader) this.loader.classList.add('done');
    }, 1200);
  }

  toggleMute() {
    if (this.audio) {
      this.audio.muted = !this.audio.muted;
      this.isMuted = this.audio.muted;
      this.updateMuteUI();
      try {
        localStorage.setItem('birthday_music_muted', this.isMuted ? 'true' : 'false');
      } catch (e) { }
    }
  }

  startIntro() {
    this.isPlaying = true;
    this.isPaused = false;
    this.hasEnded = false;
    if (this.startGate) {
      this.startGate.classList.add('hidden');
      this.startGate.style.display = 'none';
    }
    if (this.loader) {
      this.loader.classList.add('done');
    }

    // Music already started on front page and continues uninterrupted.
    // If paused, ensure it plays without restarting.
    if (this.audio) {
      this.audio.loop = true;
      if (this.audio.paused) {
        this.audio.play().catch(err => {
          console.warn('Audio play prevented:', err);
        });
      }
    }

    // High-precision timeline timer for intro scenes
    this.introStartTime = performance.now();

    // Set BPM beat duration in CSS (125 BPM -> 0.48s pulse)
    const beatSeconds = 60 / this.config.bpm;
    document.documentElement.style.setProperty('--beat-duration', `${beatSeconds}s`);

    // Build scene DOM structures
    this.buildScenes();

    // Immediately activate Scene 0 so the first word and scene are never blank
    if (this.config.scenes.length > 0) {
      this.switchScene(0, this.config.scenes[0]);
      const firstWord = document.getElementById(`word-${this.config.scenes[0].id}-0`);
      if (firstWord) firstWord.classList.add('drawn');
    }

    // Start Master RAF Loop
    requestAnimationFrame((ts) => this.tick(ts));
  }

  seek(time) {
    this.introStartTime = performance.now() - (time * 1000);
    this.currentTime = time;
  }

  getCurrentTime() {
    if (!this.introStartTime) {
      this.introStartTime = performance.now();
    }
    return (performance.now() - this.introStartTime) / 1000;
  }

  buildScenes() {
    this.scenesContainer.innerHTML = '';

    this.config.scenes.forEach((scene, index) => {
      const sceneEl = document.createElement('div');
      sceneEl.className = 'scene-container';
      sceneEl.id = `scene-${scene.id}`;
      sceneEl.setAttribute('data-index', index);

      // Text box
      const textBox = document.createElement('div');
      textBox.className = 'crayon-text-box beat-pulse';

      // Split text into words for live hand-drawn reveal
      const words = scene.text.split(' ');
      words.forEach((w, wIndex) => {
        const wordSpan = document.createElement('span');
        wordSpan.className = 'crayon-word';
        wordSpan.textContent = w;
        wordSpan.id = `word-${scene.id}-${wIndex}`;

        // Color and highlight
        const cleanWord = w.replace(/[^a-zA-Z0-9]/g, '');
        const cleanHighlight = (scene.highlightWord || '').replace(/[^a-zA-Z0-9]/g, '');
        if (cleanHighlight && cleanWord.toLowerCase() === cleanHighlight.toLowerCase()) {
          wordSpan.classList.add('highlight');
          wordSpan.style.color = scene.color;
        } else {
          wordSpan.style.color = (wIndex % 2 === 0) ? scene.color : '#2D2A26';
        }

        // Playful organic rotation & baseline jitter
        const rotDeg = ((wIndex * 17) % 7) - 3.2; // -3.2deg to +3.8deg
        const rotY = ((wIndex * 13) % 9) - 4;    // -4px to +5px
        wordSpan.style.setProperty('--rot-deg', `${rotDeg}deg`);
        wordSpan.style.setProperty('--rot-y', `${rotY}px`);

        textBox.appendChild(wordSpan);
      });

      sceneEl.appendChild(textBox);
      this.scenesContainer.appendChild(sceneEl);
    });
  }

  tick(timestamp) {
    if (this.hasEnded) return;
    if (this.isPaused) {
      requestAnimationFrame((ts) => this.tick(ts));
      return;
    }

    this.currentTime = this.getCurrentTime();

    // 1. Identify active scene
    let currentScene = null;
    let currentSceneIndex = -1;

    for (let i = 0; i < this.config.scenes.length; i++) {
      const s = this.config.scenes[i];
      if (this.currentTime >= s.startTime && this.currentTime < s.endTime) {
        currentScene = s;
        currentSceneIndex = i;
        break;
      }
    }

    // Handle Scene Transition
    if (currentSceneIndex !== this.activeSceneIndex && currentSceneIndex !== -1) {
      this.switchScene(currentSceneIndex, currentScene);
    }

    // 3. Animate Words inside active scene
    if (currentScene) {
      this.animateWordsForScene(currentScene);
    }

    // 4. Check for intro completion
    if (this.currentTime >= this.config.totalDuration) {
      this.finishIntro();
      return;
    }

    requestAnimationFrame((ts) => this.tick(ts));
  }

  switchScene(newIndex, scene) {
    // Trigger paper wipe or scribble erase transition
    if (this.activeSceneIndex !== -1 && this.wipeOverlay) {
      this.wipeOverlay.classList.remove('erasing');
      void this.wipeOverlay.offsetWidth; // Trigger reflow
      this.wipeOverlay.classList.add('erasing');
    }

    // Hide old scene
    const oldSceneEl = document.getElementById(`scene-${this.config.scenes[this.activeSceneIndex]?.id}`);
    if (oldSceneEl) {
      oldSceneEl.classList.remove('active');
    }

    // Show new scene
    const newSceneEl = document.getElementById(`scene-${scene.id}`);
    if (newSceneEl) {
      newSceneEl.classList.add('active');
    }

    // Update paper subtle tint
    if (scene.bgAccent) {
      this.stage.style.backgroundColor = scene.bgAccent;
    }

    this.activeSceneIndex = newIndex;

    // Render Scene Doodles
    this.renderDoodleForScene(scene);
  }

  animateWordsForScene(scene) {
    const sceneEl = document.getElementById(`scene-${scene.id}`);
    if (!sceneEl) return;

    const words = scene.text.split(' ');
    const sceneDuration = scene.endTime - scene.startTime;
    const wordInterval = Math.min(0.38, (sceneDuration * 0.75) / Math.max(1, words.length));

    words.forEach((_, wIndex) => {
      const wordKey = `${scene.id}-${wIndex}`;
      if (this.renderedWords.has(wordKey)) return;

      const wordTime = scene.startTime + (wIndex * wordInterval);
      if (this.currentTime >= wordTime) {
        const wordEl = document.getElementById(`word-${scene.id}-${wIndex}`);
        if (wordEl) {
          wordEl.classList.add('drawn');
          this.renderedWords.add(wordKey);
        }
      }
    });
  }

  renderDoodleForScene(scene) {
    const doodleKey = `doodle-${scene.id}`;
    if (this.renderedDoodles.has(doodleKey)) return;
    this.renderedDoodles.add(doodleKey);

    this.doodleArea.innerHTML = '';

    switch (scene.doodle) {
      case 'cats_peeking':
        this.renderCatsPeeking();
        break;
      case 'sparkles_stars':
        this.renderSparklesAndStars(scene.color);
        break;
      case 'sun_sparkle':
        this.renderSunSparkles();
        break;
      case 'hearts_flower':
        this.renderHeartsAndFlowers(scene.color);
        break;
      case 'cats_walking':
        this.renderWalkingCats();
        break;
      case 'balloons_rising':
        this.renderFloatingBalloons();
        break;
      case 'birthday_cake':
        this.renderBirthdayCake();
        break;
      case 'final_balloons':
        this.renderFinalBalloonsAscent();
        break;
      default:
        break;
    }
  }

  // --- Specific Crayon Doodle Renderers ---

  renderCatsPeeking() {
    const wrapper = document.createElement('div');
    wrapper.className = 'cats-peeking-box boiling';
    wrapper.innerHTML = `
      <img src="../card_cats_top.png" class="cats-peeking-img" alt="Cute Peeking Cats">
    `;
    this.doodleArea.appendChild(wrapper);

    // Pop up smoothly with bounce
    setTimeout(() => {
      wrapper.classList.add('peek-in');
    }, 150);
  }

  renderSparklesAndStars(color) {
    const stars = [
      { x: '18%', y: '28%', size: 38, rot: 12 },
      { x: '82%', y: '22%', size: 44, rot: -18 },
      { x: '14%', y: '72%', size: 34, rot: 25 },
      { x: '84%', y: '75%', size: 40, rot: -10 }
    ];

    stars.forEach(s => {
      const star = document.createElement('div');
      star.className = 'sparkle-doodle boiling';
      star.style.left = s.x;
      star.style.top = s.y;
      star.style.width = `${s.size}px`;
      star.style.height = `${s.size}px`;
      star.innerHTML = `
        <svg viewBox="0 0 50 50" width="100%" height="100%">
          <!-- Hand-drawn 5-point star -->
          <polygon points="25,2 32,18 49,18 35,29 40,46 25,36 10,46 15,29 1,18 18,18" 
                   fill="${color}" fill-opacity="0.8" stroke="#2D2A26" stroke-width="2.5" stroke-linejoin="round"/>
        </svg>
      `;
      this.doodleArea.appendChild(star);
    });
  }

  renderSunSparkles() {
    const sunBox = document.createElement('div');
    sunBox.className = 'sparkle-doodle boiling';
    sunBox.style.right = '12%';
    sunBox.style.top = '15%';
    sunBox.style.width = '70px';
    sunBox.style.height = '70px';
    sunBox.innerHTML = `
      <svg viewBox="0 0 100 100" width="100%" height="100%">
        <!-- Hand-drawn smiley sun -->
        <circle cx="50" cy="50" r="24" fill="#F4A261" stroke="#2D2A26" stroke-width="3"/>
        <line x1="50" y1="12" x2="50" y2="2" stroke="#2D2A26" stroke-width="3.5" stroke-linecap="round"/>
        <line x1="50" y1="88" x2="50" y2="98" stroke="#2D2A26" stroke-width="3.5" stroke-linecap="round"/>
        <line x1="12" y1="50" x2="2" y2="50" stroke="#2D2A26" stroke-width="3.5" stroke-linecap="round"/>
        <line x1="88" y1="50" x2="98" y2="50" stroke="#2D2A26" stroke-width="3.5" stroke-linecap="round"/>
        <line x1="24" y1="24" x2="16" y2="16" stroke="#2D2A26" stroke-width="3" stroke-linecap="round"/>
        <line x1="76" y1="76" x2="84" y2="84" stroke="#2D2A26" stroke-width="3" stroke-linecap="round"/>
        <line x1="24" y1="76" x2="16" y2="84" stroke="#2D2A26" stroke-width="3" stroke-linecap="round"/>
        <line x1="76" y1="24" x2="84" y2="16" stroke="#2D2A26" stroke-width="3" stroke-linecap="round"/>
        <!-- Cute smiley eyes & mouth -->
        <circle cx="42" cy="46" r="2.5" fill="#2D2A26"/>
        <circle cx="58" cy="46" r="2.5" fill="#2D2A26"/>
        <path d="M 42 54 Q 50 62 58 54" fill="none" stroke="#2D2A26" stroke-width="2.5" stroke-linecap="round"/>
      </svg>
    `;
    this.doodleArea.appendChild(sunBox);
  }

  renderHeartsAndFlowers(color) {
    const hearts = [
      { x: '16%', y: '32%', s: 36, c: '#FF4D6D' },
      { x: '80%', y: '68%', s: 42, c: '#FF758F' }
    ];

    hearts.forEach(h => {
      const heart = document.createElement('div');
      heart.className = 'sparkle-doodle boiling';
      heart.style.left = h.x;
      heart.style.top = h.y;
      heart.style.width = `${h.s}px`;
      heart.style.height = `${h.s}px`;
      heart.innerHTML = `
        <svg viewBox="0 0 50 50" width="100%" height="100%">
          <path d="M 25 42 Q 10 30 5 18 A 10 10 0 0 1 25 12 A 10 10 0 0 1 45 18 Q 40 30 25 42 Z" 
                fill="${h.c}" fill-opacity="0.8" stroke="#2D2A26" stroke-width="2.5" stroke-linejoin="round"/>
        </svg>
      `;
      this.doodleArea.appendChild(heart);
    });
  }

  renderWalkingCats() {
    const track = document.createElement('div');
    track.className = 'walking-cats-track';

    // Left Cat (walking with bouquet)
    const leftCat = document.createElement('img');
    leftCat.src = '../cat.png';
    leftCat.className = 'cat-walker cat-walker-left boiling';
    leftCat.alt = 'Cat Walking';

    // Right Cat (mirrored, walking towards center)
    const rightCat = document.createElement('img');
    rightCat.src = '../cat.png';
    rightCat.className = 'cat-walker cat-walker-right boiling';
    rightCat.alt = 'Friend Cat Walking';

    // Little Floating Love Heart in between
    const heart = document.createElement('div');
    heart.className = 'love-heart-doodle boiling';
    heart.innerHTML = `
      <svg viewBox="0 0 50 50" width="100%" height="100%">
        <path d="M 25 42 Q 10 30 5 18 A 10 10 0 0 1 25 12 A 10 10 0 0 1 45 18 Q 40 30 25 42 Z" 
              fill="#E63946" stroke="#2D2A26" stroke-width="2.5"/>
      </svg>
    `;

    track.appendChild(leftCat);
    track.appendChild(rightCat);
    track.appendChild(heart);
    this.doodleArea.appendChild(track);
  }

  renderFloatingBalloons() {
    const balloonBox = document.createElement('div');
    balloonBox.className = 'balloons-flight-box';

    const balloonImages = [
      { src: '../bulb_red.png', left: '18%', delay: 100 },
      { src: '../bulb_yellow.png', left: '32%', delay: 350 },
      { src: '../bulb_blue.png', left: '50%', delay: 0 },
      { src: '../bulb_green.png', left: '68%', delay: 450 },
      { src: '../bulb_pink.png', left: '82%', delay: 200 }
    ];

    balloonImages.forEach(b => {
      const bEl = document.createElement('div');
      bEl.className = 'flight-balloon boiling';
      bEl.style.left = b.left;
      bEl.innerHTML = `
        <img src="${b.src}" alt="Crayon Birthday Balloon">
        <svg class="balloon-string-svg" viewBox="0 0 24 90">
          <!-- Squiggly Crayon String -->
          <path d="M 12 0 Q 6 22 18 45 Q 6 68 12 90" stroke="#2D2A26" stroke-width="2.2" fill="none" stroke-linecap="round"/>
        </svg>
      `;
      balloonBox.appendChild(bEl);

      setTimeout(() => {
        bEl.style.transform = `translateY(-${window.innerHeight + 240}px) rotate(${((Math.random() - 0.5) * 16)}deg)`;
      }, b.delay);
    });

    this.doodleArea.appendChild(balloonBox);
  }

  renderBirthdayCake() {
    const cakeBox = document.createElement('div');
    cakeBox.className = 'birthday-cake-doodle boiling';
    cakeBox.innerHTML = `
      <svg viewBox="0 0 120 120" width="100%" height="100%">
        <!-- Candle Flame -->
        <path class="candle-flame" d="M 60 16 Q 66 26 60 34 Q 54 26 60 16 Z" fill="#F77F00"/>
        <!-- Candle Stick -->
        <rect x="58" y="34" width="4" height="22" fill="#E63946" stroke="#2D2A26" stroke-width="1.8" rx="2"/>
        <!-- Top Cake Tier -->
        <rect x="36" y="56" width="48" height="24" fill="#FFFDF8" stroke="#2D2A26" stroke-width="2.8" rx="6"/>
        <path d="M 36 64 Q 42 70 48 64 Q 54 70 60 64 Q 66 70 72 64 Q 78 70 84 64" fill="none" stroke="#FF4D6D" stroke-width="3" stroke-linecap="round"/>
        <!-- Bottom Cake Tier -->
        <rect x="22" y="80" width="76" height="30" fill="#F4A261" stroke="#2D2A26" stroke-width="3" rx="8"/>
        <path d="M 22 88 Q 30 96 38 88 Q 46 96 54 88 Q 62 96 70 88 Q 78 96 86 88 Q 94 96 98 88" fill="none" stroke="#FFF" stroke-width="3.5" stroke-linecap="round"/>
        <!-- Cake Plate -->
        <ellipse cx="60" cy="112" rx="48" ry="6" fill="#FFF" stroke="#2D2A26" stroke-width="2.5"/>
      </svg>
    `;
    this.doodleArea.appendChild(cakeBox);
  }

  renderFinalBalloonsAscent() {
    // Big bunch of colorful balloons flying up to carry the paper sheet away
    const balloonBox = document.createElement('div');
    balloonBox.className = 'balloons-flight-box';

    const finalBalloons = [
      { src: '../bulb_red.png', left: '10%' },
      { src: '../bulb_orange.png', left: '25%' },
      { src: '../bulb_yellow.png', left: '40%' },
      { src: '../bulb_green.png', left: '55%' },
      { src: '../bulb_blue.png', left: '70%' },
      { src: '../bulb_pink.png', left: '85%' }
    ];

    finalBalloons.forEach((b, i) => {
      const bEl = document.createElement('div');
      bEl.className = 'flight-balloon boiling';
      bEl.style.left = b.left;
      bEl.innerHTML = `
        <img src="${b.src}" alt="Balloon">
        <svg class="balloon-string-svg" viewBox="0 0 24 90">
          <path d="M 12 0 Q 6 22 18 45 Q 6 68 12 90" stroke="#2D2A26" stroke-width="2.2" fill="none"/>
        </svg>
      `;
      balloonBox.appendChild(bEl);
      setTimeout(() => {
        bEl.style.transform = `translateY(-${window.innerHeight + 320}px) scale(1.15)`;
      }, i * 80);
    });

    this.doodleArea.appendChild(balloonBox);
  }

  finishIntro() {
    if (this.hasEnded) return;
    this.hasEnded = true;

    // Single shared song continues playing continuously without interruption into the gallery!

    // Hide active scene text & doodles & start gate
    if (this.startGate) this.startGate.classList.add('hidden');
    const oldSceneEl = document.getElementById(`scene-${this.config.scenes[this.activeSceneIndex]?.id}`);
    if (oldSceneEl) oldSceneEl.classList.remove('active');
    if (this.doodleArea) this.doodleArea.innerHTML = '';

    // Reveal Polaroid Photo Gallery Scrapbook
    const gallery = document.getElementById('photoGalleryOverlay');
    if (gallery) {
      this.updateTopControlsUI('gallery');
      gallery.classList.add('active');
      if (window.scrapbookGallery) {
        window.scrapbookGallery.init();
      }
      // Notify parent that gallery view has been unlocked
      if (window.parent && window.parent !== window) {
        window.parent.postMessage({ action: 'viewUnlocked', view: 'gallery' }, '*');
      }
    }
  }
}

// ==========================================================================
// 2. SCRAPBOOK GALLERY CONFIGURATION ARRAY
// All photos, captions, frame styles, tilts, and secret notes live here!
// ==========================================================================
const GALLERY_CONFIG = {
  photos: [
    {
      id: 1,
      src: '../malkin_1.png',
      caption: 'The brightest smile in the entire universe ✨',
      frameType: 'polaroid-tape', // 1. Classic polaroid with pink washi tape
      tilt: -2.5,
      secretMessage: "Every time I look at this picture, it instantly makes my day brighter. Your smile is pure sunshine, Malkin! Never stop shining 💖",
      decor: { note: 'this day was so fun! ⭐', sticker: '🌸', notePos: 'top-left' }
    },
    {
      id: 2,
      src: '../malkin_2.png',
      caption: 'A sweet memory hanging on the clothesline of time 🍃',
      frameType: 'hanging-clothesline', // 2. Hanging on string with clothespin, swaying gently
      tilt: 2.8,
      secretMessage: "Hanging onto this memory forever. Some moments are so special you never want to take them down! 🎐💕",
      decor: { note: 'swaying in the breeze 🎐', sticker: '✨', notePos: 'top-right' }
    },
    {
      id: 3,
      src: '../malkin_3.MP4',
      caption: 'Tucked safely into the scrapbook of my heart 📖',
      frameType: 'scrapbook-corners', // 3. 4 corner photo-corners on kraft paper with doodle border
      tilt: -1.5,
      secretMessage: "Saved on page one of my favorite memories. You make even the simplest days feel like an unforgettable adventure! 📌💖",
      decor: { note: 'pure vintage happiness 📸', sticker: '🧸', notePos: 'bottom-left' }
    },
    {
      id: 4,
      src: '../malkin_4.MP4',
      caption: 'Like frames from the sweetest indie movie reel 🎞️',
      frameType: 'film-strip', // 4. Film-strip with 3 frames sliding slowly
      tilt: 0,
      secretMessage: "If our memories were a film reel, every single scene would be a masterpiece. Keep being the main character of your story! 🎬✨",
      decor: { note: 'living in cinema mode 🍿', sticker: '⭐', notePos: 'top-left' }
    },
    {
      id: 5,
      src: '../malkin_5.png',
      caption: 'Blossoming with warmth, kindness, and love 🌸',
      frameType: 'heart-vine', // 5. Heart-shaped frame with flowers & vine
      tilt: 2.2,
      secretMessage: "You have the biggest, gentlest heart. Thank you for always bringing so much warmth and care into the world! 🌷💖",
      decor: { note: 'sweetest soul ever 🌿', sticker: '💐', notePos: 'bottom-right' }
    },
    {
      id: 6,
      src: '../malkin_6.MP4',
      caption: 'Officially certified by the Royal Cat Committee 🐾',
      frameType: 'cat-peeking', // 6. Cat peeking over top, paws holding sides
      tilt: -2.0,
      secretMessage: "The cats had a meeting and voted unanimously: Malkin is their all-time favorite human! 100/10 purrs guaranteed 🐱👑",
      decor: { note: 'purr-fect companion 🐾', sticker: '🐱', notePos: 'top-right' }
    },
    {
      id: 7,
      src: [
        '../malkin_7_stack_1.png',
        '../malkin_7_stack_2.png',
        '../malkin_7_stack_3.png'
      ],
      caption: 'A stack of sweet snapshots tap to reveal each one! 🃏',
      frameType: 'stacked-pile', // 7. Stack of 3 tilted polaroids, tapping sends top away
      tilt: 1.5,
      secretMessage: "One snapshot could never be enough to capture all the wonderful sides of you. Here's to endless more smiles! 💌✨",
      decor: { note: 'tap the pile to shuffle! 👆', sticker: '💌', notePos: 'bottom-left' }
    },
    {
      id: 8,
      src: '../malkin_8.png',
      caption: 'The Golden Highlight: Queen Malkin in all her glory 👑✨',
      frameType: 'gold-ribbon', // 8. Big gold frame with sparkles and ribbon bow on top
      tilt: 0,
      secretMessage: "Golden, radiant, and utterly irreplaceable. May your new year of life be as brilliant and joyful as you are! 🌟🎁💖",
      decor: { note: 'my absolute favourite 💖', sticker: '👑', notePos: 'top-left' }
    }
  ],
  storyInterludes: [
    "and then there was this day... 🌸",
    "two ordinary people who became so important 💕",
    "a smile that brightens up everything ✨",
    "so many memories, and so many more ahead 💫"
  ],
  letter: {
    heading: 'A letter for you, Malkin 💌',
    body: `Dear Malkin,\n\nFrom the silly laughs to the quiet moments, having you in my life has been one of the greatest gifts. You bring warmth wherever you go, your kindness lights up every room, and your smile is genuinely contagious.\n\nI hope this birthday brings you as much happiness as you bring to everyone around you. Keep dreaming big, laughing loud, and being your wonderful, authentic self.\n\nAlways here for you,`,
    signature: '- [My name]',
    postageStamp: '🐱 Malkin',
    waxSeal: '💖'
  }
};

// ==========================================================================
// 3. SCRAPBOOK GALLERY CONTROLLER CLASS
// ==========================================================================
class ScrapbookGalleryManager {
  constructor(config) {
    this.config = config;
    this.streamContainer = document.getElementById('photosScrapbookStream');
    this.particlesContainer = document.getElementById('galleryParticles');
    this.flybysContainer = document.getElementById('galleryFlybysLayer');
    this.overlay = document.getElementById('photoGalleryOverlay');
    this.catTracker = document.getElementById('walkingCatTracker');
    this.pathLine = document.getElementById('connectingPathLine');
    this.isInitialized = false;
    this.letterTyped = false;
    this.candlesBlown = false;
    this.endingStarted = false;
    this.noClickCount = 0;
    this.soundFX = new EndingSoundFX();
    this._microInteractionsBound = false;
  }

  isVideoMedia(src) {
    if (typeof src !== 'string') return false;
    const clean = src.split('?')[0].split('#')[0].toLowerCase();
    return clean.endsWith('.mp4') || clean.endsWith('.webm') || clean.endsWith('.mov') || clean.endsWith('.ogg');
  }

  renderMedia(src, alt = '', extraClass = '') {
    const classes = `photo-develop-img photo-developing ${extraClass}`.trim();
    if (this.isVideoMedia(src)) {
      return `<video src="${src}" class="${classes}" autoplay loop muted playsinline webkit-playsinline preload="auto"></video>`;
    }
    return `<img src="${src}" class="${classes}" alt="${alt}" loading="lazy">`;
  }

  init() {
    if (this.isInitialized) return;
    this.isInitialized = true;

    this.renderPhotos();
    this.initBackgroundParticles();
    this.initFlybys();
    this.initObserver();
    this.initLetterSection();
    this.initCakeBlowout();
    this.initReplayButton();
    this.initScrollTracker();
  }

  renderPhotos() {
    if (!this.streamContainer) return;
    this.streamContainer.innerHTML = '';

    let interludeIndex = 0;

    this.config.photos.forEach((photo, idx) => {
      // Add cute crayon story interlude between photos
      if (idx > 0 && idx % 2 === 0 && interludeIndex < this.config.storyInterludes.length) {
        const interludeEl = document.createElement('div');
        interludeEl.className = 'scrapbook-story-interlude boiling';
        interludeEl.innerHTML = `<p>${this.config.storyInterludes[interludeIndex]}</p>`;
        this.streamContainer.appendChild(interludeEl);
        interludeIndex++;
      }

      const itemEl = this.createPhotoElement(photo, idx);
      this.streamContainer.appendChild(itemEl);
    });
  }

  createPhotoElement(photo, index) {
    const itemWrapper = document.createElement('div');
    itemWrapper.className = `gallery-item-wrapper frame-${photo.frameType}`;
    itemWrapper.setAttribute('data-index', index);

    // Common decor elements
    const notePosClass = photo.decor?.notePos === 'top-right' ? 'top: -16px; right: -12px;' :
      photo.decor?.notePos === 'bottom-left' ? 'bottom: -16px; left: -10px;' :
        photo.decor?.notePos === 'bottom-right' ? 'bottom: -16px; right: -10px;' :
          'top: -16px; left: -12px;';

    const decorHtml = `
      ${photo.decor?.note ? `<div class="frame-decor-note" style="${notePosClass}">${photo.decor.note}</div>` : ''}
      ${photo.decor?.sticker ? `<div class="frame-decor-sticker" style="top: 12px; right: -24px;">${photo.decor.sticker}</div>` : ''}
    `;

    // Common Card Back (Secret Message)
    const cardBackHtml = `
      <div class="card-back">
        <div class="card-back-washi"></div>
        <div class="card-back-stamp">
          <img src="../card_cats_top.png" alt="Cat Stamp">
          <span class="postmark">Malkin</span>
        </div>
        <div class="secret-message-title">Secret Note For You 💕</div>
        <p class="secret-message-text">${photo.secretMessage}</p>
        <div class="card-back-footer">Tap to flip back ↺</div>
      </div>
    `;

    const captionBoxHtml = `
      <div class="photo-caption-box">
        <span class="photo-caption-text" data-fulltext="${photo.caption}"></span>
      </div>
      <div class="flip-hint-badge">Tap for secret note 💌</div>
    `;

    // Frame-specific layouts
    if (photo.frameType === 'polaroid-tape') {
      itemWrapper.innerHTML = `
        <div class="card-3d-flipper" style="transform: rotate(${photo.tilt}deg)">
          <div class="card-front">
            <div class="washi-tape-pink"></div>
            <div class="photo-img-wrapper">
              ${this.renderMedia(photo.src, photo.caption)}
            </div>
            ${captionBoxHtml}
          </div>
          ${cardBackHtml}
        </div>
        ${decorHtml}
      `;
    } else if (photo.frameType === 'hanging-clothesline') {
      itemWrapper.innerHTML = `
        <div class="clothesline-string"></div>
        <div class="wooden-clothespin"></div>
        <div class="card-3d-flipper" style="transform: rotate(${photo.tilt}deg)">
          <div class="card-front">
            <div class="photo-img-wrapper">
              ${this.renderMedia(photo.src, photo.caption)}
            </div>
            ${captionBoxHtml}
          </div>
          ${cardBackHtml}
        </div>
        ${decorHtml}
      `;
    } else if (photo.frameType === 'scrapbook-corners') {
      itemWrapper.innerHTML = `
        <div class="card-3d-flipper" style="transform: rotate(${photo.tilt}deg)">
          <div class="card-front">
            <div class="photo-img-wrapper">
              <div class="photo-corner corner-tl"></div>
              <div class="photo-corner corner-tr"></div>
              <div class="photo-corner corner-bl"></div>
              <div class="photo-corner corner-br"></div>
              ${this.renderMedia(photo.src, photo.caption)}
            </div>
            ${captionBoxHtml}
          </div>
          ${cardBackHtml}
        </div>
        ${decorHtml}
      `;
    } else if (photo.frameType === 'film-strip') {
      const photosArray = Array.isArray(photo.src) ? photo.src : [photo.src, photo.src, photo.src];
      const sprockets = Array(12).fill('<span class="sprocket-hole"></span>').join('');
      const cells = photosArray.map(s => `
        <div class="film-cell">
          ${this.renderMedia(s, "Film Frame")}
        </div>
      `).join('');

      itemWrapper.innerHTML = `
        <div class="card-3d-flipper">
          <div class="card-front">
            <div class="film-sprockets-row sprockets-top">${sprockets}</div>
            <div class="film-cells-stream">${cells}</div>
            <div class="film-sprockets-row sprockets-bottom">${sprockets}</div>
            ${captionBoxHtml}
          </div>
          ${cardBackHtml}
        </div>
        ${decorHtml}
      `;
    } else if (photo.frameType === 'heart-vine') {
      itemWrapper.innerHTML = `
        <div class="card-3d-flipper" style="transform: rotate(${photo.tilt}deg)">
          <div class="card-front">
            <div class="heart-mask-wrapper">
              ${this.renderMedia(photo.src, photo.caption)}
            </div>
            <div class="heart-vine-wreath">
              <span class="vine-leaf-1">🌿🌸</span>
              <span class="vine-leaf-2">🌸🌿</span>
              <span class="vine-leaf-3">🌷</span>
              <span class="vine-leaf-4">💐</span>
            </div>
            ${captionBoxHtml}
          </div>
          ${cardBackHtml}
        </div>
        ${decorHtml}
      `;
    } else if (photo.frameType === 'cat-peeking') {
      itemWrapper.innerHTML = `
        <div class="cat-peeking-top">
          <img src="../card_cats_top.png" alt="Peeking Cats">
        </div>
        <div class="cat-paw-left">🐾</div>
        <div class="cat-paw-right">🐾</div>
        <div class="card-3d-flipper" style="transform: rotate(${photo.tilt}deg)">
          <div class="card-front">
            <div class="photo-img-wrapper">
              ${this.renderMedia(photo.src, photo.caption)}
            </div>
            ${captionBoxHtml}
          </div>
          ${cardBackHtml}
        </div>
        ${decorHtml}
      `;
    } else if (photo.frameType === 'stacked-pile') {
      const photosArray = Array.isArray(photo.src) ? photo.src : [photo.src, photo.src, photo.src];
      let cardsHtml = '';
      photosArray.forEach((s, pIdx) => {
        cardsHtml += `
          <div class="pile-card pile-card-${pIdx + 1}" data-pile-idx="${pIdx}">
            <div class="photo-img-wrapper">
              ${this.renderMedia(s, `Pile snapshot ${pIdx + 1}`)}
            </div>
          </div>
        `;
      });

      itemWrapper.innerHTML = `
        <div class="pile-shuffle-badge">🃏 Tap pile to shuffle! (<span class="pile-count-active">1</span>/3)</div>
        <div class="pile-container" id="pileStackContainer">
          ${cardsHtml}
        </div>
        <div class="photo-caption-box">
          <span class="photo-caption-text" data-fulltext="${photo.caption}"></span>
        </div>
        ${decorHtml}
      `;

      // Wire stack pile shuffle
      this.wirePileShuffle(itemWrapper, photosArray.length);
    } else if (photo.frameType === 'gold-ribbon') {
      itemWrapper.innerHTML = `
        <svg class="gold-ribbon-bow" viewBox="0 0 60 45">
          <path d="M 30 18 Q 12 0 10 16 Q 10 28 30 22 Q 50 28 50 16 Q 48 0 30 18 Z" fill="#FFB300" stroke="#B27B00" stroke-width="1.8"/>
          <circle cx="30" cy="20" r="5.5" fill="#FFE082" stroke="#B27B00" stroke-width="1.8"/>
          <path d="M 26 24 Q 16 38 10 42" stroke="#FFB300" stroke-width="3" fill="none" stroke-linecap="round"/>
          <path d="M 34 24 Q 44 38 50 42" stroke="#FFB300" stroke-width="3" fill="none" stroke-linecap="round"/>
        </svg>
        <span class="gold-sparkle-star star-tl">✨</span>
        <span class="gold-sparkle-star star-tr">⭐</span>
        <span class="gold-sparkle-star star-bl">⭐</span>
        <span class="gold-sparkle-star star-br">✨</span>
        <div class="card-3d-flipper">
          <div class="card-front">
            <div class="photo-img-wrapper">
              ${this.renderMedia(photo.src, photo.caption)}
            </div>
            ${captionBoxHtml}
          </div>
          ${cardBackHtml}
        </div>
        ${decorHtml}
      `;
    }

    // Flip card click listener (except for stacked-pile which handles its own shuffle)
    if (photo.frameType !== 'stacked-pile') {
      const flipper = itemWrapper.querySelector('.card-3d-flipper');
      if (flipper) {
        flipper.addEventListener('click', (e) => {
          e.stopPropagation();
          const isFlipped = itemWrapper.classList.toggle('is-flipped');

          // Pause video when viewing back of card, resume when flipping back to front
          const videos = itemWrapper.querySelectorAll('video');
          videos.forEach(v => {
            if (isFlipped) {
              v.pause();
            } else {
              v.play().catch(() => {});
            }
          });

          // Trigger confetti burst on first flip
          if (isFlipped && !itemWrapper.hasConfettiPopped) {
            itemWrapper.hasConfettiPopped = true;
            this.triggerCardConfetti(flipper);
          }
        });
      }
    }

    return itemWrapper;
  }

  wirePileShuffle(itemWrapper, totalCards) {
    const pileContainer = itemWrapper.querySelector('#pileStackContainer');
    const badgeCount = itemWrapper.querySelector('.pile-count-active');
    if (!pileContainer) return;

    let activeCardIndex = 0;

    pileContainer.addEventListener('click', () => {
      const cards = pileContainer.querySelectorAll('.pile-card');
      if (cards.length === 0) return;

      const topCard = cards[cards.length - 1];
      // Animate top card throwing away
      topCard.style.transform = 'translateX(130%) rotate(24deg) scale(0.85)';
      topCard.style.opacity = '0';

      setTimeout(() => {
        // Move to bottom of stack
        pileContainer.insertBefore(topCard, pileContainer.firstChild);
        topCard.style.transform = '';
        topCard.style.opacity = '';

        // Reassign stack rotation classes
        const refreshedCards = pileContainer.querySelectorAll('.pile-card');
        refreshedCards.forEach((c, i) => {
          c.className = `pile-card pile-card-${i + 1}`;
        });

        activeCardIndex = (activeCardIndex + 1) % totalCards;
        if (badgeCount) badgeCount.textContent = activeCardIndex + 1;

        // Mini sparkle
        this.triggerCardConfetti(pileContainer);
      }, 350);
    });
  }

  triggerCardConfetti(element) {
    if (typeof confetti !== 'function') return;
    const rect = element.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 28,
      spread: 55,
      startVelocity: 35,
      scalar: 1.1,
      origin: { x: Math.max(0.1, Math.min(0.9, x)), y: Math.max(0.1, Math.min(0.9, y)) },
      colors: ['#FFB3C6', '#FFD23F', '#B284FF', '#61FF7E', '#FF69B4', '#FFA07A']
    });
  }

  initObserver() {
    // IntersectionObserver for Polaroid develop effect and typewriter captions
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const wrapper = entry.target;

          // 1. Trigger Polaroid develop effect
          const developingImages = wrapper.querySelectorAll('.photo-develop-img.photo-developing');
          developingImages.forEach((img, idx) => {
            setTimeout(() => {
              img.classList.remove('photo-developing');
              img.classList.add('developed');
              if (img.tagName === 'VIDEO' && img.paused) {
                img.play().catch(() => {});
              }
            }, 180 + idx * 80);
          });

          // 2. Trigger Typewriter caption
          const captionEl = wrapper.querySelector('.photo-caption-text');
          if (captionEl && !captionEl.hasTyped) {
            captionEl.hasTyped = true;
            this.typewriterText(captionEl, captionEl.getAttribute('data-fulltext') || '');
          }
        }
      });
    }, { threshold: 0.15 });

    const items = this.streamContainer.querySelectorAll('.gallery-item-wrapper');
    items.forEach(el => observer.observe(el));
  }

  typewriterText(element, text) {
    element.textContent = '';
    let i = 0;
    const speed = 40;
    function typeChar() {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
        setTimeout(typeChar, speed);
      }
    }
    typeChar();
  }

  initBackgroundParticles() {
    if (!this.particlesContainer) return;
    const emojis = ['💖', '✨', '⭐', '🐱', '🌸', '🐾', '💕', '🌷', '🎂'];
    const totalParticles = 16;

    for (let i = 0; i < totalParticles; i++) {
      const p = document.createElement('div');
      p.className = 'floating-particle';
      p.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      p.style.left = `${Math.random() * 95}%`;
      p.style.fontSize = `${Math.floor(Math.random() * 14 + 16)}px`;
      p.style.animationDuration = `${Math.random() * 12 + 14}s`;
      p.style.animationDelay = `${Math.random() * 10}s`;
      p.style.setProperty('--drift-x', `${(Math.random() - 0.5) * 80}px`);
      p.style.setProperty('--rot-end', `${(Math.random() - 0.5) * 120}deg`);
      this.particlesContainer.appendChild(p);
    }
  }

  initFlybys() {
    if (!this.flybysContainer) return;

    const flybyTypes = ['rocket', 'plane', 'star'];
    let flybyIndex = 0;

    const spawnFlyby = () => {
      if (!this.overlay || !this.overlay.classList.contains('active')) return;

      const type = flybyTypes[flybyIndex % flybyTypes.length];
      flybyIndex++;

      const fEl = document.createElement('div');
      fEl.className = `flyby-object flyby-${type}`;

      if (type === 'rocket') {
        fEl.innerHTML = `<span style="font-size: 38px;">🚀✨</span>`;
      } else if (type === 'plane') {
        fEl.innerHTML = `<span style="font-size: 34px;">✈️💌</span>`;
      } else {
        fEl.innerHTML = `<span style="font-size: 36px;">🌠⭐</span>`;
      }

      this.flybysContainer.appendChild(fEl);

      setTimeout(() => {
        if (fEl && fEl.parentNode) fEl.parentNode.removeChild(fEl);
      }, 9000);
    };

    // Spawn first fly-by at 4s, then every 20s
    setTimeout(spawnFlyby, 4000);
    setInterval(spawnFlyby, 20000);
  }

  initLetterSection() {
    const letterHeading = document.getElementById('letterHeading');
    const letterBody = document.getElementById('letterBodyText');
    const letterSig = document.getElementById('letterSignature');
    const letterWrapper = document.getElementById('letterSectionWrapper');

    if (!letterWrapper || !letterBody) return;

    if (letterHeading) letterHeading.textContent = this.config.letter.heading;
    if (letterSig) letterSig.textContent = this.config.letter.signature;

    const letterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !this.letterTyped) {
          this.letterTyped = true;
          this.typewriterText(letterBody, this.config.letter.body);
        }
      });
    }, { threshold: 0.2 });

    letterObserver.observe(letterWrapper);
  }

  initCakeBlowout() {
    const cakeBox = document.getElementById('interactiveCakeBox');
    const btnBlow = document.getElementById('btnBlowCandles');
    const banner = document.getElementById('celebrationBurstBanner');
    const candlesBox = document.querySelector('.blowout-candles');

    const handleBlowout = () => {
      if (this.candlesBlown) return;
      this.candlesBlown = true;

      // 1. Extinguish candle flames and release smoke puffs
      if (candlesBox) candlesBox.classList.add('is-blown');
      if (btnBlow) btnBlow.classList.add('hidden');

      // 2. Launch Grand Celebration Confetti Burst
      if (typeof confetti === 'function') {
        // Center grand blast
        confetti({
          particleCount: 100,
          spread: 100,
          origin: { x: 0.5, y: 0.6 },
          colors: ['#FF1493', '#FFD700', '#00CED1', '#FF4500', '#99C96A', '#8377E4']
        });

        // Golden stars blast
        confetti({
          particleCount: 60,
          spread: 80,
          shapes: ['star'],
          scalar: 1.3,
          origin: { x: 0.5, y: 0.55 },
          colors: ['#FFD700', '#FFA500', '#FFF8DC']
        });
      }

      // 3. Show Celebration Banner with Cheering Cats inside the card
      setTimeout(() => {
        if (banner) {
          banner.classList.add('active');
          setTimeout(() => {
            const overlay = document.getElementById('photoGalleryOverlay');
            if (overlay) {
              overlay.scrollTo({ top: overlay.scrollHeight, behavior: 'smooth' });
            }
          }, 250);
        }
      }, 500);

      // 4. After the card finishes, start the redesigned ending sequence OUTSIDE the frame
      setTimeout(() => {
        this.initEndingSequence();
      }, 1400);
    };

    if (btnBlow) btnBlow.addEventListener('click', handleBlowout);
    if (cakeBox) cakeBox.addEventListener('click', handleBlowout);
  }

  /* ------------------------------------------------------------------------
     STEP 1: "Did you like it?" Question & Hopeful Cat Initiation
     ------------------------------------------------------------------------ */
  initEndingSequence() {
    if (this.endingStarted) return;
    this.endingStarted = true;

    const wrapper = document.getElementById('endingSequenceWrapper');
    const heading = document.getElementById('endingQuestionHeading');
    const btnYes = document.getElementById('endingBtnYes');
    const btnNo = document.getElementById('endingBtnNo');
    const yesLabel = document.getElementById('endingYesLabel');
    const noLabel = document.getElementById('endingNoLabel');
    const bubbleText = document.getElementById('endingBubbleText');

    if (!wrapper) return;

    if (heading) heading.textContent = ENDING_CONFIG.question;
    if (yesLabel) yesLabel.textContent = ENDING_CONFIG.yesInitialLabel;
    if (noLabel) noLabel.textContent = "No 🥺";
    if (bubbleText) bubbleText.textContent = ENDING_CONFIG.initialBubble;

    wrapper.classList.add('active');

    // Smoothly scroll down so the question and buttons are comfortably in view
    setTimeout(() => {
      if (this.overlay) {
        this.overlay.scrollTo({ top: this.overlay.scrollHeight, behavior: 'smooth' });
      }
    }, 250);

    // Micro-interactions (sparkle cursor trail and background hearts)
    this.initEndingMicroInteractions();

    // Reset NO click counter
    this.noClickCount = 0;

    // Handle NO button clicks
    if (btnNo) {
      btnNo.addEventListener('click', (e) => {
        e.stopPropagation();
        this.handleNoClick();
      });
    }

    // Handle YES button click
    if (btnYes) {
      btnYes.addEventListener('click', (e) => {
        e.stopPropagation();
        this.handleYesClick();
      });
    }
  }

  /* ------------------------------------------------------------------------
     STEP 2: The "No" Button Behavior (Playful, Cute & Interactive)
     ------------------------------------------------------------------------ */
  handleNoClick() {
    if (this.noClickCount >= 5) return;
    this.noClickCount++;

    const btnYes = document.getElementById('endingBtnYes');
    const btnNo = document.getElementById('endingBtnNo');
    const yesLabel = document.getElementById('endingYesLabel');
    const noLabel = document.getElementById('endingNoLabel');
    const bubbleText = document.getElementById('endingBubbleText');
    const catCompanion = document.getElementById('endingCatCompanion');
    const bubble = document.getElementById('endingCatSpeechBubble');

    this.soundFX.pop();

    const isMobile = window.innerWidth < 480;
    // 1. YES button grows bigger and bigger with a springy bounce & extra sparkles
    if (btnYes) {
      const maxScale = isMobile ? 1.35 : 1.75;
      const scale = Math.min(maxScale, 1 + this.noClickCount * 0.22);
      btnYes.style.transform = `scale(${scale})`;
      btnYes.style.boxShadow = `0 ${8 + this.noClickCount * 3}px ${24 + this.noClickCount * 4}px rgba(255, 111, 145, 0.45), 0 3px 0 #D9456B`;

      if (typeof confetti === 'function') {
        const rect = btnYes.getBoundingClientRect();
        confetti({
          particleCount: 15 + this.noClickCount * 5,
          spread: 40 + this.noClickCount * 10,
          origin: {
            x: (rect.left + rect.width / 2) / window.innerWidth,
            y: (rect.top + rect.height / 2) / window.innerHeight
          },
          colors: ['#FF6F91', '#FFD700', '#FFAAA6', '#FFFFFF']
        });
      }
    }

    // 2. NO button shrinks slightly and shakes a little
    if (btnNo) {
      const noScale = Math.max(0.68, 1 - this.noClickCount * 0.08);
      btnNo.style.transform = `scale(${noScale})`;
      btnNo.classList.remove('shake');
      void btnNo.offsetWidth;
      btnNo.classList.add('shake');
    }

    // 3. No label changes with each click
    const stepConfig = ENDING_CONFIG.noSteps[Math.min(this.noClickCount - 1, ENDING_CONFIG.noSteps.length - 1)];
    if (noLabel && stepConfig) {
      noLabel.textContent = stepConfig.label;
    }

    // 4. Cat reacts: confused -> sad -> pleading -> teary -> crying
    if (catCompanion && stepConfig) {
      catCompanion.className = `ending-cat-companion cat-mood-${stepConfig.mood}`;
    }

    // 5. Speech bubble above the cat changes too
    if (bubbleText && stepConfig) {
      bubbleText.textContent = stepConfig.bubble;
      if (bubble) {
        bubble.style.animation = 'none';
        void bubble.offsetWidth;
        bubble.style.animation = 'bubblePopIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';
      }
    }

    // After 5th NO click: NO button vanishes with cute pop animation
    if (this.noClickCount >= 5) {
      if (btnNo) {
        btnNo.classList.add('pop-vanish');
        setTimeout(() => {
          btnNo.style.display = 'none';
        }, 600);
      }
      if (yesLabel) {
        yesLabel.textContent = ENDING_CONFIG.yesFinalLabel;
      }
      if (btnYes) {
        btnYes.style.animation = 'heartbeatPulse 1.4s ease-in-out infinite';
      }
      if (bubbleText) {
        bubbleText.textContent = "It had to be YES! 😌💖";
      }
    }
  }

  /* ------------------------------------------------------------------------
     STEP 3: Celebration After YES (4-5 Seconds of Pure Joy)
     ------------------------------------------------------------------------ */
  handleYesClick() {
    const questionSec = document.getElementById('endingQuestionSection');
    const celebrationSec = document.getElementById('endingCelebrationSection');
    const catCompanion = document.getElementById('endingCatCompanion');
    const btnYes = document.getElementById('endingBtnYes');
    const title = document.getElementById('celebrationMainTitle');
    const subtitle = document.getElementById('celebrationSubtitle');

    this.soundFX.pop();
    setTimeout(() => this.soundFX.sparkle(), 200);

    // Cat jumps and cheers with royal celebratory crown
    if (catCompanion) {
      catCompanion.className = 'ending-cat-companion cat-mood-cheering';
    }

    // Hearts burst from YES button
    if (btnYes) {
      btnYes.disabled = true;
      const rect = btnYes.getBoundingClientRect();
      if (typeof confetti === 'function') {
        confetti({
          particleCount: 50,
          spread: 80,
          origin: {
            x: (rect.left + rect.width / 2) / window.innerWidth,
            y: (rect.top + rect.height / 2) / window.innerHeight
          },
          colors: ['#FF1493', '#FF69B4', '#FFB6C1', '#FFD700']
        });
      }
    }

    // Fade out question section smoothly
    if (questionSec) {
      questionSec.classList.add('fade-out');
    }

    // Reveal Step 3 Celebration Message
    if (celebrationSec) {
      if (title) title.textContent = ENDING_CONFIG.celebrationTitle;
      if (subtitle) subtitle.textContent = ENDING_CONFIG.celebrationSubtitle;
      celebrationSec.classList.add('active');
    }

    // 4-5 second celebration: confetti, fireworks, falling petals, floating balloons
    this.triggerGrandCelebration();

    // After 4.5s celebration, reveal Step 4 "Wanna watch it again?" magic button
    setTimeout(() => {
      this.revealMagicReplayButton();
    }, 4500);
  }

  triggerGrandCelebration() {
    // 1. Confetti cannons & fireworks
    if (typeof confetti === 'function') {
      // Immediate cannon from left and right
      confetti({
        particleCount: 80,
        angle: 60,
        spread: 70,
        origin: { x: 0, y: 0.7 },
        colors: ['#FF1493', '#FFD700', '#00CED1', '#FF69B4', '#FFA07A']
      });
      confetti({
        particleCount: 80,
        angle: 120,
        spread: 70,
        origin: { x: 1, y: 0.7 },
        colors: ['#FF1493', '#FFD700', '#00CED1', '#FF69B4', '#FFA07A']
      });

      // Periodic bursts across 4 seconds
      const celebrationInterval = setInterval(() => {
        confetti({
          particleCount: 40,
          spread: 90,
          origin: { x: Math.random() * 0.8 + 0.1, y: Math.random() * 0.4 + 0.3 },
          colors: ['#FF1493', '#FFD700', '#FF85A2', '#8377E4', '#FFA07A']
        });
      }, 700);

      setTimeout(() => clearInterval(celebrationInterval), 4000);
    }

    // 2. Falling cherry-blossom and rose petals
    this.spawnFallingPetals();

    // 3. Floating balloons rising across screen
    this.spawnFloatingBalloons();
  }

  spawnFallingPetals() {
    const petals = ['🌸', '🌹', '🌷', '🌺', '✨'];
    const count = 28;
    for (let i = 0; i < count; i++) {
      setTimeout(() => {
        const petal = document.createElement('div');
        petal.className = 'ending-falling-petal';
        petal.textContent = petals[Math.floor(Math.random() * petals.length)];
        petal.style.left = `${Math.random() * 95}vw`;
        petal.style.fontSize = `${Math.floor(Math.random() * 14 + 18)}px`;
        const duration = Math.random() * 2.5 + 3.5;
        petal.style.animationDuration = `${duration}s`;
        document.body.appendChild(petal);
        setTimeout(() => petal.remove(), duration * 1000 + 100);
      }, i * 140);
    }
  }

  spawnFloatingBalloons() {
    const balloonImages = [
      '../b1.png', '../b2.png', '../b3.png',
      '../b4.png', '../b5.png', '../b6.png', '../b7.png'
    ];
    const count = 12;
    for (let i = 0; i < count; i++) {
      setTimeout(() => {
        const b = document.createElement('img');
        b.className = 'ending-floating-balloon';
        b.src = balloonImages[i % balloonImages.length];
        b.alt = 'Celebration Balloon';
        b.style.left = `${Math.random() * 88 + 4}vw`;
        b.style.bottom = '-80px';
        b.style.width = `${Math.floor(Math.random() * 22 + 45)}px`;
        const duration = Math.random() * 2 + 5;
        b.style.animationDuration = `${duration}s`;
        document.body.appendChild(b);
        setTimeout(() => b.remove(), duration * 1000 + 100);
      }, i * 320);
    }
  }

  /* ------------------------------------------------------------------------
     STEP 4: Redesigned "Wanna watch it again?" Magic Button (OUTSIDE the frame)
     ------------------------------------------------------------------------ */
  revealMagicReplayButton() {
    const replayContainer = document.getElementById('finalRestartContainer');
    const replayText = document.getElementById('magicReplayText');
    const loveFooter = document.getElementById('endingLoveFooter');

    if (!replayContainer) return;
    if (replayText) replayText.textContent = ENDING_CONFIG.magicReplayLabel;
    if (loveFooter) {
      const line = loveFooter.querySelector('.love-footer-line');
      if (line) line.textContent = ENDING_CONFIG.footerLoveText;
    }

    replayContainer.classList.add('active');

    // Smooth scroll so the magic button is comfortably centered in view
    setTimeout(() => {
      if (this.overlay) {
        this.overlay.scrollTo({ top: this.overlay.scrollHeight, behavior: 'smooth' });
      }
    }, 250);
  }

  initReplayButton() {
    const btnRestart = document.getElementById('btnWannaWatchAgain');
    if (!btnRestart) return;

    // Hover / tap sound & burst
    btnRestart.addEventListener('mouseenter', () => {
      this.soundFX.whoosh();
    });

    btnRestart.addEventListener('click', () => {
      btnRestart.disabled = true;
      this.soundFX.sparkle();

      // Confetti celebratory burst
      if (typeof confetti === 'function') {
        confetti({
          particleCount: 90,
          spread: 90,
          origin: { x: 0.5, y: 0.8 },
          colors: ['#FF1493', '#FFD700', '#00CED1', '#FF85A2', '#D8B4E2']
        });
      }

      // Smooth paper wipe overlay animation
      const wipe = document.getElementById('wipeOverlay');
      if (wipe) {
        wipe.classList.remove('erasing');
        void wipe.offsetWidth;
        wipe.classList.add('erasing');
      }

      setTimeout(() => {
        // Reset NO click counter
        this.noClickCount = 0;
        this.endingStarted = false;

        // Clear all saved progress flags while preserving mute choice
        try {
          const savedMute = localStorage.getItem('birthday_music_muted');
          sessionStorage.clear();
          localStorage.removeItem('malkin_page1_completed');
          localStorage.removeItem('malkin_current_view');
          localStorage.removeItem('malkin_max_view');
          localStorage.removeItem('malkin_surprise_opened');
          localStorage.removeItem('page1Completed');
          if (savedMute !== null) {
            localStorage.setItem('birthday_music_muted', savedMute);
          }
        } catch (e) { }

        // Notify parent window to cleanly restart from stage 0
        if (window.parent && window.parent !== window) {
          window.parent.postMessage({ action: 'restartExperience' }, '*');
        } else {
          window.location.href = '../index.html';
        }
      }, 550);
    });
  }

  /* ------------------------------------------------------------------------
     Extra Effects: Sparkle Trail & Tap Heart Pop Micro-Interactions
     ------------------------------------------------------------------------ */
  initEndingMicroInteractions() {
    if (this._microInteractionsBound) return;
    this._microInteractionsBound = true;

    // Sparkle trail on pointer / cursor move
    let lastSparkleTime = 0;
    const handleSparkleTrail = (e) => {
      const now = Date.now();
      if (now - lastSparkleTime < 80) return;
      lastSparkleTime = now;

      const dot = document.createElement('div');
      dot.className = 'sparkle-trail-dot';
      const size = Math.floor(Math.random() * 8 + 6);
      dot.style.width = `${size}px`;
      dot.style.height = `${size}px`;
      dot.style.left = `${e.clientX}px`;
      dot.style.top = `${e.clientY}px`;
      document.body.appendChild(dot);
      setTimeout(() => dot.remove(), 700);
    };

    window.addEventListener('pointermove', handleSparkleTrail, { passive: true });

    // Cute small hearts pop when tapping empty space on the gallery
    if (this.overlay) {
      this.overlay.addEventListener('click', (e) => {
        // Only trigger if clicked outside interactive elements
        if (e.target.closest('button') || e.target.closest('.card-3d-flipper') || e.target.closest('.interactive-cake-box')) {
          return;
        }
        const heart = document.createElement('div');
        heart.className = 'tap-heart-pop';
        const hearts = ['💖', '💕', '🌸', '✨', '🐾'];
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = `${e.clientX}px`;
        heart.style.top = `${e.clientY}px`;
        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 850);
      });
    }
  }

  initScrollTracker() {
    if (!this.overlay || !this.catTracker) return;

    this.overlay.addEventListener('scroll', () => {
      const scrollTop = this.overlay.scrollTop;
      const scrollHeight = this.overlay.scrollHeight - this.overlay.clientHeight;
      const progress = scrollHeight > 0 ? Math.min(1, Math.max(0, scrollTop / scrollHeight)) : 0;

      // Move walking cat tracker along the stream
      const topOffset = 220 + (progress * (this.overlay.scrollHeight - 500));
      this.catTracker.style.top = `${topOffset}px`;
    }, { passive: true });
  }
}

// Instantiate on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  window.crayonIntro = new CrayonIntroController(INTRO_CONFIG);
  window.scrapbookGallery = new ScrapbookGalleryManager(GALLERY_CONFIG);

  // Notify parent that intro is fully loaded and ready
  if (window.parent && window.parent !== window) {
    window.parent.postMessage({ action: 'introReady' }, '*');
  }

  // Listen for auto-start and view change messages from main page
  window.addEventListener('message', (e) => {
    if (!e.data) return;
    if (e.data.action === 'startIntroAuto') {
      if (window.crayonIntro) {
        window.crayonIntro.isPaused = false;
        if (!window.crayonIntro.isPlaying) {
          window.crayonIntro.startIntro();
        }
      }
    } else if (e.data.action === 'pauseView') {
      if (window.crayonIntro) {
        window.crayonIntro.isPaused = true;
      }
    } else if (e.data.action === 'showIntroView') {
      if (window.crayonIntro && window.crayonIntro.hasEnded) {
        // Intro has already completed: never hide gallery to reveal blank paper stage
        const gallery = document.getElementById('photoGalleryOverlay');
        if (gallery) {
          gallery.classList.add('active');
        }
        return;
      }
      if (window.crayonIntro) {
        window.crayonIntro.isPaused = false;
        window.crayonIntro.updateTopControlsUI('intro');
      }
      const gallery = document.getElementById('photoGalleryOverlay');
      if (gallery) {
        gallery.classList.remove('active');
      }
    } else if (e.data.action === 'showGalleryView') {
      if (window.crayonIntro) {
        window.crayonIntro.isPaused = false;
        window.crayonIntro.updateTopControlsUI('gallery');
      }
      const gallery = document.getElementById('photoGalleryOverlay');
      if (gallery) {
        gallery.classList.add('active');
        if (window.scrapbookGallery) {
          window.scrapbookGallery.init();
        }
      }
    }
  });
});
