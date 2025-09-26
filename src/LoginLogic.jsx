import { useState } from "react";
import Login from "./components/Login";
import PasswordReset from "./components/PasswordReset";
import Header from "./components/Header";

export default function LoginLogic({ onLoginSuccess }) {
  const [page, setPage] = useState("login"); // handles login/reset page flow

  if (page === "login") {
    return (
      <>
        <Header />
        <Login
          onLogin={(user) => onLoginSuccess(user)} // pass user up to App
          onReset={() => setPage("reset")}
        />
      </>
    );
  }

  if (page === "reset") {
    return <PasswordReset onBack={() => setPage("login")} />;
  }

  return null;
}
