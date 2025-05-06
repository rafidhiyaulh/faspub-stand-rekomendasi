function loadCSVandPickRandom(callback) {
  fetch('./dataset_clean_fixed.csv')
    .then((response) => response.text())
    .then((text) => {
      const rows = text.trim().split('\n');
      const headers = rows[0].split('|').map(h => h.trim());
      const data = rows.slice(1).map(row => {
        const values = row.split('|').map(v => v.trim());
        if (values.length !== headers.length) return null;
        const entry = {};
        headers.forEach((h, i) => {
          entry[h] = values[i] || '';
        });
        return entry;
      }).filter(Boolean);

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

function getImageFile(item) {
  if (!item) return 'default.png';

  const keywordMapping = {
    'jus': 'jus.jpg',
    'susu': 'susu.jpeg',
    'buku': 'book.jpg',
    'rice bowl': 'ricebowl.jpeg',
    'dimsum': 'dimsum.jpg',
    'mie': 'mie.jpeg',
    'goreng': 'nasigoreng.jpg',
    'padang': 'padang.jpg',
    'ayam': 'ayam.jpeg',
    'snack': 'snack.jpg',
    'cemilan': 'snack.jpg',
    'minuman': 'minuman.jpg'
  };

  const lower = item.toLowerCase();
  for (const key in keywordMapping) {
    if (lower.includes(key)) {
      return keywordMapping[key];
    }
  }
  return 'default.png';
}

function tampilkanRestoran() {
  loadCSVandPickRandom(resto => {
    const nama = resto['Nama']?.trim() || '-';
    const pedagang = resto['Pedagang']?.trim() || '-';
    const jam = resto['Waktu Dagang']?.trim() || '-';
    const jualan = resto['Yang Dijual']?.trim() || '-';

    const imageFile = getImageFile(jualan);
    const imagePath = `images/resto/${imageFile}`;

    document.getElementById("resto-box").innerHTML = `
      <div class="card">
        <h2>${nama}</h2>
        <img src="${imagePath}" alt="${nama}" style="width:100%; height:auto; max-height:200px; object-fit:cover; border-radius:8px; margin: 1rem 0;" />
        <p><strong>👤 Pedagang:</strong> ${pedagang}</p>
        <p><strong>🕒 Jam buka:</strong> ${jam}</p>
        <p><strong>🍽️ Yang Dijual:</strong> ${jualan}</p>
      </div>
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
