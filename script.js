// ==========================================
// SCRIPT UTAMA - KALIH AKSA WEB
// ==========================================

// 1. Fungsi Integrasi Form Booking ke WhatsApp
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

// 2. Fungsi Interaktif FAQ Accordion (Buka-Tutup Tanya Jawab)
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    questionBtn.addEventListener('click', () => {
        // Tutup item lain yang sedang terbuka (opsional)
        faqItems.forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
            }
        });
        // Buka / tutup item yang diklik
        item.classList.toggle('active');
    });
});