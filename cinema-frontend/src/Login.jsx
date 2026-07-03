import { useState } from "react";
import { loginUser, registerUser } from "./api";

export default function Login({ onLogin }) {
    const [mode, setMode] = useState("login");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            let user;
            if (mode === "login") {
                user = await loginUser(username, password);
            } else {
                user = await registerUser(username, email, password);
            }
            onLogin(user);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page">
            <form className="login-form" onSubmit={handleSubmit}>
                <h1>{mode === "login" ? "Cinema Login" : "Daftar Akun"}</h1>
                {error && <p className="login-error">{error}</p>}
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                {mode === "register" && (
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                )}
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit" disabled={loading}>
                    {loading ? "Loading..." : mode === "login" ? "Login" : "Daftar"}
                </button>
                <p className="login-toggle" onClick={() => { setMode(mode === "login" ? "register" : "login"); setError(""); }}>
                    {mode === "login" ? "Belum punya akun? Daftar" : "Sudah punya akun? Login"}
                </p>
            </form>
        </div>
    );
}
