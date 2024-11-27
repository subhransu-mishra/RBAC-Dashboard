import React, { useState, useEffect } from "react";

const PermissionsPage = () => {
  const [permissions, setPermissions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentPermission, setCurrentPermission] = useState(null);
  const [formData, setFormData] = useState({ name: "" });

  // Fetch Permissions
  useEffect(() => {
    const fetchPermissions = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:5000/permissions");
        if (!response.ok) throw new Error("Failed to fetch permissions");
        const data = await response.json();
        setPermissions(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPermissions();
  }, []);

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle Add or Update Permission
  const handleSave = async () => {
    const method = currentPermission ? "PUT" : "POST";
    const url = currentPermission
      ? `http://localhost:5000/permissions/${currentPermission.id}`
      : "http://localhost:5000/permissions";

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to save permission");

      const savedPermission = await response.json();

      if (currentPermission) {
        setPermissions((prev) =>
          prev.map((perm) =>
            perm.id === currentPermission.id ? savedPermission : perm
          )
        );
      } else {
        setPermissions((prev) => [...prev, savedPermission]);
      }

      setModalOpen(false);
      setFormData({ name: "" });
      setCurrentPermission(null);
    } catch (error) {
      setError(error.message);
    }
  };

  // Handle Delete Permission
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/permissions/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete permission");

      setPermissions((prev) => prev.filter((perm) => perm.id !== id));
    } catch (error) {
      setError(error.message);
    }
  };

  // Open Modal for Add or Edit
  const openModal = (permission = null) => {
    setCurrentPermission(permission);
    setFormData(permission ? permission : { name: "" });
    setModalOpen(true);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Permission Management</h1>

      {loading && <p>Loading permissions...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <button
        onClick={() => openModal()}
        className="mb-4 bg-blue-500 text-white py-2 px-4 rounded"
      >
        Add Permission
      </button>

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Permission Name</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {permissions.map((perm) => (
            <tr key={perm.id}>
              <td className="border border-gray-300 px-4 py-2">{perm.name}</td>
              <td className="border border-gray-300 px-4 py-2">
                <button
                  onClick={() => openModal(perm)}
                  className="mr-2 bg-yellow-500 text-white py-1 px-3 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(perm.id)}
                  className="bg-red-500 text-white py-1 px-3 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-xl font-bold mb-4">
              {currentPermission ? "Edit Permission" : "Add Permission"}
            </h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Permission Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="border w-full px-3 py-2 rounded"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="mr-2 bg-gray-500 text-white py-2 px-4 rounded"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  className="bg-blue-500 text-white py-2 px-4 rounded"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PermissionsPage;
