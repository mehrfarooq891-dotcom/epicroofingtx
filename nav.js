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
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNav);
  } else {
    initNav();
  }
})();
