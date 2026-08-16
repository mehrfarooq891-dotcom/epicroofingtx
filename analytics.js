/**
 * Epic Roofing & Construction LLC - Google Analytics 4 (GA4) Base & Event Tracking
 * Measurement ID: G-QLS1YWM2RP
 * 
 * Compatible with Ringba pay-per-call tracking / dynamic number insertion (DNI).
 * Loads asynchronously without blocking rendering or Core Web Vitals.
 */
var GA_MEASUREMENT_ID = 'G-QLS1YWM2RP';

(function() {
  // Prevent duplicate execution if script is loaded multiple times
  if (window.__GA4_INITIALIZED__) return;
  window.__GA4_INITIALIZED__ = true;

  // STEP 1 — ASYNCHRONOUSLY INITIALIZE GA4 (gtag.js)
  if (GA_MEASUREMENT_ID && GA_MEASUREMENT_ID !== 'G-XXXXXXXXXX') {
    // 1. Asynchronously load standard gtag.js library from Google Tag Manager
    var gaScript = document.createElement('script');
    gaScript.async = true;
    gaScript.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(GA_MEASUREMENT_ID);
    document.head.appendChild(gaScript);

    // 2. Initialize dataLayer and window.gtag
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      window.dataLayer.push(arguments);
    }
    window.gtag = window.gtag || gtag;

    gtag('js', new Date());
    gtag('config', GA_MEASUREMENT_ID, {
      send_page_view: true
    });
  }

  // STEP 2 — TRACK PHONE NUMBER CLICKS AS A GA4 EVENT (tel: links)
  // Intercepts all clickable tel: links dynamically across header, footer,
  // sticky call buttons, hero CTAs, lead forms, and blog posts.
  // Compatible with Ringba dynamic number insertion: dynamically reads the current
  // href and visible text at click time without modifying Ringba or hardcoding phone numbers.
  document.addEventListener('click', function(e) {
    try {
      var target = e.target;
      if (!target) return;

      var telLink = target.closest ? target.closest('a[href^="tel:"]') : null;
      if (!telLink && target.tagName === 'A' && target.getAttribute('href') && target.getAttribute('href').startsWith('tel:')) {
        telLink = target;
      }

      if (telLink) {
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

  // STEP 3 — TRACK LEAD FORM SUBMISSIONS AS A GA4 EVENT
  // Intercepts form submissions across the homepage, 15 location landing pages,
  // service pages, and contact forms.
  document.addEventListener('submit', function(e) {
    try {
      var form = e.target;
      if (!form || form.tagName !== 'FORM') return;

      // Extract a descriptive identifier for the form
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
