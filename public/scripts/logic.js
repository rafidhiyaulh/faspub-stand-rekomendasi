
document.addEventListener("DOMContentLoaded", function () {
  fetch("dataset_gambar_unik.csv")
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

      // Buat elemen kartu restoran
      const card = document.createElement("div");
      card.className = "card";

      const img = document.createElement("img");
      img.src = `assets/images/resto/${resto["Gambar"]}`;
      img.alt = resto["Nama"];
      img.className = "resto-img";

      const nama = document.createElement("h3");
      nama.textContent = resto["Nama"];

      const jual = document.createElement("p");
      jual.innerHTML = "<strong>Yang Dijual:</strong> " + resto["Yang Dijual"];

      card.appendChild(img);
      card.appendChild(nama);
      card.appendChild(jual);
      restoBox.appendChild(card);

      // Tambahkan tombol
      tombolGroup.innerHTML = `
        <button class="nav-button" onclick="window.location.reload()">Lihat Tempat Lain</button>
        <a href="index.html" class="nav-button" style="text-align: center;">Kembali ke Halaman Utama</a>
      `;
    });
});
