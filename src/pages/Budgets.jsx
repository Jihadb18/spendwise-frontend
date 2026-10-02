import { useEffect, useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
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
import { Progress } from "@/components/ui/progress";

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

const budgetSchema = z.object({
  category: z
    .string()
    .min(2, "Category must contain at least 2 characters"),

  amount: z
    .string()
    .min(1, "Amount is required")
    .refine(
      (value) => Number(value) > 0,
      "Amount must be greater than 0"
    ),

  month: z.string().min(1, "Month is required"),
});

function Budgets() {
  const [budgets, setBudgets] = useState([]);
  const [editingBudget, setEditingBudget] = useState(null);
  const [deleteBudgetId, setDeleteBudgetId] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(budgetSchema),
    defaultValues: {
      category: "",
      amount: "",
      month: "",
    },
  });

  useEffect(() => {
    fetchBudgets();
  }, []);

  const fetchBudgets = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/budgets");

      const budgetsWithDetails = await Promise.all(
        response.data.map(async (budget) => {
          try {
            const [
              spentResponse,
              remainingResponse,
              percentageResponse,
            ] = await Promise.all([
              api.get(`/budgets/${budget.id}/spent`),
              api.get(`/budgets/${budget.id}/remaining`),
              api.get(`/budgets/${budget.id}/percentage`),
            ]);

            return {
              ...budget,
              spent: Number(spentResponse.data),
              remaining: Number(remainingResponse.data),
              percentageUsed: Number(percentageResponse.data),
            };
          } catch {
            return {
              ...budget,
              spent: 0,
              remaining: Number(budget.amount),
              percentageUsed: 0,
            };
          }
        })
      );

      setBudgets(budgetsWithDetails);
    } catch (err) {
      console.error(err);

      const message = "Failed to load budgets.";

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
        category: data.category,
        amount: Number(data.amount),
        month: `${data.month}-01`,
      };

      if (editingBudget) {
        const response = await api.put(
          `/budgets/${editingBudget.id}`,
          payload
        );

        const updatedBudget = response.data;

        setBudgets((current) =>
          current.map((budget) =>
            budget.id === updatedBudget.id
              ? {
                  ...budget,
                  ...updatedBudget,
                }
              : budget
          )
        );

        setEditingBudget(null);

        toast.success("Budget updated successfully.");
      } else {
        const response = await api.post("/budgets", payload);

        const newBudget = response.data;

        setBudgets((current) => [
          ...current,
          {
            ...newBudget,
            spent: 0,
            remaining: Number(newBudget.amount),
            percentageUsed: 0,
          },
        ]);

        toast.success("Budget added successfully.");
      }

      reset({
        category: "",
        amount: "",
        month: "",
      });
    } catch (err) {
      console.error(err);

      const message = "Failed to save budget.";

      setError(message);
      toast.error(message);
    }
  };

  const handleEdit = (budget) => {
    setEditingBudget(budget);

    reset({
      category: budget.category,
      amount: String(budget.amount),
      month: budget.month.substring(0, 7),
    });
  };

  const openDeleteDialog = (id) => {
    setDeleteBudgetId(id);
  };

  const closeDeleteDialog = () => {
    if (!deleting) {
      setDeleteBudgetId(null);
    }
  };

  const handleDelete = async () => {
    if (!deleteBudgetId) {
      return;
    }

    try {
      setDeleting(true);
      setError("");

      await api.delete(`/budgets/${deleteBudgetId}`);

      setBudgets((current) =>
        current.filter(
          (budget) => budget.id !== deleteBudgetId
        )
      );

      toast.success("Budget deleted successfully.");

      setDeleteBudgetId(null);
    } catch (err) {
      console.error(err);

      const message = "Failed to delete budget.";

      setError(message);
      toast.error(message);
    } finally {
      setDeleting(false);
    }
  };

  const handleCancelEdit = () => {
    setEditingBudget(null);

    reset({
      category: "",
      amount: "",
      month: "",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Budgets
        </h1>

        <p className="text-sm text-muted-foreground">
          Set spending limits and track your progress.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            {editingBudget ? "Edit Budget" : "Add Budget"}
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid gap-4 md:grid-cols-3"
          >
            <div className="space-y-2">
              <Label htmlFor="category">
                Category
              </Label>

              <Input
                id="category"
                placeholder="Food"
                {...register("category")}
              />

              {errors.category && (
                <p className="text-sm text-red-500">
                  {errors.category.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="amount">
                Budget Amount
              </Label>

              <Input
                id="amount"
                type="number"
                step="0.01"
                placeholder="1000"
                {...register("amount")}
              />

              {errors.amount && (
                <p className="text-sm text-red-500">
                  {errors.amount.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="month">
                Month
              </Label>

              <Input
                id="month"
                type="month"
                {...register("month")}
              />

              {errors.month && (
                <p className="text-sm text-red-500">
                  {errors.month.message}
                </p>
              )}
            </div>

            <div className="flex gap-2 md:col-span-3">
              <Button type="submit">
                {editingBudget ? "Update Budget" : "Add Budget"}
              </Button>

              {editingBudget && (
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

      <Card>
        <CardHeader>
          <CardTitle>Your Budgets</CardTitle>
        </CardHeader>

        <CardContent>
          {loading ? (
            <p className="text-sm text-muted-foreground">
              Loading budgets...
            </p>
          ) : budgets.length === 0 ? (
            <div className="rounded-lg border border-dashed p-8 text-center">
              <p className="font-medium">
                No budgets yet
              </p>

              <p className="mt-1 text-sm text-muted-foreground">
                Create your first budget above.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {budgets.map((budget) => {
                const percentage = Math.min(
                  Math.max(budget.percentageUsed, 0),
                  100
                );

                const isOverBudget =
                  budget.percentageUsed > 100;

                return (
                  <div
                    key={budget.id}
                    className="rounded-xl border p-4"
                  >
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-4">
                          <div>
                            <h3 className="font-semibold">
                              {budget.category}
                            </h3>

                            <p className="text-sm text-muted-foreground">
                              {new Date(
                                budget.month
                              ).toLocaleDateString(
                                "en-US",
                                {
                                  month: "long",
                                  year: "numeric",
                                }
                              )}
                            </p>
                          </div>

                          <div className="text-right">
                            <p className="font-semibold">
                              {budget.spent.toFixed(2)} /{" "}
                              {Number(budget.amount).toFixed(2)}
                            </p>

                            <p
                              className={`text-xs ${
                                isOverBudget
                                  ? "text-red-600"
                                  : "text-muted-foreground"
                              }`}
                            >
                              {budget.percentageUsed.toFixed(1)}% used
                            </p>
                          </div>
                        </div>

                        <Progress
                          value={percentage}
                          className="mt-3"
                        />

                        <div className="mt-2 flex justify-between text-xs">
                          <span className="text-muted-foreground">
                            Remaining
                          </span>

                          <span
                            className={
                              budget.remaining < 0
                                ? "font-medium text-red-600"
                                : "font-medium text-green-600"
                            }
                          >
                            {budget.remaining.toFixed(2)}
                          </span>
                        </div>
                      </div>

                      <div className="flex shrink-0 gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleEdit(budget)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>

                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() =>
                            openDeleteDialog(budget.id)
                          }
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      <AlertDialog
        open={deleteBudgetId !== null}
        onOpenChange={(open) => {
          if (!open && !deleting) {
            setDeleteBudgetId(null);
          }
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Delete budget?
            </AlertDialogTitle>

            <AlertDialogDescription>
              This action cannot be undone. This budget will
              be permanently deleted from your account.
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

export default Budgets;
