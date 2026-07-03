import { useEffect, useState } from "react";
import { getMovies } from "../api";
import MovieCard from "../components/MovieCard";
import Navbar from "../components/Navbar";

export default function Dashboard({ user, onLogout, onBook, goHistory }) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    loadMovies();
  }, []);

  async function loadMovies() {
    try {
      const data = await getMovies();
      setMovies(data);
    } catch (err) {
      console.error(err);
    }
  }

  function handleBooking(movie) {
    onBook(movie);
  }

  return (
    <div className="dashboard">
      <Navbar
        user={user}
        currentPage="dashboard"
        onHome={() => {}}
        onHistory={goHistory}
        onLogout={onLogout}
      />

      <div className="dashboard-hero">
        <h1>Halo, {user.username} 👋</h1>
        <p>Siap nonton apa hari ini?</p>
        <small>{user.email}</small>
      </div>

      <h2 className="section-title">Daftar Film</h2>

      <div className="movie-list">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} onBook={handleBooking} />
        ))}
      </div>
    </div>
  );
}
