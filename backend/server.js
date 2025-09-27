import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bcrypt from "bcrypt";
import User from "./models/User.js";
import Staff from "./models/Staff.js";
import College from "./models/College.js";

const app = express();

// ✅ Middleware
app.use(cors({
  origin: "http://localhost:5173" // React dev server
}));
app.use(express.json());

// ✅ MongoDB Connection
const mongoURI = "mongodb+srv://Zainuddin:123@multicollege.s685upl.mongodb.net/collegedb?retryWrites=true&w=majority&appName=multicollege"; // replace 'collegeDB' with your DB name
mongoose.connect(mongoURI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log("MongoDB connection error:", err));

// ✅ Register
app.post("/register", async (req, res) => {
  const { email, password } = req.body;
  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const role = email === "zainzainu073@gmail.com" ? "admin" : "user";

    const newUser = new User({ email, password: hashedPassword, role });
    await newUser.save();

    res.status(201).json({ message: "Registered", role });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ message: "Invalid password" });

    res.json({ message: "Login success", role: user.role });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Reset Password
app.post("/reset-password", async (req, res) => {
  const { email, newPassword } = req.body;
  try {
    const hashed = await bcrypt.hash(newPassword, 10);
    await User.findOneAndUpdate({ email }, { password: hashed });
    res.json({ message: "Password updated" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Save Staff Data
app.post("/staff", async (req, res) => {
  try {
    const { sanctioned, working, vacant, college_code, college_name, ...rest } = req.body;

    // Validate required fields
    if (!college_code || !college_name) {
      return res.status(400).json({ message: "College code and college name are required" });
    }

    // Convert numeric fields
    const sanctionedNum = Number(sanctioned);
    const workingNum = Number(working);
    const vacantNum = Number(vacant);

    if ([sanctionedNum, workingNum, vacantNum].some(isNaN)) {
      return res.status(400).json({ message: "Sanctioned, working, and vacant must be valid numbers" });
    }

    // Create new staff document
    const newStaff = new Staff({
      college_code,
      college_name,
      ...rest,
      sanctioned: sanctionedNum,
      working: workingNum,
      vacant: vacantNum,
    });

    await newStaff.save();

   // Sync college into College collection
await College.findOneAndUpdate(
  { code: college_code },               // search by unique college code
  { name: college_name, code: college_code }, // update or insert
  { upsert: true, new: true, setDefaultsOnInsert: true } // fix strict mode
);


    res.status(201).json({ message: "Staff & College saved successfully", staff: newStaff });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || "Server error" });
  }
});


// ✅ Get Staff Data
app.get("/staff", async (req, res) => {
  try {
    const staff = await Staff.find();
    res.json(staff);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});


app.get("/colleges", async (req, res) => {
  try {
    const colleges = await College.find();
    res.json(colleges);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error fetching colleges" });
  }
});

app.get("/users", async (req, res) => {
  try {
    const users = await User.find(); // Fetch all users from the database
    res.json(users); // Send the users as JSON
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error fetching users" });
  }
});


app.get("/counts", async (req, res) => {
  try {
    const staff = await Staff.find();
    const colleges = await College.find();
    const users = await User.find();
    res.json({
      faculty: staff.length,
      colleges: colleges.length,
      users: users.length
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});



//delete staffs

app.delete("/staff/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Find the staff first
    const staffToDelete = await Staff.findById(id);
    if (!staffToDelete) {
      return res.status(404).json({ error: "Staff not found" });
    }

    const { college_name, college_code } = staffToDelete;

    // Delete the staff
    await Staff.findByIdAndDelete(id);

    const staffRemaining = await Staff.find({ college_code }); // use code as identifier
if (staffRemaining.length === 0) {
  await College.findOneAndDelete({ code: college_code });
}

    res.json({
      message: "Staff deleted successfully",
      collegeDeleted: staffRemaining.length === 0,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error deleting staff/college" });
  }
});




// ✅ Start Server
app.listen(5000, () => console.log("Server running on http://localhost:5000"));
