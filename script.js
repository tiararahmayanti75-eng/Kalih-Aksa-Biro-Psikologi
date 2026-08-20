document.addEventListener('DOMContentLoaded', () => {
  
  // 1. Accordion FAQ
  const detailsElements = document.querySelectorAll('details');
  detailsElements.forEach((targetDetail) => {
    targetDetail.addEventListener('click', () => {
      detailsElements.forEach((detail) => {
        if (detail !== targetDetail) detail.removeAttribute('open');
      });
    });
  });

  // 2. Light / Dark Mode Toggle
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');

  if (localStorage.getItem('theme') === 'light') {
    document.body.classList.add('light-mode');
    themeIcon.classList.replace('fa-moon', 'fa-sun');
  }

  themeToggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    const isLight = document.body.classList.contains('light-mode');
    themeIcon.classList.replace(isLight ? 'fa-moon' : 'fa-sun', isLight ? 'fa-sun' : 'fa-moon');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
  });

  // 3. Filter Kategori Layanan
  const filterBtns = document.querySelectorAll('.filter-btn');
  const serviceItems = document.querySelectorAll('.service-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      serviceItems.forEach(item => {
        if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
          item.classList.remove('hidden');
        } else {
          item.classList.add('hidden');
        }
      });
    });
  });

  // 4. Testimonial Slider Logic
  const testimonials = document.querySelectorAll('.testimonial-item');
  const prevBtn = document.getElementById('prev-testi');
  const nextBtn = document.getElementById('next-testi');
  const dotsContainer = document.getElementById('dots-container');
  let currentTesti = 0;

  // Render dots
  testimonials.forEach((_, idx) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (idx === 0) dot.classList.add('active');
    dot.addEventListener('click', () => showTestimonial(idx));
    dotsContainer.appendChild(dot);
  });

  const dots = document.querySelectorAll('.dot');

  function showTestimonial(index) {
    testimonials[currentTesti].classList.remove('active');
    dots[currentTesti].classList.remove('active');

    currentTesti = (index + testimonials.length) % testimonials.length;

    testimonials[currentTesti].classList.add('active');
    dots[currentTesti].classList.add('active');
  }

  prevBtn.addEventListener('click', () => showTestimonial(currentTesti - 1));
  nextBtn.addEventListener('click', () => showTestimonial(currentTesti + 1));

  // Auto slide 6 detik sekali
  setInterval(() => showTestimonial(currentTesti + 1), 6000);

  // 5. Quiz / Skrining Stres Mandiri
  const quizForm = document.getElementById('quiz-form');
  const quizResult = document.getElementById('quiz-result');
  const resultTitle = document.getElementById('result-title');
  const resultDesc = document.getElementById('result-desc');

  quizForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const q1 = parseInt(document.getElementById('q1').value);
    const q2 = parseInt(document.getElementById('q2').value);
    const q3 = parseInt(document.getElementById('q3').value);
    const totalScore = q1 + q2 + q3;

    let category = '';
    let description = '';

    if (totalScore <= 2) {
      category = 'Indikasi Stres Ringan (Kondisi Stabil)';
      description = 'Kondisi emosional Anda relatif terkontrol dengan baik. Tetap jaga keseimbangan waktu istirahat.';
    } else if (totalScore <= 5) {
      category = 'Indikasi Stres Sedang (Butuh Perhatian)';
      description = 'Anda mulai merasakan beban emosional harian. Disarankan meluangkan waktu relaksasi atau konsultasi ringan.';
    } else {
      category = 'Indikasi Stres Tinggi / Kelelahan Mental';
      description = 'Kondisi emosional Anda memerlukan penanganan yang tepat. Kami menyarankan berdiskusi langsung dengan psikolog.';
    }

    resultTitle.textContent = category;
    resultDesc.textContent = description;
    quizResult.classList.remove('hidden');
    quizResult.scrollIntoView({ behavior: 'smooth' });
  });

  // 6. Interactive Booking Modal Logic
  const bookingModal = document.getElementById('booking-modal');
  const closeModalBtn = document.getElementById('close-modal');
  const openBookingBtns = document.querySelectorAll('.open-booking-btn');
  const selectPackageInput = document.getElementById('select-package');
  const bookingForm = document.getElementById('booking-form');

  // Set default date = besok
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  document.getElementById('booking-date').value = tomorrow.toISOString().split('T')[0];

  openBookingBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const packageName = btn.getAttribute('data-package') || 'Konsultasi Umum';
      selectPackageInput.value = packageName;
      bookingModal.classList.remove('hidden');
    });
  });

  closeModalBtn.addEventListener('click', () => {
    bookingModal.classList.add('hidden');
  });

  bookingModal.addEventListener('click', (e) => {
    if (e.target === bookingModal) bookingModal.classList.add('hidden');
  });

  // Handle Submit Form Booking ke WhatsApp
  bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('client-name').value;
    const pkg = selectPackageInput.value;
    const doctor = document.getElementById('select-doctor').value;
    const type = document.getElementById('select-type').value;
    const date = document.getElementById('booking-date').value;

    const message = `Halo Admin Kalih Aksa, saya ingin booking sesi konseling:%0A%0A` +
                    `*Nama:* ${encodeURIComponent(name)}%0A` +
                    `*Layanan:* ${encodeURIComponent(pkg)}%0A` +
                    `*Psikolog Pilihan:* ${encodeURIComponent(doctor)}%0A` +
                    `*Metode:* ${encodeURIComponent(type)}%0A` +
                    `*Rencana Tanggal:* ${encodeURIComponent(date)}%0A%0A` +
                    `Mohon info ketersediaan jam sesi tersebut. Terima kasih!`;

    window.open(`https://wa.me/62895806700908?text=${message}`, '_blank');
    bookingModal.classList.add('hidden');
  });

});