
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
      if (tombolGroup) tombolGroup.innerHTML = "";

      // Pilih data acak
      const randomIndex = Math.floor(Math.random() * data.length);
      const resto = data[randomIndex];

      // Tentukan gambar berdasarkan kata kunci
      const kategoriGambar = [
        { keyword: "bakmie", filename: "mie.jpg" },
        { keyword: "mie", filename: "mie.jpg" },
        { keyword: "ayam", filename: "ayam.jpg" },
        { keyword: "bebek", filename: "ayam.jpg" },
        { keyword: "nasi goreng", filename: "nasigoreng.jpg" },
        { keyword: "gorengan", filename: "gorengan.jpg" },
        { keyword: "bubur", filename: "bubur.jpg" },
        { keyword: "dimsum", filename: "dimsum.jpg" },
        { keyword: "jus", filename: "jus.jpg" },
        { keyword: "teh", filename: "minuman.jpg" },
        { keyword: "kopi", filename: "minuman.jpg" },
        { keyword: "ricebowl", filename: "ricebowl.jpg" },
        { keyword: "pecel", filename: "pecel.jpg" },
        { keyword: "minum", filename: "minuman.jpg" },
        { keyword: "snack", filename: "snack.jpg" },
        { keyword: "buku", filename: "book.jpg" }
      ];

      const jualan = resto["Yang Dijual"].toLowerCase();
      let filename = "default.jpg";
      for (const kategori of kategoriGambar) {
        if (jualan.includes(kategori.keyword)) {
          filename = kategori.filename;
          break;
        }
      }

      // Buat elemen HTML
      const card = document.createElement("div");
      card.className = "resto-card";
      card.innerHTML = `
        <img src="assets/images/resto/${filename}" alt="${resto.Nama || "Kuliner"}">
        <h3>${resto.Nama}</h3>
        <p><strong>Yang Dijual:</strong> ${resto["Yang Dijual"]}</p>
      `;

      restoBox.appendChild(card);
    });
});
