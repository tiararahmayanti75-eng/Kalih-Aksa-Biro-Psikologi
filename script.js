document.addEventListener('DOMContentLoaded', () => {
  
  // 1. Accordion effect untuk FAQ
  const detailsElements = document.querySelectorAll('details');
  detailsElements.forEach((targetDetail) => {
    targetDetail.addEventListener('click', () => {
      detailsElements.forEach((detail) => {
        if (detail !== targetDetail) {
          detail.removeAttribute('open');
        }
      });
    });
  });

  // 2. Light / Dark Mode Toggle Logic
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');

  // Cek preferensi tersimpan
  const currentTheme = localStorage.getItem('theme');
  if (currentTheme === 'light') {
    document.body.classList.add('light-mode');
    themeIcon.classList.replace('fa-moon', 'fa-sun');
  }

  themeToggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    
    if (document.body.classList.contains('light-mode')) {
      themeIcon.classList.replace('fa-moon', 'fa-sun');
      localStorage.setItem('theme', 'light');
    } else {
      themeIcon.classList.replace('fa-sun', 'fa-moon');
      localStorage.setItem('theme', 'dark');
    }
  });

  // 3. Logika Quiz / Skrining Stres Mandiri
  const quizForm = document.getElementById('quiz-form');
  const quizResult = document.getElementById('quiz-result');
  const resultTitle = document.getElementById('result-title');
  const resultDesc = document.getElementById('result-desc');
  const resultWaBtn = document.getElementById('result-wa-btn');

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
      description = 'Kondisi emosional Anda relatif terkontrol dengan baik. Tetap jaga keseimbangan waktu istirahat dan pola hidup sehat harian Anda.';
    } else if (totalScore <= 5) {
      category = 'Indikasi Stres Sedang (Butuh Perhatian)';
      description = 'Anda mulai merasakan beban emosional atau kelelahan harian. Disarankan untuk meluangkan waktu relaksasi atau berkonsultasi ringan dengan konselor.';
    } else {
      category = 'Indikasi Stres Tinggi / Kelelahan Mental';
      description = 'Kondisi emosional Anda memerlukan penanganan yang tepat agar tidak berkepanjangan. Kami sangat menyarankan Anda berdiskusi langsung dengan psikolog profesional kami.';
    }

    resultTitle.textContent = category;
    resultDesc.textContent = description;

    // Set pesan otomatis untuk WhatsApp berdasarkan hasil kuis
    const waText = encodeURIComponent(`Halo Kalih Aksa, saya telah melakukan skrining mandiri di website dengan hasil: "${category}". Saya ingin berkonsultasi lebih lanjut.`);
    resultWaBtn.href = `https://wa.me/62895806700908?text=${waText}`;

    quizResult.classList.remove('hidden');
    quizResult.scrollIntoView({ behavior: 'smooth' });
  });

});