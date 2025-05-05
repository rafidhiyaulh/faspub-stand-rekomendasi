function loadCSVandPickRandom(callback) {
    fetch('data/dataset_pipe.csv')
      .then((response) => response.text())
      .then((text) => {
        const rows = text.trim().split('\n');
        const headers = rows[0].split('|');
        const data = rows.slice(1).map(row => {
          const values = row.split('|');        
          const entry = {};
          headers.forEach((h, i) => entry[h.trim()] = values[i]?.trim());
          return entry;
        });
        const selected = data[Math.floor(Math.random() * data.length)];
        callback(selected);
      });
  }
  
  function tampilkanRestoran() {
    loadCSVandPickRandom(restoran => {
      const nama = restoran['Nama'] || '-';
      const pedagang = restoran['Pedagang'] || '-';
      const jam = restoran['Waktu Dagang'] || '-';
      const makanan = restoran['Makanan yang Dijual'] || '-';
      const minuman = restoran['Minuman yang Dijual'] || '-';
      const catatan = restoran['Keterangan Tambahan'] || '-';
  
      const makananList = makanan.split(';').map(item => `<li>${item.trim()}</li>`).join('');
      const minumanList = minuman.split(';').map(item => `<li>${item.trim()}</li>`).join('');
  
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
  
  document.addEventListener('DOMContentLoaded', tampilkanRestoran);
  