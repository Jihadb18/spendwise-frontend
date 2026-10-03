


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

function Income() {
  const { t } = useTranslation();

  const incomeSchema = z.object({
    source: z
      .string()
      .min(2, t("incomePage.validation.source")),

    amount: z
      .string()
      .min(1, t("incomePage.validation.amountRequired"))
      .refine(
        (value) => Number(value) > 0,
        t("incomePage.validation.amountPositive")
      ),

    date: z
      .string()
      .min(1, t("incomePage.validation.date")),
  });

  const [incomes, setIncomes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [editingIncome, setEditingIncome] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const [deleteIncomeId, setDeleteIncomeId] = useState(null);
  const [deleting, setDeleting] = useState(false);

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

      setError(t("incomePage.errors.load"));
      toast.error(t("incomePage.errors.load"));
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

        toast.success(t("incomePage.toast.updated"));
      } else {
        const response = await api.post(
          "/incomes",
          incomeData
        );

        setIncomes((currentIncomes) => [
          response.data,
          ...currentIncomes,
        ]);

        toast.success(t("incomePage.toast.added"));
      }

      closeForm();
    } catch (error) {
      console.error("Save income error:", error);

      const message =
        error.response?.data?.message ||
        t("incomePage.errors.save");

      setError(message);
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  const openDeleteDialog = (id) => {
    setDeleteIncomeId(id);
  };

  const closeDeleteDialog = () => {
    if (!deleting) {
      setDeleteIncomeId(null);
    }
  };

  const handleDelete = async () => {
    if (!deleteIncomeId) {
      return;
    }

    try {
      setDeleting(true);
      setError("");

      await api.delete(`/incomes/${deleteIncomeId}`);

      setIncomes((currentIncomes) =>
        currentIncomes.filter(
          (income) => income.id !== deleteIncomeId
        )
      );

      toast.success(t("incomePage.toast.deleted"));

      setDeleteIncomeId(null);
    } catch (error) {
      console.error("Delete income error:", error);

      const message =
        error.response?.data?.message ||
        t("incomePage.errors.delete");

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
          {t("incomePage.loading")}
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
            {t("incomePage.title")}
          </h2>

          <p className="text-sm text-muted-foreground">
            {t("incomePage.subtitle")}
          </p>
        </div>

        <Button onClick={openAddForm}>
          <Plus className="mr-2 h-4 w-4" />
          {t("incomePage.addIncome")}
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
                ? t("incomePage.editIncome")
                : t("incomePage.addNewIncome")}
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
                  {t("incomePage.source")}
                </Label>

                <Input
                  id="source"
                  placeholder={t(
                    "incomePage.sourcePlaceholder"
                  )}
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
                  {t("incomePage.amount")}
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
                  {t("incomePage.date")}
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
                    ? t("incomePage.saving")
                    : editingIncome
                      ? t("incomePage.saveChanges")
                      : t("incomePage.addIncome")}
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
            {t("incomePage.allIncome")}
          </CardTitle>
        </CardHeader>

        <CardContent>
          {incomes.length === 0 ? (
            <div className="flex min-h-[250px] items-center justify-center">
              <div className="text-center">
                <p className="font-medium">
                  {t("incomePage.noIncome")}
                </p>

                <p className="mt-1 text-sm text-muted-foreground">
                  {t("incomePage.firstIncome")}
                </p>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-left">
                    <th className="px-4 py-3 font-medium">
                      {t("incomePage.source")}
                    </th>

                    <th className="px-4 py-3 font-medium">
                      {t("incomePage.date")}
                    </th>

                    <th className="px-4 py-3 text-right font-medium">
                      {t("incomePage.amount")}
                    </th>

                    <th className="px-4 py-3 text-right font-medium">
                      {t("common.actions")}
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
                              openDeleteDialog(income.id)
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

      {/* Delete Confirmation */}
      <AlertDialog
        open={deleteIncomeId !== null}
        onOpenChange={(open) => {
          if (!open && !deleting) {
            setDeleteIncomeId(null);
          }
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {t("incomePage.deleteIncome")}
            </AlertDialogTitle>

            <AlertDialogDescription>
              {t("incomePage.deleteDescription")}
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
                ? t("incomePage.deleting")
                : t("common.delete")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default Income;
