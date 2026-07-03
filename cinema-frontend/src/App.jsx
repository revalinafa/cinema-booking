import { useState } from "react";
import Login from "./Login";
import Dashboard from "./pages/Dashboard";
import Booking from "./pages/Booking";
import History from "./pages/History";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);

  const [selectedMovie, setSelectedMovie] = useState(null);

  const [page, setPage] = useState("dashboard");

  function handleLogout() {
    localStorage.removeItem("token");
    setUser(null);
  }

  if (!user) {
    return <Login onLogin={setUser} />;
  }

  if (selectedMovie) {
    return (
      <Booking
        user={user}
        movie={selectedMovie}
        onBack={() => {
          setSelectedMovie(null);
          setPage("dashboard");
        }}
      />
    );
  }

  if (page === "history") {
    return (
      <History
        user={user}
        onBack={() => setPage("dashboard")}
        onLogout={handleLogout}
      />
    );
  }

  return (
    <Dashboard
      user={user}
      onLogout={handleLogout}
      onBook={(movie) => {
        setSelectedMovie(movie);
        setPage("booking");
      }}
      goHistory={() => setPage("history")}
    />
  );
}

export default App;
