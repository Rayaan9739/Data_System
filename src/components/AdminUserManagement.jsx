import { useState } from "react";
import DataTable from "./DataTable";
import Modal from "./Modal";

export default function AdminUserManagement({ onBack }) {
  const [users, setUsers] = useState([]);
  const [collegeCode, setCollegeCode] = useState("");
  const [password, setPassword] = useState("");
  const [modal, setModal] = useState(null); // {type, index}

  const addUser = () => {
    if (!collegeCode) return alert("Enter College Code!");
    if (!password) return alert("Enter Password!");
    setUsers([...users, { code: collegeCode, password }]);
    setCollegeCode("");
    setPassword("");
  };

  const deleteUser = (index) => {
    setModal({ type: "delete-user", index });
  };

  const confirmDelete = (index) => {
    setUsers(users.filter((_, i) => i !== index));
    setModal(null);
  };

  const resetPassword = (index) => {
    const newPass = prompt("Enter new password:");
    if (newPass) {
      const updated = [...users];
      updated[index].password = newPass;
      setUsers(updated);
    }
  };

  const editUser = (index) => {
    const newCode = prompt("Enter new College Code:", users[index].code);
    if (newCode) {
      const updated = [...users];
      updated[index].code = newCode;
      setUsers(updated);
    }
  };

  return (
    <div className="form-box">
      <h3>Admin User Management</h3>
      <input
        type="text"
        placeholder="College Code"
        value={collegeCode}
        onChange={(e) => setCollegeCode(e.target.value)}
      />
      <input
        type="password"
        placeholder="Set Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className="form-actions">
        <button onClick={addUser} className="btn-green">
          Add User
        </button>
        <button onClick={onBack} className="btn-gray">
          Back
        </button>
      </div>
      <DataTable
        data={users}
        columns={["code", "password"]}
        onDelete={deleteUser}
        onEdit={editUser}
        onReset={resetPassword}
      />

      {modal && modal.type === "delete-user" && (
        <Modal
          title="Confirm Delete"
          message="Are you sure you want to delete this user?"
          onConfirm={() => confirmDelete(modal.index)}
          onCancel={() => setModal(null)}
        />
      )}
    </div>
  );
}
