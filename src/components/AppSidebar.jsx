
import { NavLink, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  LayoutDashboard,
  Receipt,
  CircleDollarSign,
  Target,
  RefreshCw,
  UserRound,
  Wallet,
  ChartNoAxesCombined,
  LogOut,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";

import { Button } from "@/components/ui/button";

const navigationItems = [
  {
    titleKey: "navigation.dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    titleKey: "navigation.expenses",
    url: "/expenses",
    icon: Receipt,
  },
  {
    titleKey: "navigation.income",
    url: "/income",
    icon: CircleDollarSign,
  },
  {
    titleKey: "navigation.budgets",
    url: "/budgets",
    icon: Target,
  },
  {
    titleKey: "navigation.subscriptions",
    url: "/subscriptions",
    icon: RefreshCw,
  },
];

export default function AppSidebar({ onLogout, side = "left" }) {
  const { t } = useTranslation();
  const location = useLocation();

  const isActive = (url) =>
    location.pathname === url ||
    location.pathname.startsWith(`${url}/`);

  return (
    <Sidebar side={side} collapsible="icon" variant="inset">
      <SidebarHeader className="p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              render={<NavLink to="/dashboard" />}
              tooltip="SpendWise"
              className="h-12 gap-3"
            >
              <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-emerald-600 text-white">
                <ChartNoAxesCombined className="size-5" />
              </span>

              <span className="text-base font-bold tracking-tight">
                SpendWise
              </span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="px-2">
        <SidebarGroup>
          <SidebarGroupLabel>
            {t("navigation.overview", "Overview")}
          </SidebarGroupLabel>

          <SidebarMenu>
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.url);

              return (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton
                    render={<NavLink to={item.url} />}
                    isActive={active}
                    tooltip={t(item.titleKey)}
                    className={
                      active
                        ? "bg-emerald-50 font-medium text-emerald-700 hover:bg-emerald-50 hover:text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 dark:hover:bg-emerald-950/40"
                        : "text-muted-foreground"
                    }
                  >
                    <Icon className="size-4 shrink-0" />
                    <span>{t(item.titleKey)}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup className="mt-auto">
          <SidebarGroupLabel>
            {t("navigation.account", "Account")}
          </SidebarGroupLabel>

          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                render={<NavLink to="/profile" />}
                isActive={isActive("/profile")}
                tooltip={t("navigation.profile")}
              >
                <UserRound className="size-4" />
                <span>{t("navigation.profile")}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t p-3">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={onLogout}
              tooltip={t("navigation.logout")}
              className="text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
            >
              <LogOut className="size-4" />
              <span>{t("navigation.logout")}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>

        <div className="flex items-center gap-3 rounded-lg bg-muted/50 p-3 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:p-1">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-sm font-bold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400">
            SW
          </div>

          <div className="min-w-0 group-data-[collapsible=icon]:hidden">
            <p className="truncate text-sm font-semibold">SpendWise</p>
            <p className="truncate text-xs text-muted-foreground">
              Personal Finance
            </p>
          </div>
        </div>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
