import { useState } from "react";

export default function PasswordReset({ onBack }) {
  const [resetCode, setResetCode] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const handleReset = () => {
    if (newPass === confirmPass) {
      alert(`Password reset for ${resetCode}`);
    } else {
      alert("Passwords do not match");
    }
  };

  return (
    <div className="auth-box">
      <h3>Reset Your Password</h3>
      <input
        type="text"
        placeholder="College Code"
        value={resetCode}
        onChange={(e) => setResetCode(e.target.value)}
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
    </div>
  );
}
