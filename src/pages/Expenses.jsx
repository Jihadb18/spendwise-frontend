import { useEffect, useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import api from "@/services/api";

const expenseSchema = z.object({
  description: z
    .string()
    .min(2, "Description must contain at least 2 characters."),

  amount: z
    .string()
    .min(1, "Amount is required.")
    .refine(
      (value) => Number(value) > 0,
      "Amount must be greater than 0."
    ),

  category: z
    .string()
    .min(2, "Category is required."),

  date: z
    .string()
    .min(1, "Date is required."),
});

function Expenses() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);
  const [submitting, setSubmitting] = useState(false);

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

      setError("Unable to load your expenses.");
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
      } else {
        const response = await api.post(
          "/expenses",
          expenseData
        );

        setExpenses((currentExpenses) => [
          response.data,
          ...currentExpenses,
        ]);
      }

      closeForm();
    } catch (error) {
      console.error("Save expense error:", error);

      setError(
        error.response?.data?.message ||
          "Unable to save this expense."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this expense?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setError("");

      await api.delete(`/expenses/${id}`);

      setExpenses((currentExpenses) =>
        currentExpenses.filter(
          (expense) => expense.id !== id
        )
      );
    } catch (error) {
      console.error("Delete expense error:", error);

      setError(
        error.response?.data?.message ||
          "Unable to delete this expense."
      );
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-sm text-muted-foreground">
          Loading expenses...
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
            Expenses
          </h2>

          <p className="text-sm text-muted-foreground">
            Manage and track your expenses.
          </p>
        </div>

        <Button onClick={openAddForm}>
          <Plus className="mr-2 h-4 w-4" />
          Add expense
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
                ? "Edit expense"
                : "Add new expense"}
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
                  Description
                </Label>

                <Input
                  id="description"
                  placeholder="e.g. Groceries"
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
                  Amount
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
                  Category
                </Label>

                <Input
                  id="category"
                  placeholder="e.g. Food"
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
                  Date
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
                  Cancel
                </Button>

                <Button
                  type="submit"
                  disabled={submitting}
                >
                  {submitting
                    ? "Saving..."
                    : editingExpense
                      ? "Save changes"
                      : "Add expense"}
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
            All expenses
          </CardTitle>
        </CardHeader>

        <CardContent>
          {expenses.length === 0 ? (
            <div className="flex min-h-[250px] items-center justify-center">
              <div className="text-center">
                <p className="font-medium">
                  No expenses yet
                </p>

                <p className="mt-1 text-sm text-muted-foreground">
                  Start by adding your first expense.
                </p>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-left">
                    <th className="px-4 py-3 font-medium">
                      Description
                    </th>

                    <th className="px-4 py-3 font-medium">
                      Category
                    </th>

                    <th className="px-4 py-3 font-medium">
                      Date
                    </th>

                    <th className="px-4 py-3 text-right font-medium">
                      Amount
                    </th>

                    <th className="px-4 py-3 text-right font-medium">
                      Action
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
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>

                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() =>
                              handleDelete(expense.id)
                            }
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
    </div>
  );
}

export default Expenses;
