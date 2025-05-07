
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

      // Bersihkan kontainer
      restoBox.innerHTML = "";

      const randomIndex = Math.floor(Math.random() * data.length);
      const resto = data[randomIndex];

      // Pilih gambar berdasarkan kategori
      const kategoriGambar = [
        { keyword: "bakmie", filename: "mie.jpg" },
        { keyword: "mie", filename: "mie.jpg" },
        { keyword: "ayam", filename: "ayam.jpg" },
        { keyword: "bebek", filename: "ayam.jpg" },
        { keyword: "nasi goreng", filename: "nasigoreng.jpg" },
        { keyword: "goreng", filename: "nasigoreng.jpg" },
        { keyword: "bubur", filename: "bubur.jpg" },
        { keyword: "minuman", filename: "minuman.jpg" },
        { keyword: "teh", filename: "minuman.jpg" },
        { keyword: "buku", filename: "buku.jpg" }
      ];

      let selectedImage = "default.jpg";
      const jualan = resto["Yang Dijual"].toLowerCase();
      for (const kategori of kategoriGambar) {
        if (jualan.includes(kategori.keyword)) {
          selectedImage = kategori.filename;
          break;
        }
      }

      // Buat elemen kartu
      const card = document.createElement("div");
      card.className = "card";

      const img = document.createElement("img");
      img.src = `assets/images/${selectedImage}`;
      img.alt = resto["Nama"] || "Gambar Stand";
      img.className = "resto-img";

      const nama = document.createElement("h3");
      nama.textContent = resto["Nama"];

      const jual = document.createElement("p");
      jual.innerHTML = `<strong>Yang Dijual:</strong> ${resto["Yang Dijual"]}`;

      card.appendChild(img);
      card.appendChild(nama);
      card.appendChild(jual);
      restoBox.appendChild(card);

      // Tambahkan kembali tombol
      tombolGroup.innerHTML = `
        <button class="nav-button" onclick="window.location.reload()">Lihat Tempat Lain</button>
        <a href="index.html" class="nav-button" style="text-align: center;">Kembali ke Halaman Utama</a>
      `;
    });
});
