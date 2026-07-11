# Airline Voucher Seat Assignment

Technical Assessment menggunakan **React** sebagai frontend dan **Laravel** sebagai backend untuk menghasilkan 3 voucher kursi pesawat secara acak berdasarkan tipe pesawat.

---

## Tech Stack

### Frontend

* React (Vite)
* Axios
* Tailwind CSS

### Backend

* Laravel (Latest)
* SQLite
* Eloquent ORM
* Form Request Validation
* API Resource
* Service Class

### Database

* SQLite

---

# Project Structure

```text
project/
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── Dockerfile
│   └── ...
│
├── backend/
│   ├── app/
│   ├── routes/
│   ├── database/
│   ├── Dockerfile
│   └── ...
│
├── docker-compose.yml
└── README.md
```

---

# Features

* Crew Information Form
* Flight Information Form
* Aircraft Selection
* Generate 3 Random Seats
* Prevent Duplicate Voucher Generation
* SQLite Database
* Laravel Form Request Validation
* Laravel Service Class
* Laravel API Resource
* Responsive UI using Tailwind CSS

---

# Seat Layout

| Aircraft       | Rows   | Seats            |
| -------------- | ------ | ---------------- |
| ATR            | 1 - 18 | A, C, D, F       |
| Airbus 320     | 1 - 32 | A, B, C, D, E, F |
| Boeing 737 Max | 1 - 32 | A, B, C, D, E, F |

---

# API Endpoints

## Check Existing Voucher

**POST**

```http
/api/check
```

Request

```json
{
    "flightNumber":"GA102",
    "date":"2025-07-12"
}
```

Response

```json
{
    "exists":false
}
```

---

## Generate Voucher

**POST**

```http
/api/generate
```

Request

```json
{
    "name":"Sarah",
    "id":"98123",
    "flightNumber":"GA102",
    "date":"2025-07-12",
    "aircraft":"Airbus 320"
}
```

Response

```json
{
    "data":{
        "success":true,
        "seats":[
            "3B",
            "7C",
            "14D"
        ]
    }
}
```

---

# Backend Installation

Masuk ke folder backend.

```bash
cd backend
```

Install dependency.

```bash
composer install
```

Copy file environment.

```bash
cp .env.example .env
```

Generate application key.

```bash
php artisan key:generate
```

Buat database SQLite.

```bash
mkdir database
```

Windows

```bash
type nul > database/database.sqlite
```

Linux / macOS

```bash
touch database/database.sqlite
```

Ubah konfigurasi database pada file `.env`.

```env
DB_CONNECTION=sqlite
DB_DATABASE=database/database.sqlite
```

Jalankan migration.

```bash
php artisan migrate
```

Jalankan server Laravel.

```bash
php artisan serve
```

Backend berjalan pada:

```
http://127.0.0.1:8000
```

---

# Frontend Installation

Masuk ke folder frontend.

```bash
cd frontend
```

Install dependency.

```bash
npm install
```

Buat file `.env`.

```env
VITE_API_URL=http://127.0.0.1:8000/api
```

Jalankan aplikasi.

```bash
npm run dev
```

Frontend berjalan pada:

```
http://localhost:5173
```

---

# Run with Docker

Build dan jalankan seluruh service.

```bash
docker compose up --build
```

Backend

```
http://localhost:8000
```

Frontend

```
http://localhost:5173
```

---

# Validation

Frontend

* Crew Name Required
* Crew ID Required
* Flight Number Required
* Flight Date Required
* Aircraft Type Required

Backend

* Laravel Form Request Validation
* Duplicate Flight Validation
* Unique Constraint (`flight_number` + `flight_date`)

---

# Database Schema

Table: **vouchers**

| Field         | Type      |
| ------------- | --------- |
| id            | BIGINT    |
| crew_name     | VARCHAR   |
| crew_id       | VARCHAR   |
| flight_number | VARCHAR   |
| flight_date   | VARCHAR   |
| aircraft_type | VARCHAR   |
| seat1         | VARCHAR   |
| seat2         | VARCHAR   |
| seat3         | VARCHAR   |
| created_at    | TIMESTAMP |
| updated_at    | TIMESTAMP |

---

# Seat Generation Flow

1. User mengisi data crew dan penerbangan.
2. Frontend mengirim request ke `/api/check`.
3. Backend memeriksa apakah voucher sudah pernah dibuat.
4. Jika belum ada:

   * Generate 3 seat secara acak.
   * Simpan ke database.
   * Kirim response ke frontend.
5. Frontend menampilkan hasil seat.
6. Jika voucher sudah ada, backend mengembalikan pesan error.

---

# Author

Aldi Pranata
