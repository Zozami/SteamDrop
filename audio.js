// ==========================================
// STEAM CASE OPENER — HIGH-END MECHANICAL AUDIO ENGINE
// Studio-Grade Physical Ratchet, Precision Lock & ASMR Reward Chimes
// Specially tuned for rapid unboxing, zero ear-fatigue, and spam-friendly clarity
// ==========================================

class SoundEngine {
  constructor() {
    this.ctx = null;
    this.masterGain = null;
    this.compressor = null;
    this.enabled = true;
    this.lastTickTime = 0;
    this.lastWinTime = 0;
    this.activeVoiceNodes = new Set();
    this.clickBuffer = null;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();

      // Master Studio Dynamics Compressor & Limiter
      // Prevents clipping, controls peak transients, and ensures spamming never distorts
      this.compressor = this.ctx.createDynamicsCompressor();
      this.compressor.threshold.setValueAtTime(-10, this.ctx.currentTime);
      this.compressor.knee.setValueAtTime(8, this.ctx.currentTime);
      this.compressor.ratio.setValueAtTime(6, this.ctx.currentTime);
      this.compressor.attack.setValueAtTime(0.002, this.ctx.currentTime);
      this.compressor.release.setValueAtTime(0.06, this.ctx.currentTime);

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.enabled ? 0.85 : 0.0, this.ctx.currentTime);

      this.masterGain.connect(this.compressor);
      this.compressor.connect(this.ctx.destination);

      this._generateClickBuffer();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  setMuted(muted) {
    this.enabled = !muted;
    this.init();
    if (this.ctx && this.masterGain) {
      this.masterGain.gain.cancelScheduledValues(this.ctx.currentTime);
      this.masterGain.gain.setValueAtTime(this.enabled ? 0.85 : 0.0, this.ctx.currentTime);
    }
  }

