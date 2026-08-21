// ========================================== */
// 1. FORM BOOKING KE WHATSAPP                 */
// ========================================== */
const waForm = document.getElementById('waForm');

if (waForm) {
    waForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Ambil nilai dari form
        const nama = document.getElementById('nama').value.trim();
        const konselor = document.getElementById('konselorPilihan').value;
        const tanggal = document.getElementById('tanggal').value;
        const keluhan = document.getElementById('keluhan').value.trim();

        // Nomor WhatsApp Admin (Ganti dengan nomor tujuan Anda, awali dengan kode negara misal 628...)
        const nomorAdmin = "6281234567890"; 

        // Susun pesan teks yang rapi
        let pesan = `Halo Admin Kalih Aksa, saya ingin menjadwalkan sesi konseling.\n\n` +
                    `*Nama:* ${nama}\n` +
                    `*Pilihan Konselor:* ${konselor}\n` +
                    `*Tanggal:* ${tanggal}\n`;
        
        if (keluhan) {
            pesan += `*Keluhan/Catatan:* ${keluhan}\n`;
        }

        pesan += `\nMohon konfirmasi ketersediaannya. Terima kasih.`;

        // Encode pesan agar aman untuk URL WhatsApp
        const encodedPesan = encodeURIComponent(pesan);

        // Buka WhatsApp
        const urlWhatsApp = `https://wa.me/${nomorAdmin}?text=${encodedPesan}`;
        window.open(urlWhatsApp, '_blank');
    });
}

// ========================================== */
// 2. FAQ ACCORDION INTERAKTIF                */
// ========================================== */
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    
    questionBtn.addEventListener('click', () => {
        // Cek apakah item ini sudah aktif
        const isActive = item.classList.contains('active');

        // Tutup semua FAQ item terlebih dahulu
        faqItems.forEach(i => i.classList.remove('active'));

        // Jika sebelumnya belum aktif, buka yang diklik
        if (!isActive) {
            item.classList.add('active');
        }
    });
});

// ========================================== */
// 3. FITUR BACK TO TOP & DYNAMIC SLOT        */
// ========================================== */
const backToTopButton = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (backToTopButton) {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    }
});

if (backToTopButton) {
    backToTopButton.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// --- Script Simulasi Slot Real-Time ---
window.addEventListener('DOMContentLoaded', () => {
    const slotSpan = document.getElementById('slot-count');
    // Mengacak sisa slot antara 2 sampai 4 agar terlihat dinamis
    const randomSlots = Math.floor(Math.random() * 3) + 2; 
    if(slotSpan) {
        slotSpan.textContent = `Tersedia ${randomSlots} Sesi`;
    }
});

// ========================================== */
// 4. FITUR PEMUTAR MUSIK RELAKSASI             */
// ========================================== */
const musicToggleBtn = document.getElementById('musicToggleBtn');
const bgMusic = document.getElementById('bgMusic');
const musicText = document.getElementById('musicText');

if (musicToggleBtn && bgMusic) {
    let isPlaying = false;

    musicToggleBtn.addEventListener('click', () => {
        if (!isPlaying) {
            bgMusic.play().then(() => {
                isPlaying = true;
                musicToggleBtn.classList.add('playing');
                musicText.textContent = 'Jeda Musik';
            }).catch(error => {
                console.log("Autoplay dicegah browser:", error);
            });
        } else {
            bgMusic.pause();
            isPlaying = false;
            musicToggleBtn.classList.remove('playing');
            musicText.textContent = 'Musik Tenang';
        }
    });
}

// ========================================== */
// 5. KALKULATOR TINGKAT STRES MANDIRI        */
// ========================================== */
const btnHitungStres = document.getElementById('btnHitungStres');

if (btnHitungStres) {
    btnHitungStres.addEventListener('click', () => {
        const val1 = parseInt(document.getElementById('soal1').value);
        const val2 = parseInt(document.getElementById('soal2').value);
        const val3 = parseInt(document.getElementById('soal3').value);

        const totalSkor = val1 + val2 + val3;
        
        const divHasil = document.getElementById('hasilStres');
        const judulHasil = document.getElementById('judulHasil');
        const teksHasil = document.getElementById('teksHasil');

        divHasil.style.display = 'block';

        if (totalSkor <= 4) {
            judulHasil.textContent = "Hasil: Tingkat Stres Rendah (Kondisi Aman)";
            teksHasil.textContent = "Kondisi mental Anda tampaknya cukup stabil minggu ini. Tetap pertahankan pola hidup sehat, istirahat cukup, dan luangkan waktu untuk relaksasi.";
        } else if (totalSkor <= 7) {
            judulHasil.textContent = "Hasil: Tingkat Stres Sedang (Butuh Perhatian)";
            teksHasil.textContent = "Anda mulai merasakan tekanan yang cukup berarti. Disarankan untuk mulai mendengarkan musik relaksasi, melakukan hobi, atau mencoba sesi konseling ringan agar tidak menumpuk.";
        } else {
            judulHasil.textContent = "Hasil: Tingkat Stres Tinggi (Sangat Disarankan Konseling)";
            teksHasil.textContent = "Beban pikiran Anda terlihat cukup berat dan mengganggu istirahat. Sangat disarankan untuk segera menjadwalkan sesi konsultasi profesional dengan psikolog kami di Kalih Aksa.";
        }
    });
}