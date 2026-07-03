# 🎬 Cinema Ticket Booking

Aplikasi web pemesanan tiket bioskop berbasis **React (Vite)** untuk frontend dan **Express.js + MySQL** untuk backend. Pengguna dapat mendaftar, login, melihat daftar film, memesan tiket, melihat riwayat pemesanan, dan membatalkan booking.

Developer: Revalina Fidiya Anugrah
---

##  Fitur

- Register & Login dengan autentikasi JWT
  <img width="955" height="541" alt="image" src="https://github.com/user-attachments/assets/11f6ccef-c73f-4fa5-a915-0a405d120b8e" />

- Melihat daftar film yang tersedia (genre, durasi, harga)
  <img width="1909" height="1006" alt="image" src="https://github.com/user-attachments/assets/48a1cb70-faea-4aa9-b6fa-f9b9f14e5077" />

- Memesan tiket (pilih jadwal tonton, nomor kursi, jumlah tiket)
- Perhitungan otomatis subtotal, pajak (10%), dan total harga
  <img width="952" height="539" alt="image" src="https://github.com/user-attachments/assets/3abef3ef-af2e-4fa5-a38e-b2ff1950e45d" />

- Riwayat pemesanan tiket per user
- Membatalkan booking
  <img width="947" height="538" alt="image" src="https://github.com/user-attachments/assets/d9dc4f8c-82dc-48f2-8333-cb027cc7262a" />

- Logout
- Tampilan modern, elegan, bernuansa pink-lavender, responsif untuk mobile & desktop

---

## Tech Stack

| Layer | Teknologi |
|---|---|
| Frontend | React + Vite |
| Styling | CSS murni (custom design system, glassmorphism) |
| Backend | Express.js |
| Database | MySQL |
| Autentikasi | JSON Web Token (JWT) |

---

## Struktur Folder

```
src/
├── components/
│   ├── MovieCard.jsx      # Kartu tampilan satu film
│   └── Navbar.jsx         # Navigasi atas (logo, menu, user, logout)
│
├── pages/
│   ├── Dashboard.jsx      # Halaman utama - daftar film
│   ├── Booking.jsx        # Halaman form pemesanan tiket
│   └── History.jsx        # Halaman riwayat pemesanan
│
├── api.js                 # Kumpulan fungsi request ke backend
├── Login.jsx               # Halaman login & register
├── App.jsx                 # Pengatur state global & routing manual
└── App.css                 # Styling seluruh aplikasi
```

---

## Alur Aplikasi

```
Login / Register
       │
       ▼
   Dashboard  ⇄  History
       │
       ▼
   Booking  ──▶ kembali ke Dashboard
```

- Belum login → selalu diarahkan ke halaman **Login**.
- Setelah login, halaman default adalah **Dashboard**.
- Memilih film di Dashboard akan membuka halaman **Booking**.
- Menu **History** menampilkan seluruh booking milik user yang sedang login.
- **Logout** menghapus token dan mengembalikan ke halaman Login.

---

## Endpoint Backend yang Digunakan

| Fungsi (`api.js`) | Method & Endpoint | Keterangan |
|---|---|---|
| `loginUser()` | `POST /api/auth/login` | Login user |
| `registerUser()` | `POST /api/auth/register` | Registrasi user baru |
| `getProfile()` | `GET /api/auth/profile` | Ambil data profil user |
| `getMovies()` | `GET /api/movies` | Ambil daftar film |
| `createBooking()` | `POST /api/bookings` | Membuat booking baru |
| `getBookings()` | `GET /api/bookings` | Ambil daftar booking |
| `deleteBooking()` | `DELETE /api/bookings/:id` | Membatalkan booking |

> Base URL backend: `http://localhost:3000/api`

---

## Cara Menjalankan Proyek

### 1. Clone / siapkan folder proyek
```bash
git clone <url-repo-anda>
cd <nama-folder-proyek>
```

### 2. Install dependencies
```bash
npm install
```

### 3. Pastikan backend (Express + MySQL) sudah berjalan
Backend harus aktif di `http://localhost:3000` agar frontend dapat mengambil data film, melakukan autentikasi, dan menyimpan booking.

### 4. Jalankan development server
```bash
npm run dev
```

### 5. Buka di browser
```
http://localhost:5173
```

---

## Desain

- **Palet warna:** soft pink, putih, lavender (`#FFF7FB`, `#FFEAF4`, `#FDF2F8`, `#EC4899`, `#F472B6`, `#A855F7`)
- **Tipografi:** `Playfair Display` untuk judul & branding, `Poppins` untuk isi konten
- **Gaya visual:** rounded corners, glassmorphism, shadow lembut, kartu modern
- **Elemen khas:** motif sobekan tiket (ticket-stub) pada ringkasan harga di halaman Booking

---
