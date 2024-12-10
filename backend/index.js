const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const FormDataModel = require("./models/FormData");

const app = express();
app.use(express.json());
app.use(cors());

mongoose
  .connect("mongodb://127.0.0.1:27017/Form", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

app.get("/users", async (req, res) => {
  try {
    const users = await FormDataModel.find({});
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

app.post("/register", async (req, res) => {
  try {
    const { email, password, name, gender, dob, address ,pincode } = req.body;

    if (!email || !password || !name || !gender || !dob || !address || !pincode) {
      return res.status(400).json({
        error:
          "All fields (email, password, name, gender, dob, address) are required",
      });
    }

    const existingUser = await FormDataModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await FormDataModel.create({
      email,
      password: hashedPassword,
      name,
      gender,
      dob,
      address,
      pincode,
    });

    res.status(201).json({ message: "Registration successful", user: newUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const user = await FormDataModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "No user found with this email" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid password" });
    }

    res.status(200).json({ message: "Login successful", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/users", async (req, res) => {
  try {
    const { name, email, gender, dob, address,pincode } = req.body;
    
    if (!name || !email || !gender || !dob || !address || !pincode) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newUser = new User({ name, email, gender, dob, address,pincode });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error while creating user:", error);
    res.status(500).json({ message: "Error creating user" });
  }
});



app.put("/users/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email, gender, dob, address,pincode } = req.body;

  try {
    const updatedUser = await FormDataModel.findByIdAndUpdate(id, {
      name,
      email,
      gender,
      dob,
      address,
      pincode,
    }, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating user" });
  }
});


app.delete("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletedUser = await FormDataModel.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete user" });
  }
});

app.listen(3001, () => {
  console.log("Server listening on http://127.0.0.1:3001");
});
