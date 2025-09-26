import { useState, useEffect } from "react";
import axios from "axios";

export default function StaffForm({ onBack, isAdmin, loggedInCollegeCode }) {
  const [staff, setStaff] = useState({
    collegeCode: "",
    collegeName: "",
    district: "",
    taluk: "",
    designation: "",
    group: "",
    branch: "",
    sanctioned: "",
    working: "",
    vacant: "",
    noOfDeputed: "0",
    deputedCollegeCode: "",
    remarks: "",
  });

  const [staffData, setStaffData] = useState([]);
  const [msg, setMsg] = useState({ text: "", type: "" });

  // Calculate vacant posts
  useEffect(() => {
    const sanctioned = parseInt(staff.sanctioned) || 0;
    const working = parseInt(staff.working) || 0;
    setStaff((prev) => ({
      ...prev,
      vacant: Math.max(0, sanctioned - working),
    }));
  }, [staff.sanctioned, staff.working]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStaff((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (
      !staff.collegeCode ||
      !staff.collegeName ||
      !staff.designation ||
      !staff.group ||
      !staff.branch
    ) {
      setMsg({ text: "Please fill in all required fields.", type: "error" });
      return;
    }

    if (staff.working > staff.sanctioned) {
      setMsg({
        text: "Working staff cannot exceed sanctioned posts.",
        type: "error",
      });
      return;
    }

    try {
      const dataToSend = {
        ...staff,
        sanctioned: Number(staff.sanctioned),
        working: Number(staff.working),
        vacant: Number(staff.vacant),
        noOfDeputed: Number(staff.noOfDeputed),
      };

      await axios.post("http://localhost:5000/staff", dataToSend);
      setMsg({ text: "Staff data added successfully!", type: "success" });

      // Clear form
      setStaff({
        collegeCode: "",
        collegeName: "",
        district: "",
        taluk: "",
        designation: "",
        group: "",
        branch: "",
        sanctioned: "",
        working: "",
        vacant: "",
        noOfDeputed: "0",
        deputedCollegeCode: "",
        remarks: "",
      });
    } catch (err) {
      console.error(err);
      setMsg({
        text: "Failed to add staff data. Please check your inputs.",
        type: "error",
      });
    }
  };

  const refreshForm = () => {
    setStaff({
      collegeCode: "",
      collegeName: "",
      district: "",
      taluk: "",
      designation: "",
      group: "",
      branch: "",
      sanctioned: "",
      working: "",
      vacant: "",
      noOfDeputed: "0",
      deputedCollegeCode: "",
      remarks: "",
    });
    setMsg({ text: "Form cleared successfully.", type: "success" });
  };

  return (
    <div className="bg-white bg-opacity-95 backdrop-blur-md p-8 md:p-10 rounded-2xl shadow-xl border border-gray-200 w-11/12 max-w-4xl mx-auto my-8 mt-44 sm:mt-52 animate-fade-in">
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6"
      >
        <div className="md:col-span-2">
          <h3 className="text-indigo-900 text-2xl font-bold mb-6 text-left">
            Staff Details Entry
          </h3>
        </div>

        {/* College Code */}
        <div>
          <label className="block text-gray-700 text-base font-semibold mb-2">
            College Code
          </label>
          <input
            type="text"
            name="collegeCode"
            value={staff.collegeCode}
            onChange={handleChange}
            placeholder="e.g., 100"
            className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed shadow-sm"
            readOnly={!isAdmin}
            required
          />
        </div>

        {/* College Name */}
        <div>
          <label className="block text-gray-700 text-base font-semibold mb-2">
            College Name
          </label>
          <input
            type="text"
            name="collegeName"
            value={staff.collegeName}
            onChange={handleChange}
            placeholder="Auto-filled based on College Code"
            className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed shadow-sm"
            readOnly={!isAdmin}
            required
          />
        </div>

        {/* District */}
        <div>
          <label className="block text-gray-700 text-base font-semibold mb-2">
            District
          </label>
          <input
            type="text"
            name="district"
            value={staff.district}
            onChange={handleChange}
            placeholder="Auto-filled based on College Code"
            className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed shadow-sm"
            readOnly={!isAdmin}
            required
          />
        </div>

        {/* Taluk */}
        <div>
          <label className="block text-gray-700 text-base font-semibold mb-2">
            Taluk
          </label>
          <input
            type="text"
            name="taluk"
            value={staff.taluk}
            onChange={handleChange}
            placeholder="Auto-filled based on College Code"
            className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed shadow-sm"
            readOnly={!isAdmin}
            required
          />
        </div>

        {/* Designation */}
        <div>
          <label className="block text-gray-700 text-base font-semibold mb-2">
            Designation
          </label>
          <input
            type="text"
            name="designation"
            value={staff.designation}
            onChange={handleChange}
            placeholder="e.g., LECTURER"
            className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed shadow-sm"
            readOnly={!isAdmin}
            required
          />
        </div>

        {/* Group */}
        <div>
          <label className="block text-gray-700 text-base font-semibold mb-2">
            Group
          </label>
          <input
            type="text"
            name="group"
            value={staff.group}
            onChange={handleChange}
            placeholder="e.g., B"
            className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed shadow-sm"
            readOnly={!isAdmin}
            required
          />
        </div>

        {/* Branch */}
        <div>
          <label className="block text-gray-700 text-base font-semibold mb-2">
            Branch
          </label>
          <input
            type="text"
            name="branch"
            value={staff.branch}
            onChange={handleChange}
            placeholder="e.g., COMPUTER SCIENCE AND ENGINEERING"
            className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed shadow-sm"
            readOnly={!isAdmin}
            required
          />
        </div>

        {/* Sanctioned */}
        <div>
          <label className="block text-gray-700 text-base font-semibold mb-2">
            Sanctioned
          </label>
          <input
            type="number"
            name="sanctioned"
            value={staff.sanctioned}
            onChange={handleChange}
            placeholder="Auto-filled based on selection"
            className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed shadow-sm"
            readOnly={!isAdmin}
            required
          />
        </div>

        {/* Working */}
        <div>
          <label className="block text-gray-700 text-base font-semibold mb-2">
            Working
          </label>
          <input
            type="number"
            name="working"
            value={staff.working}
            onChange={handleChange}
            placeholder="Enter number of working staff"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm transition-all duration-200"
            required
          />
        </div>

        {/* Vacant */}
        <div>
          <label className="block text-gray-700 text-base font-semibold mb-2">
            Vacant
          </label>
          <input
            type="number"
            name="vacant"
            value={staff.vacant}
            readOnly
            placeholder="Auto-calculated (Sanctioned - Working)"
            className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed shadow-sm"
          />
        </div>

        {/* No. of Deputed */}
        <div>
          <label className="block text-gray-700 text-base font-semibold mb-2">
            No. of Deputed
          </label>
          <input
            type="number"
            name="noOfDeputed"
            value={staff.noOfDeputed}
            onChange={handleChange}
            min="0"
            placeholder="Enter number of deputed staff"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm transition-all duration-200"
          />
        </div>

        {/* Deputed College Code */}
        <div>
          <label className="block text-gray-700 text-base font-semibold mb-2">
            Deputed College Code
          </label>
          <input
            type="text"
            name="deputedCollegeCode"
            value={staff.deputedCollegeCode}
            onChange={handleChange}
            placeholder="e.g., 100"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm transition-all duration-200"
          />
        </div>

        {/* Remarks */}
        <div className="md:col-span-2">
          <label className="block text-gray-700 text-base font-semibold mb-2">
            Remarks
          </label>
          <textarea
            name="remarks"
            value={staff.remarks}
            onChange={handleChange}
            placeholder="Add any relevant remarks here..."
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm transition-all duration-200 min-h-[100px]"
          />
        </div>

        {/* Action Buttons */}
        <div className="actions md:col-span-2 flex flex-wrap justify-center gap-4 mt-8">
          <button
            type="submit"
            className="bg-green-600 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-green-700 transition-all duration-200 transform hover:scale-105 active:scale-95 text-base uppercase tracking-wide"
          >
            Submit Entry
          </button>
          <button
            type="button"
            className="bg-orange-500 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-orange-600 transition-all duration-200 transform hover:scale-105 active:scale-95 text-base uppercase tracking-wide"
            onClick={refreshForm}
          >
            Clear Form
          </button>
          <button
            type="button"
            className="bg-gray-600 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-gray-700 transition-all duration-200 transform hover:scale-105 active:scale-95 text-base uppercase tracking-wide"
            onClick={onBack}
          >
            Back to Dashboard
          </button>
        </div>
      </form>

      {/* Message Display */}
      {msg.text && (
        <div
          className={`mt-4 text-center font-medium ${
            msg.type === "success" ? "text-green-600" : "text-red-600"
          }`}
        >
          {msg.text}
        </div>
      )}

      {/* Disclaimer */}
      <div className="disclaimer-message mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-yellow-800 text-center shadow-sm">
        <strong className="font-bold">Note:</strong> All the entries provided
        are correct and have been verified by the Principal and concerned EST
        staff. In case of any discrepancies, the Principal of the Institution
        and the concerned Establishment (EST) staff will be held responsible for
        further actions.
      </div>

      {/* Developer Info */}
      <div className="developer-info text-sm text-gray-600 text-center mt-8 pt-4 border-t border-gray-200">
        <p>
          <strong>Developed by:</strong> Harsha K R
        </p>
        <p>
          <strong>Role:</strong> Office Superintendent
        </p>
        <p>
          <strong>Department:</strong> DTE Karnataka
        </p>
        <p>
          <strong>For modifications, contact:</strong>
          <a
            href="mailto:dteswv@gmail.com"
            className="text-blue-700 font-semibold underline hover:text-blue-900 ml-1"
          >
            dteswv@gmail.com
          </a>
        </p>
      </div>
    </div>
  );
}
