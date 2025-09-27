import * as React from "react";
import { useState } from "react";
import axios from "axios";
import { CssVarsProvider } from "@mui/joy/styles";
import Sheet from "@mui/joy/Sheet";
import CssBaseline from "@mui/joy/CssBaseline";
import Typography from "@mui/joy/Typography";
import Button from "@mui/joy/Button";

export default function Login({ onLogin }) {
  const [mode, setMode] = useState("login"); // "login", "register", "reset"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:5000/login", {
        email,
        password,
      });
      onLogin({ email, role: res.data.role });
    } catch (err) {
      setMsg(err.response?.data?.message || "Login failed");
    }
  };

  const handleRegister = async () => {
    try {
      const res = await axios.post("http://localhost:5000/register", {
        email,
        password,
      });
      setMsg(`Registered successfully as ${res.data.role}. Please login.`);
      setMode("login");
      setPassword("");
    } catch (err) {
      setMsg(err.response?.data?.message || "Registration failed");
    }
  };

  const handleReset = async () => {
    try {
      await axios.post("http://localhost:5000/reset-password", {
        email,
        newPassword,
      });
      setMsg("Password reset successfully. Please login.");
      setMode("login");
      setPassword("");
      setNewPassword("");
    } catch (err) {
      setMsg(err.response?.data?.message || "Reset failed");
    }
  };

  return (
    <CssVarsProvider>
      <CssBaseline />
      <main
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
          minHeight: "100vh",
          background: "linear-gradient(to bottom right, #ebf4ff, #f0fdf4)",
          padding: "1rem",
          fontFamily: "Segoe UI, Tahoma, Arial, sans-serif",
        }}
      >
        <Sheet
          sx={{
            width: "100%",
            maxWidth: 480,
            marginTop: "10rem", // lowered more
            py: 4,
            px: 5,
            display: "flex",
            flexDirection: "column",
            gap: 3,
            borderRadius: "1rem",
            boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
            backgroundColor: "#ffffff",
            border: "1px solid #e5e7eb",
          }}
        >
          {/* Title */}
          <Typography
            level="h4"
            component="h1"
            sx={{
              color: "#1e1b4b",
              fontWeight: "bold",
              fontSize: { xs: "1.6rem", sm: "1.9rem" },
              textAlign: "center",
            }}
          >
            {mode === "login" && "Login"}
            {mode === "register" && "Register"}
            {mode === "reset" && "Reset Password"}
          </Typography>

          {/* Subtitle */}
          <Typography
            level="body2"
            sx={{
              mb: 1,
              color: "#555",
              fontSize: { xs: "0.9rem", sm: "1rem" },
              textAlign: "center",
            }}
          >
            {mode === "login" && "Sign in to continue."}
            {mode === "register" && "Create a new account."}
            {mode === "reset" && "Enter your new password."}
          </Typography>

          {/* Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (mode === "login") handleLogin();
              if (mode === "register") handleRegister();
              if (mode === "reset") handleReset();
            }}
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "0.75rem 0.9rem",
                borderRadius: "0.5rem",
                border: "1px solid #d1d5db",
                fontSize: "0.95rem",
                outline: "none",
              }}
            />

            {(mode === "login" || mode === "register") && (
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "0.75rem 0.9rem",
                  borderRadius: "0.5rem",
                  border: "1px solid #d1d5db",
                  fontSize: "0.95rem",
                  outline: "none",
                }}
              />
            )}

            {mode === "reset" && (
              <input
                type="password"
                placeholder="Enter a new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "0.75rem 0.9rem",
                  borderRadius: "0.5rem",
                  border: "1px solid #d1d5db",
                  fontSize: "0.95rem",
                  outline: "none",
                }}
              />
            )}

            {/* Main Button */}
            <Button
              type="submit"
              sx={{
                backgroundColor: "#1e1b4b",
                color: "#fff",
                fontWeight: "bold",
                py: "0.55rem", // smaller height
                borderRadius: "0.5rem",
                transition: "0.2s ease",
                "&:hover": {
                  backgroundColor: "#312e81",
                  transform: "scale(1.02)",
                },
              }}
            >
              {mode === "login" && "Login"}
              {mode === "register" && "Register"}
              {mode === "reset" && "Reset"}
            </Button>

            {/* Secondary Buttons */}
            <div
              style={{
                display: "flex",
                gap: "0.75rem",
                marginTop: "0.5rem",
              }}
            >
              {mode !== "reset" && (
                <Button
                  type="button"
                  variant="soft"
                  onClick={() => setMode("reset")}
                  sx={{
                    flex: 1,
                    backgroundColor: "#f3f4f6",
                    color: "#1e1b4b",
                    fontWeight: "bold",
                    "&:hover": {
                      backgroundColor: "#e5e7eb",
                      transform: "scale(1.02)",
                    },
                  }}
                >
                  Forgot Password?
                </Button>
              )}
              <Button
                type="button"
                variant="soft"
                onClick={() => setMode(mode === "login" ? "register" : "login")}
                sx={{
                  flex: 1,
                  backgroundColor: "#f3f4f6",
                  color: "#1e1b4b",
                  fontWeight: "bold",
                  "&:hover": {
                    backgroundColor: "#e5e7eb",
                    transform: "scale(1.02)",
                  },
                }}
              >
                {mode === "login" ? "Switch to Register" : "Switch to Login"}
              </Button>
            </div>
          </form>

          {/* Message */}
          {msg && (
            <Typography
              level="body2"
              sx={{
                color: msg.includes("success") ? "green" : "#d32f2f",
                mt: 1,
                textAlign: "center",
              }}
            >
              {msg}
            </Typography>
          )}

          {/* Developer info message
          <div
            style={{
              marginTop: "4rem",
              textAlign: "center",
              fontSize: "0.875rem",
              color: "#4b5563",
              lineHeight: 1.6,
            }}
          >
            <p>
              <strong>Developed by:</strong> Harsha K R
            </p>
            <p>
              <strong>Role:</strong> Office Superintendent
            </p>
            <p>
              <strong>Department:</strong> DTE Karnataka
            </p>
            <p>
              <strong>For modifications, contact:</strong>{" "}
              <a
                href="mailto:dteswv@gmail.com"
                style={{
                  color: "#2563eb",
                  fontWeight: 600,
                  textDecoration: "underline",
                }}
              >
                dteswv@gmail.com
              </a>
            </p>
          </div> */}
        </Sheet>
      </main>
    </CssVarsProvider>
  );
}
