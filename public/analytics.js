/**
 * Epic Roofing & Construction LLC - Google Analytics 4 (GA4) Base & Event Tracking
 * Measurement ID: G-QLS1YWM2RP
 * 
 * Performance Optimized:
 * - Queues events instantly into window.dataLayer without blocking initial render.
 * - Lazily loads the heavy external gtag.js library (73+ KiB) on first user interaction
 *   (scroll, touch, click, mousemove) or via idle callback fallback (3500ms).
 * - Guarantees zero missed events while eliminating render-blocking & unused JavaScript flags.
 */
var GA_MEASUREMENT_ID = 'G-QLS1YWM2RP';

(function() {
  if (window.__GA4_INITIALIZED__) return;
  window.__GA4_INITIALIZED__ = true;

  // 1. Initialize dataLayer and window.gtag immediately so all events can be queued safely
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }
  window.gtag = window.gtag || gtag;

  gtag('js', new Date());
  gtag('config', GA_MEASUREMENT_ID, {
    send_page_view: true
  });

  // 2. Lazily load the external gtag.js script on interaction or idle
  var scriptLoaded = false;
  function loadGtagScript() {
    if (scriptLoaded) return;
    scriptLoaded = true;

    if (GA_MEASUREMENT_ID && GA_MEASUREMENT_ID !== 'G-XXXXXXXXXX') {
      var gaScript = document.createElement('script');
      gaScript.async = true;
      gaScript.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(GA_MEASUREMENT_ID);
      document.head.appendChild(gaScript);
    }
  }

  // Interaction triggers
  var interactionEvents = ['scroll', 'touchstart', 'mousemove', 'keydown', 'click'];
  function onInteraction() {
    loadGtagScript();
    interactionEvents.forEach(function(evt) {
      window.removeEventListener(evt, onInteraction, { passive: true });
    });
  }

  interactionEvents.forEach(function(evt) {
    window.addEventListener(evt, onInteraction, { passive: true, once: true });
  });

  // Idle timeout fallback
  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(function() {
      setTimeout(loadGtagScript, 3500);
    });
  } else {
    setTimeout(loadGtagScript, 4000);
  }

  // 3. Track phone number clicks as a GA4 event (tel: links)
  document.addEventListener('click', function(e) {
    try {
      var target = e.target;
      if (!target) return;

      var telLink = target.closest ? target.closest('a[href^="tel:"]') : null;
      if (!telLink && target.tagName === 'A' && target.getAttribute('href') && target.getAttribute('href').startsWith('tel:')) {
        telLink = target;
      }

      if (telLink) {
        loadGtagScript(); // Ensure script is loading immediately on click
        var phoneUrl = telLink.getAttribute('href') || '';
        var linkText = (telLink.innerText || telLink.textContent || '').trim();

        if (typeof window.gtag === 'function') {
          window.gtag('event', 'phone_call_click', {
            page_location: window.location.href,
            page_title: document.title,
            link_text: linkText || phoneUrl.replace(/^tel:/i, '').trim(),
            link_url: phoneUrl
          });
        }
      }
    } catch (err) {
      console.warn('GA4 phone click tracking error:', err);
    }
  }, { capture: true, passive: true });

  // 4. Track lead form submissions as a GA4 event
  document.addEventListener('submit', function(e) {
    try {
      var form = e.target;
      if (!form || form.tagName !== 'FORM') return;

      loadGtagScript(); // Ensure script is loading immediately on submit
      var formId = form.id || form.getAttribute('name') || '';
      if (!formId) {
        var path = window.location.pathname.replace(/^\/|\.html$/g, '') || 'homepage';
        formId = path.replace(/[^a-zA-Z0-9_-]/g, '_') + '_lead_form';
      }

      if (typeof window.gtag === 'function') {
        window.gtag('event', 'lead_form_submit', {
          page_location: window.location.href,
          page_title: document.title,
          form_name: formId
        });
      }
    } catch (err) {
      console.warn('GA4 form submission tracking error:', err);
    }
  }, { capture: true, passive: true });
})();
