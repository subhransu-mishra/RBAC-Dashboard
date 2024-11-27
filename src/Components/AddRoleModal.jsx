import React, { useState } from "react";

const AddRoleModal = ({ isOpen, onClose, onAddRole }) => {
  const [roleName, setRoleName] = useState("");
  const [description, setDescription] = useState("");

  const handleAddRole = () => {
    const newRole = {
      name: roleName,
      description,
    };
    onAddRole(newRole); // Pass the new role to the parent component
    onClose(); // Close the modal
  };

  if (!isOpen) return null; // Do not render if modal is closed

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h2 className="text-xl font-semibold mb-4">Add New Role</h2>
        <div>
          <label className="block text-sm font-medium mb-2">Role Name</label>
          <input
            type="text"
            className="w-full p-2 border rounded mb-4"
            value={roleName}
            onChange={(e) => setRoleName(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Description</label>
          <textarea
            className="w-full p-2 border rounded mb-4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleAddRole}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Add Role
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddRoleModal;
