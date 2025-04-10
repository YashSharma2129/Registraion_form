import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UsersTable = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    gender: "Male",
    dob: "",
    address: "",
  });

  const fetchUsers = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get("http://localhost:3001/users");
      setUsers(response.data);
    } catch (error) {
      setError("Failed to fetch users: " + error.message);
      console.error("Failed to fetch users:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axios.delete(`http://localhost:3001/users/${id}`);
        alert("User deleted successfully!");
        fetchUsers();
      } catch (error) {
        console.error("Failed to delete user:", error);
        alert("An error occurred while deleting the user.");
      }
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user._id);
    setFormData({
      name: user.name,
      email: user.email,
      gender: user.gender,
      dob: user.dob,
      address: user.address,
    });
  };

  const handleSave = async () => {
    if (
      !formData.name ||
      !formData.email ||
      !formData.gender ||
      !formData.dob ||
      !formData.address
    ) {
      alert("Please fill out all fields!");
      return;
    }

    try {
      await axios.put(`http://localhost:3001/users/${editingUser}`, formData);
      alert("User updated successfully!");
      setEditingUser(null);
      fetchUsers();
    } catch (error) {
      console.error("Failed to update user:", error);
      alert("An error occurred while updating the user.");
    }
  };

  const handleCancel = () => {
    setEditingUser(null);
    setFormData({
      name: "",
      email: "",
      gender: "Male",
      dob: "",
      address: "",
    });
  };

  const handleCreate = async () => {
    if (
      !formData.name ||
      !formData.email ||
      !formData.gender ||
      !formData.dob ||
      !formData.address
    ) {
      alert("Please fill out all fields!");
      return;
    }

    console.log("Creating user with data:", formData); // Check data before sending

    try {
      const response = await axios.post(
        "http://localhost:3001/users",
        formData
      );
      console.log("Response from server:", response);
      alert("User created successfully!");
      fetchUsers(); // Refresh the user list
      setShowCreateForm(false); // Hide the form
    } catch (error) {
      console.error("Error creating user:", error.response || error); // Log full error
      alert("An error occurred while creating the user.");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div
      style={{
        backgroundImage: "linear-gradient(to right, #00d5ff, #0095ff)",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <div className="container mt-4 p-4 bg-white rounded shadow">
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        {isLoading ? (
          <div className="text-center p-4">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <>
            <h2 className="mb-4 text-center text-primary">Registered Users</h2>

            <button
              className="btn btn-success mb-3"
              onClick={() => setShowCreateForm(!showCreateForm)}
            >
              {showCreateForm ? "Cancel" : "Add New User"}
            </button>

            {showCreateForm && (
              <div className="mb-3">
                <h3 className="text-center">Create User</h3>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="form-control mb-2"
                  placeholder="Enter name"
                />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="form-control mb-2"
                  placeholder="Enter email"
                />
                <select
                  value={formData.gender}
                  onChange={(e) =>
                    setFormData({ ...formData, gender: e.target.value })
                  }
                  className="form-control mb-2"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
                <input
                  type="date"
                  value={formData.dob}
                  onChange={(e) =>
                    setFormData({ ...formData, dob: e.target.value })
                  }
                  className="form-control mb-2"
                />
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  className="form-control mb-2"
                  placeholder="Enter address"
                />
                <button className="btn btn-primary" onClick={handleCreate}>
                  Create User
                </button>
              </div>
            )}

            <div className="table-responsive">
              <table className="table table-bordered table-striped table-hover">
                <thead className="table-dark">
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Gender</th>
                    <th>Date of Birth</th>
                    <th>Address</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.length > 0 ? (
                    users.map((user, index) => (
                      <tr key={user._id}>
                        <td>{index + 1}</td>
                        <td>
                          {editingUser === user._id ? (
                            <input
                              type="text"
                              value={formData.name}
                              onChange={(e) =>
                                setFormData({ ...formData, name: e.target.value })
                              }
                              className="form-control"
                            />
                          ) : (
                            user.name
                          )}
                        </td>
                        <td>
                          {editingUser === user._id ? (
                            <input
                              type="email"
                              value={formData.email}
                              onChange={(e) =>
                                setFormData({ ...formData, email: e.target.value })
                              }
                              className="form-control"
                            />
                          ) : (
                            user.email
                          )}
                        </td>
                        <td>
                          {editingUser === user._id ? (
                            <select
                              value={formData.gender}
                              onChange={(e) =>
                                setFormData({ ...formData, gender: e.target.value })
                              }
                              className="form-control"
                            >
                              <option value="Male">Male</option>
                              <option value="Female">Female</option>
                            </select>
                          ) : (
                            user.gender
                          )}
                        </td>
                        <td>
                          {editingUser === user._id ? (
                            <input
                              type="date"
                              value={formData.dob}
                              onChange={(e) =>
                                setFormData({ ...formData, dob: e.target.value })
                              }
                              className="form-control"
                            />
                          ) : (
                            new Date(user.dob).toLocaleDateString()
                          )}
                        </td>
                        <td>
                          {editingUser === user._id ? (
                            <input
                              type="text"
                              value={formData.address}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  address: e.target.value,
                                })
                              }
                              className="form-control"
                            />
                          ) : (
                            user.address
                          )}
                        </td>
                        <td>
                          {editingUser === user._id ? (
                            <>
                              <button
                                className="btn btn-success btn-sm me-2"
                                onClick={handleSave}
                              >
                                Save
                              </button>
                              <button
                                className="btn btn-secondary btn-sm"
                                onClick={handleCancel}
                              >
                                Cancel
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                className="btn btn-warning btn-sm me-2"
                                onClick={() => handleEdit(user)}
                              >
                                Edit
                              </button>
                              <button
                                className="btn btn-danger btn-sm"
                                onClick={() => handleDelete(user._id)}
                              >
                                Delete
                              </button>
                            </>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="text-center">
                        No users found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <footer className="text-center mt-4">
              <p className="text-secondary">
                Made with{" "}
                <span style={{ color: "red" }}>❤</span> by{" "}
                <a
                  href="https://www.linkedin.com/in/yash-sharma-12345678/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: "none", color: "blue" }}
                >
                  Yash Sharma
                </a>
              </p>
            </footer>
          </>
        )}
      </div>
    </div>
  );
};

export default UsersTable;
