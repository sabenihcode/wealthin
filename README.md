# WealthVibe

> Kelola keuangan pribadi dengan lebih mudah, modern, dan menyenangkan.

**WealthVibe** adalah aplikasi pencatat keuangan pribadi (*Personal Finance Tracker*) dengan tampilan modern, dukungan dark mode, analisis visual, target tabungan, serta asisten AI untuk membantu memahami kondisi finansial secara lebih mendalam.

---

## ✨ Fitur Utama

* 📊 Dashboard keuangan interaktif
* 💸 Pencatatan pemasukan & pengeluaran
* 🎯 Target tabungan (Saving Goals)
* 📈 Analisis keuangan dan tren cashflow
* 🤖 Vibe AI Assistant
* 📂 Ekspor & impor data Excel
* 🔒 Penyimpanan data lokal (Privacy First)
* 📱 Tampilan responsif seperti aplikasi mobile

---

# 🏠 Dashboard

Dashboard merupakan halaman utama untuk memantau kondisi keuangan secara real-time.

### 👋 Sapaan Personal

Aplikasi akan menampilkan nama pengguna pada bagian atas dashboard.

### 💳 Saldo Bersih

Menampilkan total saldo saat ini berdasarkan:

```text
Saldo Bersih = Total Pemasukan - Total Pengeluaran
```

Fitur tambahan:

* 👁️ Sembunyikan nominal saldo
* 🔒 Menjaga privasi saat digunakan di tempat umum

### 🎯 Saving Goals

Membuat target keuangan seperti:

* Beli Laptop
* Dana Darurat
* Umroh
* Liburan

Fitur:

* Menentukan target nominal
* Menentukan deadline
* Memilih ikon/emoji
* Menambahkan progres tabungan
* Indikator target tercapai

### 📊 Grafik Pemasukan vs Pengeluaran

Visualisasi perbandingan pemasukan dan pengeluaran pada periode berjalan.

### 🍔 Pengeluaran per Kategori

Menampilkan distribusi pengeluaran berdasarkan kategori seperti:

* Makanan
* Transportasi
* Belanja
* Hiburan
* Kesehatan

### 🕒 Transaksi Terbaru

Menampilkan 5 transaksi terakhir yang telah dicatat.

---

# ➕ Tambah Transaksi

Diakses melalui tombol **Floating Action Button (+)**.

## Jenis Transaksi

### ⬇️ Pengeluaran

Digunakan untuk mencatat uang keluar.

### ⬆️ Pemasukan

Digunakan untuk mencatat uang masuk.

---

## 💸 Input Nominal

Pengguna dapat:

* Mengetik nominal secara manual
* Menggunakan tombol cepat:

```text
+10.000
+25.000
+50.000
```

---

## 🏷️ Kategori dan Metode Pembayaran

Untuk transaksi pengeluaran tersedia:

### Kategori

* Makan
* Belanja
* Transportasi
* Tagihan
* Hiburan
* Lainnya

### Metode Pembayaran

* Cash
* Debit
* Kredit
* E-Wallet

Pada transaksi pemasukan, bagian ini akan disembunyikan untuk mempercepat proses input.

---

## 📅 Tanggal Transaksi

* Otomatis menggunakan tanggal hari ini
* Dapat diubah sesuai kebutuhan

---

## 📝 Catatan dan Bukti

Opsional:

* Menambahkan catatan
* Mengunggah foto struk transaksi

---

## ✅ Simpan Transaksi

Klik tombol **Simpan Transaksi** untuk menyimpan data.

---

# 📒 Riwayat Transaksi

Pusat seluruh data transaksi yang pernah dicatat.

## 🔢 Ringkasan Dinamis

Total nilai akan berubah secara otomatis berdasarkan filter yang aktif.

## 🔍 Pencarian

Cari transaksi menggunakan kata kunci:

* Grab
* Gaji
* Kopi
* Shopee

dan kata kunci lainnya.

## 🎛️ Filter Cepat

Tersedia filter:

* Semua
* Pemasukan
* Pengeluaran

## 📅 Pengelompokan Otomatis

Transaksi akan ditampilkan berdasarkan tanggal seperti:

* Hari Ini
* Kemarin
* 2 Hari Lalu
* Minggu Ini

---

# 📈 Analisis Keuangan

Membantu memahami kondisi finansial secara lebih mendalam.

## 📅 Filter Periode

Melihat data berdasarkan:

* Bulan ini
* Bulan sebelumnya
* Periode tertentu

---

## 📑 Tab Analisis

Tersedia beberapa kategori analisis:

* Ringkasan
* Pemasukan
* Pengeluaran
* Kategori
* Tren

---

## 🍩 Grafik Donut

Menampilkan persentase penggunaan uang berdasarkan kategori.

## 📊 Grafik Tren

Menampilkan perkembangan cashflow selama beberapa bulan terakhir.

---

## 🤖 Vibe AI Assistant

Asisten AI yang membantu membaca pola keuangan pengguna.

Fitur:

* Analisis kesehatan finansial
* Identifikasi kategori paling boros
* Insight pengeluaran
* Rekomendasi penghematan
* Saran pengelolaan keuangan bulan berikutnya

### Aktivasi AI

Masukkan **Gemini API Key** pada menu:

```text
Akun → Data & AI → Gemini API Key
```

---

# 👤 Akun

Pusat pengaturan pengguna dan data aplikasi.

## 🧑 Profil Pengguna

Mengubah nama yang digunakan di aplikasi.

---

## 🏦 Manajemen Keuangan

Mengatur:

* Kategori transaksi
* Metode pembayaran
* Anggaran bulanan

---

## 💾 Data & AI

### Ekspor Excel

Mengunduh seluruh transaksi ke format:

```text
.xlsx
```

### Impor Excel

Mengimpor data transaksi dari file Excel.

### Gemini API Key

Digunakan untuk mengaktifkan fitur:

```text
Vibe AI Assistant
```

---

## 🚪 Logout

Keluar dari akun aplikasi.

---

# 🔒 Privacy First

WealthVibe mengutamakan privasi pengguna.

✅ Seluruh data disimpan secara lokal di perangkat pengguna menggunakan Local Storage.

✅ Tidak ada data transaksi yang dikirim ke server.

✅ Tidak ada data pribadi yang dijual atau dibagikan ke pihak ketiga.

✅ API Key yang dimasukkan tetap berada di perangkat pengguna.

Dengan demikian, pengguna memiliki kontrol penuh atas seluruh data keuangannya.

---

# 🚀 Mulai Menggunakan

1. Buka aplikasi WealthVibe.
2. Isi nama pengguna.
3. Tambahkan transaksi pertama.
4. Buat target tabungan.
5. Pantau dashboard dan analisis.
6. Aktifkan Vibe AI untuk mendapatkan insight finansial otomatis.

---

## Dibuat Untuk

* Mahasiswa
* Karyawan
* Freelancer
* UMKM
* Siapa saja yang ingin lebih disiplin mengelola keuangan

---

**WealthVibe** — *Financial Tracking Made Simple & Beautiful.*
