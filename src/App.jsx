import { useState } from "react";
import Header from "./components/Header";
import Login from "./components/Login";
import PasswordReset from "./components/PasswordReset";
import StaffForm from "./components/StaffForm";
import AdminUserManagement from "./components/AdminUserManagement";

function App() {
  const [page, setPage] = useState("login");

  return (
    <div>
      <Header />
      {page === "login" && (
        <Login
          onLogin={() => setPage("form")}
          onReset={() => setPage("reset")}
          onAdmin={() => setPage("admin")}
        />
      )}
      {page === "reset" && <PasswordReset onBack={() => setPage("login")} />}
      {page === "form" && <StaffForm onLogout={() => setPage("login")} />}
      {page === "admin" && (
        <AdminUserManagement onBack={() => setPage("login")} />
      )}
    </div>
  );
}

export default App;
