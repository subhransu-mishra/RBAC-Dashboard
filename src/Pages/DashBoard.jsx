import React from "react";

const Dashboard = () => {
  const stats = {
    totalUsers: 10,
    totalRoles: 3,
    totalPermissions: 5,
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Header Section */}
      <header className="mb-10">
        <h1 className="text-4xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-600 mt-2">Overview of system statistics</p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1 */}
        <div className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition duration-300">
          <h2 className="text-xl font-semibold text-blue-500">Total Users</h2>
          <p className="text-3xl font-bold text-gray-800 mt-4">{stats.totalUsers}</p>
          <p className="text-gray-500 mt-2">Active users in the system</p>
        </div>

        {/* Card 2 */}
        <div className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition duration-300">
          <h2 className="text-xl font-semibold text-green-500">Total Roles</h2>
          <p className="text-3xl font-bold text-gray-800 mt-4">{stats.totalRoles}</p>
          <p className="text-gray-500 mt-2">Defined roles in the system</p>
        </div>

        {/* Card 3 */}
        <div className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition duration-300">
          <h2 className="text-xl font-semibold text-purple-500">Total Permissions</h2>
          <p className="text-3xl font-bold text-gray-800 mt-4">{stats.totalPermissions}</p>
          <p className="text-gray-500 mt-2">Permissions allocated</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
