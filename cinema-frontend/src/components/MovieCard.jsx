export default function MovieCard({ movie, onBook }) {
  return (
    <div className="movie-card">
      <div className="movie-poster">
        <img src={`/images/${movie.image}`} alt={movie.movie_name} />
        <span className="genre-badge">{movie.genre}</span>
      </div>

      <div className="movie-content">
        <h3>{movie.movie_name}</h3>

        <p className="movie-meta">⏱ {movie.duration} menit</p>

        <p className="movie-price">
          Rp {Number(movie.price).toLocaleString("id-ID")}
        </p>

        <button onClick={() => onBook(movie)}>🎟 Pesan Tiket</button>
      </div>
    </div>
  );
}
