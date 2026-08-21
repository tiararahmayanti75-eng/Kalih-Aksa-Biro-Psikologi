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

// ========================================== */
// 6. RUANG CURHAT ANONIM                     */
// ========================================== */
const btnKirimCurhat = document.getElementById('btnKirimCurhat');

if (btnKirimCurhat) {
    btnKirimCurhat.addEventListener('click', () => {
        const inputCurhat = document.getElementById('pesanCurhat').value.trim();
        const divRespon = document.getElementById('responCurhat');
        const teksRespon = document.getElementById('teksResponCurhat');

        if (inputCurhat === "") {
            alert("Silakan tuliskan sesuatu terlebih dahulu.");
            return;
        }

        // Daftar kumpulan kata-kata penenang empati acak
        const kumpulanPenenang = [
            "Terima kasih sudah berani menuliskannya dan melepaskan sedikit bebanmu hari ini. Kamu sudah berjuang dengan sangat baik sampai detik ini. Ingat, tidak apa-apa untuk beristirahat sebentar.",
            "Perasaan berat yang kamu rasakan saat ini valid. Jangan memikul semuanya sendirian; kamu berhak mendapatkan ruang untuk bernapas dan bahagia.",
            "Apa pun yang sedang kamu hadapi di luar sana, percayalah bahwa badai pasti berlalu. Kamu lebih kuat dari yang kamu bayangkan.",
            "Mengekspresikan apa yang kamu rasakan adalah langkah awal pemulihan yang hebat. Tetaplah berbaik hati pada dirimu sendiri ya."
        ];

        // Ambil kalimat penenang secara acak
        const randomPenenang = kumpulanPenenang[Math.floor(Math.random() * kumpulanPenenang.length)];

        divRespon.style.display = 'block';
        teksRespon.textContent = randomPenenang;

        // Kosongkan textarea setelah dikirim
        document.getElementById('pesanCurhat').value = "";
    });
}

// ========================================== */
// 7. AFIRMASI POSITIF HARIAN                 */
// ========================================== */
const btnAcakAfirmasi = document.getElementById('btnAcakAfirmasi');

if (btnAcakAfirmasi) {
    btnAcakAfirmasi.addEventListener('click', () => {
        const teksAfirmasi = document.getElementById('teksAfirmasi');

        // Daftar kalimat afirmasi menenangkan
        const daftarAfirmasi = [
            "\"Aku berhak merasa tenang, dan aku melepaskan segala hal yang tidak bisa aku kendalikan.\"",
            "\"Setiap langkah kecil yang aku ambil hari ini sudah lebih dari cukup. Aku bangga pada diriku sendiri.\"",
            "\"Pikiran dan perasaanku valid. Aku memaafkan diriku atas kesalahan di masa lalu dan memilih bertumbuh.\"",
            "\"Kekuatanku jauh lebih besar daripada ketakutan atau kecemasan yang sedang kurasakan saat ini.\"",
            "\"Aku dikelilingi oleh potensi kebaikan, dan hari ini aku membuka diri untuk kedamaian batin.\"",
            "\"Tidak apa-apa untuk merasa lelah. Tubuh dan pikiranku berhak mendapatkan waktu untuk beristirahat.\""
        ];

        // Pilih kalimat secara acak
        const afirmasiAcak = daftarAfirmasi[Math.floor(Math.random() * daftarAfirmasi.length)];

        // Efek transisi sederhana
        teksAfirmasi.style.opacity = 0;
        setTimeout(() => {
            teksAfirmasi.textContent = afirmasiAcak;
            teksAfirmasi.style.opacity = 1;
            teksAfirmasi.style.transition = "opacity 0.4s ease-in-out";
        }, 200);
    });
}

// ========================================== */
// 8. INTERACTIVE GROUNDING TOOL (5-4-3-2-1)  */
// ========================================== */
const groundingSteps = [
    {
        title: "Langkah 1: Penglihatan (5)",
        desc: "Perhatikan sekelilingmu. Sebutkan secara mental atau bersuara **5 benda** yang bisa kamu lihat saat ini (contoh: lampu, meja, dinding, botol minum, jendela)."
    },
    {
        title: "Langkah 2: Perabaan (4)",
        desc: "Fokus pada indra peraba. Sentuh dan rasakan tekstur dari **4 benda** di dekatmu (contoh: permukaan pakaian, tekstur meja, casing HP, helaian kain)."
    },
    {
        title: "Langkah 3: Pendengaran (3)",
        desc: "Dengarkan baik-baik lingkungan sekitar. Identifikasi **3 suara** yang bisa kamu dengar saat ini (contoh: suara kipas angin, suara kendaraan di luar, detak jam dinding)."
    },
    {
        title: "Langkah 4: Penciuman (2)",
        desc: "Tarik napas perlahan melalui hidung. Cari atau kenali **2 aroma** yang bisa kamu cium di sekitarmu (contoh: aroma sabun, wangi kopi, atau udara segar)."
    },
    {
        title: "Langkah 5: Pengecapan (1)",
        desc: "Fokus pada indra pengecapmu. Rasakan **1 rasa** yang tertinggal di mulutmu saat ini (contoh: sisa air minum, rasa manis permen, atau cukup teguk air putih)."
    },
    {
        title: "Selesai: Kembali Tenang 🌸",
        desc: "Luar biasa! Kamu telah berhasil kembali terhubung dengan momen saat ini. Tarik napas dalam-dalam, hembuskan perlahan. Tubuh dan pikiranmu kini jauh lebih tenang."
    }
];

let currentGroundingStep = 0;
const btnNextGrounding = document.getElementById('btnNextGrounding');
const btnResetGrounding = document.getElementById('btnResetGrounding');
const groundingTitle = document.getElementById('groundingTitle');
const groundingDesc = document.getElementById('groundingDesc');

if (btnNextGrounding) {
    btnNextGrounding.addEventListener('click', () => {
        currentGroundingStep++;
        
        if (currentGroundingStep < groundingSteps.length) {
            groundingTitle.textContent = groundingSteps[currentGroundingStep].title;
            groundingDesc.innerHTML = groundingSteps[currentGroundingStep].desc; // Gunakan innerHTML agar tag <strong> terbaca
            
            if (currentGroundingStep === groundingSteps.length - 1) {
                btnNextGrounding.textContent = "Selesai 💖";
            }
        } else {
            groundingTitle.textContent = "Latihan Selesai 🌸";
            groundingDesc.innerHTML = "Semoga perasaan cemasmu sudah jauh mereda. Jika butuh teman bicara lebih lanjut, jangan ragu jadwalkan sesi bersama konselor profesional kami di Kalih Aksa!";
            btnNextGrounding.style.display = 'none';
            btnResetGrounding.style.display = 'block';
        }
    });
}

if (btnResetGrounding) {
    btnResetGrounding.addEventListener('click', () => {
        currentGroundingStep = 0;
        groundingTitle.textContent = groundingSteps[0].title;
        groundingDesc.innerHTML = groundingSteps[0].desc;
        btnNextGrounding.textContent = "Lanjut ke Langkah Berikutnya →";
        btnNextGrounding.style.display = 'block';
        btnResetGrounding.style.display = 'none';
    });
}