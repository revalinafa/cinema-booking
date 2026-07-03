const API_BASE = "http://localhost:3000/api";

function getToken() {
  return localStorage.getItem("token");
}

export function setToken(token) {
  if (token) localStorage.setItem("token", token);
  else localStorage.removeItem("token");
}

export function getAuthHeaders() {
  const t = getToken();
  return t
    ? { "Content-Type": "application/json", Authorization: `Bearer ${t}` }
    : { "Content-Type": "application/json" };
}

export async function loginUser(username, password) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.message);
  setToken(data.data.token);
  return data.data;
}

export async function registerUser(username, email, password) {
  const res = await fetch(`${API_BASE}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password }),
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.message);
  setToken(data.data.token);
  return data.data;
}

export async function getProfile() {
  const res = await fetch(`${API_BASE}/auth/profile`, {
    headers: getAuthHeaders(),
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.message);
  return data.data;
}

export async function getMovies() {
  const res = await fetch(`${API_BASE}/movies`, {
    headers: getAuthHeaders(),
  });

  const data = await res.json();

  if (!data.success) throw new Error(data.message);

  return data.data;
}
export async function createBooking(data) {
  const res = await fetch(`${API_BASE}/bookings`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });

  const result = await res.json();

  if (!result.success) {
    throw new Error(result.message);
  }

  return result;
}
export async function getBookings() {
  const res = await fetch(`${API_BASE}/bookings`, {
    headers: getAuthHeaders(),
  });

  const data = await res.json();

  if (!data.success) {
    throw new Error(data.message);
  }

  return data.data;
}

export async function deleteBooking(id) {
  const res = await fetch(`${API_BASE}/bookings/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  const data = await res.json();

  if (!data.success) {
    throw new Error(data.message);
  }

  return data;
}
