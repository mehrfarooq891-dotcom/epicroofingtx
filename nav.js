/**
 * Epic Roofing & Construction LLC - Navigation & Dropdown Controller
 * 
 * Capabilities:
 * 1. Desktop dropdown menus:
 *    - Submenu lists hidden by default (display: none via CSS)
 *    - Opens on hover on desktop
 *    - Tap/click toggle for touchscreens, tablets, and click interactions
 *    - Accessible ARIA state management (aria-expanded, role)
 *    - Closes on outside click, Escape key, or when clicking any submenu item
 * 2. Mobile navigation:
 *    - Tap to expand/collapse accordions for Services & Resources
 *    - Closes mobile drawer when any link is clicked to navigate
 */
(function () {
  function initNav() {
    // 1. Desktop Dropdown Menus
    var dropdowns = document.querySelectorAll('.dropdown');

    dropdowns.forEach(function (dropdown) {
      var toggle = dropdown.querySelector('.dropdown-toggle');
      var menu = dropdown.querySelector('.dropdown-menu');

      if (toggle) {
        // Tap / Click handler
        toggle.addEventListener('click', function (e) {
          e.preventDefault();
          e.stopPropagation();

          var isOpen = dropdown.classList.contains('is-open');

          // Close all other open dropdowns
          dropdowns.forEach(function (other) {
            if (other !== dropdown) {
              other.classList.remove('is-open');
              var otherToggle = other.querySelector('.dropdown-toggle');
              if (otherToggle) {
                otherToggle.setAttribute('aria-expanded', 'false');
              }
            }
          });

          // Toggle this dropdown
          if (isOpen) {
            dropdown.classList.remove('is-open');
            toggle.setAttribute('aria-expanded', 'false');
          } else {
            dropdown.classList.add('is-open');
            toggle.setAttribute('aria-expanded', 'true');
          }
        });
      }

      // Close dropdown when any item inside is clicked
      if (menu) {
        var items = menu.querySelectorAll('.dropdown-item, a');
        items.forEach(function (item) {
          item.addEventListener('click', function () {
            dropdown.classList.remove('is-open');
            if (toggle) {
              toggle.setAttribute('aria-expanded', 'false');
            }
          });
        });
      }
    });

    // Close desktop dropdowns when clicking outside
    document.addEventListener('click', function (e) {
      if (!e.target.closest('.dropdown')) {
        dropdowns.forEach(function (dropdown) {
          dropdown.classList.remove('is-open');
          var toggle = dropdown.querySelector('.dropdown-toggle');
          if (toggle) {
            toggle.setAttribute('aria-expanded', 'false');
          }
        });
      }
    });

    // Close desktop dropdowns on Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        dropdowns.forEach(function (dropdown) {
          dropdown.classList.remove('is-open');
          var toggle = dropdown.querySelector('.dropdown-toggle');
          if (toggle) {
            toggle.setAttribute('aria-expanded', 'false');
          }
        });
      }
    });

    // 2. Mobile Accordions (Tap to expand/collapse)
    var accordionBtns = document.querySelectorAll('.mobile-accordion-btn');
    accordionBtns.forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();

        var isActive = this.classList.contains('active');
        var content = this.nextElementSibling;

        if (isActive) {
          this.classList.remove('active');
          if (content) {
            content.classList.remove('active');
          }
        } else {
          this.classList.add('active');
          if (content) {
            content.classList.add('active');
          }
        }
      });
    });

    // 3. Mobile Slideout / Overlay Drawer
    var toggleBtn = document.getElementById('mobile-toggle-btn') || document.getElementById('menu-btn');
    var closeBtn = document.getElementById('mobile-close-btn') || document.getElementById('menu-close-btn');
    var mobileOverlay = document.getElementById('mobile-overlay') || document.getElementById('mobile-menu');
    var menuOverlay = document.getElementById('menu-overlay');

    function openMobileMenu() {
      if (mobileOverlay) mobileOverlay.classList.add('active');
      if (menuOverlay) menuOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    function closeMobileMenu() {
      if (mobileOverlay) mobileOverlay.classList.remove('active');
      if (menuOverlay) menuOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }

    if (toggleBtn) toggleBtn.addEventListener('click', openMobileMenu);
    if (closeBtn) closeBtn.addEventListener('click', closeMobileMenu);
    if (menuOverlay) menuOverlay.addEventListener('click', closeMobileMenu);

    // Close mobile drawer when any link is clicked to navigate
    var mobileLinks = document.querySelectorAll(
      '.mobile-link, .mobile-nav-link, .mobile-accordion-link, .mobile-accordion-content a'
    );
    mobileLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        closeMobileMenu();
      });
    });

    // 4. Global Sticky Phone Number Controller
    initStickyPhoneWidget();
  }

  function initStickyPhoneWidget() {
    var widget = document.getElementById('global-call-widget');
    if (!widget) {
      widget = document.getElementById('mobile-sticky-cta-bar');
    }

    var widgetHtml = [
      '<a href="tel:+12813269905" class="sticky-call-btn" id="sticky-call-btn" aria-label="Call Epic Roofing at (281) 326-9905">',
      '  <svg class="sticky-call-icon" viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">',
      '    <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>',
      '  </svg>',
      '  <span class="btn-text-desktop">Call (281) 326-9905</span>',
      '  <span class="btn-text-mobile">Call (281) 326-9905</span>',
      '</a>'
    ].join('\n');

    if (!widget) {
      widget = document.createElement('div');
      widget.className = 'global-call-widget';
      widget.id = 'global-call-widget';
      widget.setAttribute('role', 'region');
      widget.setAttribute('aria-label', 'Call Epic Roofing');
      widget.innerHTML = widgetHtml;
      document.body.appendChild(widget);
    } else {
      widget.className = 'global-call-widget';
      widget.id = 'global-call-widget';
      widget.innerHTML = widgetHtml;
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNav);
  } else {
    initNav();
  }
})();
