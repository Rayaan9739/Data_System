import mongoose from "mongoose";

const staffSchema = new mongoose.Schema({
  college_code: Number,
  college_name: String,
  name: String,
  district: String,
  taluk: String,
  designation: String,
  group: String,
  branch: String,
  sanctioned: Number,
  working: Number,
  vacant: Number,
  remarks: String,
});

export default mongoose.model("Staff", staffSchema);
