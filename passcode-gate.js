/**
 * ============================================================================
 * CUTE & SECURE PASSCODE GATE FOR MALKIN'S BIRTHDAY SURPRISE 🐱🎂
 * ============================================================================
 * 
 * 1. GOOGLE APPS SCRIPT CONFIGURATION:
 *    Paste your Google Apps Script Web App URL below between the quotes.
 *    See deployment instructions in README / response.
 */
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwB50PFHJfvXbtWCZpxorjEbsTPTG2Xfu8fKZhL3Z1En2_FcnXoX1ITXJ2wFWvDzg0H/exec";

/**
 * 2. SECRET PASSCODE CONFIGURATION:
 */
const SECRET_PASSCODE = "2212";

(function () {
  'use strict';

  // Elements
  const gateOverlay = document.getElementById('passcode_gate');
  const passcodeCard = document.getElementById('passcode_card');
  const passcodeForm = document.getElementById('passcode_form');
  const passcodeInput = document.getElementById('passcode_input');
  const passcodeSubmitBtn = document.getElementById('btn_passcode_submit');
  const passcodeMessage = document.getElementById('passcode_message');
  const btnTogglePasscode = document.getElementById('btn_toggle_passcode');
  const eyeIcon = document.getElementById('eye_icon');
  const mainSlider = document.getElementById('main_slider');

  if (!gateOverlay || !passcodeInput || !passcodeSubmitBtn) {
    console.warn('[Passcode Gate] Essential elements missing from DOM.');
    return;
  }

  let isSubmitting = false;

  // Toggle Password Visibility
  if (btnTogglePasscode && eyeIcon) {
    btnTogglePasscode.addEventListener('click', function () {
      if (passcodeInput.type === 'password') {
        passcodeInput.type = 'text';
        eyeIcon.textContent = '🙈';
        btnTogglePasscode.setAttribute('title', 'Hide Passcode');
      } else {
        passcodeInput.type = 'password';
        eyeIcon.textContent = '👁️';
        btnTogglePasscode.setAttribute('title', 'Show Passcode');
      }
      passcodeInput.focus();
    });
  }

  // Show Cute Error Message
  function showError(msg) {
    if (!passcodeMessage) return;
    passcodeMessage.textContent = msg;
    passcodeMessage.className = 'passcode-feedback-msg is-error';
  }

  // Clear Feedback Message
  function clearMessage() {
    if (!passcodeMessage) return;
    passcodeMessage.textContent = '';
    passcodeMessage.className = 'passcode-feedback-msg';
  }

  // Clear error state on input typing
  passcodeInput.addEventListener('input', function () {
    clearMessage();
    passcodeCard.classList.remove('shake-error');
  });

  /**
   * Geolocation Retrieval:
   * Tries ipwho.is first, then ipapi.co as fallback, with strict timeout.
   * If blocked by adblockers, privacy extensions, or offline, fails gracefully.
   */
  async function fetchVisitorLocation() {
    // 1. Primary: ipwho.is (CORS-friendly, accurate, free)
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2200);

      const response = await fetch('https://ipwho.is/', {
        signal: controller.signal,
        cache: 'no-store'
      });
      clearTimeout(timeoutId);

      if (response.ok) {
        const data = await response.json();
        if (data && data.success !== false) {
          const locationParts = [data.city, data.region, data.country].filter(Boolean);
          return {
            locationString: locationParts.length > 0 ? locationParts.join(', ') : 'Unknown',
            city: data.city || 'Unknown',
            region: data.region || 'Unknown',
            country: data.country || 'Unknown',
            ip: data.ip || 'Unknown'
          };
        }
      }
    } catch (e) {
      // Failed or timed out, attempt fallback below
    }

    // 2. Fallback: ipapi.co
    try {
      const fbController = new AbortController();
      const fbTimeoutId = setTimeout(() => fbController.abort(), 1800);

      const fbResponse = await fetch('https://ipapi.co/json/', {
        signal: fbController.signal,
        cache: 'no-store'
      });
      clearTimeout(fbTimeoutId);

      if (fbResponse.ok) {
        const fbData = await fbResponse.json();
        const fbParts = [fbData.city, fbData.region, fbData.country_name].filter(Boolean);
        return {
          locationString: fbParts.length > 0 ? fbParts.join(', ') : 'Unknown',
          city: fbData.city || 'Unknown',
          region: fbData.region || 'Unknown',
          country: fbData.country_name || 'Unknown',
          ip: fbData.ip || 'Unknown'
        };
      }
    } catch (e) {
      // Handled gracefully below
    }

    // 3. Graceful fallback if completely blocked or offline
    return {
      locationString: 'Unknown',
      city: 'Unknown',
      region: 'Unknown',
      country: 'Unknown',
      ip: 'Unknown'
    };
  }

  /**
   * Background POST to Google Apps Script Web App
   */
  function logAttemptToGoogleSheet(passcodeEntered, isCorrect, geo) {
    const payload = {
      passcode: passcodeEntered,
      isCorrect: isCorrect,
      status: isCorrect ? 'CORRECT' : 'INCORRECT',
      timestamp: new Date().toISOString(),
      dateTime: new Date().toLocaleString(),
      location: geo.locationString || 'Unknown',
      city: geo.city || 'Unknown',
      region: geo.region || 'Unknown',
      country: geo.country || 'Unknown',
      ip: geo.ip || 'Unknown',
      userAgent: navigator.userAgent
    };

    const hasCustomUrl = GOOGLE_SCRIPT_URL &&
      GOOGLE_SCRIPT_URL.trim() !== '' &&
      !GOOGLE_SCRIPT_URL.includes('PASTE_YOUR_GOOGLE_APPS_SCRIPT_URL_HERE');

    if (hasCustomUrl) {
      try {
        // mode: 'no-cors' allows Google Apps Script redirects to succeed without CORS preflight blocks
        fetch(GOOGLE_SCRIPT_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'text/plain;charset=utf-8'
          },
          body: JSON.stringify(payload),
          keepalive: true
        }).catch(err => {
          console.warn('[Passcode Log] Background POST notice:', err);
        });
      } catch (err) {
        console.warn('[Passcode Log] Dispatch exception:', err);
      }
    } else {
      console.info(
        '%c[Google Sheets Log Demo] Paste your Web App URL in GOOGLE_SCRIPT_URL to record this row in your sheet:',
        'color: #FF5E7E; font-weight: bold; font-size: 13px;',
        payload
      );
    }
  }

  /**
   * Passcode Submit Handler
   */
  async function handleSubmit(event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    if (isSubmitting) return;

    const enteredCode = (passcodeInput.value || '').trim();

    // If blank
    if (!enteredCode) {
      showError('Please enter the passcode! 💕');
      passcodeInput.focus();
      return;
    }

    isSubmitting = true;
    passcodeSubmitBtn.disabled = true;
    passcodeInput.disabled = true;
    passcodeSubmitBtn.innerHTML = '<span class="btn-paw">🐾</span> <span class="btn-text">Checking...</span>';

    // 1. Fetch Geolocation (fast with timeout + fallback)
    let geo = { locationString: 'Unknown', city: 'Unknown', region: 'Unknown', country: 'Unknown', ip: 'Unknown' };
    try {
      geo = await fetchVisitorLocation();
    } catch (err) {
      console.warn('[Passcode Gate] Geolocation ignored gracefully:', err);
    }

    // 2. Validate Passcode
    const isCorrect = (enteredCode === SECRET_PASSCODE);

    // 3. Dispatch Background Log to Google Sheet
    logAttemptToGoogleSheet(enteredCode, isCorrect, geo);

    // 4. Handle Result
    if (isCorrect) {
      clearMessage();
      passcodeSubmitBtn.innerHTML = '<span class="btn-paw">🎉</span> <span class="btn-text">Unlocked! 💕</span>';
      passcodeSubmitBtn.classList.add('btn-success');

      // Play soft celebratory confetti if library is available
      if (typeof window.confetti === 'function') {
        try {
          window.confetti({
            particleCount: 45,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#FF69B4', '#FFD700', '#FF85A2', '#00CED1']
          });
        } catch (e) {}
      }

      // Smooth fade out of passcode gate card
      gateOverlay.classList.add('unlocked');

      // Smoothly reveal main project content
      setTimeout(function () {
        if (mainSlider) {
          mainSlider.classList.remove('is-locked');
          mainSlider.style.display = 'block';
          // Trigger smooth fade in
          requestAnimationFrame(function () {
            mainSlider.style.opacity = '1';
            window.dispatchEvent(new Event('resize'));
          });
        }

        // Cleanly remove gate from display
        setTimeout(function () {
          gateOverlay.style.display = 'none';
        }, 500);
      }, 420);

    } else {
      // Incorrect Passcode
      isSubmitting = false;
      passcodeSubmitBtn.disabled = false;
      passcodeInput.disabled = false;
      passcodeSubmitBtn.innerHTML = '<span class="btn-paw">🐾</span> <span class="btn-text">Submit</span> <span class="btn-sparkle">✨</span>';

      // Gentle, cute error message
      showError('Oops! Wrong passcode, try again! 💕');

      // Shake animation on card
      passcodeCard.classList.remove('shake-error');
      void passcodeCard.offsetWidth; // trigger reflow
      passcodeCard.classList.add('shake-error');

      // Focus & highlight for quick re-entry
      passcodeInput.focus();
      passcodeInput.select();
    }
  }

  // Event Listeners
  if (passcodeForm) {
    passcodeForm.addEventListener('submit', handleSubmit);
  }
  passcodeSubmitBtn.addEventListener('click', handleSubmit);

  // Auto focus input on load
  window.addEventListener('DOMContentLoaded', function () {
    setTimeout(function () {
      if (passcodeInput) passcodeInput.focus();
    }, 250);
  });

})();
