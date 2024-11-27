import React, { useState } from "react";

const AssignPermissionModal = ({ isOpen, onClose, role, onAssignPermissions }) => {
  const [selectedPermissions, setSelectedPermissions] = useState([]);

  const allPermissions = ["Read", "Write", "Delete", "Update"]; // Example permissions

  const handleTogglePermission = (permission) => {
    if (selectedPermissions.includes(permission)) {
      setSelectedPermissions(selectedPermissions.filter((p) => p !== permission));
    } else {
      setSelectedPermissions([...selectedPermissions, permission]);
    }
  };

  const handleAssignPermissions = () => {
    onAssignPermissions(role.id, selectedPermissions); // Pass updated permissions to parent
    onClose(); // Close modal
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h2 className="text-xl font-semibold mb-4">Assign Permissions</h2>
        <p className="text-sm mb-4">Assign permissions to role: <strong>{role.name}</strong></p>
        <div>
          {allPermissions.map((permission) => (
            <div key={permission} className="flex items-center mb-2">
              <input
                type="checkbox"
                className="mr-2"
                checked={selectedPermissions.includes(permission)}
                onChange={() => handleTogglePermission(permission)}
              />
              <label>{permission}</label>
            </div>
          ))}
        </div>
        <div className="flex justify-end space-x-4 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleAssignPermissions}
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            Assign
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssignPermissionModal;
