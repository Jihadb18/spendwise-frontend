
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
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";

import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import ThemeToggle from "@/components/ThemeToggle";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const navigationItems = [
  {
    to: "/dashboard",
    label: "navigation.dashboard",
    icon: LayoutDashboard,
  },
  {
    to: "/expenses",
    label: "navigation.expenses",
    icon: Receipt,
  },
  {
    to: "/income",
    label: "navigation.income",
    icon: CircleDollarSign,
  },
  {
    to: "/budgets",
    label: "navigation.budgets",
    icon: Target,
  },
  {
    to: "/subscriptions",
    label: "navigation.subscriptions",
    icon: RefreshCw,
  },
  {
    to: "/profile",
    label: "navigation.profile",
    icon: User,
  },
];

function DashboardLayout() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { t, i18n } = useTranslation();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const isArabic = i18n.language.startsWith("ar");

  useEffect(() => {
    document.documentElement.dir = isArabic ? "rtl" : "ltr";
    document.documentElement.lang = i18n.language;
  }, [i18n.language, isArabic]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setSidebarCollapsed(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
      isActive
        ? "bg-primary text-primary-foreground"
        : "text-muted-foreground hover:bg-muted hover:text-foreground"
    } ${
      sidebarCollapsed
        ? "justify-center px-2"
        : ""
    }`;

  const renderNavigation = (mobile = false) =>
    navigationItems.map((item) => {
      const Icon = item.icon;

      return (
        <NavLink
          key={item.to}
          to={item.to}
          title={sidebarCollapsed && !mobile ? t(item.label) : undefined}
          className={navLinkClass}
          onClick={mobile ? closeMobileMenu : undefined}
        >
          <Icon className="h-4 w-4 shrink-0" />

          {(!sidebarCollapsed || mobile) && (
            <span className="truncate">{t(item.label)}</span>
          )}
        </NavLink>
      );
    });

  const sidebarWidth = sidebarCollapsed ? "lg:w-20" : "lg:w-64";
  const mainOffset = sidebarCollapsed ? "lg:ms-20" : "lg:ms-64";

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Desktop Sidebar */}
      <aside
        className={`fixed inset-y-0 z-30 hidden bg-sidebar transition-[width] duration-300 lg:flex lg:flex-col ${sidebarWidth} ${
          isArabic ? "right-0 border-l" : "left-0 border-r"
        }`}
      >
        {/* Logo */}
        <div
          className={`flex h-16 shrink-0 items-center border-b ${
            sidebarCollapsed ? "justify-center px-2" : "gap-2 px-6"
          }`}
        >
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary">
            <Wallet className="h-5 w-5 text-primary-foreground" />
          </div>

          {!sidebarCollapsed && (
            <span className="text-xl font-bold tracking-tight">
              SpendWise
            </span>
          )}
        </div>

        {/* Collapse Button */}
        <div
          className={`flex shrink-0 py-3 ${
            sidebarCollapsed ? "justify-center px-2" : "justify-end px-3"
          }`}
        >
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarCollapsed((prev) => !prev)}
            title={
              sidebarCollapsed
                ? t("navigation.expandSidebar", "Expand sidebar")
                : t("navigation.collapseSidebar", "Collapse sidebar")
            }
            aria-label={
              sidebarCollapsed
                ? t("navigation.expandSidebar", "Expand sidebar")
                : t("navigation.collapseSidebar", "Collapse sidebar")
            }
          >
            {sidebarCollapsed ? (
              isArabic ? (
                <PanelLeftOpen className="h-4 w-4" />
              ) : (
                <PanelLeftOpen className="h-4 w-4" />
              )
            ) : (
              <PanelLeftClose className="h-4 w-4" />
            )}
          </Button>
        </div>

        {/* Navigation */}
        <nav
          className={`flex-1 space-y-2 overflow-y-auto py-2 ${
            sidebarCollapsed ? "px-2" : "px-4"
          }`}
        >
          {renderNavigation()}
        </nav>

        {/* Logout */}
        <div
          className={`shrink-0 border-t py-4 ${
            sidebarCollapsed ? "px-2" : "px-4"
          }`}
        >
          <Button
            variant="ghost"
            title={sidebarCollapsed ? t("navigation.logout") : undefined}
            className={`w-full gap-3 ${
              sidebarCollapsed ? "justify-center px-2" : "justify-start"
            }`}
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4 shrink-0" />

            {!sidebarCollapsed && t("navigation.logout")}
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
                mobileMenuOpen ? "translate-x-0" : "translate-x-full"
              }`
            : `left-0 border-r ${
                mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
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
        <nav className="space-y-2 overflow-y-auto p-4">
          {renderNavigation(true)}
        </nav>

        {/* Mobile Logout */}
        <div className="absolute bottom-0 w-full border-t bg-sidebar p-4">
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
  className={`min-h-screen transition-[margin] duration-300 ${
    isArabic
      ? sidebarCollapsed
        ? "lg:mr-20"
        : "lg:mr-64"
      : sidebarCollapsed
        ? "lg:ml-20"
        : "lg:ml-64"
  }`}
>
        {/* Header */}
        <header className="sticky top-0 z-20 flex h-16 items-center border-b bg-background px-4 sm:px-6">
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className={isArabic ? "ml-3 lg:hidden" : "mr-3 lg:hidden"}
            onClick={() => setMobileMenuOpen(true)}
            aria-label={t("navigation.dashboard")}
          >
            <Menu className="h-5 w-5" />
          </Button>

          {/* Desktop Sidebar Toggle */}
          

          {/* Header Title */}
          <div className="min-w-0 flex-1">
            <h1 className="text-lg font-semibold">SpendWise</h1>

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
