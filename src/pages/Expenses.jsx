
import { useEffect, useState } from "react";

import {
  CalendarDays,
  Car,
  GraduationCap,
  HeartPulse,
  House,
  MoreHorizontal,
  Pencil,
  Plane,
  Plus,
  Receipt,
  Search,
  ShoppingBag,
  SlidersHorizontal,
  Trash2,
  Utensils,
  X,
} from "lucide-react";

import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";

import { format, parseISO } from "date-fns";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Calendar } from "@/components/ui/calendar";

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

  // =========================
  // Expense categories
  // =========================

  const expenseCategories = [
    {
      value: "Food",
      labelKey: "categories.food",
      icon: Utensils,
    },
    {
      value: "Transport",
      labelKey: "categories.transport",
      icon: Car,
    },
    {
      value: "Shopping",
      labelKey: "categories.shopping",
      icon: ShoppingBag,
    },
    {
      value: "Housing",
      labelKey: "categories.housing",
      icon: House,
    },
    {
      value: "Bills",
      labelKey: "categories.bills",
      icon: Receipt,
    },
    {
      value: "Entertainment",
      labelKey: "categories.entertainment",
      icon: MoreHorizontal,
    },
    {
      value: "Health",
      labelKey: "categories.health",
      icon: HeartPulse,
    },
    {
      value: "Education",
      labelKey: "categories.education",
      icon: GraduationCap,
    },
    {
      value: "Travel",
      labelKey: "categories.travel",
      icon: Plane,
    },
    {
      value: "Other",
      labelKey: "categories.other",
      icon: MoreHorizontal,
    },
  ];

  // =========================
  // Validation
  // =========================

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
      .min(1, t("expense.validation.category")),

    date: z
      .string()
      .min(1, t("expense.validation.date")),
  });

  // =========================
  // State
  // =========================

  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);

  const [submitting, setSubmitting] = useState(false);

  const [deleteExpenseId, setDeleteExpenseId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  // =========================
  // Form
  // =========================

  const {
    register,
    control,
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

  // =========================
  // Fetch expenses
  // =========================

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

  // =========================
  // Add form
  // =========================

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

  // =========================
  // Edit form
  // =========================

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

  // =========================
  // Close form
  // =========================

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

  // =========================
  // Submit
  // =========================

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

      // Update
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
      }

      // Create
      else {
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

  // =========================
  // Delete
  // =========================

  const openDeleteDialog = (id) => {
    setDeleteExpenseId(id);
  };

  const closeDeleteDialog = () => {
    if (!deleting) {
      setDeleteExpenseId(null);
    }
  };

  const handleDelete = async () => {
    if (!deleteExpenseId) return;

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
 
const filteredExpenses = expenses
  .filter((expense) => {
    const search = searchTerm.trim().toLowerCase();

    const description = String(expense.description ?? "").toLowerCase();
    const category = String(expense.category ?? "").toLowerCase();

    const matchesSearch =
      !search ||
      description.includes(search) ||
      category.includes(search);

    const matchesCategory =
      categoryFilter === "all" ||
      expense.category === categoryFilter;

    return matchesSearch && matchesCategory;
  })
  .sort((a, b) => {
    const dateA = new Date(a.date).getTime() || 0;
    const dateB = new Date(b.date).getTime() || 0;
    const amountA = Number(a.amount) || 0;
    const amountB = Number(b.amount) || 0;
    const descriptionA = String(a.description ?? "");
    const descriptionB = String(b.description ?? "");

    switch (sortBy) {
      case "oldest":
        return dateA - dateB;

      case "amount-high":
        return amountB - amountA;

      case "amount-low":
        return amountA - amountB;

      case "az":
        return descriptionA.localeCompare(descriptionB);

      case "za":
        return descriptionB.localeCompare(descriptionA);

      case "newest":
      default:
        return dateB - dateA;
    }
  });

const hasActiveFilters =
  searchTerm.trim() !== "" ||
  categoryFilter !== "all" ||
  sortBy !== "newest";

const resetFilters = () => {
  setSearchTerm("");
  setCategoryFilter("all");
  setSortBy("newest");
};

  // =========================
  // Loading
  // =========================

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-sm text-muted-foreground">
          {t("expense.loading")}
        </p>
      </div>
    );
  }

  // =========================
  // UI
  // =========================

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

      {/* =========================
          FORM
      ========================= */}

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
  className="w-full space-y-5"
>
  {/* Row 1 */}
  <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

    {/* Description */}
    <div className="w-full space-y-2">
      <Label htmlFor="description">
        {t("expense.description")}
      </Label>

      <Input
        id="description"
        className="h-10 w-full"
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
    <div className="w-full space-y-2">
      <Label htmlFor="amount">
        {t("expense.amount")}
      </Label>

      <Input
        id="amount"
        type="number"
        step="0.01"
        min="0"
        className="h-10 w-full"
        placeholder="0.00"
        {...register("amount")}
      />

      {errors.amount && (
        <p className="text-sm text-destructive">
          {errors.amount.message}
        </p>
      )}
    </div>

  </div>


  {/* Row 2 */}
  <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

    {/* Category */}
    <div className="w-full space-y-2">
      <Label htmlFor="category">
        {t("expense.category")}
      </Label>

      <Controller
        name="category"
        control={control}
        render={({ field }) => {
          const selectedCategory =
            expenseCategories.find(
              (category) =>
                category.value === field.value
            );

          const SelectedIcon =
            selectedCategory?.icon;

          return (
            <Select
              value={field.value}
              onValueChange={field.onChange}
            >
              <SelectTrigger
                id="category"
                className="h-10 w-full"
              >
                <SelectValue
                  placeholder={t(
                    "expense.categoryPlaceholder"
                  )}
                >
                  {selectedCategory &&
                    SelectedIcon && (
                      <div className="flex min-w-0 items-center gap-2">
                        <SelectedIcon className="h-4 w-4 shrink-0 text-slate-500 dark:text-slate-400" />

                        <span className="truncate">
                          {t(
                            selectedCategory.labelKey
                          )}
                        </span>
                      </div>
                    )}
                </SelectValue>
              </SelectTrigger>

              <SelectContent>
                {expenseCategories.map((category) => {
                  const Icon = category.icon;

                  return (
                    <SelectItem
                      key={category.value}
                      value={category.value}
                    >
                      <div className="flex items-center gap-2">
                        <Icon className="h-4 w-4 shrink-0 text-slate-500 dark:text-slate-400" />

                        <span>
                          {t(category.labelKey)}
                        </span>
                      </div>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          );
        }}
      />

      {errors.category && (
        <p className="text-sm text-destructive">
          {errors.category.message}
        </p>
      )}
    </div>


    {/* Date */}
    <div className="w-full space-y-2">
      <Label htmlFor="date">
        {t("expense.date")}
      </Label>

      <Controller
        name="date"
        control={control}
        render={({ field }) => {
          const selectedDate = field.value
            ? parseISO(field.value)
            : undefined;

          return (
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="date"
                  type="button"
                  variant="outline"
                  className="h-10 w-full justify-start text-left font-normal"
                >
                  <CalendarDays className="mr-2 h-4 w-4 shrink-0" />

                  <span className="truncate">
                    {field.value
                      ? format(
                          selectedDate,
                          "dd/MM/yyyy"
                        )
                      : t(
                          "expense.datePlaceholder"
                        )}
                  </span>
                </Button>
              </PopoverTrigger>

              <PopoverContent
                className="w-auto p-0"
                align="start"
              >
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => {
                    if (date) {
                      field.onChange(
                        format(
                          date,
                          "yyyy-MM-dd"
                        )
                      );
                    }
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          );
        }}
      />

      {errors.date && (
        <p className="text-sm text-destructive">
          {errors.date.message}
        </p>
      )}
    </div>

  </div>


  {/* Buttons */}
  <div className="flex justify-end gap-3 pt-2">
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

      {/* =========================
          EXPENSES TABLE
      ========================= */}



<Card className="overflow-hidden">
  
<CardHeader className="border-b py-4">
  <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
    {/* Title + count */}
    <div className="flex shrink-0 items-center gap-2">
      <CardTitle className="whitespace-nowrap text-base">
        {t("expense.allExpenses")}
      </CardTitle>

      <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
        {filteredExpenses.length} {t("expense.expensesFound")}
      </span>
    </div>

    {/* Search + Filters */}
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-[minmax(140px,1fr)_145px_135px] xl:flex xl:w-auto xl:items-center">
      {/* Search */}
      <div className="relative min-w-0 xl:w-[190px]">
        <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground rtl:left-auto rtl:right-2.5" />

        <Input
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder={t("expense.searchPlaceholder")}
          aria-label={t("expense.searchPlaceholder")}
          className="h-8 w-full pl-8 text-xs rtl:pl-2 rtl:pr-8"
        />
      </div>

      {/* Category */}
      <Select
        value={categoryFilter}
        onValueChange={setCategoryFilter}
      >
        <SelectTrigger className="h-8 w-full text-xs xl:w-[145px]">
          <SelectValue placeholder={t("expense.filterCategory")} />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="all">
            {t("expense.allCategories")}
          </SelectItem>

          {expenseCategories.map((category) => {
            const Icon = category.icon;

            return (
              <SelectItem key={category.value} value={category.value}>
                <div className="flex items-center gap-2">
                  <Icon className="h-3.5 w-3.5 shrink-0" />
                  <span>{t(category.labelKey)}</span>
                </div>
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>

      {/* Sort */}
      <Select value={sortBy} onValueChange={setSortBy}>
        <SelectTrigger className="h-8 w-full text-xs xl:w-[135px]">
          <SelectValue placeholder={t("expense.sortBy")} />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="newest">{t("expense.newest")}</SelectItem>
          <SelectItem value="oldest">{t("expense.oldest")}</SelectItem>
          <SelectItem value="amount-high">{t("expense.amountHigh")}</SelectItem>
          <SelectItem value="amount-low">{t("expense.amountLow")}</SelectItem>
          <SelectItem value="az">{t("expense.nameAZ")}</SelectItem>
          <SelectItem value="za">{t("expense.nameZA")}</SelectItem>
        </SelectContent>
      </Select>
    </div>
  </div>
</CardHeader>


  <CardContent className="p-0">
    {filteredExpenses.length === 0 ? (
      <div className="flex flex-col items-center justify-center px-4 py-14 text-center">
        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
          <Search className="h-5 w-5 text-muted-foreground" />
        </div>

        <p className="font-medium">
          {t("expense.noResults")}
        </p>

        <p className="mt-1 max-w-sm text-sm text-muted-foreground">
          {t("expense.tryDifferentSearch")}
        </p>

        {hasActiveFilters && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-4"
            onClick={resetFilters}
          >
            {t("expense.resetFilters", {
              defaultValue: "Reset filters",
            })}
          </Button>
        )}
      </div>
    ) : (
      <div className="w-full overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/30 hover:bg-muted/30">
              <TableHead className="h-12 min-w-[180px] px-4 sm:px-6">
                {t("expense.description")}
              </TableHead>

              <TableHead className="h-12 min-w-[140px]">
                {t("expense.category")}
              </TableHead>

              <TableHead className="h-12 min-w-[120px]">
                {t("expense.date")}
              </TableHead>

              <TableHead className="h-12 min-w-[130px] text-right">
                {t("expense.amount")}
              </TableHead>

              <TableHead className="h-12 min-w-[100px] text-right">
                {t("common.actions")}
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filteredExpenses.map((expense) => {
              const category = expenseCategories.find(
                (item) => item.value === expense.category
              );

              const CategoryIcon =
                category?.icon ?? MoreHorizontal;

              const expenseDate = expense.date
                ? parseISO(expense.date)
                : null;

              const validDate =
                expenseDate &&
                !Number.isNaN(expenseDate.getTime());

              return (
                <TableRow
                  key={expense.id}
                  className="transition-colors hover:bg-muted/40"
                >
                  {/* Description */}
                  <TableCell className="max-w-[260px] px-4 py-4 sm:px-6">
                    <span className="block truncate font-medium">
                      {expense.description}
                    </span>
                  </TableCell>

                  {/* Category */}
                  <TableCell>
                    <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-muted px-2.5 py-1 text-xs font-medium">
                      <CategoryIcon className="h-3.5 w-3.5 shrink-0" />

                      {category
                        ? t(category.labelKey)
                        : expense.category}
                    </span>
                  </TableCell>

                  {/* Date */}
                  <TableCell className="whitespace-nowrap text-sm text-muted-foreground">
                    {validDate
                      ? format(expenseDate, "dd/MM/yyyy")
                      : "—"}
                  </TableCell>

                  {/* Amount */}
                  <TableCell className="whitespace-nowrap text-right">
                    <span className="font-semibold tabular-nums">
                      −{(Number(expense.amount) || 0).toFixed(2)} MAD
                    </span>
                  </TableCell>

                  {/* Actions */}
                  <TableCell>
                    <div className="flex justify-end gap-1">
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => openEditForm(expense)}
                        title={t("common.edit")}
                        aria-label={t("common.edit")}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>

                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() =>
                          openDeleteDialog(expense.id)
                        }
                        title={t("common.delete")}
                        aria-label={t("common.delete")}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    )}
  </CardContent>
</Card>


      {/* =========================
          DELETE DIALOG
      ========================= */}

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
