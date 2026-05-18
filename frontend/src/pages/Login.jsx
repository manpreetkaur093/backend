import { useState } from "react";
import { loginUser } from "../services/api";
import { Link } from "react-router-dom";
import "../styles/common.css";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    setLoading(true);

    try {
      const res = await loginUser(form);

      //  SAVE TOKEN (MOST IMPORTANT)
      localStorage.setItem("token", res.token);
      localStorage.setItem("username", res.email); 
      localStorage.setItem("role", res.role);

      // Redirect properly
      if (res.role === "ROLE_ADMIN") {
        navigate("/admin");
      } else {
        navigate("/questions");
      }

    } catch {
      alert("Login failed ❌");
    }

    setLoading(false);
  };

  return (
    <div className="page">
      <div className="card">
        <h2 className="title">Login</h2>

        <input
          className="input"
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />

        <input
          className="input"
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
        />

        <button className="button" onClick={handleLogin}>
          {loading ? "Logging in..." : "Login"}
        </button>

        <div className="link">
          <p>
            Don’t have an account? <Link to="/register">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;