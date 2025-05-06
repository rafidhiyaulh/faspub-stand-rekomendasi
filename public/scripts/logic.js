function slugify(str) {
  return str.toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');
}

function getImageFile(jualan) {
  const val = jualan.toLowerCase();
  if (val.includes("jus")) return "jus.jpg";
  if (val.includes("nasi goreng")) return "nasigoreng.jpg";
  if (val.includes("mie") || val.includes("bakmie")) return "mie.jpg";
  if (val.includes("ayam") || val.includes("bebek")) return "ayam.jpg";
  if (val.includes("bubur")) return "bubur.jpg";
  if (val.includes("susu")) return "susu.jpg";
  if (val.includes("minuman") || val.includes("kopi") || val.includes("teh")) return "minuman.jpg";
  if (val.includes("cemilan") || val.includes("gorengan")) return "snack.jpg";
  if (val.includes("dimsum")) return "dimsum.jpg";
  if (val.includes("rice bowl")) return "ricebowl.jpg";
  if (val.includes("padang")) return "padang.jpg";
  if (val.includes("sop") || val.includes("sup")) return "sop.jpg";
  if (val.includes("bakso")) return "bakso.jpg";
  if (val.includes("buku") || val.includes("alat tulis")) return "book.jpg";
  return "default.jpg";
}

function loadCSVandPickRandom(callback) {
  fetch('/dataset_clean_fixed.csv')
    .then(response => response.text())
    .then(text => {
      const rows = text.trim().split('\n');
      const headers = rows[0].split('|').map(h => h.trim());
      const data = rows.slice(1).map(row => {
        const values = row.split('|').map(v => v.trim());
        if (values.length !== headers.length) return null;
        const entry = {};
        headers.forEach((h, i) => entry[h] = values[i] || '');
        return entry;
      }).filter(Boolean);
      if (data.length === 0) {
        console.error("Data kosong atau tidak valid.");
        return;
      }
      const selected = data[Math.floor(Math.random() * data.length)];
      callback(selected);
    })
    .catch(error => console.error('Gagal memuat CSV:', error));
}

function tampilkanRestoran() {
  loadCSVandPickRandom(resto => {
    const nama = resto['Nama']?.trim() || '-';
    const pedagang = resto['Pedagang']?.trim() || '-';
    const jam = resto['Waktu Dagang']?.trim() || '-';
    const jualan = resto['Yang Dijual']?.trim() || '-';
    const gambar = getImageFile(jualan);

    document.getElementById("resto-box").innerHTML = `
      <div class="card">
        <img src="/images/resto/${gambar}" alt="${jualan}" style="width:100%; border-radius:10px; margin-bottom:1rem;">
        <h2>${nama}</h2>
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
  if (tombol) tombol.addEventListener('click', tampilkanRestoran);
});
