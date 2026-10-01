
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

const incomeSchema = z.object({
  source: z
    .string()
    .min(2, "Source must contain at least 2 characters."),

  amount: z
    .string()
    .min(1, "Amount is required.")
    .refine(
      (value) => Number(value) > 0,
      "Amount must be greater than 0."
    ),

  date: z
    .string()
    .min(1, "Date is required."),
});

function Income() {
  const [incomes, setIncomes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [editingIncome, setEditingIncome] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(incomeSchema),
    defaultValues: {
      source: "",
      amount: "",
      date: new Date().toISOString().split("T")[0],
    },
  });

  const fetchIncomes = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/incomes");

      setIncomes(response.data);
    } catch (error) {
      console.error("Income error:", error);

      setError("Unable to load your income.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIncomes();
  }, []);

  const openAddForm = () => {
    setEditingIncome(null);

    reset({
      source: "",
      amount: "",
      date: new Date().toISOString().split("T")[0],
    });

    setShowForm(true);
  };

  const openEditForm = (income) => {
    setEditingIncome(income);

    reset({
      source: income.source,
      amount: String(income.amount),
      date: income.date,
    });

    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingIncome(null);

    reset({
      source: "",
      amount: "",
      date: new Date().toISOString().split("T")[0],
    });
  };

  const onSubmit = async (data) => {
    try {
      setSubmitting(true);
      setError("");

      const incomeData = {
        source: data.source,
        amount: Number(data.amount),
        date: data.date,
      };

      if (editingIncome) {
        const response = await api.put(
          `/incomes/${editingIncome.id}`,
          incomeData
        );

        setIncomes((currentIncomes) =>
          currentIncomes.map((income) =>
            income.id === editingIncome.id
              ? response.data
              : income
          )
        );
      } else {
        const response = await api.post(
          "/incomes",
          incomeData
        );

        setIncomes((currentIncomes) => [
          response.data,
          ...currentIncomes,
        ]);
      }

      closeForm();
    } catch (error) {
      console.error("Save income error:", error);

      setError(
        error.response?.data?.message ||
          "Unable to save this income."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this income?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setError("");

      await api.delete(`/incomes/${id}`);

      setIncomes((currentIncomes) =>
        currentIncomes.filter(
          (income) => income.id !== id
        )
      );
    } catch (error) {
      console.error("Delete income error:", error);

      setError(
        error.response?.data?.message ||
          "Unable to delete this income."
      );
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-sm text-muted-foreground">
          Loading income...
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
            Income
          </h2>

          <p className="text-sm text-muted-foreground">
            Manage and track your income.
          </p>
        </div>

        <Button onClick={openAddForm}>
          <Plus className="mr-2 h-4 w-4" />
          Add income
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
              {editingIncome
                ? "Edit income"
                : "Add new income"}
            </CardTitle>
          </CardHeader>

          <CardContent>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-5"
            >
              {/* Source */}
              <div className="space-y-2">
                <Label htmlFor="source">
                  Source
                </Label>

                <Input
                  id="source"
                  placeholder="e.g. Salary"
                  {...register("source")}
                />

                {errors.source && (
                  <p className="text-sm text-destructive">
                    {errors.source.message}
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
                    : editingIncome
                      ? "Save changes"
                      : "Add income"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Income table */}
      <Card>
        <CardHeader>
          <CardTitle>
            All income
          </CardTitle>
        </CardHeader>

        <CardContent>
          {incomes.length === 0 ? (
            <div className="flex min-h-[250px] items-center justify-center">
              <div className="text-center">
                <p className="font-medium">
                  No income yet
                </p>

                <p className="mt-1 text-sm text-muted-foreground">
                  Start by adding your first income.
                </p>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-left">
                    <th className="px-4 py-3 font-medium">
                      Source
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
                  {incomes.map((income) => (
                    <tr
                      key={income.id}
                      className="border-b last:border-0"
                    >
                      <td className="px-4 py-4 font-medium">
                        {income.source}
                      </td>

                      <td className="px-4 py-4 text-muted-foreground">
                        {income.date}
                      </td>

                      <td className="px-4 py-4 text-right font-semibold text-green-600">
                        +{Number(income.amount).toFixed(2)} MAD
                      </td>

                      <td className="px-4 py-4 text-right">
                        <div className="flex justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() =>
                              openEditForm(income)
                            }
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>

                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() =>
                              handleDelete(income.id)
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

export default Income;
