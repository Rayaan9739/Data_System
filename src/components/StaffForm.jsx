import { useState } from "react";
import axios from "axios";

export default function StaffForm({ onBack }) {
  const [staff, setStaff] = useState({
    college_code: "",
    college_name: "",
    name: "",
    district: "",
    taluk: "",
    designation: "",
    group: "",
    branch: "",
    sanctioned: "",
    working: "",
    vacant: "",
    remarks: "",
  });

  const [msg, setMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStaff((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataToSend = {
        ...staff,
        sanctioned: Number(staff.sanctioned),
        working: Number(staff.working),
        vacant: Number(staff.vacant),
      };

      await axios.post("http://localhost:5000/staff", dataToSend);
      setMsg("Staff data added successfully!");
      setStaff({
        college_code: "",
        college_name: "",
        name: "",
        district: "",
        taluk: "",
        designation: "",
        group: "",
        branch: "",
        sanctioned: "",
        working: "",
        vacant: "",
        remarks: "",
      });
    } catch (err) {
      console.error(err);
      setMsg("Failed to add staff data. Please check your inputs.");
    }
  };

  return (
    <div className="staff-form form-box">
      <h3>Staff Form</h3>
      <form onSubmit={handleSubmit}>
        {[
          "college_code",
          "college_name",
          "name",
          "district",
          "taluk",
          "designation",
          "group",
          "branch",
          "remarks",
        ].map((field) => (
          <input
            key={field}
            type="text"
            placeholder={
              field.charAt(0).toUpperCase() + field.slice(1).replace("_", " ")
            }
            name={field}
            value={staff[field]}
            onChange={handleChange}
            required
          />
        ))}

        {["sanctioned", "working", "vacant"].map((field) => (
          <input
            key={field}
            type="number"
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            name={field}
            value={staff[field]}
            onChange={handleChange}
            required
          />
        ))}

        {/* Buttons with proper spacing */}
        <div className="button-row">
          <button type="submit" className="btn-green">
            Save Staff
          </button>
          <button type="button" onClick={onBack} className="btn-gray">
            Back to Dashboard
          </button>
        </div>
      </form>

      {msg && (
        <p
          style={{
            color: msg.includes("success") ? "green" : "red",
            marginTop: "1rem",
          }}
        >
          {msg}
        </p>
      )}
    </div>
  );
}
