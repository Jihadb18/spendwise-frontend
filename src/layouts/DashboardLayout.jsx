
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  LogOut,
  Wallet,
  Receipt,
  CircleDollarSign,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

function DashboardLayout() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
      isActive
        ? "bg-primary text-primary-foreground"
        : "text-muted-foreground hover:bg-muted hover:text-foreground"
    }`;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 hidden w-64 border-r bg-white lg:flex lg:flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center gap-2 border-b px-6">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-900">
            <Wallet className="h-5 w-5 text-white" />
          </div>

          <span className="text-xl font-bold tracking-tight">
            SpendWise
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2 p-4">
          <NavLink
            to="/dashboard"
            className={navLinkClass}
          >
            <LayoutDashboard className="h-4 w-4" />
            Dashboard
          </NavLink>

          <NavLink
            to="/expenses"
            className={navLinkClass}
          >
            <Receipt className="h-4 w-4" />
            Expenses
          </NavLink>
          <NavLink
  to="/income"
  className={navLinkClass}
>
  <CircleDollarSign className="h-4 w-4" />
  Income
</NavLink>
        </nav>

        {/* Logout */}
        <div className="border-t p-4">
          <Button
            variant="ghost"
            className="w-full justify-start gap-3"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main */}
      <div className="lg:pl-64">
        <header className="flex h-16 items-center border-b bg-white px-6">
          <div>
            <h1 className="text-lg font-semibold">
              SpendWise
            </h1>

            <p className="text-xs text-muted-foreground">
              Overview of your finances
            </p>
          </div>
        </header>

        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
