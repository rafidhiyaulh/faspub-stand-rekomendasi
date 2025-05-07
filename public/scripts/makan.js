
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
  
        window.dataset = data; // Simpan dataset global
      });
  });
  
  function jawabAyam(jawab) {
    document.getElementById("pertanyaan-ayam").style.display = "none";
    if (jawab) {
      tampilkanRekomendasi("ayam");
    } else {
      document.getElementById("pertanyaan-soto").style.display = "block";
    }
  }
  
  function jawabSoto(jawab) {
    document.getElementById("pertanyaan-soto").style.display = "none";
    if (jawab) {
      tampilkanRekomendasi("soto");
    } else {
      tampilkanRekomendasi("lainnya");
    }
  }
  
  function tampilkanRekomendasi(kategori) {
    const hasilContainer = document.getElementById("hasil-rekomendasi");
    const aksiContainer = document.getElementById("aksi-lanjut");
  
    hasilContainer.innerHTML = "";
    aksiContainer.innerHTML = "";
  
    let hasil = [];
    if (kategori === "lainnya") {
      hasil = window.dataset.filter(item => {
        const jual = item["Yang Dijual"].toLowerCase();
        return !jual.includes("ayam") && !jual.includes("soto");
      });
    } else {
      hasil = window.dataset.filter(item =>
        item["Yang Dijual"].toLowerCase().includes(kategori)
      );
    }
  
    if (hasil.length === 0) {
      hasilContainer.innerHTML = "<p>Tidak ada rekomendasi yang sesuai.</p>";
    } else {
      hasil.forEach(resto => {
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
        hasilContainer.appendChild(card);
      });
    }
  
    aksiContainer.innerHTML = `
      <a href="index.html" class="nav-button" style="text-align: center;">Kembali ke Halaman Utama</a>
    `;
  }
  