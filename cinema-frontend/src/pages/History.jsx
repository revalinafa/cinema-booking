import { useEffect, useState } from "react";
import { getBookings, deleteBooking } from "../api";
import Navbar from "../components/Navbar";

export default function History({ user, onBack, onLogout }) {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    loadBookings();
  }, []);

  async function loadBookings() {
    try {
      const data = await getBookings();

      // Hanya tampilkan booking milik user yang sedang login
      const myBookings = data.filter((booking) => booking.user_id === user.id);

      setBookings(myBookings);
    } catch (err) {
      alert(err.message);
    }
  }

  async function cancelBooking(id) {
    const confirmDelete = window.confirm(
      "Yakin ingin membatalkan booking ini?",
    );

    if (!confirmDelete) return;

    try {
      await deleteBooking(id);
      alert("Booking berhasil dibatalkan.");
      loadBookings();
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <div className="history-page">
      <Navbar
        user={user}
        currentPage="history"
        onHome={onBack}
        onHistory={() => {}}
        onLogout={onLogout}
      />

      <h1 className="history-title">📜 History Pembelian</h1>

      {bookings.length === 0 ? (
        <p className="history-empty">Belum ada riwayat pembelian tiket.</p>
      ) : (
        <div className="history-list">
          {bookings.map((item) => (
            <div className="history-card" key={item.id}>
              <img
                className="history-poster"
                src={`/images/${item.image}`}
                alt={item.movie_name}
                onError={(e) => {
                  e.target.src = "/images/default.jpg";
                }}
              />

              <div className="history-body">
                <span className="history-status">✅ Confirmed</span>

                <h2>{item.movie_name}</h2>

                <p>
                  <strong>Genre :</strong> {item.genre}
                </p>

                <p>
                  <strong>Seat :</strong> {item.seat}
                </p>

                <p>
                  <strong>Jumlah Tiket :</strong> {item.ticket_qty}
                </p>

                <p>
                  <strong>Jadwal :</strong>{" "}
                  {new Date(item.watch_at).toLocaleString("id-ID")}
                </p>

                <p className="history-price">
                  Rp {Number(item.price).toLocaleString("id-ID")}
                </p>

                <button
                  className="history-cancel"
                  onClick={() => cancelBooking(item.id)}
                >
                  ❌ Cancel Booking
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
