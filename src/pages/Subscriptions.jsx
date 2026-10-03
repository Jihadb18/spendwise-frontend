
import { useEffect, useState } from "react";
import {
  CalendarDays,
  Pencil,
  Plus,
  RefreshCw,
  Trash2,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

import api from "@/services/api";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

function Subscriptions() {
  const { t, i18n } = useTranslation();

  const [subscriptions, setSubscriptions] = useState([]);
  const [upcomingSubscriptions, setUpcomingSubscriptions] =
    useState([]);
  const [monthlyCost, setMonthlyCost] = useState(0);

  const [editingSubscription, setEditingSubscription] =
    useState(null);

  const [deleteSubscriptionId, setDeleteSubscriptionId] =
    useState(null);

  const [deleting, setDeleting] = useState(false);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const subscriptionSchema = z.object({
    name: z
      .string()
      .min(2, t("subscription.validation.name")),

    amount: z
      .string()
      .min(1, t("subscription.validation.amountRequired"))
      .refine(
        (value) => Number(value) > 0,
        t("subscription.validation.amountPositive")
      ),

    nextPaymentDate: z
      .string()
      .min(1, t("subscription.validation.nextPaymentDate")),

    frequency: z.enum(
      ["MONTHLY", "YEARLY"],
      {
        message: t("subscription.validation.frequency"),
      }
    ),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(subscriptionSchema),
    defaultValues: {
      name: "",
      amount: "",
      nextPaymentDate: "",
      frequency: "MONTHLY",
    },
  });

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const fetchSubscriptions = async () => {
    try {
      setLoading(true);
      setError("");

      const subscriptionsResponse =
        await api.get("/subscriptions");

      const subscriptionsData =
        subscriptionsResponse.data;

      setSubscriptions(subscriptionsData);

      /*
       * We get the current user's ID from the dashboard.
       * This allows us to use the backend's dedicated
       * monthly-cost and upcoming-subscriptions endpoints.
       */
      const dashboardResponse =
        await api.get("/dashboard");

      const userId = dashboardResponse.data.userId;

      if (userId) {
        const [
          monthlyCostResponse,
          upcomingResponse,
        ] = await Promise.all([
          api.get(
            `/subscriptions/user/${userId}/monthly-cost`
          ),
          api.get(
            `/subscriptions/user/${userId}/upcoming`
          ),
        ]);

        setMonthlyCost(
          Number(monthlyCostResponse.data)
        );

        setUpcomingSubscriptions(
          upcomingResponse.data
        );
      }
    } catch (err) {
      console.error(err);

      const message = t(
        "subscription.errors.load"
      );

      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data) => {
    try {
      setError("");

      const payload = {
        name: data.name,
        amount: Number(data.amount),
        nextPaymentDate: data.nextPaymentDate,
        frequency: data.frequency,
      };

      if (editingSubscription) {
        const response = await api.put(
          `/subscriptions/${editingSubscription.id}`,
          payload
        );

        const updatedSubscription =
          response.data;

        setSubscriptions((current) =>
          current.map((subscription) =>
            subscription.id ===
            updatedSubscription.id
              ? updatedSubscription
              : subscription
          )
        );

        setEditingSubscription(null);

        toast.success(
          t("subscription.toast.updated")
        );
      } else {
        const response = await api.post(
          "/subscriptions",
          payload
        );

        setSubscriptions((current) => [
          ...current,
          response.data,
        ]);

        toast.success(
          t("subscription.toast.added")
        );
      }

      reset({
        name: "",
        amount: "",
        nextPaymentDate: "",
        frequency: "MONTHLY",
      });

      /*
       * Refresh monthly cost and upcoming subscriptions
       * after adding/editing a subscription.
       */
      await refreshSubscriptionStats();
    } catch (err) {
      console.error(err);

      const message = t(
        "subscription.errors.save"
      );

      setError(message);
      toast.error(message);
    }
  };

  const refreshSubscriptionStats = async () => {
    try {
      const dashboardResponse =
        await api.get("/dashboard");

      const userId =
        dashboardResponse.data.userId;

      if (!userId) {
        return;
      }

      const [
        monthlyCostResponse,
        upcomingResponse,
      ] = await Promise.all([
        api.get(
          `/subscriptions/user/${userId}/monthly-cost`
        ),
        api.get(
          `/subscriptions/user/${userId}/upcoming`
        ),
      ]);

      setMonthlyCost(
        Number(monthlyCostResponse.data)
      );

      setUpcomingSubscriptions(
        upcomingResponse.data
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (subscription) => {
    setEditingSubscription(subscription);

    reset({
      name: subscription.name,
      amount: String(subscription.amount),
      nextPaymentDate:
        subscription.nextPaymentDate,
      frequency: subscription.frequency,
    });
  };

  const openDeleteDialog = (id) => {
    setDeleteSubscriptionId(id);
  };

  const closeDeleteDialog = () => {
    if (!deleting) {
      setDeleteSubscriptionId(null);
    }
  };

  const handleDelete = async () => {
    if (!deleteSubscriptionId) {
      return;
    }

    try {
      setDeleting(true);
      setError("");

      await api.delete(
        `/subscriptions/${deleteSubscriptionId}`
      );

      setSubscriptions((current) =>
        current.filter(
          (subscription) =>
            subscription.id !==
            deleteSubscriptionId
        )
      );

      toast.success(
        t("subscription.toast.deleted")
      );

      setDeleteSubscriptionId(null);

      await refreshSubscriptionStats();
    } catch (err) {
      console.error(err);

      const message = t(
        "subscription.errors.delete"
      );

      setError(message);
      toast.error(message);
    } finally {
      setDeleting(false);
    }
  };

  const handleCancelEdit = () => {
    setEditingSubscription(null);

    reset({
      name: "",
      amount: "",
      nextPaymentDate: "",
      frequency: "MONTHLY",
    });
  };

  const formatDate = (date) => {
    const locale =
      i18n.language === "fr"
        ? "fr-FR"
        : i18n.language === "ar"
        ? "ar-MA"
        : "en-US";

    return new Date(date).toLocaleDateString(
      locale,
      {
        month: "short",
        day: "numeric",
        year: "numeric",
      }
    );
  };

  const getDaysUntilPayment = (date) => {
    const today = new Date();
    const paymentDate = new Date(date);

    today.setHours(0, 0, 0, 0);
    paymentDate.setHours(0, 0, 0, 0);

    const difference =
      paymentDate.getTime() -
      today.getTime();

    return Math.ceil(
      difference /
        (1000 * 60 * 60 * 24)
    );
  };

  const getPaymentText = (days) => {
    if (days === 0) {
      return t("subscription.today");
    }

    if (days === 1) {
      return t("subscription.tomorrow");
    }

    if (days > 1) {
      return t("subscription.inDays", {
        count: days,
      });
    }

    return t("subscription.overdue");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          {t("subscription.title")}
        </h1>

        <p className="text-sm text-muted-foreground">
          {t("subscription.subtitle")}
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100">
                <RefreshCw className="h-5 w-5" />
              </div>

              <div>
                <p className="text-sm text-muted-foreground">
                  {t("subscription.monthlyCost")}
                </p>

                <p className="text-2xl font-bold">
                  {monthlyCost.toFixed(2)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100">
                <CalendarDays className="h-5 w-5" />
              </div>

              <div>
                <p className="text-sm text-muted-foreground">
                  {t("subscription.upcoming")}
                </p>

                <p className="text-2xl font-bold">
                  {upcomingSubscriptions.length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add / Edit */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />

            {editingSubscription
              ? t("subscription.editSubscription")
              : t("subscription.addSubscription")}
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid gap-4 md:grid-cols-4"
          >
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name">
                {t("subscription.name")}
              </Label>

              <Input
                id="name"
                placeholder="Netflix"
                {...register("name")}
              />

              {errors.name && (
                <p className="text-sm text-red-500">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Amount */}
            <div className="space-y-2">
              <Label htmlFor="amount">
                {t("subscription.amount")}
              </Label>

              <Input
                id="amount"
                type="number"
                step="0.01"
                placeholder="150"
                {...register("amount")}
              />

              {errors.amount && (
                <p className="text-sm text-red-500">
                  {errors.amount.message}
                </p>
              )}
            </div>

            {/* Next Payment */}
            <div className="space-y-2">
              <Label htmlFor="nextPaymentDate">
                {t("subscription.nextPayment")}
              </Label>

              <Input
                id="nextPaymentDate"
                type="date"
                {...register(
                  "nextPaymentDate"
                )}
              />

              {errors.nextPaymentDate && (
                <p className="text-sm text-red-500">
                  {
                    errors.nextPaymentDate
                      .message
                  }
                </p>
              )}
            </div>

            {/* Frequency */}
            <div className="space-y-2">
              <Label htmlFor="frequency">
                {t("subscription.frequency")}
              </Label>

              <select
                id="frequency"
                {...register("frequency")}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="MONTHLY">
                  {t("subscription.monthly")}
                </option>

                <option value="YEARLY">
                  {t("subscription.yearly")}
                </option>
              </select>

              {errors.frequency && (
                <p className="text-sm text-red-500">
                  {errors.frequency.message}
                </p>
              )}
            </div>

            {/* Buttons */}
            <div className="flex gap-2 md:col-span-4">
              <Button type="submit">
                {editingSubscription
                  ? t("subscription.updateSubscription")
                  : t("subscription.addSubscription")}
              </Button>

              {editingSubscription && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCancelEdit}
                >
                  {t("common.cancel")}
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Error */}
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* Upcoming Payments */}
      {upcomingSubscriptions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>
              {t("subscription.upcomingPayments")}
            </CardTitle>
          </CardHeader>

          <CardContent>
            <div className="space-y-3">
              {upcomingSubscriptions.map(
                (subscription) => {
                  const days =
                    getDaysUntilPayment(
                      subscription.nextPaymentDate
                    );

                  return (
                    <div
                      key={subscription.id}
                      className="flex items-center justify-between rounded-lg border p-4"
                    >
                      <div>
                        <p className="font-medium">
                          {subscription.name}
                        </p>

                        <p className="text-sm text-muted-foreground">
                          {formatDate(
                            subscription.nextPaymentDate
                          )}
                        </p>
                      </div>

                      <div className="text-right">
                        <p className="font-semibold">
                          {Number(
                            subscription.amount
                          ).toFixed(2)}
                        </p>

                        <p className="text-xs text-muted-foreground">
                          {getPaymentText(days)}
                        </p>
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* All subscriptions */}
      <Card>
        <CardHeader>
          <CardTitle>
            {t("subscription.yourSubscriptions")}
          </CardTitle>
        </CardHeader>

        <CardContent>
          {loading ? (
            <p className="text-sm text-muted-foreground">
              {t("subscription.loading")}
            </p>
          ) : subscriptions.length === 0 ? (
            <div className="rounded-lg border border-dashed p-8 text-center">
              <p className="font-medium">
                {t("subscription.noSubscriptions")}
              </p>

              <p className="mt-1 text-sm text-muted-foreground">
                {t("subscription.firstSubscription")}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-left">
                    <th className="pb-3 font-medium">
                      {t("subscription.name")}
                    </th>

                    <th className="pb-3 font-medium">
                      {t("subscription.amount")}
                    </th>

                    <th className="pb-3 font-medium">
                      {t("subscription.frequency")}
                    </th>

                    <th className="pb-3 font-medium">
                      {t("subscription.nextPayment")}
                    </th>

                    <th className="pb-3 text-right font-medium">
                      {t("common.actions")}
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {subscriptions.map(
                    (subscription) => (
                      <tr
                        key={subscription.id}
                        className="border-b last:border-0"
                      >
                        <td className="py-4 font-medium">
                          {subscription.name}
                        </td>

                        <td className="py-4">
                          {Number(
                            subscription.amount
                          ).toFixed(2)}
                        </td>

                        <td className="py-4">
                          <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium">
                            {subscription.frequency ===
                            "MONTHLY"
                              ? t(
                                  "subscription.monthly"
                                )
                              : t(
                                  "subscription.yearly"
                                )}
                          </span>
                        </td>

                        <td className="py-4">
                          {formatDate(
                            subscription.nextPaymentDate
                          )}
                        </td>

                        <td className="py-4">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() =>
                                handleEdit(
                                  subscription
                                )
                              }
                              aria-label={t(
                                "common.edit"
                              )}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>

                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() =>
                                openDeleteDialog(
                                  subscription.id
                                )
                              }
                              aria-label={t(
                                "common.delete"
                              )}
                            >
                              <Trash2 className="h-4 w-4 text-red-500" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Delete Dialog */}
      <AlertDialog
        open={deleteSubscriptionId !== null}
        onOpenChange={(open) => {
          if (!open && !deleting) {
            setDeleteSubscriptionId(null);
          }
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {t(
                "subscription.deleteConfirmation"
              )}
            </AlertDialogTitle>

            <AlertDialogDescription>
              {t(
                "subscription.deleteDescription"
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel
              disabled={deleting}
              onClick={closeDeleteDialog}
            >
              {t("common.cancel")}
            </AlertDialogCancel>

            <AlertDialogAction
              onClick={(event) => {
                event.preventDefault();
                handleDelete();
              }}
              disabled={deleting}
              className="bg-destructive text-white hover:bg-destructive/90"
            >
              {deleting
                ? t("subscription.deleting")
                : t("common.delete")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default Subscriptions;


