import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import UserPage from "./Pages/UserPage";
import RolesPage from "./Pages/RolesPage";
import PermissionsPage from "./Pages/PermissionPage";
import Dashboard from "./Pages/DashBoard";
import Navbar from "./Components/NavBar";
function App() {
  return (
    <Router>
      <Navbar />
      <div className="p-4">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/users" element={<UserPage />} />
          <Route path="/roles" element={<RolesPage />} />
          <Route path="/permissions" element={<PermissionsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
