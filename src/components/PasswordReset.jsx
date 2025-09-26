import { useState } from "react";
import axios from "axios";

export default function PasswordReset({ onBack }) {
  const [email, setEmail] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [msg, setMsg] = useState("");

  const handleReset = async () => {
    if (newPass !== confirmPass) return setMsg("Passwords do not match");

    try {
      await axios.post("http://localhost:5000/reset-password", { email, newPassword: newPass });
      setMsg("Password updated successfully");
    } catch {
      setMsg("Error resetting password");
    }
  };

  return (
    <div className="auth-box">
      <h3>Reset Password</h3>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="New Password"
        value={newPass}
        onChange={(e) => setNewPass(e.target.value)}
      />
      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPass}
        onChange={(e) => setConfirmPass(e.target.value)}
      />
      <div style={{ display: "flex", gap: "1rem" }}>
        <button onClick={handleReset} className="btn-blue">
          Set Password
        </button>
        <button onClick={onBack} className="btn-gray">
          Back
        </button>
      </div>
      {msg && <p>{msg}</p>}
    </div>
  );
}
