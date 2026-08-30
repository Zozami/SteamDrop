// ==========================================
// STEAM CASE OPENER — APPLICATION LOGIC
// High-Impact Unboxer, Direct Spinner Controls & Rich Media Showcase
// ==========================================

(function () {
  // ==========================================
  // INTERNATIONALIZATION (i18n) ENGINE
  // Full Arabic & English support with auto-detection
  // ==========================================
  const LANG_STORAGE_KEY = 'steam_case_opener_lang';

  const TRANSLATIONS = {
    en: {
      docTitle: "Steam Game Wheel",
      headerMain: "Steam <span class=\"text-[#66c0f4] drop-shadow-[0_0_15px_rgba(102,192,244,0.4)]\">Game Wheel</span>",
      langLabel: "العربية",
      syncingCatalog: "Loading...",
      gamesReady: (n) => `<strong>${n.toLocaleString()}</strong> Games`,
      creatorText: "Using this in a video or stream? Please credit: <strong class=\"text-white font-bold\">Abdulaziz</strong> (<a href=\"https://www.youtube.com/@realzozami\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"text-[#66c0f4] hover:underline font-semibold\">@realzozami</a>)",
      creatorDismiss: "Dismiss",
      openCase: "Spin Wheel",
      skipAnimationBtn: "Skip",
      soundOn: "Sound: ON",
      soundMuted: "Muted",
      fastSpin: "Fast Spin",
      skipAnimation: "Skip",
      noWinnerPopup: "No Popup",
      streamerMode: "Streamer Mode",
      exitStreamer: "Exit [Esc]",
      streamerToast: "Streamer Mode — Press [Esc] or [S] to exit",
      viewRolledGames: "Rolled Games",
      // Winner Modal
      unboxDropBadge: "Winner",
      watchTrailer: "Trailer",
      showImage: "Image",
      openInSteamApp: "Steam App",
      webStore: "Store Page",
      spinAgain: "Spin Again",
      // Reel Modal
      rolledGamesTitle: "Rolled Games",
      rolledGamesSubtitle: (n) => n > 0 ? `Spin #${n}` : "Current Wheel",
      searchPlaceholder: "Search game name...",
      emptySearch: "No games found.",
      steamStoreBtn: "Store Page",
      copyGameTitle: "Copy Name",
      copied: "Copied!",
      winnerTag: "WINNER",
      footerCreatedBy: "Created by <strong class=\"text-slate-100 font-bold\">Abdulaziz</strong>",
      inspectCardTooltip: (name) => name
    },
    ar: {
      docTitle: "عجلة ستيم",
      headerMain: "عجلة <span class=\"text-[#66c0f4] drop-shadow-[0_0_15px_rgba(102,192,244,0.4)]\">ستيم</span>",
      langLabel: "English",
      syncingCatalog: "جاري التحميل...",
      gamesReady: (n) => `<strong>${n.toLocaleString('ar-SA')}</strong> لعبة`,
      creatorText: "بتصوّر فيديو أو بث؟ لاهنت اذكر الحقوق: <strong class=\"text-white font-bold\">عبد العزيز</strong> (<a href=\"https://www.youtube.com/@realzozami\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"text-[#66c0f4] hover:underline font-semibold\">@realzozami</a>)",
      creatorDismiss: "إغلاق",
      openCase: "دوّر العجلة",
      skipAnimationBtn: "تخطي",
      soundOn: "الصوت: شغال",
      soundMuted: "الصوت: مكتوم",
      fastSpin: "سريع",
      skipAnimation: "تخطي",
      noWinnerPopup: "بدون نافذة",
      streamerMode: "وضع الستريمر",
      exitStreamer: "خروج [Esc]",
      streamerToast: "وضع الستريمر — اضغط [Esc] أو [S] للخروج",
      viewRolledGames: "الألعاب",
      // Winner Modal
      unboxDropBadge: "اللعبة الفائزة",
      watchTrailer: "التريلر",
      showImage: "الصورة",
      openInSteamApp: "تطبيق ستيم",
      webStore: "المتجر",
      spinAgain: "دوّر مرة ثانية",
      // Reel Modal
      rolledGamesTitle: "ألعاب العجلة",
      rolledGamesSubtitle: (n) => n > 0 ? `اللفة #${n}` : "العجلة الحالية",
      searchPlaceholder: "ابحث عن لعبة...",
      emptySearch: "ما لقينا اللعبة",
      steamStoreBtn: "المتجر",
      copyGameTitle: "نسخ الاسم",
      copied: "تم النسخ!",
      winnerTag: "الفائز",
      footerCreatedBy: "تطوير <strong class=\"text-slate-100 font-bold\">عبد العزيز</strong>",
      inspectCardTooltip: (name) => name
    }
  };

  function detectInitialLanguage() {
    const saved = localStorage.getItem(LANG_STORAGE_KEY);
    if (saved === 'ar' || saved === 'en') return saved;

    const navLang = (navigator.language || (navigator.languages && navigator.languages[0]) || '').toLowerCase();
    if (navLang.startsWith('ar')) {
      return 'ar';
    }
    return 'en';
  }

  let currentLang = detectInitialLanguage();

  // ==========================================
  // UI REFERENCES
  // ==========================================
  const langToggleBtn = document.getElementById('lang-toggle-btn');
  const langToggleLabel = document.getElementById('lang-toggle-label');
  const headerMainTitle = document.getElementById('header-main-title');

  const track = document.getElementById('roulette-track');
  const spinBtn = document.getElementById('spin-button');
  const soundToggleBtn = document.getElementById('sound-toggle-btn');
  const soundToggleText = document.getElementById('sound-toggle-text');
  const soundIcon = document.getElementById('sound-icon');
  const fastSpinToggle = document.getElementById('fast-spin-toggle');
  const instantSpinToggle = document.getElementById('instant-spin-toggle');
  const instantSpinToggleLabel = document.getElementById('instant-spin-toggle-label');
  const noPopupToggle = document.getElementById('no-popup-toggle');
  const noPopupToggleLabel = document.getElementById('no-popup-toggle-label');
  const streamerModeToggle = document.getElementById('streamer-mode-toggle');
  const streamerModeToggleLabel = document.getElementById('streamer-mode-toggle-label');
  const gamePoolCount = document.getElementById('game-pool-count');
  const liveDot = document.getElementById('live-dot-indicator');

  // Winner Modal References
  const modalBackdrop = document.getElementById('winner-modal-backdrop');
  const modal = document.getElementById('winner-modal');
  const modalTitle = document.getElementById('winner-title');
  const modalImg = document.getElementById('winner-img');
  const modalVideo = document.getElementById('winner-video');
  const modalPlayTrailerBtn = document.getElementById('winner-play-trailer-btn');
  const modalTrailerBtnText = document.getElementById('winner-trailer-btn-text');
  const modalSteamAppLink = document.getElementById('winner-steam-app-link');
  const modalSteamLink = document.getElementById('winner-steam-link');
  const modalSpinAgain = document.getElementById('modal-spin-again');
  const winnerUnboxBadge = document.getElementById('winner-unbox-badge');

  // Streamer Mode References
  const exitStreamerBtn = document.getElementById('exit-streamer-btn');
  const exitStreamerLabel = document.getElementById('exit-streamer-label');
  const streamerToast = document.getElementById('streamer-toast');
  const streamerToastText = document.getElementById('streamer-toast-text');

  // Reel Inspector Modal References
  const inspectReelBtn = document.getElementById('inspect-reel-btn');
  const reelModalBackdrop = document.getElementById('reel-modal-backdrop');
  const reelModalClose = document.getElementById('reel-modal-close');
  const reelSearchInput = document.getElementById('reel-search-input');
  const reelGrid = document.getElementById('reel-grid');
  const reelModalSubtitle = document.getElementById('reel-modal-subtitle');

  function setLanguage(lang) {
    document.documentElement.classList.add('disable-transitions');

    currentLang = lang;
    localStorage.setItem(LANG_STORAGE_KEY, lang);
    const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

    document.documentElement.lang = lang;
    document.documentElement.dir = (lang === 'ar') ? 'rtl' : 'ltr';
    document.title = t.docTitle;

    if (langToggleLabel) langToggleLabel.textContent = t.langLabel;
    if (headerMainTitle) headerMainTitle.innerHTML = t.headerMain;

    // Disclaimer banner
    const noticeText = document.getElementById('creator-notice-text');
    const dismissBtnSpan = document.querySelector('#dismiss-disclaimer-btn span');
    if (noticeText) noticeText.innerHTML = t.creatorText;
    if (dismissBtnSpan) dismissBtnSpan.textContent = t.creatorDismiss;

    // Controls
    if (!isSpinning) {
      setSpinButtonDefault();
    } else {
      setSpinButtonSkipping();
    }

    if (soundToggleText) {
      soundToggleText.textContent = sounds.enabled ? t.soundOn : t.soundMuted;
    }

    const fastSpinLabel = document.querySelector('label[title*="Fast"] span');
    if (fastSpinLabel) fastSpinLabel.textContent = t.fastSpin;

    if (instantSpinToggleLabel) instantSpinToggleLabel.textContent = t.skipAnimation;
    if (noPopupToggleLabel) noPopupToggleLabel.textContent = t.noWinnerPopup;
    if (streamerModeToggleLabel) streamerModeToggleLabel.textContent = t.streamerMode;
    if (exitStreamerLabel) exitStreamerLabel.textContent = t.exitStreamer;
    if (streamerToastText) streamerToastText.textContent = t.streamerToast;

    if (inspectReelBtn) {
      inspectReelBtn.childNodes.forEach(node => {
        if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
          node.textContent = ` ${t.viewRolledGames}`;
        }
      });
    }

    // Modals
    if (winnerUnboxBadge) winnerUnboxBadge.textContent = t.unboxDropBadge;
    if (reelSearchInput) reelSearchInput.placeholder = t.searchPlaceholder;
    if (modalSpinAgain) modalSpinAgain.textContent = t.spinAgain;
    if (modalSteamAppLink) {
      const appTextNode = Array.from(modalSteamAppLink.childNodes).find(n => n.nodeType === Node.TEXT_NODE && n.textContent.trim());
      if (appTextNode) appTextNode.textContent = ` ${t.openInSteamApp}`;
    }
    if (modalSteamLink) modalSteamLink.textContent = t.webStore;
    if (modalTrailerBtnText) {
      modalTrailerBtnText.textContent = isTrailerPlaying ? t.showImage : t.watchTrailer;
    }

    // Footer
    const footerAuthorSpan = document.querySelector('footer span:first-child');
    if (footerAuthorSpan) footerAuthorSpan.innerHTML = t.footerCreatedBy;

    updateStatsUI();

    // Re-enable transitions smoothly on the next frame
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document.documentElement.classList.remove('disable-transitions');
      });
    });
  }



  if (langToggleBtn) {
    langToggleBtn.addEventListener('click', () => {
      const nextLang = (currentLang === 'ar') ? 'en' : 'ar';
      setLanguage(nextLang);
    });
  }

  // State
  let lastSpinReelGames = [];
  let currentSpinCount = 0;
  let isSpinning = false;

  // Fair, uniform random game selector
  function getRandomGame(usedIds = new Set(), usedNames = new Set()) {
    const pool = activePool && activePool.length > 0 ? activePool : MASTER_VERIFIED_GAMES;
    const poolLen = pool.length;
    if (poolLen === 0) return MASTER_VERIFIED_GAMES[0];

    for (let attempt = 0; attempt < 30; attempt++) {
      const candidate = pool[Math.floor(Math.random() * poolLen)];
      if (!candidate) continue;
      if (typeof isAdultOrJunkEntry === 'function' && isAdultOrJunkEntry(candidate.name)) continue;

      const normTitle = candidate.name.toLowerCase().trim();
      if (!usedIds.has(candidate.id) && !usedNames.has(normTitle)) {
        return candidate;
      }
    }
    return pool[Math.floor(Math.random() * poolLen)];
  }

  // Sound Toggle Handler
  soundToggleBtn.addEventListener('click', () => {
    const isCurrentlyEnabled = sounds.enabled;
    sounds.setMuted(isCurrentlyEnabled);
    const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;
    if (sounds.enabled) {
      soundToggleBtn.classList.remove('is-muted');
      soundToggleText.textContent = t.soundOn;
      soundIcon.innerHTML = `
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
        <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
      `;
    } else {
      soundToggleBtn.classList.add('is-muted');
      soundToggleText.textContent = t.soundMuted;
      soundIcon.innerHTML = `
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
        <line x1="23" y1="9" x2="17" y2="15"></line>
        <line x1="17" y1="9" x2="23" y2="15"></line>
      `;
    }
  });

  function updateStatsUI() {
    const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;
    if (gamePoolCount) {
      gamePoolCount.innerHTML = t.gamesReady(activePool.length);
    }
  }

  // Procedural SVG Fallback Banner (Clean Steam-Inspired Cyber Mechanical Vector)
  function generateGameFallbackBanner(title) {
    const rawTitle = title || 'Steam Game';
    const safeTitle = rawTitle.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    const displayTitle = safeTitle.length > 22 ? safeTitle.substring(0, 20) + '...' : safeTitle;

    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="900" viewBox="0 0 600 900">
      <defs>
        <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#080c14"/>
          <stop offset="40%" stop-color="#101726"/>
          <stop offset="80%" stop-color="#0c121e"/>
          <stop offset="100%" stop-color="#05070c"/>
        </linearGradient>
        <radialGradient id="cyberGlow" cx="50%" cy="42%" r="50%">
          <stop offset="0%" stop-color="#66c0f4" stop-opacity="0.25"/>
          <stop offset="60%" stop-color="#1075d3" stop-opacity="0.06"/>
          <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
        </radialGradient>
        <linearGradient id="metalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#66c0f4"/>
          <stop offset="100%" stop-color="#1075d3"/>
        </linearGradient>
        <linearGradient id="armGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#4a90e2"/>
          <stop offset="100%" stop-color="#1e3a68"/>
        </linearGradient>
      </defs>

      <!-- Background Layer -->
      <rect width="600" height="900" fill="url(#bgGrad)"/>
      <rect width="600" height="900" fill="url(#cyberGlow)"/>

      <!-- Subtle Cyber Tech Grid Pattern Lines -->
      <g stroke="rgba(102, 192, 244, 0.06)" stroke-width="1.5">
        <line x1="0" y1="225" x2="600" y2="225"/>
        <line x1="0" y1="450" x2="600" y2="450"/>
        <line x1="0" y1="675" x2="600" y2="675"/>
        <line x1="150" y1="0" x2="150" y2="900"/>
        <line x1="300" y1="0" x2="300" y2="900"/>
        <line x1="450" y1="0" x2="450" y2="900"/>
        <rect x="25" y="25" width="550" height="850" rx="16" fill="none" stroke="rgba(102, 192, 244, 0.12)" stroke-width="1.5"/>
      </g>

      <!-- Steam-Inspired Mechanical Crank & Flywheel Emblem -->
      <g transform="translate(300, 390)">
        <!-- Outer Tech Ring -->
        <circle cx="0" cy="0" r="115" fill="none" stroke="rgba(102, 192, 244, 0.18)" stroke-width="2" stroke-dasharray="8 6"/>
        <circle cx="0" cy="0" r="95" fill="rgba(14, 20, 33, 0.9)" stroke="url(#metalGrad)" stroke-width="3"/>

        <!-- Articulating Mechanical Crank Arm -->
        <path d="M -16 -12 L 62 -52 L 76 -38 L -2 2 Z" fill="url(#armGrad)" stroke="#66c0f4" stroke-width="1.5" opacity="0.9"/>
        
        <!-- Secondary Orbital Joint -->
        <circle cx="68" cy="-45" r="26" fill="#121a2d" stroke="url(#metalGrad)" stroke-width="2.5"/>
        <circle cx="68" cy="-45" r="13" fill="#66c0f4" opacity="0.9"/>
        <circle cx="68" cy="-45" r="5" fill="#ffffff"/>

        <!-- Main Central Flywheel Hub -->
        <circle cx="-10" cy="-6" r="44" fill="#0b111e" stroke="url(#metalGrad)" stroke-width="3"/>
        <circle cx="-10" cy="-6" r="26" fill="none" stroke="rgba(102, 192, 244, 0.35)" stroke-width="1.5" stroke-dasharray="4 4"/>
        <circle cx="-10" cy="-6" r="13" fill="#66c0f4"/>
        <circle cx="-10" cy="-6" r="5" fill="#ffffff"/>
      </g>

      <!-- Game Details & Typography -->
      <g text-anchor="middle">
        <text x="300" y="590" font-family="'Rajdhani', 'Segoe UI', sans-serif" font-size="32" font-weight="700" fill="#ffffff" letter-spacing="0.5">${displayTitle}</text>
        <rect x="210" y="620" width="180" height="32" rx="6" fill="rgba(16, 117, 211, 0.15)" stroke="#66c0f4" stroke-width="1.2" stroke-opacity="0.4"/>
        <text x="300" y="641" font-family="'Chakra Petch', 'Segoe UI', sans-serif" font-size="12" font-weight="700" fill="#66c0f4" letter-spacing="2">STEAM GAME</text>
      </g>
    </svg>`;
    return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
  }

  // ==========================================
  // MULTI-TIER STEAM CDN IMAGE RESOLVER
  // Comprehensive failover chain across all official Steam asset types & CDN endpoints
  // Covers 100% of Steam library eras (2003 - Present)
  // ==========================================
  const verifiedGameImages = new Map();

  function getSteamCardImageCandidates(appId) {
    const id = Number(appId);
    return [
      `https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/${id}/library_600x900_2x.jpg`,
      `https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/${id}/header.jpg`,
      `https://cdn.cloudflare.steamstatic.com/steam/apps/${id}/header.jpg`
    ];
  }

  function getSteamHeroImageCandidates(appId) {
    const id = Number(appId);
    return [
      `https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/${id}/header.jpg`,
      `https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/${id}/capsule_616x353.jpg`,
      `https://cdn.cloudflare.steamstatic.com/steam/apps/${id}/header.jpg`
    ];
  }

  function preloadGameImageUrl(id) {
    const numId = Number(id);
    if (verifiedGameImages.has(numId)) return;
    const candidates = getSteamCardImageCandidates(numId);
    let idx = 0;

    function tryNext() {
      if (idx >= candidates.length) {
        verifiedGameImages.set(numId, { valid: false, url: null });
        return;
      }
      const url = candidates[idx++];
      const img = new Image();
      img.src = url;
      img.onload = () => {
        verifiedGameImages.set(numId, { valid: true, url });
      };
      img.onerror = () => {
        tryNext();
      };
    }

    tryNext();
  }

  function handleSteamImageError(imgEl, gameId, gameName) {
    if (!imgEl) return;
    const numId = Number(gameId);
    const candidates = getSteamCardImageCandidates(numId);
    
    let currentIndex = parseInt(imgEl.dataset.fallbackIndex || '0', 10);
    let nextIndex = currentIndex + 1;

    if (nextIndex < candidates.length) {
      imgEl.dataset.fallbackIndex = nextIndex;
      imgEl.src = candidates[nextIndex];
    } else {
      verifiedGameImages.set(numId, { valid: false, url: null });
      imgEl.src = generateGameFallbackBanner(gameName);
      imgEl.style.objectFit = 'cover';

      // Instantly sink card to bottom of the Rolled Games grid in real-time
      if (reelGrid && imgEl.closest) {
        const wrapper = imgEl.closest('.reel-card-wrapper');
        if (wrapper && wrapper.parentElement === reelGrid) {
          wrapper.dataset.hasNoImage = 'true';
          reelGrid.appendChild(wrapper);
        }
      }
    }
  }

  function preloadActivePoolBatch() {
    if (activePool && activePool.length > 0) {
      for (let i = 0; i < Math.min(50, activePool.length); i++) {
        preloadGameImageUrl(activePool[i].id);
      }
    }
  }

  function createCardElement(game, eagerLoad = false) {
    const card = document.createElement('div');
    card.className = 'game-card';
    card.dataset.id = game.id;
    const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;
    card.title = t.inspectCardTooltip(game.name);

    const img = document.createElement('img');
    img.className = 'card-banner-img';
    img.alt = game.name;

    const numId = Number(game.id);
    const cached = verifiedGameImages.get(numId);

    if (cached && cached.valid && cached.url) {
      img.src = cached.url;
    } else {
      const candidates = getSteamCardImageCandidates(numId);
      img.dataset.fallbackIndex = '0';
      img.src = candidates[0];
    }

    img.loading = eagerLoad ? 'eager' : 'lazy';
    img.decoding = 'async';
    img.draggable = false;

    img.onload = function() {
      if (!this.src.startsWith('data:image/svg')) {
        verifiedGameImages.set(numId, { valid: true, url: this.src });
      }
    };
    img.onerror = function() {
      handleSteamImageError(this, game.id, game.name);
    };
    card.appendChild(img);

    const overlay = document.createElement('div');
    overlay.className = 'card-title-overlay';
    const titleText = document.createElement('span');
    titleText.className = 'card-title-text';
    titleText.textContent = game.name;
    overlay.appendChild(titleText);
    card.appendChild(overlay);

    card.draggable = false;
    card.addEventListener('dragstart', (e) => e.preventDefault());

    // Click to open and inspect card details
    card.addEventListener('click', (e) => {
      if (isSpinning || isUserDragging || hasDraggedRecently) return;
      showWinner(game, false);
    });

    return card;
  }

  function getCardMetrics() {
    const viewport = document.querySelector('.roulette-viewport');
    const viewportWidth = viewport ? viewport.clientWidth : 1140;
    const isMobile = window.innerWidth <= 640;
    const count = isMobile ? 3 : 5;
    const gap = isMobile ? 10 : 16;

    const cardWidth = Math.floor((viewportWidth - (gap * (count - 1))) / count);
    const cardHeight = Math.round(cardWidth * 1.5); // 2:3 Vertical Portrait Ratio
    const step = cardWidth + gap;

    document.documentElement.style.setProperty('--card-width', `${cardWidth}px`);
    document.documentElement.style.setProperty('--card-height', `${cardHeight}px`);
    document.documentElement.style.setProperty('--card-gap', `${gap}px`);

    return { cardWidth, cardHeight, gap, count, step, viewportWidth };
  }

  // ==========================================
  // PRE-DECODED SPIN BUFFER PIPELINE
  // ==========================================
  let preparedSpinReel = null;
  let activePreparationPromise = null;

  async function prepareNextSpinReel() {
    if (activePool.length === 0) return null;
    if (preparedSpinReel && preparedSpinReel.isReady) return preparedSpinReel;
    if (activePreparationPromise) return activePreparationPromise;

    activePreparationPromise = (async () => {
      try {
        const TOTAL_CARDS = 70;
        const WINNER_INDEX = 54;

        const cardElements = [];
        const reelGames = [];
        const decodePromises = [];
        const usedIds = new Set();
        const usedNames = new Set();

        let winningGame = null;

        for (let i = 0; i < TOTAL_CARDS; i++) {
          const game = getRandomGame(usedIds, usedNames);
          if (game) {
            usedIds.add(game.id);
            usedNames.add(game.name.toLowerCase().trim());
          }
          const isWinnerZone = Math.abs(i - WINNER_INDEX) <= 8;
          const card = createCardElement(game, isWinnerZone);
          cardElements.push(card);

          const img = card.querySelector('img');
          if (img) {
            const decodePromise = Promise.race([
              img.decode ? img.decode().catch(() => {}) : Promise.resolve(),
              new Promise(resolve => setTimeout(resolve, 250))
            ]);
            decodePromises.push(decodePromise);
          }

          if (i === WINNER_INDEX) {
            winningGame = game;
          }

          reelGames.push({
            id: game ? game.id : 0,
            name: game ? game.name : 'Steam Game',
            isWinner: (i === WINNER_INDEX),
            position: i + 1
          });
        }

        if (!winningGame) {
          winningGame = MASTER_VERIFIED_GAMES[0];
        }

        if (winningGame && winningGame.id) {
          const winnerHeader = new Image();
          winnerHeader.src = `https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/${winningGame.id}/header.jpg`;
          if (winnerHeader.decode) {
            decodePromises.push(Promise.race([
              winnerHeader.decode().catch(() => {}),
              new Promise(resolve => setTimeout(resolve, 250))
            ]));
          }
        }

        await Promise.allSettled(decodePromises);

        preparedSpinReel = {
          cardElements,
          winningGame,
          reelGames,
          isReady: true
        };

        return preparedSpinReel;
      } catch (err) {
        return null;
      } finally {
        activePreparationPromise = null;
      }
    })();

    return activePreparationPromise;
  }

  // ==========================================
  // DIRECT SPINNER INTERACTIVE CONTROLLER
  // ==========================================
  let currentScrollX = 0;
  let isUserDragging = false;
  let hasDraggedRecently = false;
  let dragStartX = 0;
  let dragStartScrollX = 0;
  let lastDragTime = 0;
  let dragVelocity = 0;
  let momentumAnimId = null;

  function applyTrackTransform(x) {
    currentScrollX = Math.max(0, x);
    track.style.transition = 'none';
    track.style.transform = `translate3d(-${currentScrollX}px, 0, 0)`;
  }

  function ensureTrackHasCardsAhead() {
    const metrics = getCardMetrics();
    const totalCards = track.children.length;
    const trackWidth = totalCards * metrics.step;
    const visibleRight = currentScrollX + metrics.viewportWidth;

    if (visibleRight > trackWidth - 1200) {
      const usedIds = new Set(lastSpinReelGames.map(g => g.id));
      const usedNames = new Set(lastSpinReelGames.map(g => g.name.toLowerCase().trim()));
      for (let i = 0; i < 20; i++) {
        const game = getRandomGame(usedIds, usedNames);
        if (!game) break;
        usedIds.add(game.id);
        usedNames.add(game.name.toLowerCase().trim());
        track.appendChild(createCardElement(game, false));
        lastSpinReelGames.push({
          id: game.id,
          name: game.name,
          isWinner: false,
          position: lastSpinReelGames.length + 1
        });
      }
    }
  }

  function populateInitialReel() {
    track.innerHTML = '';
    lastSpinReelGames = [];
    const poolSize = activePool.length;
    if (poolSize === 0) return;

    const metrics = getCardMetrics();
    const usedIds = new Set();
    const usedNames = new Set();
    const count = Math.min(40, poolSize);

    for (let i = 0; i < count; i++) {
      const game = getRandomGame(usedIds, usedNames);
      if (!game) break;
      usedIds.add(game.id);
      usedNames.add(game.name.toLowerCase().trim());
      preloadGameImageUrl(game.id);

      track.appendChild(createCardElement(game, true));
      lastSpinReelGames.push({
        id: game.id,
        name: game.name,
        isWinner: false,
        position: i + 1
      });
    }

    const centerIndex = metrics.count === 3 ? 1 : 2;
    const centerCardPos = (centerIndex * metrics.step) + (metrics.cardWidth / 2);
    currentScrollX = Math.max(0, centerCardPos - (metrics.viewportWidth / 2));
    applyTrackTransform(currentScrollX);

    prepareNextSpinReel();
  }

  let activeAnimationId = null;
  let activeSkipHandler = null;

  function setSpinButtonDefault() {
    const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;
    spinBtn.disabled = false;
    spinBtn.className = "spin-btn relative bg-linear-to-b from-emerald-500 to-emerald-700 text-white font-['Chakra_Petch'] text-xl sm:text-2xl font-bold uppercase tracking-wider px-14 py-4 rounded-lg border border-emerald-400 cursor-pointer shadow-[0_6px_25px_rgba(34,197,94,0.4)] hover:shadow-[0_10px_30px_rgba(34,197,94,0.6)] hover:-translate-y-0.5 active:translate-y-0.5 transition-all flex items-center gap-3 disabled:opacity-60 disabled:cursor-not-allowed disabled:grayscale";
    spinBtn.innerHTML = `
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <polygon points="5 3 19 12 5 21 5 3"></polygon>
      </svg>
      ${t.openCase}
    `;
  }

  function setSpinButtonSkipping() {
    const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;
    spinBtn.disabled = false;
    spinBtn.className = "spin-btn relative bg-linear-to-b from-amber-500 to-amber-700 text-white font-['Chakra_Petch'] text-xl sm:text-2xl font-bold uppercase tracking-wider px-12 py-4 rounded-lg border border-amber-400 cursor-pointer shadow-[0_6px_25px_rgba(245,158,11,0.5)] hover:shadow-[0_10px_30px_rgba(245,158,11,0.7)] hover:-translate-y-0.5 active:translate-y-0.5 transition-all flex items-center gap-3 animate-pulse";
    spinBtn.innerHTML = `
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <polygon points="13 19 22 12 13 5 13 19"></polygon>
        <polygon points="2 19 11 12 2 5 2 19"></polygon>
      </svg>
      ${t.skipAnimationBtn}
    `;
  }

  function easeOutCubicApprox(t) {
    return 1 - Math.pow(1 - t, 4);
  }

  async function spinWheel() {
    if (isSpinning) {
      if (activeSkipHandler) activeSkipHandler();
      return;
    }
    if (activePool.length === 0) return;

    sounds.init();

    if (momentumAnimId) {
      cancelAnimationFrame(momentumAnimId);
      momentumAnimId = null;
    }

    track.querySelectorAll('.winning-card-popped').forEach(c => c.classList.remove('winning-card-popped'));
    const spinWrapper = document.querySelector('.roulette-wrapper');
    if (spinWrapper) spinWrapper.classList.remove('has-winner');

    let reelData = preparedSpinReel;
    if (!reelData || !reelData.isReady || !reelData.cardElements) {
      reelData = await prepareNextSpinReel();
    }
    preparedSpinReel = null;

    if (!reelData || !reelData.cardElements || reelData.cardElements.length === 0) {
      const TOTAL_FALLBACK_CARDS = 70;
      const WINNER_FALLBACK_INDEX = 54;
      const cardElements = [];
      const reelGames = [];
      const usedIds = new Set();
      const usedNames = new Set();
      let winningGame = null;

      for (let i = 0; i < TOTAL_FALLBACK_CARDS; i++) {
        const game = getRandomGame(usedIds, usedNames);
        if (game) {
          usedIds.add(game.id);
          usedNames.add(game.name.toLowerCase().trim());
        }
        cardElements.push(createCardElement(game, Math.abs(i - WINNER_FALLBACK_INDEX) <= 8));
        if (i === WINNER_FALLBACK_INDEX) {
          winningGame = game;
        }
        reelGames.push({
          id: game ? game.id : 0,
          name: game ? game.name : 'Steam Game',
          isWinner: (i === WINNER_FALLBACK_INDEX),
          position: i + 1
        });
      }

      reelData = {
        cardElements,
        winningGame: winningGame || MASTER_VERIFIED_GAMES[0],
        reelGames,
        isReady: true
      };
    }

    isSpinning = true;
    currentSpinCount++;

    const isInstant = instantSpinToggle && instantSpinToggle.checked;
    const isFast = fastSpinToggle && fastSpinToggle.checked;
    const TOTAL_CARDS = 70;
    const WINNER_INDEX = 54;

    const metrics = getCardMetrics();
    track.innerHTML = '';

    const cardElements = reelData.cardElements;
    const winningGame = reelData.winningGame;
    lastSpinReelGames = reelData.reelGames;

    for (let i = 0; i < cardElements.length; i++) {
      track.appendChild(cardElements[i]);
    }

    const viewportCenter = metrics.viewportWidth / 2;
    const jitter = (Math.random() - 0.5) * (metrics.cardWidth * 0.45);
    const cardCenterPosition = (WINNER_INDEX * metrics.step) + (metrics.cardWidth / 2);
    const targetTranslateX = cardCenterPosition - viewportCenter + jitter;

    setTimeout(() => {
      prepareNextSpinReel();
    }, 200);

    const finishSpinAndShowWinner = () => {
      if (activeAnimationId) {
        cancelAnimationFrame(activeAnimationId);
        activeAnimationId = null;
      }
      activeSkipHandler = null;
      currentScrollX = targetTranslateX;
      track.style.transition = 'none';
      track.style.transform = `translate3d(-${targetTranslateX}px, 0, 0)`;
      sounds.playStopLock();
      setSpinButtonDefault();
      isSpinning = false;

      // Clear any previous popped card effects
      const allCards = track.querySelectorAll('.game-card');
      allCards.forEach(c => {
        c.classList.remove('winning-card-popped');
      });

      // Pop the winning card on the roulette track with slam & glow aura
      const winnerCard = track.children[WINNER_INDEX];
      if (winnerCard) {
        winnerCard.classList.add('winning-card-popped');
      }

      // Hide target line indicator so it never slices across the winner card
      const wrapper = document.querySelector('.roulette-wrapper');
      if (wrapper) {
        wrapper.classList.add('has-winner');
      }

      const isNoPopup = noPopupToggle && noPopupToggle.checked;
      if (isNoPopup) {
        sounds.playWin();
      } else {
        showWinner(winningGame, true);
      }
    };

    if (isInstant) {
      finishSpinAndShowWinner();
      return;
    }

    setSpinButtonSkipping();
    activeSkipHandler = finishSpinAndShowWinner;
    sounds.playSpinStart();

    const duration = isFast ? 3000 : 6800;
    track.style.transition = 'none';
    track.style.transform = 'translate3d(0, 0, 0)';
    void track.offsetWidth;

    track.style.transition = `transform ${duration}ms cubic-bezier(0.10, 0.85, 0.15, 1.0)`;
    track.style.transform = `translate3d(-${targetTranslateX}px, 0, 0)`;

    let lastPassedIndex = -1;
    const startTime = performance.now();

    function checkTicks(now) {
      if (!isSpinning) return;
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const currentX = targetTranslateX * easeOutCubicApprox(progress);
      const currentCenterIndex = Math.floor((currentX + viewportCenter) / metrics.step);

      if (currentCenterIndex !== lastPassedIndex && currentCenterIndex >= 0 && currentCenterIndex < TOTAL_CARDS) {
        lastPassedIndex = currentCenterIndex;
        sounds.playTick(progress);
      }

      if (progress < 1) {
        activeAnimationId = requestAnimationFrame(checkTicks);
      } else {
        finishSpinAndShowWinner();
      }
    }

    activeAnimationId = requestAnimationFrame(checkTicks);
  }

  let currentActiveTrailerUrl = null;
  let isTrailerPlaying = false;

  function resetWinnerMedia() {
    if (modalVideo) {
      modalVideo.pause();
      modalVideo.src = '';
      modalVideo.classList.add('hidden');
    }
    if (modalImg) {
      modalImg.classList.remove('hidden');
      modalImg.removeAttribute('src');
      modalImg.style.opacity = '0';
    }
    if (modalPlayTrailerBtn) {
      modalPlayTrailerBtn.classList.add('hidden');
    }
    if (modalTrailerBtnText) {
      const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;
      modalTrailerBtnText.textContent = t.watchTrailer;
    }
    currentActiveTrailerUrl = null;
    isTrailerPlaying = false;
  }

  function setWinnerHeroImage(appId, gameName) {
    if (isTrailerPlaying) {
      toggleTrailerPlayback();
    }
    if (!modalImg) return;

    const numId = Number(appId);
    const candidates = getSteamHeroImageCandidates(numId);
    modalImg.dataset.id = numId;
    modalImg.dataset.name = gameName || 'Steam Game';
    modalImg.dataset.heroIndex = '0';
    modalImg.style.opacity = '0';

    modalImg.onload = function() {
      modalImg.style.opacity = '1';
      if (!this.src.startsWith('data:image/svg')) {
        verifiedGameImages.set(numId, { valid: true, heroUrl: this.src });
      }
    };

    modalImg.onerror = function() {
      let currentIdx = parseInt(modalImg.dataset.heroIndex || '0', 10);
      let nextIdx = currentIdx + 1;
      if (nextIdx < candidates.length) {
        modalImg.dataset.heroIndex = nextIdx;
        modalImg.src = candidates[nextIdx];
      } else {
        modalImg.src = generateGameFallbackBanner(gameName || 'Steam Game');
        modalImg.style.opacity = '1';
      }
    };

    const verified = verifiedGameImages.get(numId);
    if (verified && verified.valid && verified.heroUrl) {
      modalImg.src = verified.heroUrl;
    } else {
      modalImg.src = candidates[0];
    }

    if (modalImg.complete && modalImg.naturalWidth > 0) {
      modalImg.style.opacity = '1';
    }
  }

  function toggleTrailerPlayback() {
    if (!currentActiveTrailerUrl) return;
    const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;

    if (isTrailerPlaying) {
      modalVideo.pause();
      modalVideo.classList.add('hidden');
      modalImg.classList.remove('hidden');
      modalTrailerBtnText.textContent = t.watchTrailer;
      isTrailerPlaying = false;
    } else {
      modalImg.classList.add('hidden');
      modalVideo.src = currentActiveTrailerUrl;
      modalVideo.classList.remove('hidden');
      modalVideo.play().catch(() => {});
      modalTrailerBtnText.textContent = t.showImage;
      isTrailerPlaying = true;
    }
  }

  if (modalPlayTrailerBtn) {
    modalPlayTrailerBtn.addEventListener('click', toggleTrailerPlayback);
  }

  function showWinner(game, isWinningDrop = false) {
    resetWinnerMedia();

    const numId = Number(game.id);
    const cachedMeta = gameMetadataCache.get(numId) || {};

    const displayName = game.name;
    modalTitle.textContent = displayName;

    // Steam store links
    modalSteamAppLink.href = `steam://store/${numId}`;
    modalSteamLink.href = `https://store.steampowered.com/app/${numId}/`;

    if (modalImg) {
      modalImg.dataset.id = numId;
      modalImg.dataset.name = displayName;
    }

    // High-Resolution Widescreen Game Header Banner / Screenshot (460x215)
    setWinnerHeroImage(numId, displayName);

    // Gameplay Trailer button
    const movies = cachedMeta.movies || [];
    if (movies && movies.length > 0) {
      const m = movies[0];
      currentActiveTrailerUrl = m.mp4 || m.webm;
      if (modalPlayTrailerBtn) modalPlayTrailerBtn.classList.remove('hidden');
    }

    if (isWinningDrop) {
      sounds.playWin();
    }
    modalBackdrop.classList.add('active');
  }

  function closeModal() {
    resetWinnerMedia();
    modalBackdrop.classList.remove('active');
    isSpinning = false;
    spinBtn.disabled = false;
  }

  // Reel Inspector Modal
  function openReelModal() {
    const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;
    if (currentSpinCount > 0) {
      reelModalSubtitle.textContent = t.rolledGamesSubtitle(currentSpinCount);
    } else {
      reelModalSubtitle.textContent = (currentLang === 'ar') ? "استعراض الألعاب في العجلة الحالية • دوّر العجلة عشان تسحب على لعبة!" : "Preview games on initial wheel • Spin the wheel to roll a game!";
    }
    reelSearchInput.value = '';
    renderReelGrid();
    reelModalBackdrop.classList.add('active');
  }

  function closeReelModal() {
    reelModalBackdrop.classList.remove('active');
  }

  function renderReelGrid() {
    const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;
    const query = reelSearchInput.value.toLowerCase().trim();

    const filtered = lastSpinReelGames.filter(game => {
      return !query || game.name.toLowerCase().includes(query);
    });

    if (filtered.length === 0) {
      reelGrid.innerHTML = `
        <div class="col-span-full py-12 text-center text-slate-500">
          <p class="text-base">${t.emptySearch}</p>
        </div>
      `;
      return;
    }

    // Sort: Winner first -> Games with images -> Games with NO image at bottom
    filtered.sort((a, b) => {
      if (a.isWinner) return -1;
      if (b.isWinner) return 1;

      const aVerified = verifiedGameImages.get(Number(a.id));
      const bVerified = verifiedGameImages.get(Number(b.id));

      const aHasNoImage = aVerified && aVerified.valid === false;
      const bHasNoImage = bVerified && bVerified.valid === false;

      if (!aHasNoImage && bHasNoImage) return -1;
      if (aHasNoImage && !bHasNoImage) return 1;

      return (a.position || 0) - (b.position || 0);
    });

    reelGrid.innerHTML = filtered.map(game => {
      const winnerTag = game.isWinner ?
        `<div class="absolute top-2 left-2 bg-emerald-500 text-black text-xs font-black px-2 py-0.5 rounded shadow-[0_0_10px_rgba(34,197,94,0.5)]">${t.winnerTag}</div>` : '';

      const numId = Number(game.id);
      const verified = verifiedGameImages.get(numId);
      const candidates = getSteamCardImageCandidates(numId);
      const imgSrc = (verified && verified.valid && verified.url) ? verified.url : candidates[0];

      return `
        <div class="bg-[#161c2c] border border-[#232d42] rounded-xl overflow-hidden flex flex-col hover:border-blue-500 hover:shadow-[0_0_20px_rgba(59,130,246,0.2)] transition-all reel-card-wrapper" data-id="${game.id}">
          <div class="aspect-460/215 bg-[#090d16] relative overflow-hidden flex items-center justify-center">
            <img src="${imgSrc}"
                 alt="${game.name}"
                 class="w-full h-full object-cover reel-card-img"
                 data-id="${game.id}"
                 data-fallback-index="0"
                 data-name="${game.name.replace(/"/g, '&quot;')}" />
            ${winnerTag}
            <div class="absolute top-2 right-2 bg-black/80 text-slate-300 text-xs font-bold px-2 py-0.5 rounded border border-white/10">#${game.position}</div>
          </div>
          <div class="p-3.5 flex flex-col flex-1 justify-between gap-3">
            <div class="font-['Rajdhani'] text-lg font-bold text-white leading-snug line-clamp-2" title="${game.name}">${game.name}</div>
            <div class="flex gap-2 mt-auto">
              <a href="https://store.steampowered.com/app/${game.id}/" target="_blank" class="flex-1 py-2 px-3 bg-slate-800 border border-slate-700 text-slate-200 text-xs font-semibold rounded-md flex items-center justify-center gap-1.5 hover:bg-blue-600 hover:border-blue-500 hover:text-white transition-all" title="${t.steamStoreBtn}">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.09 3.16 9.44 7.64 11.16l3.52-5.11c-.34-.58-.54-1.25-.54-1.97 0-2.16 1.76-3.92 3.92.17 0 .34.01.5.04l3.14-4.56A6.177 6.177 0 0 0 12 6.15c-3.4 0-6.15 2.76-6.15 6.15 0 .8.16 1.56.44 2.26L2.31 16.3A11.956 11.956 0 0 1 0 12C0 5.37 5.37 0 12 0zm6.15 7.69c2.4 0 4.35 1.95 4.35 4.35 0 2.4-1.95 4.35-4.35 4.35-.43 0-.84-.06-1.23-.18l-3.32 4.82A11.94 11.94 0 0 0 12 24c6.63 0 12-5.37 12-12S18.63 0 12 0c-.26 0-.52.01-.78.03l4.7 6.82c.7-.47 1.54-.76 2.23-.76v1.6z"/>
                </svg>
                ${t.steamStoreBtn}
              </a>
              <button class="reel-card-copy-btn py-2 px-2.5 bg-slate-900 border border-slate-800 text-slate-400 rounded-md cursor-pointer hover:bg-slate-700 hover:text-white transition-all flex items-center justify-center" data-title="${game.name.replace(/"/g, '&quot;')}" title="${t.copyGameTitle}">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      `;
    }).join('');

    reelGrid.querySelectorAll('.reel-card-img').forEach(img => {
      img.onload = function() {
        if (!this.src.startsWith('data:image/svg')) {
          verifiedGameImages.set(Number(this.dataset.id), { valid: true, url: this.src });
        }
      };
      img.onerror = function() {
        handleSteamImageError(this, this.dataset.id, this.dataset.name);
      };
    });

    reelGrid.querySelectorAll('.reel-card-copy-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const title = btn.dataset.title;
        if (navigator.clipboard) {
          navigator.clipboard.writeText(title);
          btn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
          setTimeout(() => {
            btn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>`;
          }, 1200);
        }
      });
    });
  }

  // Event Listeners for Reel Inspector
  inspectReelBtn.addEventListener('click', openReelModal);
  reelModalClose.addEventListener('click', closeReelModal);

  reelModalBackdrop.addEventListener('click', (e) => {
    if (e.target === reelModalBackdrop) {
      closeReelModal();
    }
  });

  reelSearchInput.addEventListener('input', renderReelGrid);

  let streamerToastTimeout = null;

  function showStreamerToast() {
    if (!streamerToast) return;
    const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;
    if (streamerToastText) streamerToastText.textContent = t.streamerToast;
    
    streamerToast.classList.add('show');
    if (streamerToastTimeout) clearTimeout(streamerToastTimeout);
    streamerToastTimeout = setTimeout(() => {
      if (streamerToast) streamerToast.classList.remove('show');
    }, 4500);
  }

  function hideStreamerToast() {
    if (streamerToastTimeout) clearTimeout(streamerToastTimeout);
    if (streamerToast) streamerToast.classList.remove('show');
  }

  function setStreamerMode(enabled, triggerToast = true) {
    document.body.classList.toggle('streamer-mode', enabled);
    if (streamerModeToggle) {
      streamerModeToggle.checked = enabled;
    }
    localStorage.setItem('steam_streamer_mode', enabled ? '1' : '0');

    if (enabled && triggerToast) {
      showStreamerToast();
    } else {
      hideStreamerToast();
    }
  }

  if (exitStreamerBtn) {
    exitStreamerBtn.addEventListener('click', () => {
      setStreamerMode(false);
    });
  }

  if (streamerToast) {
    streamerToast.addEventListener('click', hideStreamerToast);
  }

  // Global Keyboard Shortcuts Engine
  window.addEventListener('keydown', (e) => {
    const activeTag = document.activeElement ? document.activeElement.tagName.toLowerCase() : '';
    if (activeTag === 'input' || activeTag === 'textarea') {
      if (e.key === 'Escape') {
        document.activeElement.blur();
        closeModal();
        closeReelModal();
      }
      return;
    }

    // 1. ESC — Close any active modal, or exit Streamer Mode if no modals open
    if (e.key === 'Escape') {
      if (modalBackdrop.classList.contains('active') || reelModalBackdrop.classList.contains('active')) {
        closeModal();
        closeReelModal();
      } else if (document.body.classList.contains('streamer-mode')) {
        setStreamerMode(false);
      }
      return;
    }

    // 2. SPACE or ENTER — Spin Wheel / Skip Animation / Spin Again
    if (e.code === 'Space' || e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      if (modalBackdrop.classList.contains('active')) {
        closeModal();
        setTimeout(spinWheel, 50);
        return;
      }
      if (reelModalBackdrop.classList.contains('active')) {
        closeReelModal();
        return;
      }
      spinWheel();
      return;
    }

    // 3. KEY 'M' — Toggle Sound Mute
    if (e.code === 'KeyM') {
      soundToggleBtn.click();
      return;
    }

    // 4. KEY 'S' or 'O' — Toggle Streamer / Clean OBS Mode
    if (e.code === 'KeyS' || e.code === 'KeyO') {
      if (streamerModeToggle) {
        setStreamerMode(!streamerModeToggle.checked);
      }
      return;
    }

    // 5. KEY 'F' — Toggle Fast Spin
    if (e.code === 'KeyF') {
      if (fastSpinToggle) {
        fastSpinToggle.checked = !fastSpinToggle.checked;
      }
      return;
    }
  });

  spinBtn.addEventListener('click', spinWheel);
  modalSpinAgain.addEventListener('click', () => {
    closeModal();
    setTimeout(spinWheel, 50);
  });

  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) {
      closeModal();
    }
  });

  function initSpinnerInteractivity() {
    const wrapper = document.querySelector('.roulette-wrapper');
    const viewport = document.querySelector('.roulette-viewport');
    if (!viewport || !track) return;

    const scrollTargets = [wrapper, viewport, track].filter(Boolean);

    let isMouseDown = false;
    let isTouchDown = false;

    const stopMomentum = () => {
      if (momentumAnimId) {
        cancelAnimationFrame(momentumAnimId);
        momentumAnimId = null;
      }
    };

    // 1. Mouse Wheel & Trackpad Navigation across all spinner surfaces
    const handleWheel = (e) => {
      if (isSpinning) return;
      stopMomentum();

      let delta = e.deltaX;
      if (Math.abs(delta) < Math.abs(e.deltaY)) {
        delta = e.deltaY;
      }
      if (Math.abs(delta) < 0.5) return;

      e.preventDefault();

      const scrollStep = Math.sign(delta) * Math.min(Math.abs(delta) * 0.75, 90);
      applyTrackTransform(currentScrollX + scrollStep);
      ensureTrackHasCardsAhead();
    };

    scrollTargets.forEach(target => {
      target.addEventListener('wheel', handleWheel, { passive: false });
    });

    // 2. Direct 1:1 Mouse Dragging (Does NOT block simple clicks)
    const handleMouseDown = (e) => {
      if (isSpinning || e.button !== 0) return;
      stopMomentum();

      isMouseDown = true;
      isUserDragging = false;
      hasDraggedRecently = false;
      dragStartX = e.clientX;
      dragStartScrollX = currentScrollX;
      lastDragTime = performance.now();
      dragVelocity = 0;
    };

    scrollTargets.forEach(target => {
      target.addEventListener('mousedown', handleMouseDown);
    });

    window.addEventListener('mousemove', (e) => {
      if (!isMouseDown || isSpinning) return;
      const dx = e.clientX - dragStartX;

      // Only enter drag mode if moved more than 5px
      if (Math.abs(dx) > 5) {
        isUserDragging = true;
        hasDraggedRecently = true;
        viewport.classList.add('is-dragging');
      }

      if (isUserDragging) {
        const now = performance.now();
        const dt = Math.max(1, now - lastDragTime);
        const instantVelocity = (dragStartScrollX - dx - currentScrollX) / dt;
        dragVelocity = dragVelocity * 0.6 + instantVelocity * 0.4;
        lastDragTime = now;

        applyTrackTransform(dragStartScrollX - dx);
        ensureTrackHasCardsAhead();
      }
    });

    window.addEventListener('mouseup', () => {
      if (!isMouseDown) return;
      isMouseDown = false;
      viewport.classList.remove('is-dragging');

      if (isUserDragging) {
        isUserDragging = false;
        setTimeout(() => {
          hasDraggedRecently = false;
        }, 150);

        if (Math.abs(dragVelocity) > 0.15) {
          let vel = Math.sign(dragVelocity) * Math.min(Math.abs(dragVelocity) * 16, 35);
          const applyMomentum = () => {
            if (isSpinning || isMouseDown || Math.abs(vel) < 0.2) {
              momentumAnimId = null;
              return;
            }
            applyTrackTransform(currentScrollX + vel);
            ensureTrackHasCardsAhead();
            vel *= 0.92;
            momentumAnimId = requestAnimationFrame(applyMomentum);
          };
          momentumAnimId = requestAnimationFrame(applyMomentum);
        }
      }
    });

    // 3. Touch Swiping for Mobile & Touchscreens
    const handleTouchStart = (e) => {
      if (isSpinning || e.touches.length !== 1) return;
      stopMomentum();

      isTouchDown = true;
      isUserDragging = false;
      hasDraggedRecently = false;
      dragStartX = e.touches[0].clientX;
      dragStartScrollX = currentScrollX;
      lastDragTime = performance.now();
      dragVelocity = 0;
    };

    scrollTargets.forEach(target => {
      target.addEventListener('touchstart', handleTouchStart, { passive: true });
    });

    window.addEventListener('touchmove', (e) => {
      if (!isTouchDown || isSpinning || e.touches.length !== 1) return;
      const dx = e.touches[0].clientX - dragStartX;

      if (Math.abs(dx) > 5) {
        isUserDragging = true;
        hasDraggedRecently = true;
      }

      if (isUserDragging) {
        const now = performance.now();
        const dt = Math.max(1, now - lastDragTime);
        const instantVelocity = (dragStartScrollX - dx - currentScrollX) / dt;
        dragVelocity = dragVelocity * 0.6 + instantVelocity * 0.4;
        lastDragTime = now;

        applyTrackTransform(dragStartScrollX - dx);
        ensureTrackHasCardsAhead();
      }
    }, { passive: true });

    window.addEventListener('touchend', () => {
      if (!isTouchDown) return;
      isTouchDown = false;
      if (isUserDragging) {
        isUserDragging = false;
        setTimeout(() => {
          hasDraggedRecently = false;
        }, 150);

        if (Math.abs(dragVelocity) > 0.15) {
          let vel = Math.sign(dragVelocity) * Math.min(Math.abs(dragVelocity) * 16, 35);
          const applyMomentum = () => {
            if (isSpinning || isTouchDown || Math.abs(vel) < 0.2) {
              momentumAnimId = null;
              return;
            }
            applyTrackTransform(currentScrollX + vel);
            ensureTrackHasCardsAhead();
            vel *= 0.92;
            momentumAnimId = requestAnimationFrame(applyMomentum);
          };
          momentumAnimId = requestAnimationFrame(applyMomentum);
        }
      }
    });
  }

  // ==========================================
  // INITIALIZATION & CATALOG SYNC
  // ==========================================
  const disclaimerBanner = document.getElementById('creator-disclaimer-banner');
  const dismissDisclaimerBtn = document.getElementById('dismiss-disclaimer-btn');
  if (disclaimerBanner && dismissDisclaimerBtn) {
    dismissDisclaimerBtn.addEventListener('click', () => {
      disclaimerBanner.style.transition = 'opacity 0.25s ease, transform 0.25s ease, max-height 0.3s ease, margin 0.3s ease, padding 0.3s ease';
      disclaimerBanner.style.opacity = '0';
      disclaimerBanner.style.transform = 'translateY(-10px) scale(0.98)';
      setTimeout(() => {
        disclaimerBanner.style.display = 'none';
      }, 260);
    });
  }

  setLanguage(currentLang);

  if (noPopupToggle) {
    const savedNoPopup = localStorage.getItem('steam_no_popup');
    if (savedNoPopup === '1') {
      noPopupToggle.checked = true;
    }
    noPopupToggle.addEventListener('change', () => {
      localStorage.setItem('steam_no_popup', noPopupToggle.checked ? '1' : '0');
    });
  }

  if (streamerModeToggle) {
    const savedStreamerMode = localStorage.getItem('steam_streamer_mode');
    if (savedStreamerMode === '1') {
      setStreamerMode(true, false);
    }
    streamerModeToggle.addEventListener('change', () => {
      setStreamerMode(streamerModeToggle.checked, true);
    });
  }

  initSpinnerInteractivity();
  populateInitialReel();
  preloadActivePoolBatch();

  if (spinBtn) {
    spinBtn.addEventListener('mouseenter', preloadActivePoolBatch);
  }

  loadFullSteamCatalog(
    () => {
      liveDot.classList.add('syncing');
      const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;
      gamePoolCount.innerHTML = t.syncingCatalog;
    },
    () => {
      liveDot.classList.remove('syncing');
      updateStatsUI();
      if (!isSpinning) {
        populateInitialReel();
      }
      preloadActivePoolBatch();
    }
  );

  window.addEventListener('resize', populateInitialReel);
})();
