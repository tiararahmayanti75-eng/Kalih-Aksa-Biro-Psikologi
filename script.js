// ==========================================
// SCRIPT UTAMA - KALIH AKSA WEB
// ==========================================

// 1. Integrasi Form Booking ke WhatsApp
const bookingForm = document.getElementById('bookingForm');

if (bookingForm) {
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('clientName').value;
        const service = document.getElementById('serviceType').value;
        const date = document.getElementById('bookingDate').value;
        const notes = document.getElementById('clientNotes').value || '-';
        
        const phone = "62895806700908"; 
        
        const msg = `Halo Kalih Aksa, saya ingin booking sesi konseling.%0A%0ANama: ${name}%0ALayanan: ${service}%0AJadwal: ${date}%0ACatatan: ${notes}%0A%0AMohon konfirmasinya, terima kasih.`;
        
        window.open(`https://wa.me/${phone}?text=${msg}`, '_blank');
    });
}

// 2. Interaktif FAQ Accordion
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    questionBtn.addEventListener('click', () => {
        faqItems.forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
            }
        });
        item.classList.toggle('active');
    });
});

// 3. Fitur Tambah Testimoni / Ulasan Baru Secara Langsung
const testiForm = document.getElementById('testiForm');
const testimoniContainer = document.getElementById('testimoniContainer');

if (testiForm) {
    testiForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('testiName').value;
        const msg = document.getElementById('testiMsg').value;
        
        // Buat elemen card baru
        const newCard = document.createElement('div');
        newCard.className = 'testimoni-card';
        newCard.innerHTML = `
            <p class="testimoni-text">"${msg}"</p>
            <span class="testimoni-name">— ${name}</span>
        `;
        
        // Masukkan ke urutan paling depan container testimoni
        testimoniContainer.prepend(newCard);
        
        // Reset form
        testiForm.reset();
        alert('Terima kasih! Ulasan Anda berhasil ditambahkan.');
    });
}