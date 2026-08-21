// ==========================================
// SCRIPT UTAMA - KALIH AKSA WEB
// ==========================================

// Fungsi Integrasi Form Booking ke WhatsApp
const bookingForm = document.getElementById('bookingForm');

if (bookingForm) {
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Mengambil nilai input dari form
        const name = document.getElementById('clientName').value;
        const service = document.getElementById('serviceType').value;
        const date = document.getElementById('bookingDate').value;
        const notes = document.getElementById('clientNotes').value || '-';
        
        // Nomor WhatsApp Admin Kalih Aksa (Sudah diperbarui)
        const phone = "62895806700908"; 
        
        // Format pesan otomatis yang akan dikirim ke WhatsApp
        const msg = `Halo Kalih Aksa, saya ingin booking sesi konseling.%0A%0ANama: ${name}%0ALayanan: ${service}%0AJadwal: ${date}%0ACatatan: ${notes}%0A%0AMohon konfirmasinya, terima kasih.`;
        
        // Membuka jendela WhatsApp baru dengan pesan yang sudah terisi
        window.open(`https://wa.me/${phone}?text=${msg}`, '_blank');
    });
}