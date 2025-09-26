import { useState } from "react";
import axios from "axios";

export default function PasswordReset({ onBack }) {
  const [resetData, setResetData] = useState({
    username: "",
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [message, setMessage] = useState({ text: "", type: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setResetData((prev) => ({ ...prev, [name]: value }));
  };

  const handleReset = async () => {
    if (resetData.newPassword !== resetData.confirmNewPassword) {
      setMessage({
        text: "New password and confirmation do not match.",
        type: "error",
      });
      return;
    }

    if (!resetData.newPassword.trim()) {
      setMessage({ text: "New password cannot be empty.", type: "error" });
      return;
    }

    try {
      await axios.post("http://localhost:5000/reset-password", {
        username: resetData.username,
        currentPassword: resetData.currentPassword,
        newPassword: resetData.newPassword,
      });
      setMessage({
        text: "Password reset successfully! You can now log in with your new password.",
        type: "success",
      });

      // Clear form
      setResetData({
        username: "",
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      });

      // Auto-redirect to login after 3 seconds
      setTimeout(() => {
        onBack();
      }, 3000);
    } catch (error) {
      setMessage({
        text:
          error.response?.data?.message ||
          "Error resetting password. Please check your credentials.",
        type: "error",
      });
    }
  };

  return (
    <div className="bg-white bg-opacity-95 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-gray-200 w-11/12 max-w-xl mx-auto my-8 mt-44 animate-fade-in">
      <div className="p-6 bg-gray-50 rounded-lg shadow-inner border border-gray-200">
        <h4 className="text-indigo-900 text-xl font-bold mb-5 text-center">
          Reset Your Password
        </h4>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold mb-2">
            College Code:
          </label>
          <input
            type="text"
            name="username"
            placeholder="Enter College Code"
            value={resetData.username}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold mb-2">
            Current Password:
          </label>
          <input
            type="password"
            name="currentPassword"
            value={resetData.currentPassword}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold mb-2">
            New Password:
          </label>
          <input
            type="password"
            name="newPassword"
            value={resetData.newPassword}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-semibold mb-2">
            Confirm New Password:
          </label>
          <input
            type="password"
            name="confirmNewPassword"
            value={resetData.confirmNewPassword}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm"
            required
          />
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={handleReset}
            className="flex-1 bg-blue-500 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition-all duration-200 transform hover:scale-105 active:scale-95"
          >
            Set New Password
          </button>
          <button
            onClick={onBack}
            className="flex-1 bg-gray-400 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-gray-500 transition-all duration-200 transform hover:scale-105 active:scale-95"
          >
            Back to Login
          </button>
        </div>

        {message.text && (
          <div
            className={`mt-4 text-center font-medium ${
              message.type === "success" ? "text-green-600" : "text-red-600"
            }`}
          >
            {message.text}
          </div>
        )}

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
    </div>
  );
}
