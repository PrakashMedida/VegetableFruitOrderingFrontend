import { useState } from "react";
import API_URL from "../api";
import "../App.css";

export default function Auth() {
  const [mode, setMode] = useState("login"); // login | register
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const submit = async () => {
    const url =
      mode === "login"
        ? `${API_URL}/auth/login`
        : `${API_URL}/auth/register`;

    const body =
      mode === "login"
        ? { email, password }
        : { name, email, password };

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });

    const data = await res.json();

    if (data.token) {
      localStorage.setItem("token", data.token);
      setMsg("Logged in successfully");
    } else {
      setMsg(data.message);
    }
  };

  return (
    <div className="card">
      <div style={{ display: "flex", marginBottom: 16 }}>
        <button
          onClick={() => setMode("login")}
          style={{
            flex: 1,
            background: mode === "login" ? "#fc8019" : "#eee",
            color: mode === "login" ? "#fff" : "#000"
          }}
        >
          Login
        </button>

        <button
          onClick={() => setMode("register")}
          style={{
            flex: 1,
            background: mode === "register" ? "#fc8019" : "#eee",
            color: mode === "register" ? "#fff" : "#000"
          }}
        >
          Register
        </button>
      </div>

      {mode === "register" && (
        <input
          placeholder="Name"
          onChange={e => setName(e.target.value)}
        />
      )}

      <input
        placeholder="Email"
        onChange={e => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={e => setPassword(e.target.value)}
      />

      <button className="primary" onClick={submit}>
        {mode === "login" ? "Login" : "Register"}
      </button>

      {msg && <p>{msg}</p>}
    </div>
  );
}
