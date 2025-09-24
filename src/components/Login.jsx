import { useState } from "react";

export default function Login({ onLogin, onReset, onAdmin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username && password) {
      if (username === "admin") {
        onAdmin();
      } else {
        onLogin(username);
      }
    }
  };

  return (
    <div className="auth-box">
      <h3>Login to Access Staff Data</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="College Code"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div style={{ display: "flex", gap: "1rem" }}>
          <button type="submit" className="btn-green">
            Login
          </button>
          <button type="button" onClick={onReset} className="btn-blue">
            Reset Password
          </button>
        </div>
      </form>
    </div>
  );
}
