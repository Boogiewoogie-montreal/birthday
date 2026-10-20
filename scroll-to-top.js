/* ==========================================================================
   CUTE SCROLL-TO-TOP BUTTON COMPONENT (SHARED ACROSS ALL PAGES)
   - Self-contained styles and markup injection
   - Auto-detects active scrollable container (gallery overlay, card scroll, or window)
   - Smooth 60fps animations, prefers-reduced-motion support, mobile-friendly
   ========================================================================== */

(function () {
  // Prevent duplicate initialization
  if (window.__cuteScrollTopInitialized) return;
  window.__cuteScrollTopInitialized = true;

  // 1. Inject Styles
  const styleId = 'cute-scroll-to-top-styles';
  if (!document.getElementById(styleId)) {
    const styleEl = document.createElement('style');
    styleEl.id = styleId;
    styleEl.textContent = `
      .cute-scroll-top-btn {
        position: fixed;
        bottom: clamp(16px, 3vh, 24px);
        right: clamp(14px, 3vw, 24px);
        width: 46px;
        height: 46px;
        border-radius: 50%;
        background: linear-gradient(135deg, #FFB6C1 0%, #FFCCD5 45%, #FFE5D9 100%);
        border: 2.2px dashed #5C3D2E;
        box-shadow: 0 6px 18px rgba(92, 61, 46, 0.22), inset 0 0 0 2px rgba(255, 255, 255, 0.85);
        cursor: pointer;
        outline: none;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 0px;
        z-index: 990;
        user-select: none;
        -webkit-tap-highlight-color: transparent;
        opacity: 0;
        pointer-events: none;
        transform: translateY(18px) scale(0.85);
        transition: opacity 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), 
                    transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1),
                    background 0.25s ease,
                    box-shadow 0.25s ease;
        animation: cuteScrollTopFloat 2.8s ease-in-out infinite;
      }

      .cute-scroll-top-btn.is-visible {
        opacity: 1;
        pointer-events: auto;
        transform: translateY(0) scale(1);
      }

      .cute-scroll-top-btn:hover {
        transform: translateY(-3px) scale(1.1) rotate(-5deg);
        background: linear-gradient(135deg, #FFAAA6 0%, #FFC2D1 45%, #FFE5D9 100%);
        box-shadow: 0 10px 24px rgba(92, 61, 46, 0.3), inset 0 0 0 2px rgba(255, 255, 255, 0.95);
      }

      .cute-scroll-top-btn:active {
        transform: translateY(2px) scale(0.94);
        box-shadow: 0 3px 8px rgba(92, 61, 46, 0.2), inset 0 0 0 2px rgba(255, 255, 255, 0.8);
      }

      .cute-scroll-top-btn .scroll-top-paw {
        font-size: 13px;
        line-height: 1;
        transform: translateY(2px);
        filter: drop-shadow(0 1px 1px rgba(92, 61, 46, 0.15));
      }

      .cute-scroll-top-btn .scroll-top-arrow {
        font-size: 12px;
        line-height: 1;
        font-weight: 900;
        color: #5C3D2E;
        transform: translateY(-1px);
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      }

      @keyframes cuteScrollTopFloat {
        0%, 100% {
          margin-bottom: 0px;
        }
        50% {
          margin-bottom: 5px;
        }
      }

      /* Cute Tap/Hover Sparkles */
      .scroll-top-sparkle-dot {
        position: fixed;
        pointer-events: none;
        z-index: 995;
        font-size: 13px;
        animation: scrollTopSparkleFade 0.65s cubic-bezier(0.16, 1, 0.3, 1) forwards;
      }

      @keyframes scrollTopSparkleFade {
        0% { transform: translate(-50%, -50%) scale(0.4) rotate(0deg); opacity: 1; }
        100% { transform: translate(-50%, calc(-50% - 24px)) scale(1.1) rotate(25deg); opacity: 0; }
      }

      /* Responsive Adjustments for Mobile */
      @media (max-width: 480px) {
        .cute-scroll-top-btn {
          width: 42px;
          height: 42px;
          bottom: 14px;
          right: 14px;
        }
        .cute-scroll-top-btn .scroll-top-paw {
          font-size: 12px;
        }
        .cute-scroll-top-btn .scroll-top-arrow {
          font-size: 11px;
        }
      }

      /* Accessibility: Prefers Reduced Motion */
      @media (prefers-reduced-motion: reduce) {
        .cute-scroll-top-btn {
          animation: none !important;
          transition: opacity 0.2s ease !important;
        }
        .scroll-top-sparkle-dot {
          display: none !important;
        }
      }
    `;
    document.head.appendChild(styleEl);
  }

  // 2. DOM Ready & Element Injection
  function initScrollToTop() {
    if (document.getElementById('cuteScrollTopBtn')) return;

    const btn = document.createElement('button');
    btn.className = 'cute-scroll-top-btn';
    btn.id = 'cuteScrollTopBtn';
    btn.type = 'button';
    btn.setAttribute('aria-label', 'Back to top');
    btn.setAttribute('title', 'Back to top 🐾');
    btn.innerHTML = `
      <span class="scroll-top-paw" aria-hidden="true">🐾</span>
      <span class="scroll-top-arrow" aria-hidden="true">▲</span>
    `;
    document.body.appendChild(btn);

    function getActiveScrolledTarget() {
      // 1. Check if gallery overlay is open and scrolled
      const galleryOverlay = document.getElementById('photoGalleryOverlay');
      if (galleryOverlay && galleryOverlay.classList.contains('active') && galleryOverlay.scrollTop > 250) {
        return galleryOverlay;
      }
      // 2. Check if card scroll area on front page is scrolled
      const cardScroll = document.getElementById('card_scroll_area');
      if (cardScroll && cardScroll.scrollTop > 250) {
        return cardScroll;
      }
      // 3. Check window / document scroll
      const winScroll = window.scrollY || (document.documentElement && document.documentElement.scrollTop) || (document.body && document.body.scrollTop) || 0;
      if (winScroll > 250) {
        return window;
      }
      return null;
    }

    // Update visibility based on scroll position
    let scrollCheckScheduled = false;
    function updateVisibility() {
      scrollCheckScheduled = false;

      // Never show if surprise popup overlay is active
      const popup = document.getElementById('surprise_popup_overlay');
      if (popup && popup.classList.contains('active')) {
        btn.classList.remove('is-visible');
        return;
      }

      const activeTarget = getActiveScrolledTarget();
      if (activeTarget) {
        btn.classList.add('is-visible');
      } else {
        btn.classList.remove('is-visible');
      }
    }

    function onAnyScroll() {
      if (!scrollCheckScheduled) {
        scrollCheckScheduled = true;
        requestAnimationFrame(updateVisibility);
      }
    }

    // Attach scroll listeners to window and known containers
    window.addEventListener('scroll', onAnyScroll, { passive: true });

    const galleryOverlay = document.getElementById('photoGalleryOverlay');
    if (galleryOverlay) {
      galleryOverlay.addEventListener('scroll', onAnyScroll, { passive: true });
    }

    const cardScroll = document.getElementById('card_scroll_area');
    if (cardScroll) {
      cardScroll.addEventListener('scroll', onAnyScroll, { passive: true });
    }

    // Click behavior: smooth scroll to top of CURRENT active scrolled target
    btn.addEventListener('click', (e) => {
      e.stopPropagation();

      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const target = getActiveScrolledTarget() || galleryOverlay || window;

      if (target === window) {
        window.scrollTo({ top: 0, behavior: prefersReduced ? 'auto' : 'smooth' });
        if (document.documentElement) {
          document.documentElement.scrollTo({ top: 0, behavior: prefersReduced ? 'auto' : 'smooth' });
        }
        if (document.body) {
          document.body.scrollTo({ top: 0, behavior: prefersReduced ? 'auto' : 'smooth' });
        }
      } else if (target && typeof target.scrollTo === 'function') {
        target.scrollTo({ top: 0, behavior: prefersReduced ? 'auto' : 'smooth' });
      }

      // Sparkle burst effect on click
      if (!prefersReduced) {
        spawnClickSparkles(btn);
      }

      // Soft button wiggle
      btn.style.transform = 'scale(0.92) rotate(6deg)';
      setTimeout(() => {
        btn.style.transform = '';
      }, 200);
    });

    function spawnClickSparkles(anchorEl) {
      const rect = anchorEl.getBoundingClientRect();
      const sparkles = ['✨', '💖', '⭐', '🐾', '🌸'];
      for (let i = 0; i < 4; i++) {
        const s = document.createElement('span');
        s.className = 'scroll-top-sparkle-dot';
        s.textContent = sparkles[Math.floor(Math.random() * sparkles.length)];
        s.style.left = `${rect.left + rect.width / 2 + (Math.random() - 0.5) * 32}px`;
        s.style.top = `${rect.top + rect.height / 2 + (Math.random() - 0.5) * 32}px`;
        document.body.appendChild(s);
        setTimeout(() => s.remove(), 700);
      }
    }

    // Periodically re-check on DOM mutations or view switches
    setInterval(updateVisibility, 800);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScrollToTop);
  } else {
    initScrollToTop();
  }
})();
