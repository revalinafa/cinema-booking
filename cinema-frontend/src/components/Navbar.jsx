export default function Navbar({
  user,
  currentPage,
  onHome,
  onHistory,
  onLogout,
}) {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        🎬 <span>Cinema Booking</span>
      </div>

      <div className="navbar-menu">
        <button
          className={currentPage === "dashboard" ? "active" : ""}
          onClick={onHome}
        >
          Home
        </button>

        <button
          className={currentPage === "history" ? "active" : ""}
          onClick={onHistory}
        >
          History
        </button>
      </div>

      <div className="navbar-user">
        <span>👤 {user.username}</span>

        <button className="logout-btn" onClick={onLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
}
