import { useEffect, useState } from "react";
import axios from "axios";
import { FaUniversity, FaUsers, FaChalkboardTeacher } from "react-icons/fa";

export default function Dashboard() {
  const [allStaff, setAllStaff] = useState([]);
  const [counts, setCounts] = useState({
    colleges: 0,
    users: 0,
    faculty: 0,
  });

  // Fetch staff data and counts
 useEffect(() => {
   fetchAllCounts();
  fetchAllStaff();
}, []);

const fetchAllCounts = async () => {
  try {
    const res = await axios.get("http://localhost:5000/counts");
    setCounts({
      colleges: res.data.colleges,
      users: res.data.users,
      faculty: res.data.faculty,
    });
  } catch (err) {
    console.error("Failed to fetch counts:", err);
  }
};


const fetchAllStaff = async () => {
  try {
    const res = await axios.get("http://localhost:5000/staff");
    const staffData = res.data;

    setAllStaff(staffData);

    const facultyCount = staffData.length;
    const uniqueColleges = [...new Set(staffData.map((s) => s.college_name))];

    // Merge with previous state to keep users count
    setCounts((prev) => ({
      ...prev,
      faculty: facultyCount,
      colleges: uniqueColleges.length,
    }));
  } catch (err) {
    console.error(err);
  }
};

const handleDeleteStaff = async (id) => {
  if (!window.confirm("Are you sure you want to delete this staff?")) return;

  try {
    await axios.delete(`http://localhost:5000/staff/${id}`);

    // Remove from frontend state
    setAllStaff((prevStaff) => {
      const updatedStaff = prevStaff.filter((staff) => staff._id !== id);

      // Update counts after deleting
      const uniqueColleges = [...new Set(updatedStaff.map((s) => s.college_name))];
      setCounts((prevCounts) => ({
        ...prevCounts,
        faculty: updatedStaff.length,
        colleges: uniqueColleges.length,
      }));

      return updatedStaff;
    });
  } catch (err) {
    console.error(err);
    alert("Failed to delete staff");
  }
};


 
  return (
    <div className="dashboard">
      {/* Dashboard Header */}
      <h2>Dashboard</h2>

      {/* Statistic Cards */}
      <div className="stats-row">
        <div className="stat-card">
          <FaUniversity className="stat-icon" />
          <div>
            <div className="stat-value">{counts.colleges}</div>
            <div className="stat-label">Colleges</div>
          </div>
        </div>

        <div className="stat-card">
          <FaUsers className="stat-icon" style={{ color: "#16a34a" }} />
          <div>
            <div className="stat-value" style={{ color: "#15803d" }}>
              {counts.users}
            </div>
            <div className="stat-label">Users</div>
          </div>
        </div>

        <div className="stat-card">
          <FaChalkboardTeacher
            className="stat-icon"
            style={{ color: "#7e22ce" }}
          />
          <div>
            <div className="stat-value" style={{ color: "#6b21a8" }}>
              {counts.faculty}
            </div>
            <div className="stat-label">Faculty</div>
          </div>
        </div>
      </div>

      {/* Staff Table */}
      <div className="card">
        <h3 style={{ marginBottom: "1rem", color: "#1e1b4b" }}>All Staff</h3>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                {allStaff[0] &&
                  Object.keys(allStaff[0]).map((key) => (
                    <th key={key}>
                      {key.charAt(0).toUpperCase() +
                        key.slice(1).replace("_", " ")}
                    </th>
                  ))}
              </tr>
            </thead>
           <tbody>
  {allStaff.map((staff, index) => (
    <tr key={index}>
      {Object.values(staff).map((val, i) => (
        <td key={i}>{val}</td>
      ))}
      {/* Delete Button */}
      <td>
        <button
          onClick={() => handleDeleteStaff(staff._id)}
          className="bg-red-500 text-white font-medium px-2 py-1 rounded-md cursor-pointer hover:bg-red-600 hover:scale-105 transition-transform"
        >
          Delete
        </button>
      </td>
    </tr>
  ))}
</tbody>

          </table>
        </div>

        {/* Export Buttons */}
        <div className="export-buttons flex space-x-6 mt-4">
          <button
            className="export-btn export-btn-blue"
            onClick={() => {
              import("xlsx").then((XLSX) => {
                const ws = XLSX.utils.json_to_sheet(allStaff);
                const wb = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(wb, ws, "AllStaff");
                XLSX.writeFile(wb, "AllStaff.xlsx");
              });
            }}
          >
            Export All to Excel
          </button>

          <button
            className="export-btn export-btn-gray"
            onClick={() => {
              import("jspdf").then((jsPDF) => {
                import("jspdf-autotable").then((autoTable) => {
                  const doc = new jsPDF.default("l", "pt", "a4");
                  const margin = 40;
                  const headers = Object.keys(allStaff[0] || {}).map(
                    (key) =>
                      key.charAt(0).toUpperCase() +
                      key.slice(1).replace("_", " ")
                  );
                  const data = allStaff.map((item) => Object.values(item));

                  autoTable.default(doc, {
                    head: [headers],
                    body: data,
                    startY: margin,
                    theme: "grid",
                    headStyles: {
                      fillColor: [33, 150, 243],
                      textColor: 255,
                      fontStyle: "bold",
                      fontSize: 12,
                    },
                    bodyStyles: {
                      fontSize: 10,
                      textColor: 50,
                    },
                    styles: {
                      cellPadding: 5,
                    },
                    showHead: "everyPage",
                    margin: { left: margin, right: margin },
                  });

                  doc.save("AllStaff.pdf");
                });
              });
            }}
          >
            Export All to PDF
          </button>
        </div>
      </div>

     
     
     
     
     
     
      {/* Developer Note */}

      {/* <p className="footer">
        Developed &amp; Maintained by{" "}
        <b>Department of Technical Education, Government of Karnataka</b>
      </p> */}
    </div>
  );
}
