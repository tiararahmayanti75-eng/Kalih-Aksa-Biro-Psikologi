// ========================================== */
// 1. FORM BOOKING KE WHATSAPP                 */
// ========================================== */
const waForm = document.getElementById('waForm');

if (waForm) {
    waForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const nama = document.getElementById('nama').value.trim();
        const konselor = document.getElementById('konselorPilihan').value;
        const tanggal = document.getElementById('tanggal').value;
        const keluhan = document.getElementById('keluhan').value.trim();
        const nomorAdmin = "6281234567890"; 

        let pesan = `Halo Admin Kalih Aksa, saya ingin menjadwalkan sesi konseling.\n\n` +
                    `*Nama:* ${nama}\n` +
                    `*Pilihan Konselor:* ${konselor}\n` +
                    `*Tanggal:* ${tanggal}\n`;
        
        if (keluhan) {
            pesan += `*Keluhan/Catatan:* ${keluhan}\n`;
        }

        pesan += `\nMohon konfirmasi ketersediaannya. Terima kasih.`;
        const encodedPesan = encodeURIComponent(pesan);
        window.open(`https://wa.me/${nomorAdmin}?text=${encodedPesan}`, '_blank');
    });
}

// ========================================== */
// 2. FAQ ACCORDION INTERAKTIF                */
// ========================================== */
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    questionBtn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        faqItems.forEach(i => i.classList.remove('active'));
        if (!isActive) item.classList.add('active');
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
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

window.addEventListener('DOMContentLoaded', () => {
    const slotSpan = document.getElementById('slot-count');
    const randomSlots = Math.floor(Math.random() * 3) + 2; 
    if(slotSpan) {
        slotSpan.textContent = `Tersedia ${randomSlots} Sesi`;
    }

    // Load saved gratitude journal if any
    const savedSyukur = localStorage.getItem('kalih_aksa_syukur');
    if (savedSyukur) {
        document.getElementById('riwayatSyukurBox').style.display = 'block';
        document.getElementById('tampilSyukur').textContent = savedSyukur;
    }

    // Load saved letter if any
    const savedSurat = localStorage.getItem('kalih_aksa_surat');
    if (savedSurat) {
        document.getElementById('kotakTampilSurat').style.display = 'block';
        document.getElementById('teksSuratTersimpan').textContent = savedSurat;
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
            teksHasil.textContent = "Kondisi mental Anda tampaknya cukup stabil minggu ini. Tetap pertahankan pola hidup sehat dan istirahat cukup.";
        } else if (totalSkor <= 7) {
            judulHasil.textContent = "Hasil: Tingkat Stres Sedang (Butuh Perhatian)";
            teksHasil.textContent = "Anda mulai merasakan tekanan yang cukup berarti. Disarankan mendengarkan musik relaksasi atau melakukan hobi.";
        } else {
            judulHasil.textContent = "Hasil: Tingkat Stres Tinggi (Sangat Disarankan Konseling)";
            teksHasil.textContent = "Beban pikiran Anda terlihat cukup berat. Sangat disarankan segera menjadwalkan sesi konsultasi dengan psikolog kami.";
        }
    });
}

// ========================================== */
// 5.1 FITUR BARU: SKRINING KECEMASAN         */
// ========================================== */
const btnHitungCemas = document.getElementById('btnHitungCemas');

if (btnHitungCemas) {
    btnHitungCemas.addEventListener('click', () => {
        const c1 = parseInt(document.getElementById('cemas1').value);
        const c2 = parseInt(document.getElementById('cemas2').value);
        const totalCemas = c1 + c2;

        const hasilCemas = document.getElementById('hasilCemas');
        const judulHasilCemas = document.getElementById('judulHasilCemas');
        const teksHasilCemas = document.getElementById('teksHasilCemas');

        hasilCemas.style.display = 'block';

        if (totalCemas <= 1) {
            judulHasilCemas.textContent = "Hasil: Tingkat Kecemasan Minimal 🌿";
            teksHasilCemas.textContent = "Kecemasan Anda berada pada batas normal. Tetap jaga keseimbangan pikiran dan kelola aktivitas harian dengan baik.";
        } else if (totalCemas <= 3) {
            judulHasilCemas.textContent = "Hasil: Tingkat Kecemasan Ringan hingga Sedang ⚠️";
            teksHasilCemas.textContent = "Anda tampak mengalami ketegangan emosional. Coba gunakan fitur Grounding 5-4-3-2-1 di atas untuk membantu meredakan rasa cemas.";
        } else {
            judulHasilCemas.textContent = "Hasil: Indikasi Kecemasan Cukup Tinggi 🫂";
            teksHasilCemas.textContent = "Rasa khawatir yang berlebihan berpotensi mengganggu aktivitas harian. Jangan ragu untuk berbicara dengan profesional di Kalih Aksa.";
        }
    });
}

// ========================================== */
// 5.2 FITUR BARU: JURNAL SYUKUR HARIAN       */
// ========================================== */
const btnSimpanSyukur = document.getElementById('btnSimpanSyukur');

