import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!email || !password) {
      alert("Please fill out all fields.");
      return;
    }

    setLoading(true);

    axios
      .post("http://localhost:3001/login", { email, password })
      .then((result) => {
        setLoading(false);
        console.log(result);
        if (result.data.message === "Login successful") {
          console.log("Login Success");
          alert("Login successful!");
          navigate("/users");
        } else if (result.data.error === "Invalid password") {
          alert("Incorrect password! Please try again.");
        } else if (result.data.error === "No user found with this email") {
          alert("No user found with this email.");
        } else {
          alert("An unexpected error occurred. Please try again later.");
        }
      })
      .catch((err) => {
        setLoading(false);
        console.error("Error:", err);
        alert("Server error. Please try again later.");
      });
  };

  return (
    <div>
      <div
        className="d-flex justify-content-center align-items-center text-center vh-100"
        style={{
          backgroundImage:
            "linear-gradient(#00d5ff, #0095ff, rgba(93, 0, 255, .555))",
        }}
      >
        <div
          className="bg-white p-4 rounded shadow"
          style={{ width: "90%", maxWidth: "400px" }}
        >
          <h2 className="mb-3 text-primary">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3 text-start">
              <label htmlFor="exampleInputEmail1" className="form-label">
                <strong>Email Id</strong>
              </label>
              <input
                type="email"
                placeholder="Enter Email"
                className="form-control"
                id="exampleInputEmail1"
                onChange={(event) => setEmail(event.target.value)}
                required
                value={email}
              />
            </div>
            <div className="mb-3 text-start">
              <label htmlFor="exampleInputPassword1" className="form-label">
                <strong>Password</strong>
              </label>
              <input
                type="password"
                placeholder="Enter Password"
                className="form-control"
                id="exampleInputPassword1"
                onChange={(event) => setPassword(event.target.value)}
                required
                value={password}
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary w-100"
              disabled={loading}
            >
              {loading ? "Logging In..." : "Login"}
            </button>
          </form>
          <p className="container my-2">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="text-decoration-none">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