  // Pre-generate pristine tactile noise impulse for snappy mechanical clicks
  _generateClickBuffer() {
    if (!this.ctx) return;
    const len = Math.floor(this.ctx.sampleRate * 0.012);
    this.clickBuffer = this.ctx.createBuffer(1, len, this.ctx.sampleRate);
    const data = this.clickBuffer.getChannelData(0);
    for (let i = 0; i < len; i++) {
      // Exponentially decaying white/pink noise burst
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (len * 0.18));
    }
  }

  // Register an active audio node to allow graceful choke when spamming
  _trackNode(gainNode) {
    this.activeVoiceNodes.add(gainNode);
  }

  // Gracefully duck previous active voices if too many accumulate
  _chokePreviousVoices() {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    for (const gainNode of this.activeVoiceNodes) {
      try {
        gainNode.gain.cancelScheduledValues(now);
        gainNode.gain.setValueAtTime(gainNode.gain.value, now);
        gainNode.gain.linearRampToValueAtTime(0.0001, now + 0.04);
      } catch (_) {}
    }
    this.activeVoiceNodes.clear();
  }

  // =========================================================================
  // 1. SPIN START (Crisp Lever/Case Open Whoosh)
  // Subtle, snappy, non-intrusive 160ms aerodynamic release
  // =========================================================================
  playSpinStart() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const out = this.masterGain;

    // High-frequency tactile latch release
    const latchOsc = this.ctx.createOscillator();
    const latchGain = this.ctx.createGain();
    latchOsc.type = 'sine';
    latchOsc.frequency.setValueAtTime(1400, now);
    latchOsc.frequency.exponentialRampToValueAtTime(320, now + 0.04);
    latchGain.gain.setValueAtTime(0.18, now);
    latchGain.gain.exponentialRampToValueAtTime(0.001, now + 0.045);
    latchOsc.connect(latchGain);
    latchGain.connect(out);
    latchOsc.start(now);
    latchOsc.stop(now + 0.05);

    // Smooth airy whoosh (bandpassed noise glide)
    if (this.clickBuffer) {
      const noiseSource = this.ctx.createBufferSource();
      noiseSource.buffer = this.clickBuffer;
      const filter = this.ctx.createBiquadFilter();
      const gain = this.ctx.createGain();

      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(400, now);
      filter.frequency.exponentialRampToValueAtTime(1800, now + 0.12);
      filter.Q.setValueAtTime(1.8, now);

      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);

      noiseSource.connect(filter);
      filter.connect(gain);
      gain.connect(out);
      noiseSource.start(now);
    }
  }

  // =========================================================================
  // 2. CS:GO STYLE RATCHET WHEEL TICK (Tactile Mechanical Pin Click)
  // Clean, snappy, ultra-crisp with organic micro-pitch variations
  // =========================================================================
  playTick(progress = 0) {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    // Throttle minimum interval to avoid jitter overload
    if (now - this.lastTickTime < 0.015) return;
    this.lastTickTime = now;

    const out = this.masterGain;

    // Organic micro-pitch variation (+/- 6%) so clicks never sound robotic
    const pitchJitter = 0.94 + Math.random() * 0.12;
    // As wheel decelerates (progress -> 1), tick becomes slightly more resonant and solid
    const decelFactor = 1 - (progress * 0.25);
    const clickFreq = (2400 * decelFactor) * pitchJitter;

    // Layer 1: Crisp Snap Impulse (High-frequency transient)
    if (this.clickBuffer) {
      const snapSrc = this.ctx.createBufferSource();
      snapSrc.buffer = this.clickBuffer;

      const snapFilter = this.ctx.createBiquadFilter();
      snapFilter.type = 'bandpass';
      snapFilter.frequency.setValueAtTime(clickFreq, now);
      snapFilter.Q.setValueAtTime(4.5, now);

      const snapGain = this.ctx.createGain();
      // Fast ticks are light; ending ticks have slightly more presence
      const volume = (0.16 + progress * 0.14);
      snapGain.gain.setValueAtTime(volume, now);
      snapGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.018);

      snapSrc.connect(snapFilter);
      snapFilter.connect(snapGain);
      snapGain.connect(out);
      snapSrc.start(now);
    }

    // Layer 2: Tactile Mechanical Tooth Thump (Micro body pop)
    const bodyOsc = this.ctx.createOscillator();
    const bodyGain = this.ctx.createGain();
    bodyOsc.type = 'sine';

    const bodyBase = (520 - progress * 140) * pitchJitter;
    bodyOsc.frequency.setValueAtTime(bodyBase, now);
    bodyOsc.frequency.exponentialRampToValueAtTime(110, now + 0.02);

    const bodyVol = 0.12 + (progress * 0.18);
    bodyGain.gain.setValueAtTime(bodyVol, now);
    bodyGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.022);

    bodyOsc.connect(bodyGain);
    bodyGain.connect(out);
    bodyOsc.start(now);
    bodyOsc.stop(now + 0.025);
  }

  // =========================================================================
  // 3. STOP LOCK (Marker Mechanical Lock-In Snap)
  // Definitive, snappy mechanical lock snap with zero lingering rumble
  // =========================================================================
  playStopLock() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const out = this.masterGain;

    // 1. Crisp Metallic Tooth Catch (high snap)
    const toothOsc = this.ctx.createOscillator();
    const toothGain = this.ctx.createGain();
    toothOsc.type = 'triangle';
    toothOsc.frequency.setValueAtTime(1850, now);
    toothOsc.frequency.exponentialRampToValueAtTime(420, now + 0.035);
    toothGain.gain.setValueAtTime(0.32, now);
    toothGain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
    toothOsc.connect(toothGain);
    toothGain.connect(out);
    toothOsc.start(now);
    toothOsc.stop(now + 0.045);

    // 2. Solid Housing Lock Thud (tight 45ms punch)
    const lockOsc = this.ctx.createOscillator();
    const lockGain = this.ctx.createGain();
    lockOsc.type = 'sine';
    lockOsc.frequency.setValueAtTime(190, now);
    lockOsc.frequency.exponentialRampToValueAtTime(48, now + 0.055);
    lockGain.gain.setValueAtTime(0.45, now);
    lockGain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
    lockOsc.connect(lockGain);
    lockGain.connect(out);
    lockOsc.start(now);
    lockOsc.stop(now + 0.065);
  }

  // =========================================================================
  // 4. UNBOX WIN DROP (The ASMR Reward Chime)
  // Crystal-clear, shimmering metallic bell chord + tight punchy pop.
  // Short decay (~280ms), ultra-clean, deeply satisfying, and completely spam-proof!
  // =========================================================================
  playWin() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;

    // Choke previous lingering voices if spammed rapidly
    if (now - this.lastWinTime < 0.25) {
      this._chokePreviousVoices();
    }
    this.lastWinTime = now;

    const out = this.masterGain;
    const voiceGain = this.ctx.createGain();
    voiceGain.connect(out);
    this._trackNode(voiceGain);

    // --- Component A: Punchy Tactile Acoustic Pop (Tight bottom-end punch) ---
    const popOsc = this.ctx.createOscillator();
    const popGain = this.ctx.createGain();
    popOsc.type = 'sine';
    popOsc.frequency.setValueAtTime(140, now);
    popOsc.frequency.exponentialRampToValueAtTime(52, now + 0.07);
    popGain.gain.setValueAtTime(0.42, now);
    popGain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
    popOsc.connect(popGain);
    popGain.connect(voiceGain);
    popOsc.start(now);
    popOsc.stop(now + 0.09);

    // --- Component B: Crystalline Metallic Bell Chimes (Clean Major Pentatonic Shimmer) ---
    // Notes: C6 (1046.5Hz), G6 (1567.98Hz), C7 (2093.0Hz) — pure, elegant, rewarding
    const chimeFreqs = [1046.5, 1567.98, 2093.0];
    const chimeWeights = [0.26, 0.20, 0.14];

    chimeFreqs.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      // Sine for pristine glass-like bell purity
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.012); // Subtle micro-strum

      const vol = chimeWeights[idx];
      const startT = now + idx * 0.012;
      const dur = 0.28 - (idx * 0.04); // Fast clean decay

      gain.gain.setValueAtTime(0.0001, startT);
      gain.gain.exponentialRampToValueAtTime(vol, startT + 0.004); // Instant 4ms strike
      gain.gain.exponentialRampToValueAtTime(0.0001, startT + dur);

      osc.connect(gain);
      gain.connect(voiceGain);
      osc.start(startT);
      osc.stop(startT + dur + 0.02);
    });

    // --- Component C: Ultra-High Sparkle Shimmer (Prism Glitter Transient) ---
    const sparkleOsc = this.ctx.createOscillator();
    const sparkleGain = this.ctx.createGain();
    sparkleOsc.type = 'sine';
    sparkleOsc.frequency.setValueAtTime(3135.96, now + 0.018); // G7
    sparkleGain.gain.setValueAtTime(0.0001, now + 0.018);
    sparkleGain.gain.exponentialRampToValueAtTime(0.12, now + 0.022);
    sparkleGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.18);
    sparkleOsc.connect(sparkleGain);
    sparkleGain.connect(voiceGain);
    sparkleOsc.start(now + 0.018);
    sparkleOsc.stop(now + 0.2);

    // Auto cleanup voice tracker after decay finishes
    setTimeout(() => {
      this.activeVoiceNodes.delete(voiceGain);
    }, 320);
  }

  // =========================================================================
  // 5. MICRO-TACTILE UI CLICK (For Buttons / Filters / Cards)
  // Subtle ASMR feedback click
  // =========================================================================
  playClick() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, now);
    osc.frequency.exponentialRampToValueAtTime(280, now + 0.018);
    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.02);
    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start(now);
    osc.stop(now + 0.025);
  }
}

// Global audio engine instance
const sounds = new SoundEngine();
