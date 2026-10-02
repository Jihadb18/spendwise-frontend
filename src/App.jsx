import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import DashboardLayout from "./layouts/DashboardLayout";
import Expenses from "./pages/Expenses";
import Income from "./pages/Income";
import Budgets from "./pages/Budgets";
import Subscriptions from "./pages/Subscriptions";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

   <Route element={<ProtectedRoute />}>
  <Route element={<DashboardLayout />}>
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/expenses" element={<Expenses />} />
    <Route path="/income" element={<Income />} />
    <Route path="/budgets" element={<Budgets />} />
    <Route path="/subscriptions" element={<Subscriptions />} />
    <Route path="/profile" element={<Profile />} />
  </Route>
</Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;