
import { useEffect, useState } from "react";
import {
  NavLink,
  Outlet,
  useNavigate,
} from "react-router-dom";

import {
  LayoutDashboard,
  LogOut,
  Wallet,
  Receipt,
  CircleDollarSign,
  Target,
  RefreshCw,
  User,
  Menu,
  X,
} from "lucide-react";

import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import ThemeToggle from "@/components/ThemeToggle";
import LanguageSwitcher from "@/components/LanguageSwitcher";

function DashboardLayout() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { t, i18n } = useTranslation();

  const [mobileMenuOpen, setMobileMenuOpen] =
    useState(false);

  const isArabic = i18n.language === "ar";

  useEffect(() => {
    const direction = isArabic
      ? "rtl"
      : "ltr";

    document.documentElement.dir = direction;
    document.documentElement.lang =
      i18n.language;
  }, [i18n.language, isArabic]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
      isActive
        ? "bg-primary text-primary-foreground"
        : "text-muted-foreground hover:bg-muted hover:text-foreground"
    }`;

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Desktop Sidebar */}
      <aside
        className={`fixed inset-y-0 hidden w-64 bg-sidebar lg:flex lg:flex-col ${
          isArabic
            ? "right-0 border-l"
            : "left-0 border-r"
        }`}
      >
        {/* Logo */}
        <div className="flex h-16 items-center gap-2 border-b px-6">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <Wallet className="h-5 w-5 text-primary-foreground" />
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
            {t("navigation.dashboard")}
          </NavLink>

          <NavLink
            to="/expenses"
            className={navLinkClass}
          >
            <Receipt className="h-4 w-4" />
            {t("navigation.expenses")}
          </NavLink>

          <NavLink
            to="/income"
            className={navLinkClass}
          >
            <CircleDollarSign className="h-4 w-4" />
            {t("navigation.income")}
          </NavLink>

          <NavLink
            to="/budgets"
            className={navLinkClass}
          >
            <Target className="h-4 w-4" />
            {t("navigation.budgets")}
          </NavLink>

          <NavLink
            to="/subscriptions"
            className={navLinkClass}
          >
            <RefreshCw className="h-4 w-4" />
            {t("navigation.subscriptions")}
          </NavLink>

          <NavLink
            to="/profile"
            className={navLinkClass}
          >
            <User className="h-4 w-4" />
            {t("navigation.profile")}
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
            {t("navigation.logout")}
          </Button>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={closeMobileMenu}
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={`fixed inset-y-0 z-50 w-64 bg-sidebar transition-transform duration-300 lg:hidden ${
          isArabic
            ? `right-0 border-l ${
                mobileMenuOpen
                  ? "translate-x-0"
                  : "translate-x-full"
              }`
            : `left-0 border-r ${
                mobileMenuOpen
                  ? "translate-x-0"
                  : "-translate-x-full"
              }`
        }`}
      >
        {/* Mobile Logo */}
        <div className="flex h-16 items-center justify-between border-b px-4">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <Wallet className="h-5 w-5 text-primary-foreground" />
            </div>

            <span className="text-xl font-bold tracking-tight">
              SpendWise
            </span>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={closeMobileMenu}
            aria-label={t("common.close")}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Mobile Navigation */}
        <nav className="space-y-2 p-4">
          <NavLink
            to="/dashboard"
            className={navLinkClass}
            onClick={closeMobileMenu}
          >
            <LayoutDashboard className="h-4 w-4" />
            {t("navigation.dashboard")}
          </NavLink>

          <NavLink
            to="/expenses"
            className={navLinkClass}
            onClick={closeMobileMenu}
          >
            <Receipt className="h-4 w-4" />
            {t("navigation.expenses")}
          </NavLink>

          <NavLink
            to="/income"
            className={navLinkClass}
            onClick={closeMobileMenu}
          >
            <CircleDollarSign className="h-4 w-4" />
            {t("navigation.income")}
          </NavLink>

          <NavLink
            to="/budgets"
            className={navLinkClass}
            onClick={closeMobileMenu}
          >
            <Target className="h-4 w-4" />
            {t("navigation.budgets")}
          </NavLink>

          <NavLink
            to="/subscriptions"
            className={navLinkClass}
            onClick={closeMobileMenu}
          >
            <RefreshCw className="h-4 w-4" />
            {t("navigation.subscriptions")}
          </NavLink>

          <NavLink
            to="/profile"
            className={navLinkClass}
            onClick={closeMobileMenu}
          >
            <User className="h-4 w-4" />
            {t("navigation.profile")}
          </NavLink>
        </nav>

        {/* Mobile Logout */}
        <div className="absolute bottom-0 w-full border-t p-4">
          <Button
            variant="ghost"
            className="w-full justify-start gap-3"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4" />
            {t("navigation.logout")}
          </Button>
        </div>
      </aside>

      {/* Main */}
      <div
        className={
          isArabic
            ? "lg:pr-64"
            : "lg:pl-64"
        }
      >
        {/* Header */}
        <header className="flex h-16 items-center border-b bg-background px-4 sm:px-6">
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className={
              isArabic
                ? "ml-3 lg:hidden"
                : "mr-3 lg:hidden"
            }
            onClick={() =>
              setMobileMenuOpen(true)
            }
            aria-label={t("navigation.dashboard")}
          >
            <Menu className="h-5 w-5" />
          </Button>

          {/* Header Title */}
          <div className="flex-1">
            <h1 className="text-lg font-semibold">
              SpendWise
            </h1>

            <p className="text-xs text-muted-foreground">
              {t("dashboard.overview")}
            </p>
          </div>

          {/* Header Actions */}
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
