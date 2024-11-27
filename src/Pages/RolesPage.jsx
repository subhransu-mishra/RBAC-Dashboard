import React, { useState } from "react";
import AddRoleModal from "../Components/AddRoleModal";
import AssignPermissionModal from "../Components/AssignPermissionModal";

const RolesPage = () => {
  // State for roles list
  const [roles, setRoles] = useState([
    { id: 1, name: "Admin" },
    { id: 2, name: "Editor" },
  ]);

  // State for modals
  const [isAddRoleModalOpen, setIsAddRoleModalOpen] = useState(false);
  const [isAssignPermissionModalOpen, setIsAssignPermissionModalOpen] =
    useState(false);
  const [selectedRole, setSelectedRole] = useState(null);

  // Handle adding a new role
  const handleAddRole = (newRole) => {
    if (!newRole || !newRole.name) {
      alert("Role name cannot be empty!");
      return;
    }
    // Generate a new ID and add the role to the list
    setRoles((prevRoles) => [
      ...prevRoles,
      { id: prevRoles.length + 1, name: newRole.name },
    ]);
    setIsAddRoleModalOpen(false);
  };

  // Handle assigning permissions
  const handleAssignPermissions = (roleId, permissions) => {
    console.log("Assigned Permissions:", { roleId, permissions });
    setIsAssignPermissionModalOpen(false);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold mb-6 text-center">Roles Management</h1>

      {/* Add Role Button */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setIsAddRoleModalOpen(true)}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
        >
          Add Role
        </button>
      </div>

      {/* Roles List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {roles.length > 0 ? (
          roles.map((role) => (
            <div
              key={role.id}
              className="bg-white p-6 rounded-lg shadow-lg flex justify-between items-center border border-gray-200 hover:shadow-xl transition duration-300"
            >
              <div>
                <h3 className="text-xl font-semibold">{role.name}</h3>
              </div>
              <button
                onClick={() => {
                  setSelectedRole(role);
                  setIsAssignPermissionModalOpen(true);
                }}
                className="ml-4 px-4 py-2 bg-green-500 text-white rounded-lg shadow-sm hover:bg-green-600 transition duration-300"
              >
                Assign Permissions
              </button>
            </div>
          ))
        ) : (
          <p className="text-center w-full col-span-full text-gray-500">No roles available. Add a new role to get started.</p>
        )}
      </div>

      {/* Add Role Modal */}
      <AddRoleModal
        isOpen={isAddRoleModalOpen}
        onClose={() => setIsAddRoleModalOpen(false)}
        onAddRole={handleAddRole}
      />

      {/* Assign Permissions Modal */}
      <AssignPermissionModal
        isOpen={isAssignPermissionModalOpen}
        onClose={() => setIsAssignPermissionModalOpen(false)}
        role={selectedRole}
        onAssignPermissions={handleAssignPermissions}
      />
    </div>
  );
};

export default RolesPage;
