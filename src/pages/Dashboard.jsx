
import { useEffect, useState } from "react";
import { ArrowDownRight, ArrowUpRight, Wallet } from "lucide-react";
import { useTranslation } from "react-i18next";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import api from "@/services/api";

function Dashboard() {
  const { t } = useTranslation();

  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await api.get("/dashboard");

        setDashboard(response.data);
      } catch (error) {
        console.error("Dashboard error:", error);

        setError("Unable to load your dashboard.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  // Loading state
  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-sm text-muted-foreground">
          {t("common.loading")}
        </p>
      </div>
    );
  }

  // Prepare category data for the chart
  const categoryData = dashboard
    ? Object.entries(dashboard.spendingByCategory || {}).map(
        ([name, value]) => ({
          name,
          value,
        })
      )
    : [];

  // Error state
  if (error) {
    return (
      <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-6">
        <p className="text-sm text-destructive">
          {error}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight">
          {t("dashboard.title")}
        </h2>

        <p className="text-sm text-muted-foreground">
          {t("dashboard.overview")}
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">

        {/* Balance */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              {t("dashboard.balance")}
            </CardTitle>

            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>

          <CardContent>
            <div className="text-2xl font-bold">
              {dashboard.balance.toFixed(2)} MAD
            </div>

            <p className="mt-1 text-xs text-muted-foreground">
              {t("dashboard.currentBalance")}
            </p>
          </CardContent>
        </Card>

        {/* Income */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              {t("dashboard.income")}
            </CardTitle>

            <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
          </CardHeader>

          <CardContent>
            <div className="text-2xl font-bold">
              {dashboard.currentMonthIncome.toFixed(2)} MAD
            </div>

            <p className="mt-1 text-xs text-muted-foreground">
              {t("dashboard.thisMonth")}
            </p>

            <div className="mt-2 flex items-center gap-1 text-xs">
              {dashboard.expenseChangePercentage > 0 ? (
                <span className="font-medium text-red-600">
                  +{dashboard.expenseChangePercentage.toFixed(1)}%
                </span>
              ) : dashboard.expenseChangePercentage < 0 ? (
                <span className="font-medium text-green-600">
                  {dashboard.expenseChangePercentage.toFixed(1)}%
                </span>
              ) : (
                <span className="font-medium text-muted-foreground">
                  0%
                </span>
              )}

              <span className="text-muted-foreground">
                {t("dashboard.vsPreviousMonth")}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Expenses */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              {t("dashboard.expenses")}
            </CardTitle>

            <ArrowDownRight className="h-4 w-4 text-muted-foreground" />
          </CardHeader>

          <CardContent>
            <div className="text-2xl font-bold">
              {dashboard.currentMonthExpenses.toFixed(2)} MAD
            </div>

            <p className="mt-1 text-xs text-muted-foreground">
              {t("dashboard.thisMonth")}
            </p>
          </CardContent>
        </Card>

        {/* Subscriptions */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              {t("dashboard.subscriptions")}
            </CardTitle>
          </CardHeader>

          <CardContent>
            <div className="text-2xl font-bold">
              {dashboard.monthlySubscriptionCost.toFixed(2)} MAD
            </div>

            <p className="mt-1 text-xs text-muted-foreground">
              {t("dashboard.monthlyCost")}
            </p>
          </CardContent>
        </Card>

      </div>

      {/* Bottom section */}
      <div className="grid gap-6 lg:grid-cols-2">

        {/* Spending by category */}
        <Card>
          <CardHeader>
            <CardTitle>
              {t("dashboard.spendingByCategory")}
            </CardTitle>
          </CardHeader>

          <CardContent>
            {categoryData.length === 0 ? (
              <div className="flex h-[280px] items-center justify-center">
                <p className="text-sm text-muted-foreground">
                  {t("dashboard.noExpensesThisMonth")}
                </p>
              </div>
            ) : (
              <div className="h-[280px]">
                <ResponsiveContainer
                  width="100%"
                  height="100%"
                >
                  <PieChart>
                    <Pie
                      data={categoryData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={65}
                      outerRadius={95}
                      paddingAngle={3}
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} />
                      ))}
                    </Pie>

                    <Tooltip
                      formatter={(value) => [
                        `${Number(value).toFixed(2)} MAD`,
                        t("dashboard.spent"),
                      ]}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Upcoming subscriptions */}
        <Card>
          <CardHeader>
            <CardTitle>
              {t("dashboard.upcomingSubscriptions")}
            </CardTitle>
          </CardHeader>

          <CardContent>
            {dashboard.upcomingSubscriptions.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                {t("dashboard.noUpcomingSubscriptions")}
              </p>
            ) : (
              <div className="space-y-4">
                {dashboard.upcomingSubscriptions.map(
                  (subscription) => (
                    <div
                      key={subscription.id}
                      className="flex items-center justify-between"
                    >
                      <div>
                        <p className="text-sm font-medium">
                          {subscription.name}
                        </p>

                        <p className="text-xs text-muted-foreground">
                          {subscription.nextPaymentDate}
                        </p>
                      </div>

                      <span className="text-sm font-semibold">
                        {subscription.amount.toFixed(2)} MAD
                      </span>
                    </div>
                  )
                )}
              </div>
            )}
          </CardContent>
        </Card>

      </div>

      {/* Budget Overview */}
      <Card>
        <CardHeader>
          <CardTitle>
            {t("dashboard.budgetOverview")}
          </CardTitle>
        </CardHeader>

        <CardContent>
          {dashboard.budgets.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              {t("dashboard.noBudgets")}
            </p>
          ) : (
            <div className="space-y-6">
              {dashboard.budgets.map((budget) => (
                <div
                  key={budget.category}
                  className="space-y-2"
                >

                  {/* Category + Status */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">
                        {budget.category}
                      </p>

                      <p className="text-xs text-muted-foreground">
                        {budget.spent.toFixed(2)} MAD{" "}
                        {t("dashboard.spentOf")}{" "}
                        {budget.budget.toFixed(2)} MAD
                      </p>
                    </div>

                    <span className="text-sm font-medium">
                      {budget.percentageUsed.toFixed(0)}%
                    </span>
                  </div>

                  {/* Progress */}
                  <Progress
                    value={Math.min(
                      budget.percentageUsed,
                      100
                    )}
                  />

                  {/* Remaining */}
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>
                      {t("dashboard.remaining")}:{" "}
                      {budget.remaining.toFixed(2)} MAD
                    </span>

                    <span>
                      {budget.status}
                    </span>
                  </div>

                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

    </div>
  );
}

export default Dashboard;
