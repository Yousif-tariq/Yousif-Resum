import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./Admin.scss";

const AdminLogin = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const history = useHistory();

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === "admin123") {
      localStorage.setItem("isAdmin", "true");
      history.push("/admin");
    } else {
      setError("Incorrect Password. Please try again.");
    }
  };

  return (
    <div className="admin-login-container">
      <div className="login-card">
        <h2>Gentleman Admin</h2>
        <p>Enter password to access the dashboard</p>
        <form onSubmit={handleLogin}>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
          />
          {error && <p className="error-text">{error}</p>}
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
