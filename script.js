document.addEventListener('DOMContentLoaded', () => {
    // 1. Sinkronisasi status admin & pengumuman dari LocalStorage
    const savedStatus = localStorage.getItem('adminStatus');
    if (savedStatus) {
        const displayStatus = document.getElementById('displayAdminStatus');
        if (displayStatus) displayStatus.innerText = savedStatus;
    }

    const savedNotice = localStorage.getItem('adminNotice');
    if (savedNotice) {
        const noticeBox = document.getElementById('displayAdminNotice');
        if (noticeBox) {
            noticeBox.innerText = savedNotice;
            noticeBox.style.display = 'block';
        }
    }

    // 2. Dark/Light Mode Handler (Perbaikan Utama)
    const themeBtn = document.getElementById('themeToggleBtn');
    const themeIcon = document.getElementById('themeIcon');
    
    // Cek preferensi tema yang tersimpan sebelumnya
    if (localStorage.getItem('theme') === 'light') {
        document.body.classList.add('light-mode');
        if (themeIcon) themeIcon.className = 'fa-solid fa-sun';
    }

    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            // Toggle class light-mode pada body
            document.body.classList.toggle('light-mode');
            
            // Ubah ikon dan simpan preferensi ke LocalStorage
            if (document.body.classList.contains('light-mode')) {
                localStorage.setItem('theme', 'light');
                if (themeIcon) themeIcon.className = 'fa-solid fa-sun';
            } else {
                localStorage.setItem('theme', 'dark');
                if (themeIcon) themeIcon.className = 'fa-solid fa-moon';
            }
        });
    }

    // 3. FAQ Accordion Logic
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const questionBtn = item.querySelector('.faq-question');
        questionBtn.addEventListener('click', () => {
            faqItems.forEach(other => {
                if (other !== item) other.classList.remove('active');
            });
            item.classList.toggle('active');
        });
    });

    // 4. Booking Form WhatsApp Handler
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('clientName').value;
            const service = document.getElementById('serviceType').value;
            const date = document.getElementById('bookingDate').value;
            const notes = document.getElementById('clientNotes').value;

            const formattedDate = new Date(date).toLocaleString('id-ID', {
                dateStyle: 'full',
                timeStyle: 'short'
            });

            const phoneAdmin = "62895806700908";
            const text = `Halo Admin Kalih Aksa, saya ingin menjadwalkan sesi konseling.\n\n` +
                         `*Nama:* ${name}\n` +
                         `*Layanan:* ${service}\n` +
                         `*Waktu:* ${formattedDate}\n` +
                         `*Catatan:* ${notes || '-'}`;

            const encodedText = encodeURIComponent(text);
            window.open(`https://wa.me/${phoneAdmin}?text=${encodedText}`, '_blank');
        });
    }

    // 5. Testimoni Dinamis Handler
    const testiForm = document.getElementById('testiForm');
    const testimoniContainer = document.getElementById('testimoniContainer');

    const savedTestimonials = JSON.parse(localStorage.getItem('testimonials')) || [];
    savedTestimonials.forEach(t => {
        appendTestimonialCard(t.name, t.msg);
    });

    if (testiForm) {
        testiForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('testiName').value;
            const msg = document.getElementById('testiMsg').value;

            appendTestimonialCard(name, msg);

            savedTestimonials.push({ name, msg });
            localStorage.setItem('testimonials', JSON.stringify(savedTestimonials));

            testiForm.reset();
            alert('Terima kasih! Ulasan Anda berhasil dibagikan.');
        });
    }

    function appendTestimonialCard(name, msg) {
        if (!testimoniContainer) return;
        const card = document.createElement('div');
        card.className = 'testimoni-card';
        card.innerHTML = `
            <p class="testimoni-text">"${msg}"</p>
            <span class="testimoni-name">— ${name}</span>
        `;
        testimoniContainer.appendChild(card);
    }
});