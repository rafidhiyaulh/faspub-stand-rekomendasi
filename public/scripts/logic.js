document.addEventListener("DOMContentLoaded", function () {
  fetch("dataset_clean_fixed.csv")
    .then(response => response.text())
    .then(csv => {
      const lines = csv.trim().split("\n");
      const headers = lines[0].split("|");
      const data = lines.slice(1).map(line => {
        const values = line.split("|");
        return headers.reduce((obj, header, i) => {
          obj[header.trim()] = values[i]?.trim() || "";
          return obj;
        }, {});
      });

      const restoBox = document.getElementById("resto-box");
      const tombolGroup = document.querySelector(".button-group");

      // Bersihkan kontainer terlebih dahulu
      restoBox.innerHTML = "";
      tombolGroup.innerHTML = "";

      const randomIndex = Math.floor(Math.random() * data.length);
      const resto = data[randomIndex];

      const kategoriGambar = [
        { keyword: "bakmie", filename: "mie.jpg" },
        { keyword: "mie", filename: "mie.jpg" },
        { keyword: "ayam", filename: "ayam.jpg" },
        { keyword: "bebek", filename: "ayam.jpg" },
        { keyword: "nasi goreng", filename: "nasigoreng.jpg" },
        { keyword: "goreng", filename: "nasigoreng.jpg" },
        { keyword: "jus", filename: "jus.jpg" },
        { keyword: "susu", filename: "susu.jpg" },
        { keyword: "rice bowl", filename: "ricebowl.jpg" },
        { keyword: "minuman", filename: "minuman.jpg" },
        { keyword: "padang", filename: "padang.jpg" },
        { keyword: "dimsum", filename: "dimsum.jpg" },
        { keyword: "jasuke", filename: "jasuke.jpg" },
        { keyword: "cemilan", filename: "snack.jpg" },
        { keyword: "kue", filename: "snack.jpg" },
        { keyword: "buku", filename: "book.jpg" },
        { keyword: "bubur", filename: "bubur.jpg" },
        { keyword: "soto", filename: "soto.jpg" },
        { keyword: "pecel", filename: "pecel.jpg" },
        { keyword: "gorengan", filename: "gorengan.jpg" }
      ];

      const jual = resto["Yang Dijual"].toLowerCase();
      let gambarFile = "default.jpg";

      for (const kategori of kategoriGambar) {
        if (jual.includes(kategori.keyword)) {
          gambarFile = kategori.filename;
          break;
        }
      }

      restoBox.innerHTML = `
        <div class="card">
          <h2>${resto.Nama}</h2>
          <img src="assets/images/resto/${gambarFile}" alt="${resto.Nama}" class="resto-img" />
          <p><strong>👤 Pedagang:</strong> ${resto.Pedagang}</p>
          <p><strong>🕒 Jam buka:</strong> ${resto["Waktu Dagang"]}</p>
          <p><strong>🍽️ Yang Dijual:</strong> ${resto["Yang Dijual"]}</p>
        </div>
      `;

      tombolGroup.innerHTML = `
        <button onclick="window.location.reload()">🔄 Lihat Tempat Lain</button>
        <a href="index.html" class="button-secondary">⬅️ Kembali ke Halaman Utama</a>
      `;
    });
});
