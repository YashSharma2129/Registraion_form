import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [pincode, setPincode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validateForm = () => {
    if (
      !name ||
      !email ||
      !password ||
      !address ||
      !dob ||
      !gender ||
      !pincode
    ) {
      setError("All fields are required");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Invalid email format");
      return false;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (!validateForm()) return;

    setLoading(true);
    try {
      await axios.post("http://127.0.0.1:3001/register", {
        name,
        email,
        password,
        address,
        dob,
        gender,
        pincode,
      });
      alert("Registration successful!");
      navigate("/login");
    } catch (error) {
      setError(error.response?.data?.error || "Registration failed");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center min-vh-100"
      style={{
        backgroundImage: "linear-gradient(to right, #6a11cb, #2575fc)",
        padding: "20px 0",
      }}
    >
      <div
        className="bg-white p-3 rounded shadow-lg"
        style={{
          width: "90%",
          maxWidth: "500px",
          maxHeight: "80vh",
          overflowY: "auto",
          borderRadius: "10px",
        }}
      >
        <h2 className="mb-3 text-center text-primary font-weight-bold">
          Create Account
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label
              htmlFor="exampleInputName"
              className="form-label text-muted"
            >
              <strong>Name</strong>
            </label>
            <input
              type="text"
              placeholder="Enter Name"
              className="form-control"
              id="exampleInputName"
              onChange={(event) => setName(event.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="exampleInputEmail1"
              className="form-label text-muted"
            >
              <strong>Email Id</strong>
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              className="form-control"
              id="exampleInputEmail1"
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="exampleInputPassword1"
              className="form-label text-muted"
            >
              <strong>Password</strong>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              className="form-control"
              id="exampleInputPassword1"
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="exampleInputAddress"
              className="form-label text-muted"
            >
              <strong>Address</strong>
            </label>
            <input
              type="text"
              placeholder="Enter Address"
              className="form-control"
              id="exampleInputAddress"
              onChange={(event) => setAddress(event.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label
              htmlFor="exampleInputAddress"
              className="form-label text-muted"
            >
              <strong>Pincode</strong>
            </label>
            <input
              type="text"
              placeholder="Enter Pincode"
              className="form-control"
              id="exampleInputPincode"
              onChange={(event) => setPincode(event.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="exampleInputDOB"
              className="form-label text-muted"
            >
              <strong>Date of Birth</strong>
            </label>
            <input
              type="date"
              className="form-control"
              id="exampleInputDOB"
              onChange={(event) => setDob(event.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="exampleInputGender"
              className="form-label text-muted"
            >
              <strong>Gender</strong>
            </label>
            <select
              className="form-control"
              id="exampleInputGender"
              onChange={(event) => setGender(event.target.value)}
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          {error && <div className="alert alert-danger">{error}</div>}
          <button
            type="submit"
            className="btn btn-primary w-100 py-2"
            disabled={loading}
            style={{
              backgroundColor: "#2575fc",
              border: "none",
              borderRadius: "20px",
            }}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
        <p className="mt-2 text-center text-muted">
          Already have an account?
          <Link to="/login" className="text-primary ms-2">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
