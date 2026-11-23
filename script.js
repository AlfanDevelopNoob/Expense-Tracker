// 1. Tangkap elemen + ambil data lama
const form = document.getElementById("input");
const inputPengeluaran = document.getElementById("pengeluaran");
const inputNominal = document.getElementById("nominal");
const list = document.getElementById("list");
const total = document.getElementById("total");

let dataPengeluaran;

let dataTersimpan = localStorage.getItem("pengeluaran");

if (dataTersimpan === null) {
  dataPengeluaran = [];
} else {
  dataPengeluaran = JSON.parse(dataTersimpan);
}

// 2. Fungsi simpan
function simpanData() {
  localStorage.setItem("pengeluaran", JSON.stringify(dataPengeluaran));
}

// 3. Fungsi render
function render() {
  list.innerHTML = "";
  let jumlah = 0;

  for (let i = 0; i < dataPengeluaran.length; i++) {
    const item = dataPengeluaran[i];
    jumlah += item.nominal;

    const div = document.createElement("div");
    div.textContent = item.nama + " - Rp " + item.nominal.toLocaleString("id-ID");
    list.appendChild(div);
  }

  total.textContent = "Total: Rp " + jumlah.toLocaleString("id-ID");
}

// 4. Event submit + validasi
form.addEventListener("submit", function (event) {
  event.preventDefault();

  const nama = inputPengeluaran.value.trim();
  const nominal = Number(inputNominal.value);

  if (nama === "" || inputNominal.value.trim() === "") {
    alert("Nama pengeluaran dan nominal tidak boleh kosong!");
  } else if (isNaN(nominal) || nominal <= 0) {
    alert("Nominal harus berupa angka lebih dari 0!");
  } else {
    dataPengeluaran.push({ nama: nama, nominal: nominal });
    simpanData();
    render();
    form.reset();
  }
});

// 5. Tampilkan data saat halaman dibuka
render();