import React, { useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";  // Import icons

const RolesPage = () => {
  // State for users list
  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", role: "Admin" },
    { id: 2, name: "Jane Smith", role: "Editor" },
  ]);

  // State for adding/updating user
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentUser, setCurrentUser] = useState({ id: null, name: "", role: "" });

  // Open Add User Modal
  const openAddUserModal = () => {
    setCurrentUser({ id: null, name: "", role: "" }); // Reset fields
    setIsEditing(false);
    setIsUserModalOpen(true);
  };

  // Open Edit User Modal
  const openEditUserModal = (user) => {
    setCurrentUser(user); // Set the user to edit
    setIsEditing(true);
    setIsUserModalOpen(true);
  };

  // Handle Save User (for both add and edit)
  const handleSaveUser = () => {
    if (!currentUser.name || !currentUser.role) {
      alert("User name and role are required!");
      return;
    }

    if (isEditing) {
      // Update existing user
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === currentUser.id ? { ...user, ...currentUser } : user
        )
      );
    } else {
      // Add new user
      setUsers((prevUsers) => [
        ...prevUsers,
        { id: prevUsers.length + 1, ...currentUser },
      ]);
    }

    setIsUserModalOpen(false); // Close modal
  };

  // Handle Delete User
  const handleDeleteUser = (userId) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold mb-6 text-center">User Management</h1>

      {/* Add User Button */}
      <div className="flex justify-end mb-4">
        <button
          onClick={openAddUserModal}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
        >
          Add User
        </button>
      </div>

      {/* Users List */}
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.length > 0 ? (
          users.map((user) => (
            <li
              key={user.id}
              className="bg-white p-4 rounded-lg shadow-lg border border-gray-200 flex justify-between items-center transition-all duration-300 hover:shadow-xl"
            >
              <div>
                <h3 className="text-lg font-semibold">{user.name}</h3>
                <p className="text-sm text-gray-600">{user.role}</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => openEditUserModal(user)}
                  className="px-4 py-2 bg-yellow-500 text-white rounded-lg shadow-sm hover:bg-yellow-600 transition duration-300"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDeleteUser(user.id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg shadow-sm hover:bg-red-600 transition duration-300"
                >
                  <FaTrashAlt />
                </button>
              </div>
            </li>
          ))
        ) : (
          <p className="text-gray-500 text-center w-full col-span-full">No users available. Add a new user to get started.</p>
        )}
      </ul>

      {/* User Modal */}
      {isUserModalOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4 text-center">
              {isEditing ? "Update User" : "Add User"}
            </h2>

            {/* User Name Input */}
            <div className="mb-4">
              <label className="block font-medium mb-1">Name</label>
              <input
                type="text"
                value={currentUser.name}
                onChange={(e) =>
                  setCurrentUser({ ...currentUser, name: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* User Role Input */}
            <div className="mb-4">
              <label className="block font-medium mb-1">Role</label>
              <input
                type="text"
                value={currentUser.role}
                onChange={(e) =>
                  setCurrentUser({ ...currentUser, role: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Modal Actions */}
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsUserModalOpen(false)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition duration-300"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveUser}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RolesPage;