if (btnSimpanSyukur) {
    btnSimpanSyukur.addEventListener('click', () => {
        const inputSyukur = document.getElementById('inputSyukur').value.trim();
        if (inputSyukur === "") {
            alert("Silakan tuliskan hal yang kamu syukuri terlebih dahulu.");
            return;
        }

        localStorage.setItem('kalih_aksa_syukur', inputSyukur);
        document.getElementById('riwayatSyukurBox').style.display = 'block';
        document.getElementById('tampilSyukur').textContent = inputSyukur;
        alert("Catatan syukur berhasil disimpan! Terima kasih sudah melatih pikiran positif hari ini ✨");
        document.getElementById('inputSyukur').value = "";
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

        const kumpulanPenenang = [
            "Terima kasih sudah berani menuliskannya dan melepaskan sedikit bebanmu hari ini. Kamu sudah berjuang dengan sangat baik.",
            "Perasaan berat yang kamu rasakan saat ini valid. Jangan memikul semuanya sendirian; kamu berhak mendapatkan ruang untuk bernapas.",
            "Apa pun yang sedang kamu hadapi, percayalah bahwa badai pasti berlalu. Kamu lebih kuat dari yang kamu bayangkan."
        ];

        const randomPenenang = kumpulanPenenang[Math.floor(Math.random() * kumpulanPenenang.length)];
        divRespon.style.display = 'block';
        teksRespon.textContent = randomPenenang;
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
        const daftarAfirmasi = [
            "\"Aku berhak merasa tenang, dan aku melepaskan segala hal yang tidak bisa aku kendalikan.\"",
            "\"Setiap langkah kecil yang aku ambil hari ini sudah lebih dari cukup. Aku bangga pada diriku sendiri.\"",
            "\"Kekuatanku jauh lebih besar daripada ketakutan atau kecemasan yang sedang kurasakan saat ini.\""
        ];
        const afirmasiAcak = daftarAfirmasi[Math.floor(Math.random() * daftarAfirmasi.length)];

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
        desc: "Perhatikan sekelilingmu. Sebutkan secara mental atau bersuara <strong>5 benda</strong> yang bisa kamu lihat saat ini."
    },
    {
        title: "Langkah 2: Perabaan (4)",
        desc: "Fokus pada indra peraba. Sentuh dan rasakan tekstur dari <strong>4 benda</strong> di dekatmu."
    },
    {
        title: "Langkah 3: Pendengaran (3)",
        desc: "Dengarkan baik-baik lingkungan sekitar. Identifikasi <strong>3 suara</strong> yang bisa kamu dengar saat ini."
    },
    {
        title: "Langkah 4: Penciuman (2)",
        desc: "Tarik napas perlahan. Cari atau kenali <strong>2 aroma</strong> yang bisa kamu cium di sekitarmu."
    },
    {
        title: "Langkah 5: Pengecapan (1)",
        desc: "Fokus pada indra pengecapmu. Rasakan <strong>1 rasa</strong> yang tertinggal di mulutmu saat ini."
    },
    {
        title: "Selesai: Kembali Tenang 🌸",
        desc: "Luar biasa! Kamu telah berhasil kembali terhubung dengan momen saat ini. Tarik napas dalam-dalam, hembuskan perlahan."
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
            groundingDesc.innerHTML = groundingSteps[currentGroundingStep].desc;
            if (currentGroundingStep === groundingSteps.length - 1) {
                btnNextGrounding.textContent = "Selesai 💖";
            }
        } else {
            groundingTitle.textContent = "Latihan Selesai 🌸";
            groundingDesc.innerHTML = "Semoga perasaan cemasmu sudah jauh mereda. Jika butuh teman bicara, jangan ragu jadwalkan sesi bersama konselor kami!";
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

// ========================================== */
// 9. MOOD TRACKER INTERAKTIF                 */
// ========================================== */
const moodButtons = document.querySelectorAll('.mood-btn');
const moodResponseBox = document.getElementById('moodResponseBox');
const moodResponseTitle = document.getElementById('moodResponseTitle');
const moodResponseDesc = document.getElementById('moodResponseDesc');

const moodMessages = {
    senang: { title: "Ikut senang mendengarnya! ✨", desc: "Energi positifmu hari ini sangat berharga. Nikmati momen bahagianya!" },
    tenang: { title: "Kondisi batin yang damai 🌿", desc: "Pertahankan ritme yang menenangkan ini. Meluangkan waktu bernapas adalah bentuk perawatan diri." },
    lelah: { title: "Waktunya beristirahat sebentar 🛋️", desc: "Tubuh dan pikiranmu sudah bekerja keras. Tidak apa-apa untuk berhenti sejenak." },
    cemas: { title: "Tarik napas dalam-dalam, kamu tidak sendiri 🫂", desc: "Perasaan cemas ini valid. Coba gunakan fitur Grounding di atas." },
    sedih: { title: "Peluk hangat untukmu 🌧️", desc: "Air mata adalah bagian dari proses manusiawi. Badai emosi ini pasti akan berlalu." }
};

moodButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        moodButtons.forEach(b => b.style.borderColor = "var(--accent-color)");
        btn.style.borderColor = "#ffffff";
        const selectedMood = btn.getAttribute('data-mood');
        const data = moodMessages[selectedMood];
        if (data) {
            moodResponseBox.style.display = 'block';
            moodResponseTitle.textContent = data.title;
            moodResponseDesc.textContent = data.desc;
        }
    });
});

// ========================================== */
// 10. FITUR BARU: PESAN UNTUK DIRI SENDIRI   */
// ========================================== */
const btnSimpanSurat = document.getElementById('btnSimpanSurat');

if (btnSimpanSurat) {
    btnSimpanSurat.addEventListener('click', () => {
        const inputSurat = document.getElementById('inputSurat').value.trim();
        if (inputSurat === "") {
            alert("Silakan tulis pesan hangat untuk dirimu terlebih dahulu.");
            return;
        }

        localStorage.setItem('kalih_aksa_surat', inputSurat);
        document.getElementById('kotakTampilSurat').style.display = 'block';
        document.getElementById('teksSuratTersimpan').textContent = inputSurat;
        alert("Pesan berhasil disimpan untuk dirimu! 💌");
        document.getElementById('inputSurat').value = "";
    });
}