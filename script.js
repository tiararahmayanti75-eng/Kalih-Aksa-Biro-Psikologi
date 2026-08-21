/* ================================================= */
/* SCRIPT UTAMA KALIH AKSA (FULL INTEGRATED)        */
/* ================================================= */

document.addEventListener('DOMContentLoaded', function() {
    
    // =================================================
    // 1. SCRIPT: TOMBOL BACK TO TOP & SCROLL BEHAVIOR
    // =================================================
    const backToTopBtn = document.getElementById('backToTopBtn');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            if (backToTopBtn) backToTopBtn.classList.add('show');
        } else {
            if (backToTopBtn) backToTopBtn.classList.remove('show');
        }
    });

    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // =================================================
    // 2. SCRIPT: LATIHAN PERNAPASAN 4-7-8
    // =================================================
    let breathInterval;
    let isBreathing = false;

    // Membuat fungsi toggleBreathing bisa diakses secara global oleh atribut onclick di HTML
    window.toggleBreathing = function() {
        const circle = document.getElementById('breathingCircle');
        const instruction = document.getElementById('breathingInstruction');
        const btn = document.getElementById('btnStartBreath');

        if (!circle || !instruction || !btn) return;

        if (isBreathing) {
            clearInterval(breathInterval);
            isBreathing = false;
            circle.className = "";
            circle.style.transform = "scale(1)";
            instruction.innerText = "Tekan tombol di bawah untuk memulai panduan.";
            btn.innerText = "Mulai Latihan";
            return;
        }

        isBreathing = true;
        btn.innerText = "Berhenti";
        runBreathingCycle(circle, instruction);
        
        // Siklus berulang setiap 19 detik (4 tarik + 7 tahan + 8 hembus)
        breathInterval = setInterval(() => {
            runBreathingCycle(circle, instruction);
        }, 19000);
    };

    function runBreathingCycle(circle, instruction) {
        // Tarik Napas (4 Detik)
        instruction.innerText = "Tarik Napas Pelan-pelan... (4 detik)";
        circle.className = "breathing-animate-in";

        // Tahan Napas (7 Detik)
        setTimeout(() => {
            if (!isBreathing) return;
            instruction.innerText = "Tahan Napas Anda... (7 detik)";
            circle.className = "breathing-animate-hold";
        }, 4000);

        // Hembuskan Napas (8 Detik)
        setTimeout(() => {
            if (!isBreathing) return;
            instruction.innerText = "Hembuskan Perlahan... (8 detik)";
            circle.className = "breathing-animate-out";
        }, 11000);
    }

    // =================================================
    // 3. SCRIPT: JURNAL & VENTING LOKAL
    // =================================================
    window.saveJournal = function() {
        const journalInput = document.getElementById('journalInput');
        const resultBox = document.getElementById('journalResultBox');
        const savedText = document.getElementById('savedJournalText');

        if (!journalInput || !resultBox || !savedText) return;

        const text = journalInput.value.trim();

        if (text === "") {
            alert("Catatan masih kosong. Silakan tuliskan perasaan Anda terlebih dahulu.");
            return;
        }

        // Simpan ke localStorage browser agar aman di perangkat pengguna
        localStorage.setItem('kalih_aksa_journal', text);
        
        savedText.innerText = text;
        resultBox.style.display = "block";
        alert("Catatan berhasil disimpan secara lokal dan aman di perangkat Anda.");
    };

    // Muat catatan otomatis jika halaman dibuka kembali
    const saved = localStorage.getItem('kalih_aksa_journal');
    const journalInput = document.getElementById('journalInput');
    const savedText = document.getElementById('savedJournalText');
    const resultBox = document.getElementById('journalResultBox');

    if (saved && journalInput && savedText && resultBox) {
        journalInput.value = saved;
        savedText.innerText = saved;
        resultBox.style.display = "block";
    }

    // =================================================
    // 4. SCRIPT: WHATSAPP BOOKING FORM HANDLER
    // =================================================
    const waForm = document.getElementById('waForm');
    if(waForm) {
        waForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const nama = document.getElementById('nama').value;
            const konselor = document.getElementById('konselorPilihan').value;
            const tanggal = document.getElementById('tanggal').value;
            const keluhan = document.getElementById('keluhan').value;

            const nomorAdmin = "6281234567890"; // Ganti dengan nomor WhatsApp tujuan
            const pesan = `Halo Admin Kalih Aksa, saya ingin mendaftarkan sesi konseling.%0A%0A*Nama:* ${nama}%0A*Konselor:* ${konselor}%0A*Tanggal:* ${tanggal}%0A*Keluhan:* ${keluhan || '-'}`;
            
            window.open(`https://wa.me/${nomorAdmin}?text=${pesan}`, '_blank');
        });
    }

    // =================================================
    // 5. SCRIPT: KALKULATOR STRES
    // =================================================
    const btnHitungStres = document.getElementById('btnHitungStres');
    if(btnHitungStres) {
        btnHitungStres.addEventListener('click', function() {
            const s1 = parseInt(document.getElementById('soal1').value);
            const s2 = parseInt(document.getElementById('soal2').value);
            const s3 = parseInt(document.getElementById('soal3').value);
            const total = s1 + s2 + s3;

            const box = document.getElementById('hasilStres');
            const judul = document.getElementById('judulHasil');
            const teks = document.getElementById('teksHasil');
            box.style.display = "block";

            if(total <= 4) {
                judul.textContent = "Tingkat Stres: Ringan / Normal";
                teks.textContent = "Kondisi Anda relatif stabil. Pertahankan pola istirahat dan manajemen diri yang baik.";
            } else if(total <= 7) {
                judul.textContent = "Tingkat Stres: Sedang";
                teks.textContent = "Anda mulai merasakan beban pikiran yang cukup mengganggu. Pertimbangkan untuk mengambil waktu jeda atau berkonsultasi.";
            } else {
                judul.textContent = "Tingkat Stres: Tinggi";
                teks.textContent = "Beban mental Anda terlihat cukup berat. Sangat disarankan untuk segera berbicara dengan tenaga profesional di Kalih Aksa.";
            }
        });
    }

    // =================================================
    // 6. SCRIPT: SKRINING KECEMASAN
    // =================================================
    const btnHitungCemas = document.getElementById('btnHitungCemas');
    if(btnHitungCemas) {
        btnHitungCemas.addEventListener('click', function() {
            const c1 = parseInt(document.getElementById('cemas1').value);
            const c2 = parseInt(document.getElementById('cemas2').value);
            const totalCemas = c1 + c2;

            const box = document.getElementById('hasilCemas');
            const judul = document.getElementById('judulHasilCemas');
            const teks = document.getElementById('teksHasilCemas');
            box.style.display = "block";

            if(totalCemas <= 1) {
                judul.textContent = "Hasil: Kecemasan Minimal";
                teks.textContent = "Tingkat kecemasan Anda berada di batas normal.";
            } else if(totalCemas <= 3) {
                judul.textContent = "Hasil: Kecemasan Sedang";
                teks.textContent = "Anda sering merasa khawatir. Lakukan teknik pernapasan atau grounding untuk meredakannya.";
            } else {
                judul.textContent = "Hasil: Kecemasan Tinggi";
                teks.textContent = "Gejala cemas Anda cukup intens. Mari jadwalkan sesi konseling agar mendapat bimbingan yang tepat.";
            }
        });
    }

    // =================================================
    // 7. SCRIPT: TRACKER EMOSI MINGGUAN
    // =================================================
    let emosiData = {};
    const btnSimpanTracker = document.getElementById('btnSimpanTracker');
    if(btnSimpanTracker) {
        btnSimpanTracker.addEventListener('click', function() {
            const hari = document.getElementById('pilihHari').value;
            const emosi = document.getElementById('pilihEmosiHarian').value;
            emosiData[hari] = emosi;
            renderRekapTracker();
        });
    }

    function renderRekapTracker() {
        const container = document.getElementById('rekapTrackerContainer');
        if(!container) return;
        container.innerHTML = "";
        const daftarHari = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"];
        
        daftarHari.forEach(h => {
            const val = emosiData[h] || "Belum dicatat";
            const div = document.createElement('div');
            div.style.background = "#fff";
            div.style.padding = "10px";
            div.style.border = "1px solid #e0e0e0";
            div.style.borderRadius = "8px";
            div.style.fontSize = "0.85rem";
            div.innerHTML = `<strong>${h}</strong><br><span style="color:#666; font-size:0.75rem;">${val}</span>`;
            container.appendChild(div);
        });
    }
    renderRekapTracker();

    // =================================================
    // 8. SCRIPT: SELF-CARE CHECKLIST
    // =================================================
    const checkboxes = document.querySelectorAll('.self-care-check');
    checkboxes.forEach(chk => {
        chk.addEventListener('change', updateProgress);
    });

    function updateProgress() {
        let checkedCount = 0;
        checkboxes.forEach(chk => {
            if(chk.checked) checkedCount++;
        });
        const progressEl = document.getElementById('progressSelfCare');
        if(progressEl) {
            progressEl.textContent = `Progress Hari Ini: ${checkedCount} / 4 Selesai`;
        }
    }

    // =================================================
    // 9. SCRIPT: JURNAL SYUKUR HARIAN
    // =================================================
    const btnSimpanSyukur = document.getElementById('btnSimpanSyukur');
    if(btnSimpanSyukur) {
        btnSimpanSyukur.addEventListener('click', function() {
            const teksSyukur = document.getElementById('inputSyukur').value;
            if(teksSyukur.trim() !== "") {
                document.getElementById('tampilSyukur').textContent = teksSyukur;
                document.getElementById('riwayatSyukurBox').style.display = "block";
                document.getElementById('inputSyukur').value = "";
            }
        });
    }

    // =================================================
    // 10. SCRIPT: RUANG CURHAT ANONIM
    // =================================================
    const btnKirimCurhat = document.getElementById('btnKirimCurhat');
    if(btnKirimCurhat) {
        btnKirimCurhat.addEventListener('click', function() {
            const curhat = document.getElementById('pesanCurhat').value;
            if(curhat.trim() !== "") {
                const box = document.getElementById('responCurhat');
                const teksRespon = document.getElementById('teksResponCurhat');
                box.style.display = "block";
                teksRespon.textContent = "Terima kasih sudah menuangkan isi hatimu di sini. Bebanmu sudah sedikit berkurang dengan membagikannya. Ingat, kamu berharga dan tidak sendirian menghadapi ini.";
                document.getElementById('pesanCurhat').value = "";
            }
        });
    }

    // =================================================
    // 11. SCRIPT: AFIRMASI POSITIF ACAK
    // =================================================
    const daftarAfirmasi = [
        "\"Aku berhak merasa tenang dan bahagia dengan caraku sendiri.\"",
        "\"Setiap hari adalah kesempatan baru untuk tumbuh dan berproses.\"",
        "\"Aku sudah berjuang dengan sangat baik sampai detik ini.\"",
        "\"Perlahan tapi pasti, aku mampu melewati setiap rintangan.\"",
        "\"Diriku berharga, dicintai, dan layak mendapatkan kedamaian.\""
    ];
    const btnAcakAfirmasi = document.getElementById('btnAcakAfirmasi');
    if(btnAcakAfirmasi) {
        btnAcakAfirmasi.addEventListener('click', function() {
            const rand = Math.floor(Math.random() * daftarAfirmasi.length);
            document.getElementById('teksAfirmasi').textContent = daftarAfirmasi[rand];
        });
    }

    // =================================================
    // 12. SCRIPT: GROUNDING INTERAKTIF 5-4-3-2-1
    // =================================================
    let stepGrounding = 1;
    const gTitle = document.getElementById('groundingTitle');
    const gDesc = document.getElementById('groundingDesc');
    const btnNext = document.getElementById('btnNextGrounding');
    const btnReset = document.getElementById('btnResetGrounding');

    if(btnNext && btnReset) {
        btnNext.addEventListener('click', function() {
            stepGrounding++;
            btnReset.style.display = "inline-block";

            if(stepGrounding === 2) {
                gTitle.textContent = "Langkah 2: Perabaan (4)";
                gDesc.innerHTML = "Sebutkan atau rasakan <strong>4 hal</strong> di sekitar yang bisa kamu sentuh fisiknya (contoh: tekstur celana, permukaan meja, udara dingin AC, rambutmu sendiri).";
            } else if(stepGrounding === 3) {
                gTitle.textContent = "Langkah 3: Pendengaran (3)";
                gDesc.innerHTML = "Dengarkan baik-baik. Identifikasi <strong>3 suara</strong> yang bisa kamu dengar saat ini (contoh: suara kendaraan di luar, deru kipas angin, suara ketikan).";
            } else if(stepGrounding === 4) {
                gTitle.textContent = "Langkah 4: Penciuman (2)";
                gDesc.innerHTML = "Perhatikan aroma di sekitarmu. Sadari <strong>2 wewangian</strong> atau bau yang bisa kamucium saat ini (contoh: aroma minyak angin, wangi parfum, bau kertas).";
            } else if(stepGrounding === 5) {
                gTitle.textContent = "Langkah 5: Pengecapan (1)";
                gDesc.innerHTML = "Fokus pada indra pengecapmu. Rasakan <strong>1 rasa</strong> yang tertinggal di mulutmu saat ini (contoh: sisa rasa air mineral, kopi, atau permen).";
                btnNext.innerHTML = "Selesai <i class='fas fa-check'></i>";
            } else if(stepGrounding > 5) {
                gTitle.textContent = "Kerja Bagus! 🌿";
                gDesc.innerHTML = "Kamu telah menyelesaikan latihan grounding. Tubuh dan pikiranmu kini sudah lebih berpijak di saat ini. Tarik napas dalam-dalam dan hembuskan perlahan.";
                btnNext.style.display = "none";
            }
        });

        btnReset.addEventListener('click', function() {
            stepGrounding = 1;
            gTitle.textContent = "Langkah 1: Penglihatan (5)";
            gDesc.innerHTML = "Perhatikan sekelilingmu. Sebutkan secara mental atau bersuara <strong>5 benda</strong> yang bisa kamu lihat saat ini (contoh: lampu, meja, dinding, botol minum, jendela).";
            btnNext.innerHTML = "Lanjut ke Langkah Berikutnya <i class='fas fa-arrow-right'></i>";
            btnNext.style.display = "inline-block";
            btnReset.style.display = "none";
        });
    }

    // =================================================
    // 13. SCRIPT: MOOD TRACKER INSTAN
    // =================================================
    const moodButtons = document.querySelectorAll('.mood-btn');
    const moodResponses = {
        senang: "Senang mendengarnya! Pertahankan energi positif ini dan sebarkan kebaikan ke sekitarmu.",
        tenang: "Ketenangan adalah bentuk kemewahan diri. Nikmati momen damai ini sepenuh hati.",
        lelah: "Tidak apa-apa merasa lelah. Tubuhmu sedang meminta waktu untuk beristirahat. Izinkan dirimu rehat sejenak.",
        cemas: "Tarik napas dalam-dalam... hembuskan perlahan. Kamu aman, dan perasaan cemas ini pasti akan berlalu.",
        sedih: "Validasi perasaan sedihmu. Menangis atau merasa berat adalah hal yang manusiawi. Peluk erat dirimu sendiri."
    };

    moodButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const mood = this.getAttribute('data-mood');
            const responseBox = document.getElementById('moodResponseBox');
            const responseTitle = document.getElementById('moodResponseTitle');
            const responseDesc = document.getElementById('moodResponseDesc');

            if(responseBox && responseTitle && responseDesc) {
                responseBox.style.display = "block";
                responseTitle.textContent = `Respon untuk suasana hati: ${this.textContent}`;
                responseDesc.textContent = moodResponses[mood] || "Terima kasih telah berbagi perasaanmu hari ini.";
            }
        });
    });

    // =================================================
    // 14. SCRIPT: PESAN UNTUK DIRI SENDIRI
    // =================================================
    const btnSimpanSurat = document.getElementById('btnSimpanSurat');
    if(btnSimpanSurat) {
        btnSimpanSurat.addEventListener('click', function() {
            const isiSurat = document.getElementById('inputSurat').value;
            if(isiSurat.trim() !== "") {
                document.getElementById('teksSuratTersimpan').textContent = isiSurat;
                document.getElementById('kotakTampilSurat').style.display = "block";
                document.getElementById('inputSurat').value = "";
            }
        });
    }

    // =================================================
    // 15. SCRIPT: FAQ ACCORDION
    // =================================================
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            const icon = this.querySelector('i');
            
            if(answer.style.display === "block") {
                answer.style.display = "none";
                if(icon) icon.style.transform = "rotate(0deg)";
            } else {
                answer.style.display = "block";
                if(icon) icon.style.transform = "rotate(180deg)";
            }
        });
    });

    // =================================================
    // 16. SCRIPT: WIDGET MUSIK FLOATING
    // =================================================
    const bgMusic = document.getElementById('bgMusic');
    const musicToggleBtn = document.getElementById('musicToggleBtn');
    let isPlaying = false;

    if(musicToggleBtn && bgMusic) {
        musicToggleBtn.addEventListener('click', function() {
            if(isPlaying) {
                bgMusic.pause();
                musicToggleBtn.innerHTML = '<i class="fas fa-music"></i>';
                musicToggleBtn.title = "Putar Musik Relaksasi";
                isPlaying = false;
            } else {
                bgMusic.play().then(() => {
                    musicToggleBtn.innerHTML = '<i class="fas fa-pause"></i>';
                    musicToggleBtn.title = "Jeda Musik";
                    isPlaying = true;
                }).catch(error => {
                    console.log("Audio play error: ", error);
                    alert("Pastikan file audio tersedia di direktori yang sama.");
                });
            }
        });
    }

});