document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     1. LOGIKA TOAST NOTIFICATION (AUTO CLEAR STACK)
     ========================================================================== */
  function showToast(message) {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    container.innerHTML = '';

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;

    container.appendChild(toast);

    setTimeout(() => toast.classList.add('show'), 50);

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, 2500);
  }


  /* ==========================================================================
     2. LOGIKA DARK/LIGHT MODE TOGGLE (DENGAN DEFAULT DARK & LOCALSTORAGE)
     ========================================================================== */
  const themeToggle = document.getElementById('themeToggle');
  const htmlElement = document.documentElement;

  // Cek apakah user sebelumnya sudah menyimpan preferensi tema
  const savedTheme = localStorage.getItem('theme') || 'dark';
  htmlElement.setAttribute('data-theme', savedTheme);
  if (themeToggle) {
    themeToggle.textContent = savedTheme === 'dark' ? '🌙' : '☀️';
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = htmlElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

      htmlElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme); // Simpan preferensi
      themeToggle.textContent = newTheme === 'dark' ? '🌙' : '☀️';

      showToast(`Mode ${newTheme === 'dark' ? 'Gelap' : 'Terang'} Diaktifkan`);
    });
  }


  /* ==========================================================================
     3. LOGIKA ACCORDION FAQ
     ========================================================================== */
  const faqQuestions = document.querySelectorAll('.faq-question');

  faqQuestions.forEach((button) => {
    button.addEventListener('click', (e) => {
      e.stopPropagation();
      const currentItem = button.closest('.faq-item');

      document.querySelectorAll('.faq-item').forEach((item) => {
        if (item !== currentItem) {
          item.classList.remove('active');
        }
      });

      currentItem.classList.toggle('active');
    });
  });


  /* ==========================================================================
     4. LOGIKA HAMBURGER NAV MENU
     ========================================================================== */
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });

    document.querySelectorAll('.nav-menu a').forEach((link) => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
      });
    });
  }


  /* ==========================================================================
     5. LOGIKA KALKULATOR ESTIMASI BIAYA
     ========================================================================== */
  const sessionInput = document.getElementById('sessionCount');
  const totalEstimate = document.getElementById('totalEstimate');
  const pricePerSession = 350000;

  if (sessionInput && totalEstimate) {
    sessionInput.addEventListener('input', () => {
      let count = parseInt(sessionInput.value);

      if (isNaN(count) || count < 1) {
        count = 1;
      }

      const total = count * pricePerSession;
      totalEstimate.textContent = `Rp ${total.toLocaleString('id-ID')}`;
    });
  }


  /* ==========================================================================
     6. LOGIKA FILTER LAYANAN (INTERACTIVE FADE)
     ========================================================================== */
  const filterButtons = document.querySelectorAll('.filter-btn');
  const serviceCards = document.querySelectorAll('.service-card');

  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      serviceCards.forEach((card) => {
        const category = card.getAttribute('data-category');

        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'block';
          setTimeout(() => (card.style.opacity = '1'), 50);
        } else {
          card.style.opacity = '0';
          setTimeout(() => (card.style.display = 'none'), 300);
        }
      });
    });
  });


  /* ==========================================================================
     7. LOGIKA FORM BOOKING & AUTO REDIRECT WHATSAPP
     ========================================================================== */
  const bookingForm = document.getElementById('bookingForm');
  const phoneNumber = '628123456789'; // Ganti dengan nomor WhatsApp Anda

  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('clientName').value;
      const service = document.getElementById('serviceType').value;
      const date = document.getElementById('bookingDate').value;

      const message = `Halo Kalih Aksa, saya ingin mendaftar konseling.%0A%0A*Nama:* ${encodeURIComponent(name)}%0A*Layanan:* ${encodeURIComponent(service)}%0A*Tanggal:* ${encodeURIComponent(date)}`;

      showToast('Mengalihkan ke WhatsApp...');

      setTimeout(() => {
        window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
      }, 1000);
    });
  }


  /* ==========================================================================
     8. LOGIKA ANIMASI SCROLL (REVEAL ON SCROLL)
     ========================================================================== */
  const revealElements = document.querySelectorAll('.reveal');

  const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    const revealPoint = 100;

    revealElements.forEach((el) => {
      const revealTop = el.getBoundingClientRect().top;
      if (revealTop < windowHeight - revealPoint) {
        el.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll();


  /* ==========================================================================
     9. LOGIKA BACK TO TOP BUTTON
     ========================================================================== */
  const backToTopBtn = document.getElementById('backToTop');

  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        backToTopBtn.classList.add('show');
      } else {
        backToTopBtn.classList.remove('show');
      }
    });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }


  /* ==========================================================================
     10. LOGIKA MODAL POPUP DETAIL LAYANAN
     ========================================================================== */
  const serviceCardsList = document.querySelectorAll('.service-card');
  const modal = document.getElementById('serviceModal');
  const closeModal = document.getElementById('closeModal');
  const modalContent = document.getElementById('modalContent');

  if (modal && closeModal && modalContent) {
    serviceCardsList.forEach((card) => {
      card.style.cursor = 'pointer';
      card.addEventListener('click', () => {
        const title = card.querySelector('.card-title')?.textContent || 'Layanan';
        const desc = card.querySelector('.card-description')?.textContent || '';
        const icon = card.querySelector('.card-icon')?.textContent || '🌱';

        modalContent.innerHTML = `
          <div style="font-size: 3rem; margin-bottom: 10px;">${icon}</div>
          <h2 style="margin-bottom: 15px;">${title}</h2>
          <p style="color: var(--text-muted); margin-bottom: 20px;">${desc}</p>
          <hr style="border-color: var(--border-color); margin-bottom: 20px;">
          <p><strong>Durasi:</strong> 60 Menit / Sesi</p>
          <p><strong>Metode:</strong> Google Meet / Tatap Muka</p>
          <a href="#booking" onclick="document.getElementById('serviceModal').classList.remove('active')" class="btn-primary" style="display: block; text-align: center; margin-top: 20px;">Pesan Layanan Ini</a>
        `;

        modal.classList.add('active');
      });
    });

    closeModal.addEventListener('click', () => {
      modal.classList.remove('active');
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
      }
    });
  }

});