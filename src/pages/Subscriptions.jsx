
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

const subscriptionSchema = z.object({
  name: z
    .string()
    .min(2, "Name must contain at least 2 characters"),

  amount: z
    .string()
    .min(1, "Amount is required")
    .refine(
      (value) => Number(value) > 0,
      "Amount must be greater than 0"
    ),

  nextPaymentDate: z
    .string()
    .min(1, "Next payment date is required"),

  frequency: z.enum(["MONTHLY", "YEARLY"]),
});

function Subscriptions() {
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

      const subscriptionsData = subscriptionsResponse.data;

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
        const [monthlyCostResponse, upcomingResponse] =
          await Promise.all([
            api.get(
              `/subscriptions/user/${userId}/monthly-cost`
            ),
            api.get(
              `/subscriptions/user/${userId}/upcoming`
            ),
          ]);

        setMonthlyCost(Number(monthlyCostResponse.data));

        setUpcomingSubscriptions(
          upcomingResponse.data
        );
      }
    } catch (err) {
      console.error(err);

      const message = "Failed to load subscriptions.";

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

        const updatedSubscription = response.data;

        setSubscriptions((current) =>
          current.map((subscription) =>
            subscription.id === updatedSubscription.id
              ? updatedSubscription
              : subscription
          )
        );

        setEditingSubscription(null);

        toast.success(
          "Subscription updated successfully."
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
          "Subscription added successfully."
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

      const message = "Failed to save subscription.";

      setError(message);
      toast.error(message);
    }
  };

  const refreshSubscriptionStats = async () => {
    try {
      const dashboardResponse =
        await api.get("/dashboard");

      const userId = dashboardResponse.data.userId;

      if (!userId) {
        return;
      }

      const [monthlyCostResponse, upcomingResponse] =
        await Promise.all([
          api.get(
            `/subscriptions/user/${userId}/monthly-cost`
          ),
          api.get(
            `/subscriptions/user/${userId}/upcoming`
          ),
        ]);

      setMonthlyCost(Number(monthlyCostResponse.data));

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
      nextPaymentDate: subscription.nextPaymentDate,
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
            subscription.id !== deleteSubscriptionId
        )
      );

      toast.success(
        "Subscription deleted successfully."
      );

      setDeleteSubscriptionId(null);

      await refreshSubscriptionStats();
    } catch (err) {
      console.error(err);

      const message =
        "Failed to delete subscription.";

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
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getDaysUntilPayment = (date) => {
    const today = new Date();
    const paymentDate = new Date(date);

    today.setHours(0, 0, 0, 0);
    paymentDate.setHours(0, 0, 0, 0);

    const difference =
      paymentDate.getTime() - today.getTime();

    return Math.ceil(
      difference / (1000 * 60 * 60 * 24)
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Subscriptions
        </h1>

        <p className="text-sm text-muted-foreground">
          Manage your recurring payments and upcoming
          subscriptions.
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
                  Monthly Cost
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
                  Upcoming
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
              ? "Edit Subscription"
              : "Add Subscription"}
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid gap-4 md:grid-cols-4"
          >
            <div className="space-y-2">
              <Label htmlFor="name">
                Name
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

            <div className="space-y-2">
              <Label htmlFor="amount">
                Amount
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

            <div className="space-y-2">
              <Label htmlFor="nextPaymentDate">
                Next Payment
              </Label>

              <Input
                id="nextPaymentDate"
                type="date"
                {...register("nextPaymentDate")}
              />

              {errors.nextPaymentDate && (
                <p className="text-sm text-red-500">
                  {errors.nextPaymentDate.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="frequency">
                Frequency
              </Label>

              <select
                id="frequency"
                {...register("frequency")}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="MONTHLY">
                  Monthly
                </option>

                <option value="YEARLY">
                  Yearly
                </option>
              </select>

              {errors.frequency && (
                <p className="text-sm text-red-500">
                  {errors.frequency.message}
                </p>
              )}
            </div>

            <div className="flex gap-2 md:col-span-4">
              <Button type="submit">
                {editingSubscription
                  ? "Update Subscription"
                  : "Add Subscription"}
              </Button>

              {editingSubscription && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCancelEdit}
                >
                  Cancel
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* Upcoming */}
      {upcomingSubscriptions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>
              Upcoming Payments
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
                          {days === 0
                            ? "Today"
                            : days === 1
                            ? "Tomorrow"
                            : `In ${days} days`}
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
            Your Subscriptions
          </CardTitle>
        </CardHeader>

        <CardContent>
          {loading ? (
            <p className="text-sm text-muted-foreground">
              Loading subscriptions...
            </p>
          ) : subscriptions.length === 0 ? (
            <div className="rounded-lg border border-dashed p-8 text-center">
              <p className="font-medium">
                No subscriptions yet
              </p>

              <p className="mt-1 text-sm text-muted-foreground">
                Add your first subscription above.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-left">
                    <th className="pb-3 font-medium">
                      Name
                    </th>

                    <th className="pb-3 font-medium">
                      Amount
                    </th>

                    <th className="pb-3 font-medium">
                      Frequency
                    </th>

                    <th className="pb-3 font-medium">
                      Next Payment
                    </th>

                    <th className="pb-3 text-right font-medium">
                      Actions
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
                              ? "Monthly"
                              : "Yearly"}
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
              Delete subscription?
            </AlertDialogTitle>

            <AlertDialogDescription>
              This action cannot be undone. This subscription
              will be permanently deleted from your account.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel
              disabled={deleting}
              onClick={closeDeleteDialog}
            >
              Cancel
            </AlertDialogCancel>

            <AlertDialogAction
              onClick={(event) => {
                event.preventDefault();
                handleDelete();
              }}
              disabled={deleting}
              className="bg-destructive text-white hover:bg-destructive/90"
            >
              {deleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
         </AlertDialogContent>
        
      </AlertDialog>
    </div>
  );
}

export default Subscriptions;
