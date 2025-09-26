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
    <div className="dashboard px-6 py-6">
      {/* Dashboard Header */}
      <h2 className="text-3xl font-bold mb-6 text-blue-900">Dashboard</h2>

      {/* Statistic Cards */}
      <div className="flex flex-wrap gap-6 mb-8 justify-start">
        <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl flex items-center gap-4 w-full sm:w-64 transition">
          <FaUniversity className="text-blue-500 text-5xl" />
          <div>
            <div className="text-3xl font-bold text-blue-600">{counts.colleges}</div>
            <div className="mt-1 text-gray-600 font-medium">Colleges</div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl flex items-center gap-4 w-full sm:w-64 transition">
          <FaUsers className="text-green-500 text-5xl" />
          <div>
            <div className="text-3xl font-bold text-green-600">{counts.users}</div>
            <div className="mt-1 text-gray-600 font-medium">Users</div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl flex items-center gap-4 w-full sm:w-64 transition">
          <FaChalkboardTeacher className="text-purple-500 text-5xl" />
          <div>
            <div className="text-3xl font-bold text-purple-600">{counts.faculty}</div>
            <div className="mt-1 text-gray-600 font-medium">Faculty</div>
          </div>
        </div>
      </div>

      {/* Staff Table */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-2xl font-bold mb-4 text-blue-900">All Staff</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                {allStaff[0] &&
                  Object.keys(allStaff[0]).map((key) => (
                    <th
                      key={key}
                      className="border px-4 py-2 text-left text-gray-700"
                    >
                      {key.charAt(0).toUpperCase() + key.slice(1).replace("_", " ")}
                    </th>
                  ))}
              </tr>
            </thead>
            <tbody>
              {allStaff.map((staff, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  {Object.values(staff).map((val, i) => (
                    <td key={i} className="border px-4 py-2 text-gray-800">
                      {val}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Export Buttons */}
        <div className="flex flex-wrap gap-4 mt-6">
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition"
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
            className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition"
            onClick={() => {
              import("jspdf").then((jsPDF) => {
                import("jspdf-autotable").then((autoTable) => {
                  const doc = new jsPDF.default("l", "pt", "a4");
                  const margin = 40;
                  const headers = Object.keys(allStaff[0] || {}).map(
                    (key) =>
                      key.charAt(0).toUpperCase() + key.slice(1).replace("_", " ")
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
    </div>
  );
}
