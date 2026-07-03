import { useState } from "react";

const API_BASE = "http://localhost:3000/api";

export default function Booking({ user, movie, onBack }) {
  const [watchAt, setWatchAt] = useState("");
  const [seat, setSeat] = useState("");
  const [ticketQty, setTicketQty] = useState(1);
  const [loading, setLoading] = useState(false);

  // Perhitungan harga
  const subtotal = Number(movie.price) * Number(ticketQty);
  const tax = subtotal * 0.1;
  const totalPrice = subtotal + tax;

  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${API_BASE}/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          user_id: user.id,
          movie_id: movie.id,
          watch_at: watchAt,
          seat,
          ticket_qty: Number(ticketQty),
          price: totalPrice,
        }),
      });

      const data = await res.json();

      if (!data.success) {
        throw new Error(data.message);
      }

      alert(" Booking berhasil!");

      onBack();
    } catch (err) {
      alert(err.message);
    }

    setLoading(false);
  }

  return (
    <div className="booking-page">
      <button className="booking-back" onClick={onBack}>
        ← Kembali
      </button>

      <div className="booking-layout">
        <div className="booking-poster">
          <img src={`/images/${movie.image}`} alt={movie.movie_name} />
          <div className="booking-poster-info">
            <h2>{movie.movie_name}</h2>
            <p>Genre : {movie.genre}</p>
            <p>Durasi : {movie.duration} menit</p>
            <p>
              Harga per Tiket : Rp {Number(movie.price).toLocaleString("id-ID")}
            </p>
          </div>
        </div>

        <div className="booking-form-card">
          <h1>Pesan Tiket</h1>

          <form onSubmit={handleSubmit}>
            <label>Jadwal Menonton</label>
            <input
              type="datetime-local"
              value={watchAt}
              onChange={(e) => setWatchAt(e.target.value)}
              required
            />

            <label>Nomor Kursi</label>
            <input
              type="text"
              placeholder="Contoh A5"
              value={seat}
              onChange={(e) => setSeat(e.target.value)}
              required
            />

            <label>Jumlah Tiket</label>
            <input
              type="number"
              min="1"
              value={ticketQty}
              onChange={(e) => setTicketQty(Number(e.target.value))}
              required
            />

            <div className="price-summary">
              <div className="price-row">
                <span>Subtotal</span>
                <strong>Rp {subtotal.toLocaleString("id-ID")}</strong>
              </div>
              <div className="price-row">
                <span>Pajak (10%)</span>
                <strong>Rp {tax.toLocaleString("id-ID")}</strong>
              </div>
              <div className="price-total">
                <span>Total</span>
                <span>Rp {totalPrice.toLocaleString("id-ID")}</span>
              </div>
            </div>

            <button className="booking-submit" type="submit" disabled={loading}>
              {loading ? "Memproses..." : "Konfirmasi Booking"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
