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
    fetchAllStaff();
    fetchCounts();
  }, []);

  const fetchAllStaff = async () => {
    try {
      const res = await axios.get("http://localhost:5000/staff");
      setAllStaff(res.data);

      // Update faculty count automatically based on staff
      setCounts((prev) => ({ ...prev, faculty: res.data.length }));
    } catch (err) {
      console.error(err);
    }
  };

  const fetchCounts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/counts");
      setCounts((prev) => ({
        ...prev,
        colleges: res.data.colleges || 0,
        users: res.data.users || 0,
      }));
    } catch (err) {
      console.error(err);
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Export Buttons */}
        <div className="export-buttons">
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
      <p className="dev-note">
        Developed &amp; Maintained by{" "}
        <b>Department of Technical Education, Government of Karnataka</b>
      </p>
    </div>
  );
}
