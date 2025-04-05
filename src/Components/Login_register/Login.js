import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    let loggedInUser = null;

    // Iterate through localStorage to find user by email
    Object.keys(localStorage).forEach((key) => {
      try {
        const storedData = localStorage.getItem(key);
        const storedUser = storedData ? JSON.parse(storedData) : null;

        if (storedUser && storedUser.email === email && storedUser.password === password) {
          loggedInUser = { username: key, email };
        }
      } catch (error) {
        console.warn(`Skipping invalid localStorage key: ${key}`);
      }
    });

    if (loggedInUser) {
      localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
      alert(`Welcome, ${loggedInUser.username}!`);
      navigate("/");
    } else {
      alert("Invalid email or password");
    }
  };

  return (
    <div className="container" style={{ marginTop: "300px" }}>
      <div className="row  aligns-item-center">
        <div className="col-md-4">
          <div className="card shadow p-4">
            <h2 className="text-center mb-4">Login</h2>
            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-success text-white w-100">
                Login
              </button>
            </form>
            <p className="mt-3 text-center">
              Not registered?{" "}
              <a href="/register" className="text-primary">
                Register here
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
