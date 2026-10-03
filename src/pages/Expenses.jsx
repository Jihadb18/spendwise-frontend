
import { useEffect, useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import api from "@/services/api";

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

function Expenses() {
  const { t } = useTranslation();

  const expenseSchema = z.object({
    description: z
      .string()
      .min(2, t("expense.validation.description")),

    amount: z
      .string()
      .min(1, t("expense.validation.amountRequired"))
      .refine(
        (value) => Number(value) > 0,
        t("expense.validation.amountPositive")
      ),

    category: z
      .string()
      .min(2, t("expense.validation.category")),

    date: z
      .string()
      .min(1, t("expense.validation.date")),
  });

  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const [deleteExpenseId, setDeleteExpenseId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(expenseSchema),
    defaultValues: {
      description: "",
      amount: "",
      category: "",
      date: new Date().toISOString().split("T")[0],
    },
  });

  const fetchExpenses = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/expenses");

      setExpenses(response.data);
    } catch (error) {
      console.error("Expenses error:", error);

      setError(t("expense.errors.load"));
      toast.error(t("expense.errors.load"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const openAddForm = () => {
    setEditingExpense(null);

    reset({
      description: "",
      amount: "",
      category: "",
      date: new Date().toISOString().split("T")[0],
    });

    setShowForm(true);
  };

  const openEditForm = (expense) => {
    setEditingExpense(expense);

    reset({
      description: expense.description,
      amount: String(expense.amount),
      category: expense.category,
      date: expense.date,
    });

    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingExpense(null);

    reset({
      description: "",
      amount: "",
      category: "",
      date: new Date().toISOString().split("T")[0],
    });
  };

  const onSubmit = async (data) => {
    try {
      setSubmitting(true);
      setError("");

      const expenseData = {
        description: data.description,
        amount: Number(data.amount),
        category: data.category,
        date: data.date,
      };

      if (editingExpense) {
        const response = await api.put(
          `/expenses/${editingExpense.id}`,
          expenseData
        );

        setExpenses((currentExpenses) =>
          currentExpenses.map((expense) =>
            expense.id === editingExpense.id
              ? response.data
              : expense
          )
        );

        toast.success(t("expense.toast.updated"));
      } else {
        const response = await api.post(
          "/expenses",
          expenseData
        );

        setExpenses((currentExpenses) => [
          response.data,
          ...currentExpenses,
        ]);

        toast.success(t("expense.toast.added"));
      }

      closeForm();
    } catch (error) {
      console.error("Save expense error:", error);

      const message =
        error.response?.data?.message ||
        t("expense.errors.save");

      setError(message);
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  const openDeleteDialog = (id) => {
    setDeleteExpenseId(id);
  };

  const closeDeleteDialog = () => {
    if (!deleting) {
      setDeleteExpenseId(null);
    }
  };

  const handleDelete = async () => {
    if (!deleteExpenseId) {
      return;
    }

    try {
      setDeleting(true);
      setError("");

      await api.delete(`/expenses/${deleteExpenseId}`);

      setExpenses((currentExpenses) =>
        currentExpenses.filter(
          (expense) => expense.id !== deleteExpenseId
        )
      );

      toast.success(t("expense.toast.deleted"));

      setDeleteExpenseId(null);
    } catch (error) {
      console.error("Delete expense error:", error);

      const message =
        error.response?.data?.message ||
        t("expense.errors.delete");

      setError(message);
      toast.error(message);
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-sm text-muted-foreground">
          {t("expense.loading")}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            {t("expense.title")}
          </h2>

          <p className="text-sm text-muted-foreground">
            {t("expense.subtitle")}
          </p>
        </div>

        <Button onClick={openAddForm}>
          <Plus className="mr-2 h-4 w-4" />
          {t("expense.addExpense")}
        </Button>
      </div>

      {/* Error */}
      {error && (
        <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-4">
          <p className="text-sm text-destructive">
            {error}
          </p>
        </div>
      )}

      {/* Add / Edit Form */}
      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>
              {editingExpense
                ? t("expense.editExpense")
                : t("expense.addNewExpense")}
            </CardTitle>
          </CardHeader>

          <CardContent>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-5"
            >

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">
                  {t("expense.description")}
                </Label>

                <Input
                  id="description"
                  placeholder={t("expense.descriptionPlaceholder")}
                  {...register("description")}
                />

                {errors.description && (
                  <p className="text-sm text-destructive">
                    {errors.description.message}
                  </p>
                )}
              </div>

              {/* Amount */}
              <div className="space-y-2">
                <Label htmlFor="amount">
                  {t("expense.amount")}
                </Label>

                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  {...register("amount")}
                />

                {errors.amount && (
                  <p className="text-sm text-destructive">
                    {errors.amount.message}
                  </p>
                )}
              </div>

              {/* Category */}
              <div className="space-y-2">
                <Label htmlFor="category">
                  {t("expense.category")}
                </Label>

                <Input
                  id="category"
                  placeholder={t("expense.categoryPlaceholder")}
                  {...register("category")}
                />

                {errors.category && (
                  <p className="text-sm text-destructive">
                    {errors.category.message}
                  </p>
                )}
              </div>

              {/* Date */}
              <div className="space-y-2">
                <Label htmlFor="date">
                  {t("expense.date")}
                </Label>

                <Input
                  id="date"
                  type="date"
                  {...register("date")}
                />

                {errors.date && (
                  <p className="text-sm text-destructive">
                    {errors.date.message}
                  </p>
                )}
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={closeForm}
                >
                  {t("common.cancel")}
                </Button>

                <Button
                  type="submit"
                  disabled={submitting}
                >
                  {submitting
                    ? t("expense.saving")
                    : editingExpense
                      ? t("expense.saveChanges")
                      : t("expense.addExpense")}
                </Button>
              </div>

            </form>
          </CardContent>
        </Card>
      )}

      {/* Expenses table */}
      <Card>
        <CardHeader>
          <CardTitle>
            {t("expense.allExpenses")}
          </CardTitle>
        </CardHeader>

        <CardContent>
          {expenses.length === 0 ? (
            <div className="flex min-h-[250px] items-center justify-center">
              <div className="text-center">
                <p className="font-medium">
                  {t("expense.noExpenses")}
                </p>

                <p className="mt-1 text-sm text-muted-foreground">
                  {t("expense.firstExpense")}
                </p>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-left">
                    <th className="px-4 py-3 font-medium">
                      {t("expense.description")}
                    </th>

                    <th className="px-4 py-3 font-medium">
                      {t("expense.category")}
                    </th>

                    <th className="px-4 py-3 font-medium">
                      {t("expense.date")}
                    </th>

                    <th className="px-4 py-3 text-right font-medium">
                      {t("expense.amount")}
                    </th>

                    <th className="px-4 py-3 text-right font-medium">
                      {t("common.actions")}
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {expenses.map((expense) => (
                    <tr
                      key={expense.id}
                      className="border-b last:border-0"
                    >
                      <td className="px-4 py-4 font-medium">
                        {expense.description}
                      </td>

                      <td className="px-4 py-4 text-muted-foreground">
                        {expense.category}
                      </td>

                      <td className="px-4 py-4 text-muted-foreground">
                        {expense.date}
                      </td>

                      <td className="px-4 py-4 text-right font-semibold">
                        {Number(expense.amount).toFixed(2)} MAD
                      </td>

                      <td className="px-4 py-4 text-right">
                        <div className="flex justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() =>
                              openEditForm(expense)
                            }
                            aria-label={t("common.edit")}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>

                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() =>
                              openDeleteDialog(expense.id)
                            }
                            aria-label={t("common.delete")}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Delete Confirmation */}
      <AlertDialog
        open={deleteExpenseId !== null}
        onOpenChange={(open) => {
          if (!open && !deleting) {
            setDeleteExpenseId(null);
          }
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {t("expense.deleteExpense")}
            </AlertDialogTitle>

            <AlertDialogDescription>
              {t("expense.deleteDescription")}
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
                ? t("expense.deleting")
                : t("common.delete")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

    </div>
  );
}

export default Expenses;
