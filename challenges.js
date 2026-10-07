// ==========================================
// STEAMDROP — CHALLENGES ENGINE & CONTROLLER
// Dedicated Game Mode for YouTube Video Challenges
// Pure JavaScript (Zero external framework dependencies)
// Zero Emojis Policy
// ==========================================

(function () {
  'use strict';

  const STORAGE_KEY_STATE = 'steamdrop_challenge_state';
  const STORAGE_KEY_RECENT = 'steamdrop_recent_challenges';
  const RECENT_BUFFER_SIZE = 20;

  // Bilingual UI Translations for Challenges Mode
  const CHALLENGE_I18N = {
    en: {
      modeSelectorTitle: "Select Challenge Mode",
      modeSelectorSubtitle: "Actionable gameplay objectives designed for fast-paced video content",
      oneChallengeTitle: "One Challenge",
      oneChallengeDesc: "A single objective, timed from start to finish.",
      startOneBtn: "Start Single Challenge",
      sessionTitle: "Challenge Session",
      sessionDesc: "A queue of objectives, timed one after another.",
      selectCountLabel: "Select number of challenges:",
      customCountPlaceholder: "Count",
      startSessionBtn: "Start Session",
      challengeLabel: "Challenge",
      ofLabel: "/",
      completedLabel: "Completed",
      startBtn: "Start Challenge",
      stopBtn: "Stop & Complete",
      nextBtn: "Next Challenge",
      newChallengeBtn: "New Challenge",
      abandonBtn: "Abandon Session",
      abandonConfirm: "Your current challenge is still running. Are you sure you want to abandon it?",
      sessionCompleteTitle: "Session Complete",
      sessionCompleteSubtitle: "All objectives completed successfully",
      totalTimeLabel: "Total Time",
      avgTimeLabel: "Average Time",
      challengesFinishedLabel: "Objectives Finished",
      playAgainBtn: "Play Again",
      backToChallengesBtn: "Back to Challenges",
      sessionHistoryTitle: "Session History",
      honorSystemNotice: "Honor System: Complete the objective in your chosen Steam game, then return and stop the timer.",
      statusStandby: "Standby",
      statusRunning: "Live",
      statusFinal: "Recorded",
      progressLabel: "Progress",
      slotCurrentLabel: "Now",
      abandonChallengeBtn: "Abandon Challenge",
      abandonTitleSession: "Abandon session?",
      abandonTitleSingle: "Abandon challenge?",
      abandonIdleConfirm: "Your session progress will be cleared.",
      abandonConfirmBtn: "Abandon",
      abandonCancelBtn: "Keep going",
      bestTimeLabel: "Best Run"
    },
    ar: {
      modeSelectorTitle: "اختر نوع التحدي",
      modeSelectorSubtitle: "أهداف لعب فورية وممتعة مصممة خصيصاً لمقاطع وتحديات اليوتيوب",
      oneChallengeTitle: "تحدي فردي",
      oneChallengeDesc: "هدف واحد فقط، مع مؤقت من البداية إلى النهاية.",
      startOneBtn: "بدء تحدي فردي",
      sessionTitle: "جلسة تحديات متتالية",
      sessionDesc: "سلسلة أهداف، يُوقّت كل هدف على حدة.",
      selectCountLabel: "حدد عدد التحديات:",
      customCountPlaceholder: "العدد",
      startSessionBtn: "بدء الجلسة",
      challengeLabel: "التحدي",
      ofLabel: "من",
      completedLabel: "مكتمل",
      startBtn: "بدء التحدي",
      stopBtn: "إيقاف واكتمال",
      nextBtn: "التحدي التالي",
      newChallengeBtn: "تحدي جديد",
      abandonBtn: "إنهاء التحدي الحالي",
      abandonConfirm: "المؤقت ما زال يعمل حالياً. هل أنت متأكد من رغبتك في إلغاء التحدي؟",
      sessionCompleteTitle: "اكتملت الجلسة",
      sessionCompleteSubtitle: "تم إنجاز كافة أهداف الجلسة بنجاح",
      totalTimeLabel: "الوقت الإجمالي",
      avgTimeLabel: "متوسط الوقت",
      challengesFinishedLabel: "الأهداف المكتملة",
      playAgainBtn: "إعادة اللعب",
      backToChallengesBtn: "العودة للخيارات",
      sessionHistoryTitle: "سجل التحديات السابقة",
      honorSystemNotice: "نظام الشرف: أنجز الهدف في لعبتك بستيم ثم عد إلى هنا وأوقف المؤقت.",
      statusStandby: "جاهز",
      statusRunning: "قيد التشغيل",
      statusFinal: "النتيجة",
      progressLabel: "التقدم",
      slotCurrentLabel: "الآن",
      abandonChallengeBtn: "إلغاء التحدي",
      abandonTitleSession: "إلغاء الجلسة؟",
      abandonTitleSingle: "إلغاء التحدي؟",
      abandonIdleConfirm: "سيتم مسح تقدم الجلسة.",
      abandonConfirmBtn: "إلغاء",
      abandonCancelBtn: "متابعة",
      bestTimeLabel: "أسرع تحدي"
    }
  };

  class ChallengesController {
    constructor() {
      this.container = null;
      this.currentLang = 'en';
      
      // State
      this.mode = null; // 'single' | 'session' | null (selector)
      this.sessionTotal = 1;
      this.currentIndex = 1;
      this.activeChallenge = null;
      this.sessionQueue = [];
      this.usedSessionIds = [];
      this.completedHistory = [];
      
      // Timer state
      this.isRunning = false;
      this.isCompleted = false;
      this.startTime = null; // epoch ms
      this.accumulatedMs = 0;

      // Chronometer DOM cache
      this.chronoRoot = null;
      this.chronoCells = {};
      this.chronoDial = null;
      this.lastCompletedSlot = null;

      // In-app dialog
      this.dialogEl = null;
      this.dialogKeyHandler = null;

      // Bound methods
      this.onTick = this.onTick.bind(this);
      this.onVisibilityChange = this.onVisibilityChange.bind(this);
    }

    init() {
      // The stage is the re-render target inside the challenges section; the
      // section itself also holds the shared sound / streamer switch row.
      this.container = document.getElementById('challenges-stage') || document.getElementById('challenges-view');
      if (!this.container) return;

      // Detect language from page
      const htmlLang = document.documentElement.lang || 'en';
      this.currentLang = htmlLang.startsWith('ar') ? 'ar' : 'en';

      // Restore stored state if valid
      this.restoreState();

      // Listen for visibility change (crucial for background timer accuracy)
      document.addEventListener('visibilitychange', this.onVisibilityChange);

      // Render initial view
      this.render();
    }

    setLanguage(lang) {
      this.currentLang = lang === 'ar' ? 'ar' : 'en';
      this.render();
    }

    t(key) {
      const dict = CHALLENGE_I18N[this.currentLang] || CHALLENGE_I18N.en;
      return dict[key] || CHALLENGE_I18N.en[key] || '';
    }

    // --- RECENT BUFFER UTILITIES ---
    getRecentIds() {
      try {
        const raw = localStorage.getItem(STORAGE_KEY_RECENT);
        return raw ? JSON.parse(raw) : [];
      } catch (e) {
        return [];
      }
    }

    addRecentId(id) {
      try {
        const list = this.getRecentIds().filter(item => item !== id);
        list.unshift(id);
        if (list.length > RECENT_BUFFER_SIZE) {
          list.length = RECENT_BUFFER_SIZE;
        }
        localStorage.setItem(STORAGE_KEY_RECENT, JSON.stringify(list));
      } catch (e) {}
    }

    // --- PERSISTENCE ---
    saveState() {
      if (!this.mode) {
        localStorage.removeItem(STORAGE_KEY_STATE);
        return;
      }

      const state = {
        mode: this.mode,
        sessionTotal: this.sessionTotal,
        currentIndex: this.currentIndex,
        activeChallenge: this.activeChallenge,
        sessionQueue: this.sessionQueue,
        usedSessionIds: this.usedSessionIds,
        completedHistory: this.completedHistory,
        isRunning: this.isRunning,
        isCompleted: this.isCompleted,
        startTime: this.startTime,
        accumulatedMs: this.accumulatedMs,
        savedAt: Date.now()
      };

      try {
        localStorage.setItem(STORAGE_KEY_STATE, JSON.stringify(state));
      } catch (e) {}
    }

    restoreState() {
      try {
        const raw = localStorage.getItem(STORAGE_KEY_STATE);
        if (!raw) return;

        const state = JSON.parse(raw);
        if (!state || !state.mode || !state.activeChallenge) return;

        this.mode = state.mode;
        this.sessionTotal = state.sessionTotal || 1;
        this.currentIndex = state.currentIndex || 1;
        this.activeChallenge = state.activeChallenge;
        this.usedSessionIds = state.usedSessionIds || [];
        this.completedHistory = state.completedHistory || [];
        this.isCompleted = !!state.isCompleted;
        this.accumulatedMs = state.accumulatedMs || 0;

        // Older saves predate the pre-drawn queue. Backfill the unseen slots
        // so the progress rail stays complete after an update. The live slot
        // keeps its saved objective; only genuinely unknown future slots are
        // drawn (recent-aware, so they don't repeat what was just played).
        if (this.mode === 'session' && this.sessionQueue.length < this.sessionTotal) {
          this.sessionQueue.length = Math.max(0, this.currentIndex - 1);
          if (this.sessionQueue[this.currentIndex - 1] === undefined) {
            this.sessionQueue[this.currentIndex - 1] = this.activeChallenge;
          }
          for (let i = this.currentIndex; i < this.sessionTotal; i++) {
            const exclude = [...this.usedSessionIds, ...this.getRecentIds()];
            let picked = null;
            if (typeof window.getRandomChallenge === 'function') {
              picked = window.getRandomChallenge(exclude);
              this.usedSessionIds.push(picked.id);
            }
            this.sessionQueue[i] = picked || this.activeChallenge;
          }
        }

        if (state.isRunning && state.startTime) {
          this.isRunning = true;
          this.startTime = state.startTime;
          this.startTimerInterval();
        } else {
          this.isRunning = false;
          this.startTime = null;
        }
      } catch (e) {
        localStorage.removeItem(STORAGE_KEY_STATE);
      }
    }

    clearState() {
      this.stopTimerInterval();
      this.mode = null;
      this.sessionTotal = 1;
      this.currentIndex = 1;
      this.activeChallenge = null;
      this.sessionQueue = [];
      this.usedSessionIds = [];
      this.completedHistory = [];
      this.isRunning = false;
      this.isCompleted = false;
      this.startTime = null;
      this.accumulatedMs = 0;
      localStorage.removeItem(STORAGE_KEY_STATE);
    }

    // --- TIMER ENGINE ---
    getElapsedMs() {
      if (this.isRunning && this.startTime) {
        return (Date.now() - this.startTime) + this.accumulatedMs;
      }
      return this.accumulatedMs;
    }

    formatTime(ms, includeMs = true) {
      const totalMs = Math.max(0, ms);
      const totalSec = Math.floor(totalMs / 1000);
      const hours = Math.floor(totalSec / 3600);
      const minutes = Math.floor((totalSec % 3600) / 60);
      const seconds = totalSec % 60;
      const hundredths = Math.floor((totalMs % 1000) / 10);

      const pad = (n) => String(n).padStart(2, '0');

      let main = '';
      if (hours > 0) {
        main = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
      } else {
        main = `${pad(minutes)}:${pad(seconds)}`;
      }

      if (includeMs) {
        return `${main}.${pad(hundredths)}`;
      }
      return main;
    }

    // --- SPLIT-FLAP CHRONOMETER ---
    // The chronometer markup is built once per render, then every frame we only
    // write the digits that actually changed (no innerHTML churn at 60fps).
    timerParts(ms) {
      const totalMs = Math.max(0, ms);
      const totalSec = Math.floor(totalMs / 1000);
      return {
        h: Math.floor(totalSec / 3600),
        m: Math.floor((totalSec % 3600) / 60),
        s: totalSec % 60,
        c: Math.floor((totalMs % 1000) / 10),
        hasHours: totalSec >= 3600
      };
    }

    timerState() {
      if (this.isRunning) return 'running';
      if (this.isCompleted) return 'stopped';
      return 'idle';
    }

    chronoStatusText() {
      if (this.isRunning) return this.t('statusRunning');
      if (this.isCompleted) return this.t('statusFinal');
      return this.t('statusStandby');
    }

    renderChronometer(ms) {
      const parts = this.timerParts(ms);
      const pad = (n) => String(n).padStart(2, '0');
      const h = pad(parts.h);
      const m = pad(parts.m);
      const s = pad(parts.s);
      const c = pad(parts.c);

      const digit = (cell, value) =>
        `<span class="chrono-digit" data-cell="${cell}">${value}</span>`;

      return `
        <div class="chrono" id="challenge-digital-timer" data-state="${this.timerState()}">
          <div class="chrono-dial${parts.hasHours ? ' has-hours' : ''}" dir="ltr">
            <span class="chrono-group chrono-group--hours">
              ${digit('h1', h[0])}${digit('h2', h[1])}
              <span class="chrono-sep">:</span>
            </span>
            <span class="chrono-group">${digit('m1', m[0])}${digit('m2', m[1])}</span>
            <span class="chrono-sep">:</span>
            <span class="chrono-group">${digit('s1', s[0])}${digit('s2', s[1])}</span>
            <span class="chrono-sep chrono-sep--ms">.</span>
            <span class="chrono-group chrono-group--ms">${digit('c1', c[0])}${digit('c2', c[1])}</span>
          </div>
        </div>
      `;
    }

    // Cached DOM refs are keyed on the element identity so a re-render (which
    // replaces the innerHTML) transparently rebuilds the cache.
    getChronoRefs() {
      const root = document.getElementById('challenge-digital-timer');
      if (!root) return null;

      if (this.chronoRoot !== root) {
        this.chronoRoot = root;
        this.chronoCells = {};
        ['h1', 'h2', 'm1', 'm2', 's1', 's2', 'c1', 'c2'].forEach((key) => {
          this.chronoCells[key] = root.querySelector(`[data-cell="${key}"]`);
        });
        this.chronoDial = root.querySelector('.chrono-dial');
      }

      return root;
    }

    syncChronometer() {
      const root = this.getChronoRefs();
      if (!root) return;
      const parts = this.timerParts(this.getElapsedMs());
      const pad = (n) => String(n).padStart(2, '0');

      const state = this.timerState();
      if (root.dataset.state !== state) {
        root.dataset.state = state;
      }

      if (this.chronoDial && this.chronoDial.classList.contains('has-hours') !== parts.hasHours) {
        this.chronoDial.classList.toggle('has-hours', parts.hasHours);
      }

      // Hundredths flip too fast to animate without turning into visual noise.
      const write = (cell, value, animate) => {
        const el = this.chronoCells[cell];
        if (!el || el.textContent === value) return;
        el.textContent = value;
        if (!animate) return;
        el.classList.remove('flip');
        void el.offsetWidth;
        el.classList.add('flip');
      };

      const h = pad(parts.h);
      const m = pad(parts.m);
      const s = pad(parts.s);
      const c = pad(parts.c);

      write('h1', h[0], true);
      write('h2', h[1], true);
      write('m1', m[0], true);
      write('m2', m[1], true);
      write('s1', s[0], true);
      write('s2', s[1], true);
      write('c1', c[0], false);
      write('c2', c[1], false);
    }

    startTimerInterval() {
      this.stopTimerInterval();
      const tick = () => {
        if (!this.isRunning) return;
        this.onTick();
        this.timerAnimId = requestAnimationFrame(tick);
      };
      this.timerAnimId = requestAnimationFrame(tick);
    }

    stopTimerInterval() {
      if (this.timerAnimId) {
        cancelAnimationFrame(this.timerAnimId);
        this.timerAnimId = null;
      }
    }

    onTick() {
      this.syncChronometer();
    }

    onVisibilityChange() {
      if (document.visibilityState === 'visible') {
        // Immediate sync when tab gains focus
        this.onTick();
      }
    }

    // --- GAME ACTIONS ---
    startSingleChallenge() {
      this.clearState();
      this.mode = 'single';
      this.sessionTotal = 1;
      this.currentIndex = 1;
      this.usedSessionIds = [];
      this.completedHistory = [];
      this.drawNextChallenge();
      this.saveState();
      this.render();
    }

    startSession(count) {
      this.clearState();
      const num = Math.min(50, Math.max(2, parseInt(count, 10) || 5));
      this.mode = 'session';
      this.sessionTotal = num;
      this.currentIndex = 1;
      this.usedSessionIds = [];
      this.completedHistory = [];

      // Draw the whole queue up front so the progress rail can show every
      // upcoming objective, not just the live one.
      this.sessionQueue = [];
      for (let i = 0; i < num; i++) {
        this.drawNextChallenge();
        this.sessionQueue.push(this.activeChallenge);
      }

      this.saveState();
      this.render();
    }

    drawNextChallenge() {
      const exclude = [...this.usedSessionIds, ...this.getRecentIds()];
      let picked = null;

      if (typeof window.getRandomChallenge === 'function') {
        picked = window.getRandomChallenge(exclude);
      } else if (Array.isArray(window.CHALLENGES_DATABASE) && window.CHALLENGES_DATABASE.length > 0) {
        picked = window.CHALLENGES_DATABASE[0];
      }

      if (!picked) {
        picked = {
          id: 'fallback_' + Date.now(),
          text: 'Defeat an enemy as quickly as possible.',
          text_ar: 'اهزم عدواً بأسرع وقت ممكن.',
          category: 'combat',
          tags: ['combat', 'fallback']
        };
      }

      this.activeChallenge = picked;
      this.usedSessionIds.push(picked.id);
      this.addRecentId(picked.id);

      this.isRunning = false;
      this.isCompleted = false;
      this.startTime = null;
      this.accumulatedMs = 0;
      this.stopTimerInterval();
    }

    // Advance to the pre-drawn objective at the new index. The queue was
    // completed the moment the session started.
    activateQueuedChallenge(index) {
      const queued = this.sessionQueue[index - 1];
      if (queued) {
        this.activeChallenge = queued;
      } else {
        this.drawNextChallenge();
        this.sessionQueue[index - 1] = this.activeChallenge;
      }

      this.isRunning = false;
      this.isCompleted = false;
      this.startTime = null;
      this.accumulatedMs = 0;
      this.stopTimerInterval();
    }

    startActiveTimer() {
      if (this.isRunning) return;
      this.isRunning = true;
      this.isCompleted = false;
      this.startTime = Date.now();
      this.startTimerInterval();
      this.saveState();
      this.render();
      this.playTimerStart();
    }

    stopActiveTimer() {
      if (!this.isRunning) return;
      this.accumulatedMs = this.getElapsedMs();
      this.isRunning = false;
      this.isCompleted = true;
      this.startTime = null;
      this.stopTimerInterval();
      this.stopRunMusic();

      // Record in history
      const formatted = this.formatTime(this.accumulatedMs);
      this.completedHistory.push({
        challenge: this.activeChallenge,
        timeMs: this.accumulatedMs,
        formattedTime: formatted
      });
      this.lastCompletedSlot = this.currentIndex;

      this.saveState();
      this.render();
      this.lastCompletedSlot = null;

      // The whole session just wrapped — that is the RDR2 moment. Individual
      // objective stops stay silent; the two mp3s are the only challenge cues.
      if (this.mode === 'session' && this.currentIndex >= this.sessionTotal) {
        this.playVictoryFanfare();
      }
    }

    goToNextChallenge() {
      if (this.currentIndex < this.sessionTotal) {
        this.currentIndex++;
        this.activateQueuedChallenge(this.currentIndex);
        this.saveState();
        this.render();
      } else {
        // Everything is done — show the summary
        this.render();
      }
    }

    // Leaving a running session is confirmed in-app — never with a native
    // browser prompt. Navigation continues from the callback on confirm.
    canNavigateAway(onConfirmed) {
      if (!this.isRunning) return true;

      this.confirmDialog(
        {
          title: this.t(this.mode === 'session' ? 'abandonTitleSession' : 'abandonTitleSingle'),
          message: this.t('abandonConfirm'),
          confirmLabel: this.t('abandonConfirmBtn'),
          cancelLabel: this.t('abandonCancelBtn')
        },
        () => {
          this.stopTimerInterval();
          this.isRunning = false;
          this.startTime = null;
          this.saveState();
          this.stopRunMusic();
          if (typeof onConfirmed === 'function') onConfirmed();
        }
      );

      return false;
    }

    requestAbandon() {
      this.confirmDialog(
        {
          title: this.t(this.mode === 'session' ? 'abandonTitleSession' : 'abandonTitleSingle'),
          message: this.t(this.isRunning ? 'abandonConfirm' : 'abandonIdleConfirm'),
          confirmLabel: this.t('abandonConfirmBtn'),
          cancelLabel: this.t('abandonCancelBtn')
        },
        () => {
          this.clearState();
          this.render();
          this.stopRunMusic();
        }
      );
    }

    // --- IN-APP DIALOG ---
    confirmDialog(options, onConfirm) {
      this.closeDialog();

      const overlay = document.createElement('div');
      overlay.className = 'sd-modal-backdrop';
      overlay.innerHTML = `
        <div class="sd-modal" role="dialog" aria-modal="true" aria-labelledby="sd-dialog-title">
          <h3 class="sd-modal-title" id="sd-dialog-title">${options.title}</h3>
          <p class="sd-modal-text">${options.message}</p>
          <div class="sd-modal-actions">
            <button type="button" class="sd-btn sd-btn--ghost sd-btn--md" data-dialog="cancel">${options.cancelLabel}</button>
            <button type="button" class="sd-btn sd-btn--stop sd-btn--md" data-dialog="confirm">${options.confirmLabel}</button>
          </div>
        </div>
      `;

      const cancelBtn = overlay.querySelector('[data-dialog="cancel"]');
      const confirmBtn = overlay.querySelector('[data-dialog="confirm"]');

      this.dialogKeyHandler = (event) => {
        if (event.key !== 'Escape') return;
        event.stopPropagation();
        this.closeDialog();
      };

      cancelBtn.onclick = () => this.closeDialog();
      confirmBtn.onclick = () => {
        this.closeDialog();
        onConfirm();
      };
      overlay.addEventListener('mousedown', (event) => {
        if (event.target === overlay) this.closeDialog();
      });

      document.addEventListener('keydown', this.dialogKeyHandler, true);
      document.body.appendChild(overlay);
      this.dialogEl = overlay;

      requestAnimationFrame(() => overlay.classList.add('is-open'));
      cancelBtn.focus();
    }

    closeDialog() {
      if (this.dialogKeyHandler) {
        document.removeEventListener('keydown', this.dialogKeyHandler, true);
        this.dialogKeyHandler = null;
      }
      if (this.dialogEl) {
        this.dialogEl.remove();
        this.dialogEl = null;
      }
    }

    // --- AUDIO HOOKS ---
    // Only two cues exist, and both are real recordings served from ./sounds:
    // the Dream speedrun track while the timer runs, and the RDR2 sting when a
    // whole session finishes. Button presses and single-objective stops are
    // deliberately silent — no synthesized layer underneath anymore.
    stopRunMusic() {
      try {
        const se = window.soundEngine;
        if (se && typeof se.stopChallengeMusic === 'function') {
          se.stopChallengeMusic();
        }
      } catch (e) {}
    }

    playTimerStart() {
      try {
        const se = window.soundEngine;
        if (se && typeof se.playChallengeStart === 'function') {
          se.playChallengeStart();
        }
      } catch (e) {}
    }

    playVictoryFanfare() {
      try {
        const se = window.soundEngine;
        if (se && typeof se.playChallengeSessionComplete === 'function') {
          se.playChallengeSessionComplete();
        }
      } catch (e) {}
    }

    // --- RENDERING ---
    render() {
      if (!this.container) return;

      // 1. Session Complete View
      if (this.mode === 'session' && this.isCompleted && this.currentIndex >= this.sessionTotal) {
        this.container.innerHTML = this.renderSessionComplete();
        this.bindEvents();
        return;
      }

      // 2. Active Challenge View
      if (this.mode && this.activeChallenge) {
        this.container.innerHTML = this.renderActiveChallenge();
        this.bindEvents();
        return;
      }

      // 3. Mode Selector View (Default)
      this.container.innerHTML = this.renderModeSelector();
      this.bindEvents();
    }

    renderModeSelector() {
      const isAr = this.currentLang === 'ar';

      return `
        <div class="w-full flex flex-col items-center gap-6" dir="${isAr ? 'rtl' : 'ltr'}">
          <div class="text-center flex flex-col items-center gap-2 max-w-lg">
            <h2 class="sd-h1">${this.t('modeSelectorTitle')}</h2>
            <p class="sd-body">${this.t('modeSelectorSubtitle')}</p>
          </div>

          <div class="sd-grid-modes">
            <div class="sd-panel sd-mode-card">
              <h3 class="sd-mode-title">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                </svg>
                ${this.t('oneChallengeTitle')}
              </h3>
              <p class="sd-body">${this.t('oneChallengeDesc')}</p>
              <button type="button" id="btn-start-single" class="sd-btn sd-btn--go sd-btn--md w-full mt-auto">
                <span>${this.t('startOneBtn')}</span>
              </button>
            </div>

            <div class="sd-panel sd-mode-card">
              <h3 class="sd-mode-title">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="8" y1="6" x2="21" y2="6"></line>
                  <line x1="8" y1="12" x2="21" y2="12"></line>
                  <line x1="8" y1="18" x2="21" y2="18"></line>
                  <line x1="3" y1="6" x2="3.01" y2="6"></line>
                  <line x1="3" y1="12" x2="3.01" y2="12"></line>
                  <line x1="3" y1="18" x2="3.01" y2="18"></line>
                </svg>
                ${this.t('sessionTitle')}
              </h3>
              <p class="sd-body">${this.t('sessionDesc')}</p>
              <div class="flex flex-col gap-2 mt-1">
                <span class="sd-eyebrow">${this.t('selectCountLabel')}</span>
                <div class="flex items-center gap-2" id="session-count-pills">
                  <button type="button" data-count="3" class="session-count-btn sd-pill">3</button>
                  <button type="button" data-count="6" class="session-count-btn sd-pill is-selected">6</button>
                  <input type="number" id="custom-session-count" min="2" max="50" placeholder="${this.t('customCountPlaceholder')}" class="sd-input w-16 flex-none" />
                </div>
              </div>
              <button type="button" id="btn-start-session" class="sd-btn sd-btn--blue sd-btn--md w-full mt-auto">
                <span>${this.t('startSessionBtn')}</span>
              </button>
            </div>
          </div>

          <p class="sd-note">${this.t('honorSystemNotice')}</p>
        </div>
      `;
    }

    renderActiveChallenge() {
      const isAr = this.currentLang === 'ar';
      const c = this.activeChallenge;
      const objectiveText = isAr && c.text_ar ? c.text_ar : c.text;
      const categoryName = (c.category || 'general').toUpperCase();

      const isSession = this.mode === 'session';

      return `
        <div class="sd-stage${isSession ? ' sd-stage--session' : ''}" dir="${isAr ? 'rtl' : 'ltr'}">
          <div class="sd-panel sd-console${this.isRunning ? ' sd-panel--live' : (this.isCompleted ? ' sd-panel--recorded' : '')}">
            <div class="sd-console-head">
              <span class="sd-console-step">${this.t('challengeLabel')} ${this.currentIndex} ${this.t('ofLabel')} ${isSession ? this.sessionTotal : 1}</span>
              <span class="sd-console-cat">${categoryName}</span>
            </div>

            <div class="sd-objective-slot">
              <h2 class="sd-objective">${objectiveText}</h2>
            </div>

            <div class="w-full flex justify-center">
              ${this.renderChronometer(this.getElapsedMs())}
            </div>

            <div class="sd-console-status">
              <span class="chrono-dot"></span>
              <span>${this.chronoStatusText()}${this.isCompleted ? ` · ${this.formatTime(this.getElapsedMs())}` : ''}</span>
            </div>

            <div class="sd-controls">
              ${!this.isRunning && !this.isCompleted ? `
                <button type="button" id="btn-timer-start" class="sd-btn sd-btn--go sd-btn--lg w-full">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                  </svg>
                  <span>${this.t('startBtn')}</span>
                </button>
              ` : ''}

              ${this.isRunning ? `
                <button type="button" id="btn-timer-stop" class="sd-btn sd-btn--stop sd-btn--lg w-full">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <rect x="5" y="5" width="14" height="14" rx="2"></rect>
                  </svg>
                  <span>${this.t('stopBtn')}</span>
                </button>
              ` : ''}

              ${this.isCompleted && isSession && this.currentIndex < this.sessionTotal ? `
                <button type="button" id="btn-next-challenge" class="sd-btn sd-btn--next">
                  <span>${this.t('nextBtn')}</span>
                  <span class="sd-btn-note">${this.currentIndex + 1} / ${this.sessionTotal}</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </button>
              ` : ''}

              ${this.isCompleted && !isSession ? `
                <button type="button" id="btn-new-challenge" class="sd-btn sd-btn--go sd-btn--lg w-full">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="23 4 23 10 17 10"></polyline>
                    <polyline points="1 20 1 14 7 14"></polyline>
                    <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
                  </svg>
                  <span>${this.t('newChallengeBtn')}</span>
                </button>
              ` : ''}

              <button type="button" id="btn-abandon-challenge" class="sd-btn sd-btn--danger-ghost">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="4" y="11" width="16" height="10" rx="2"></rect>
                  <path d="M8 11V7a4 4 0 0 1 8 0v4"></path>
                </svg>
                <span>${isSession ? this.t('abandonBtn') : this.t('abandonChallengeBtn')}</span>
              </button>
            </div>
          </div>

          ${isSession ? this.renderRail() : ''}
        </div>
      `;
    }

    // --- SUB-VIEW BUILDERS ---
    // Side rail: every objective of the session is listed from the start with
    // its text. Finished ones keep their time, the live one is highlighted,
    // and upcoming ones are dimmed but fully readable.
    renderRail() {
      const isAr = this.currentLang === 'ar';
      const total = this.sessionTotal;
      const done = this.completedHistory.length;

      const textOf = (challenge) => {
        if (!challenge) return '';
        return (isAr && challenge.text_ar) ? challenge.text_ar : (challenge.text || '');
      };

      let slots = '';
      for (let i = 0; i < total; i++) {
        const index = i + 1;
        const rowText = textOf(this.sessionQueue[index - 1] || (index === this.currentIndex ? this.activeChallenge : null));

        if (i < done) {
          const item = this.completedHistory[i];
          const flash = this.lastCompletedSlot === index ? ' sd-slot--just' : '';
          slots += `
            <li class="sd-slot sd-slot--done${flash}">
              <span class="sd-slot-idx">${index}</span>
              <span class="sd-slot-text">${textOf(item.challenge)}</span>
              <span class="sd-slot-time">${item.formattedTime}</span>
            </li>
          `;
        } else if (index === this.currentIndex) {
          slots += `
            <li class="sd-slot sd-slot--current">
              <span class="sd-slot-idx">${index}</span>
              <span class="sd-slot-text">${rowText}</span>
            </li>
          `;
        } else {
          slots += `
            <li class="sd-slot sd-slot--locked">
              <span class="sd-slot-idx">${index}</span>
              <span class="sd-slot-text">${rowText}</span>
              <svg class="sd-slot-lock" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
                <rect x="4" y="11" width="16" height="10" rx="2"></rect>
                <path d="M8 11V7a4 4 0 0 1 8 0v4"></path>
              </svg>
            </li>
          `;
        }
      }

      return `
        <aside class="sd-panel sd-rail">
          <div class="sd-rail-head">
            <span class="sd-eyebrow">${this.t('progressLabel')}</span>
            <span class="sd-rail-count">${done} / ${total}</span>
          </div>
          <div class="sd-rail-bar"><span style="width: ${(done / total) * 100}%"></span></div>
          <ol class="sd-rail-list">${slots}</ol>
        </aside>
      `;
    }

    renderHistoryList() {
      const isAr = this.currentLang === 'ar';
      return `
        <div class="sd-log">
          ${this.completedHistory.map((item, idx) => {
            const itemText = isAr && item.challenge.text_ar ? item.challenge.text_ar : item.challenge.text;
            return `
              <div class="sd-log-row">
                <div class="flex items-center gap-3 min-w-0 text-start">
                  <span class="sd-log-index">${idx + 1}</span>
                  <span class="sd-log-text">${itemText}</span>
                </div>
                <span class="sd-time-pill">${item.formattedTime}</span>
              </div>
            `;
          }).join('')}
        </div>
      `;
    }

    renderSessionComplete() {
      const isAr = this.currentLang === 'ar';
      const totalMs = this.completedHistory.reduce((acc, cur) => acc + (cur.timeMs || 0), 0);
      const avgMs = this.completedHistory.length > 0 ? Math.round(totalMs / this.completedHistory.length) : 0;
      const times = this.completedHistory.map((item) => item.timeMs || 0);
      const bestMs = times.length > 0 ? Math.min(...times) : 0;

      const formattedTotal = this.formatTime(totalMs);
      const formattedAvg = this.formatTime(avgMs);
      const formattedBest = this.formatTime(bestMs);

      return `
        <div class="w-full max-w-3xl flex flex-col items-center gap-5" dir="${isAr ? 'rtl' : 'ltr'}">
          <!-- Session Complete Header -->
          <div class="text-center flex flex-col items-center gap-3">
            <div class="sd-hero-badge">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <h2 class="sd-h1">${this.t('sessionCompleteTitle')}</h2>
            <p class="sd-body">${this.t('sessionCompleteSubtitle')}</p>
          </div>

          <!-- Summary Scoreboard -->
          <div class="w-full grid grid-cols-2 lg:grid-cols-4 gap-3.5">
            <div class="sd-panel sd-stat">
              <div class="sd-stat__label">${this.t('totalTimeLabel')}</div>
              <div class="sd-stat__value sd-stat__value--blue">${formattedTotal}</div>
            </div>

            <div class="sd-panel sd-stat">
              <div class="sd-stat__label">${this.t('avgTimeLabel')}</div>
              <div class="sd-stat__value sd-stat__value--gold">${formattedAvg}</div>
            </div>

            <div class="sd-panel sd-stat">
              <div class="sd-stat__label">${this.t('bestTimeLabel')}</div>
              <div class="sd-stat__value sd-stat__value--green">${formattedBest}</div>
            </div>

            <div class="sd-panel sd-stat">
              <div class="sd-stat__label">${this.t('challengesFinishedLabel')}</div>
              <div class="sd-stat__value">${this.sessionTotal} / ${this.sessionTotal}</div>
            </div>
          </div>

          <!-- Detailed Breakdown -->
          <div class="sd-panel sd-panel--pad w-full">
            <h3 class="sd-h3">${this.t('sessionHistoryTitle')}</h3>
            ${this.renderHistoryList()}
          </div>

          <!-- Bottom Action Buttons -->
          <div class="w-full max-w-md flex flex-col sm:flex-row gap-3">
            <button type="button" id="btn-play-again" class="sd-btn sd-btn--go sd-btn--md flex-1">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="23 4 23 10 17 10"></polyline>
                <polyline points="1 20 1 14 7 14"></polyline>
                <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
              </svg>
              <span>${this.t('playAgainBtn')}</span>
            </button>

            <button type="button" id="btn-back-menu" class="sd-btn sd-btn--ghost sd-btn--md">
              <span>${this.t('backToChallengesBtn')}</span>
            </button>
          </div>
        </div>
      `;
    }

    bindEvents() {
      // Single Challenge Start
      const btnStartSingle = document.getElementById('btn-start-single');
      if (btnStartSingle) {
        btnStartSingle.onclick = () => this.startSingleChallenge();
      }

      // Count pills in Session Card
      const countPills = document.querySelectorAll('.session-count-btn');
      const customCountInput = document.getElementById('custom-session-count');
      let selectedCount = 6;

      countPills.forEach(pill => {
        pill.onclick = () => {
          countPills.forEach(p => p.classList.remove('is-selected'));
          pill.classList.add('is-selected');
          selectedCount = parseInt(pill.getAttribute('data-count'), 10);
          if (customCountInput) customCountInput.value = '';
        };
      });

      if (customCountInput) {
        customCountInput.oninput = () => {
          const val = parseInt(customCountInput.value, 10);
          if (!isNaN(val) && val >= 2 && val <= 50) {
            countPills.forEach(p => p.classList.remove('is-selected'));
            selectedCount = val;
          }
        };
      }

      // Session Start
      const btnStartSession = document.getElementById('btn-start-session');
      if (btnStartSession) {
        btnStartSession.onclick = () => {
          if (customCountInput && customCountInput.value) {
            const customVal = parseInt(customCountInput.value, 10);
            if (!isNaN(customVal) && customVal >= 2 && customVal <= 50) {
              selectedCount = customVal;
            }
          }
          this.startSession(selectedCount);
        };
      }

      // Timer Controls
      const btnStart = document.getElementById('btn-timer-start');
      if (btnStart) {
        btnStart.onclick = () => this.startActiveTimer();
      }

      const btnStop = document.getElementById('btn-timer-stop');
      if (btnStop) {
        btnStop.onclick = () => this.stopActiveTimer();
      }

      const btnNext = document.getElementById('btn-next-challenge');
      if (btnNext) {
        btnNext.onclick = () => this.goToNextChallenge();
      }

      const btnNew = document.getElementById('btn-new-challenge');
      if (btnNew) {
        btnNew.onclick = () => {
          this.drawNextChallenge();
          this.saveState();
          this.render();
        };
      }

      const btnAbandon = document.getElementById('btn-abandon-challenge');
      if (btnAbandon) {
        btnAbandon.onclick = () => this.requestAbandon();
      }

      const btnPlayAgain = document.getElementById('btn-play-again');
      if (btnPlayAgain) {
        btnPlayAgain.onclick = () => {
          const count = this.sessionTotal || 6;
          this.startSession(count);
        };
      }

      const btnBackMenu = document.getElementById('btn-back-menu');
      if (btnBackMenu) {
        btnBackMenu.onclick = () => {
          this.clearState();
          this.render();
        };
      }
    }
  }

  // Create singleton instance and mount to window
  const challengesController = new ChallengesController();
  window.challengesController = challengesController;

  // Initialize once DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => challengesController.init());
  } else {
    challengesController.init();
  }
})();
