import { useState } from "react";
import * as XLSX from "xlsx";
import html2pdf from "html2pdf.js";
import DataTable from "./DataTable";
import Modal from "./Modal";

export default function StaffForm({ onLogout }) {
  const [records, setRecords] = useState([]);
  const [form, setForm] = useState({
    code: "",
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
  const [modal, setModal] = useState(null); // {type, index}

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!form.code) return "Enter College Code!";
    if (!form.designation) return "Enter Designation!";
    return null;
  };

  const addRecord = () => {
    const error = validateForm();
    if (error) return alert(error);
    setRecords([...records, form]);
    setForm({
      code: "",
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
  };

  const deleteRecord = (index) => {
    setModal({ type: "delete-record", index });
  };

  const confirmDelete = (index) => {
    setRecords(records.filter((_, i) => i !== index));
    setModal(null);
  };

  const exportToExcel = () => {
    if (!records.length) return alert("No records to export!");
    const ws = XLSX.utils.json_to_sheet(records);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "StaffData");
    XLSX.writeFile(wb, "staff_data.xlsx");
  };

  const exportToPDF = () => {
    if (!records.length) return alert("No records to export!");
    const element = document.getElementById("staff-form-container");
    html2pdf().from(element).save("staff_data.pdf");
  };

  return (
    <div id="staff-form-container" className="form-box">
      <h3>Staff Details Entry</h3>
      <form>
        <input
          name="code"
          value={form.code}
          onChange={handleChange}
          placeholder="College Code"
        />
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="College Name"
        />
        <input
          name="district"
          value={form.district}
          onChange={handleChange}
          placeholder="District"
        />
        <input
          name="taluk"
          value={form.taluk}
          onChange={handleChange}
          placeholder="Taluk"
        />
        <input
          name="designation"
          value={form.designation}
          onChange={handleChange}
          placeholder="Designation"
        />
        <input
          name="group"
          value={form.group}
          onChange={handleChange}
          placeholder="Group"
        />
        <input
          name="branch"
          value={form.branch}
          onChange={handleChange}
          placeholder="Branch"
        />
        <input
          type="number"
          name="sanctioned"
          value={form.sanctioned}
          onChange={handleChange}
          placeholder="Sanctioned"
        />
        <input
          type="number"
          name="working"
          value={form.working}
          onChange={handleChange}
          placeholder="Working"
        />
        <input
          type="number"
          name="vacant"
          value={form.vacant}
          onChange={handleChange}
          placeholder="Vacant"
        />
        <textarea
          name="remarks"
          value={form.remarks}
          onChange={handleChange}
          placeholder="Remarks"
        ></textarea>
      </form>
      <div className="form-actions">
        <button type="button" onClick={addRecord} className="btn-green">
          Add Record
        </button>
        <button type="button" onClick={exportToExcel} className="btn-blue">
          Export to Excel
        </button>
        <button type="button" onClick={exportToPDF} className="btn-blue">
          Export to PDF
        </button>
        <button type="button" onClick={onLogout} className="btn-gray">
          Logout
        </button>
      </div>
      <DataTable
        data={records}
        columns={Object.keys(form)}
        onDelete={deleteRecord}
      />

      {modal && modal.type === "delete-record" && (
        <Modal
          title="Confirm Delete"
          message="Are you sure you want to delete this record?"
          onConfirm={() => confirmDelete(modal.index)}
          onCancel={() => setModal(null)}
        />
      )}
    </div>
  );
}
