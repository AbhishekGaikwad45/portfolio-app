// main.js - Portfolio Client Scripts

document.addEventListener('DOMContentLoaded', () => {
  // ============================================
  // 1. TAB SWITCHING (Home, About, Projects, Contact)
  // ============================================
  const navButtons = document.querySelectorAll('.btn-nav');
  const tabs = document.querySelectorAll('.portfolio-tab');
  const mainContent = document.querySelector('.main-content');
  const triggerLinks = document.querySelectorAll('.nav-tab-trigger');

  function switchTab(targetId) {
    // Hide all tabs
    tabs.forEach(tab => tab.classList.remove('active'));

    // Show target tab
    const activeTab = document.getElementById(targetId);
    if (activeTab) {
      activeTab.classList.add('active');
    }

    // Update nav button states
    navButtons.forEach(btn => {
      if (btn.getAttribute('data-target') === targetId) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // Scroll main content to top
    if (mainContent) {
      mainContent.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      if (targetId) {
        switchTab(targetId);
      }
    });
  });

  triggerLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('data-target');
      if (targetId) {
        switchTab(targetId);
      }
    });
  });

  // Handle URL hash on load
  const hash = window.location.hash.replace('#', '');
  if (hash) {
    const matchedTab = document.getElementById(`tab-${hash}`);
    if (matchedTab) {
      switchTab(`tab-${hash}`);
    }
  }

  // ============================================
  // 2. DYNAMIC TYPEWRITER EFFECT
  // ============================================
  const typewriterContainer = document.getElementById('typewriter-container');
  const typewriterText = document.getElementById('typewriter-text');

  if (typewriterContainer && typewriterText) {
    const fullTitle = typewriterContainer.getAttribute('data-title') || 'Full Stack Developer';
    let currentIndex = 0;
    let isDeleting = false;

    function tick() {
      if (!isDeleting) {
        if (currentIndex <= fullTitle.length) {
          typewriterText.textContent = fullTitle.slice(0, currentIndex);
          currentIndex++;
          setTimeout(tick, 75);
        } else {
          isDeleting = true;
          setTimeout(tick, 2200); // pause at full word
        }
      } else {
        if (currentIndex > 0) {
          typewriterText.textContent = fullTitle.slice(0, currentIndex);
          currentIndex--;
          setTimeout(tick, 35);
        } else {
          isDeleting = false;
          setTimeout(tick, 450); // pause before retyping
        }
      }
    }

    tick();
  }

  // ============================================
  // 3. CONTACT FORM AJAX SUBMISSION
  // ============================================
  const contactForm = document.getElementById('contact-form');
  const contactAlert = document.getElementById('contact-alert');
  const contactSubmitBtn = document.getElementById('contact-submit-btn');

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      if (contactSubmitBtn) {
        contactSubmitBtn.disabled = true;
        contactSubmitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status"></span> Sending...';
      }

      const formData = new FormData(contactForm);

      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          body: formData
        });

        const result = await response.json();

        if (contactAlert) {
          contactAlert.classList.remove('d-none', 'alert-danger', 'alert-success');
          if (response.ok && result.success) {
            contactAlert.classList.add('alert-success');
            contactAlert.textContent = result.message || 'Message sent successfully!';
            contactForm.reset();
          } else {
            contactAlert.classList.add('alert-danger');
            contactAlert.textContent = result.message || 'Failed to send message. Please try again.';
          }
        }
      } catch (err) {
        if (contactAlert) {
          contactAlert.classList.remove('d-none', 'alert-success');
          contactAlert.classList.add('alert-danger');
          contactAlert.textContent = 'An unexpected error occurred. Please try again later.';
        }
      } finally {
        if (contactSubmitBtn) {
          contactSubmitBtn.disabled = false;
          contactSubmitBtn.innerHTML = '<i class="bi bi-send-fill me-1"></i> Send Message';
        }
      }
    });
  }
});
