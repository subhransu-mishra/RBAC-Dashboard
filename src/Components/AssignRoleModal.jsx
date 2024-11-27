import React, { useState } from "react";

const AssignRoleModal = ({ isOpen, onClose, user, roles, onAssignRole }) => {
  const [selectedRole, setSelectedRole] = useState("");

  const handleAssignRole = () => {
    if (!selectedRole) return;
    onAssignRole(user.id, selectedRole); // Pass the role assignment to the parent component
    onClose(); // Close the modal
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h2 className="text-xl font-semibold mb-4">Assign Role to {user.name}</h2>
        <select
          className="w-full p-2 border rounded mb-4"
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
        >
          <option value="" disabled>Select a role</option>
          {roles.map((role) => (
            <option key={role.id} value={role.name}>
              {role.name}
            </option>
          ))}
        </select>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleAssignRole}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Assign Role
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssignRoleModal;
