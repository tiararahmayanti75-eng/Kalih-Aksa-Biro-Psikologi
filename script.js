document.addEventListener('DOMContentLoaded', () => {
    const statusSelect = document.getElementById('statusSelect');
    const noticeInput = document.getElementById('noticeInput');
    const saveBtn = document.getElementById('saveAdminBtn');

    // Muat data lama dari localStorage jika ada
    if (localStorage.getItem('adminStatus')) {
        statusSelect.value = localStorage.getItem('adminStatus');
    }
    if (localStorage.getItem('adminNotice')) {
        noticeInput.value = localStorage.getItem('adminNotice');
    }

    // Event listener saat tombol simpan diklik
    if (saveBtn) {
        saveBtn.addEventListener('click', () => {
            localStorage.setItem('adminStatus', statusSelect.value);
            localStorage.setItem('adminNotice', noticeInput.value);
            alert('Perubahan berhasil disimpan dan langsung diperbarui ke halaman utama!');
        });
    }
});