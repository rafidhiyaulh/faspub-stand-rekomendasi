function loadCSVandPickRandom(callback) {
    fetch('/dataset_clean_fixed.csv')
      .then((response) => response.text())
      .then((text) => {
        const rows = text.trim().split('\n');
        const headers = rows[0].split('|').map(h => h.trim());
        const data = rows.slice(1).map(row => {
          const values = row.split('|').map(v => v.trim());
          if (values.length !== headers.length) return null; // skip baris rusak
          const entry = {};
          headers.forEach((h, i) => {
            entry[h] = values[i] || '';
          });
          return entry;
        }).filter(Boolean); // remove null
  
        if (data.length === 0) {
          console.error("Data kosong atau semua baris tidak valid.");
          return;
        }
  
        const selected = data[Math.floor(Math.random() * data.length)];
        callback(selected);
      })
      .catch(error => {
        console.error('Gagal memuat CSV:', error);
      });
  }
  
  function tampilkanRestoran() {
    loadCSVandPickRandom(restoran => {
      const nama = restoran['Nama']?.trim() || '-';
      const pedagang = restoran['Pedagang']?.trim() || '-';
      const jam = restoran['Waktu Dagang']?.trim() || '-';
      const makanan = restoran['Makanan yang Dijual']?.trim() || '';
      const minuman = restoran['Minuman yang Dijual']?.trim() || '';
      const catatan = restoran['Keterangan Tambahan']?.trim() || '-';
  
      const makananList = makanan
        ? makanan.split(';').filter(item => item.trim()).map(item => `<li>${item.trim()}</li>`).join('')
        : '<li>-</li>';
  
      const minumanList = minuman
        ? minuman.split(';').filter(item => item.trim()).map(item => `<li>${item.trim()}</li>`).join('')
        : '<li>-</li>';
  
      document.getElementById("resto-box").innerHTML = `
        <h2>${nama}</h2>
        <p><strong>👤 Pedagang:</strong> ${pedagang}</p>
        <p><strong>🕒 Jam buka:</strong> ${jam}</p>
        <div class="list-block">
          <p><strong>🍽️ Makanan:</strong></p>
          <ul>${makananList}</ul>
        </div>
        <div class="list-block">
          <p><strong>🥤 Minuman:</strong></p>
          <ul>${minumanList}</ul>
        </div>
        <p><strong>📝 Catatan:</strong> ${catatan}</p>
      `;
    });
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    tampilkanRestoran();
  
    const tombol = document.querySelector('button');
    if (tombol) {
      tombol.addEventListener('click', tampilkanRestoran);
    }
  });
  