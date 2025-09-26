import { useState } from "react";
import StaffForm from "./components/StaffForm";
import Dashboard from "./components/Dashboard";
import Navbar from "./components/Navbar";
import LoginLogic from "./LoginLogic";

export default function App() {
  const [page, setPage] = useState("login");
  const [user, setUser] = useState(null);

  const handleLogout = () => {
    setUser(null);
    setPage("login");
  };

  return (
    <>
      {/* Navbar visible only when logged in */}
      {page !== "login" && (
        <Navbar
          activePage={page}
          onNavigate={(p) => setPage(p)}
          onLogout={handleLogout}
        />
      )}

      {/* Add padding-top so content is below navbar */}
      <div className={page !== "login" ? "pt-20" : ""}>
        {page === "login" && (
          <LoginLogic
            onLoginSuccess={(user) => {
              setUser(user);
              setPage("dashboard");
            }}
          />
        )}

        {page === "dashboard" && <Dashboard user={user} />}

        {/* Only one StaffForm with back button */}
        {page === "staff" && <StaffForm onBack={() => setPage("dashboard")} />}
      </div>
    </>
  );
}
