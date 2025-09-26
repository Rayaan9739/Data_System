import * as React from "react";
import { useState } from "react";
import axios from "axios";
import { CssVarsProvider } from "@mui/joy/styles";
import Sheet from "@mui/joy/Sheet";
import CssBaseline from "@mui/joy/CssBaseline";
import Typography from "@mui/joy/Typography";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";


export default function AuthGovBoard({ onLogin }) {
  const [mode, setMode] = useState("login"); // "login", "register", "reset"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:5000/login", { email, password });
      onLogin({ email, role: res.data.role });
    } catch (err) {
      setMsg(err.response?.data?.message || "Login failed");
    }
  };

  const handleRegister = async () => {
    try {
      const res = await axios.post("http://localhost:5000/register", { email, password });
      setMsg(`Registered successfully as ${res.data.role}. Please login.`);
      setMode("login");
      setPassword("");
    } catch (err) {
      setMsg(err.response?.data?.message || "Registration failed");
    }
  };

  const handleReset = async () => {
    try {
      await axios.post("http://localhost:5000/reset-password", { email, newPassword });
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
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          background: "#f4f6f8",
          padding: "1rem",
          fontFamily: "Segoe UI, Tahoma, Arial, sans-serif",
        }}
      >
        <Sheet
          sx={{
            width: "100%",
            maxWidth: 380,
            mx: "auto",
            py: { xs: 3, sm: 4 },
            px: { xs: 2, sm: 4 },
            display: "flex",
            flexDirection: "column",
            gap: { xs: 2, sm: 2.5 },
            borderRadius: "8px",
            boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
            backgroundColor: "#ffffff",
            border: "1px solid #ccc",
          }}
        >
          <Typography
            level="h4"
            component="h1"
            sx={{
              color: "#003366",
              fontWeight: "bold",
              fontSize: { xs: "1.5rem", sm: "1.75rem" },
            }}
          >
            {mode === "login" && "Login"}
            {mode === "register" && "Register"}
            {mode === "reset" && "Reset Password"}
          </Typography>
          <Typography
            level="body2"
            sx={{ mb: 1, color: "#555", fontSize: { xs: "0.85rem", sm: "0.9rem" } }}
          >
            {mode === "login" && "Sign in to continue."}
            {mode === "register" && "Create a new account."}
            {mode === "reset" && "Enter your new password."}
          </Typography>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (mode === "login") handleLogin();
              if (mode === "register") handleRegister();
              if (mode === "reset") handleReset();
            }}
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </FormControl>

            {(mode === "login" || mode === "register") && (
              <FormControl>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </FormControl>
            )}

            {mode === "reset" && (
              <FormControl>
                <FormLabel>New Password</FormLabel>
                <Input
                  type="password"
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </FormControl>
            )}

            <Button
              type="submit"
              sx={{
                backgroundColor: "#003366",
                color: "#fff",
                fontWeight: "bold",
                "&:hover": { backgroundColor: "#002244" },
              }}
            >
              {mode === "login" && "Login"}
              {mode === "register" && "Register"}
              {mode === "reset" && "Reset"}
            </Button>

            <div
              style={{
                display: "flex",
                gap: "0.5rem",
                flexDirection: { xs: "column", sm: "row" },
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
                    backgroundColor: "#e0e0e0",
                    "&:hover": { backgroundColor: "#ccc" },
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
                  backgroundColor: "#e0e0e0",
                  "&:hover": { backgroundColor: "#ccc" },
                }}
              >
                {mode === "login" ? "Switch to Register" : "Switch to Login"}
              </Button>
            </div>
          </form>

          {msg && (
            <Typography level="body2" sx={{ color: "#d32f2f", mt: 1 }}>
              {msg}
            </Typography>
          )}
        </Sheet>
      </main>
    </CssVarsProvider>
  );
}
