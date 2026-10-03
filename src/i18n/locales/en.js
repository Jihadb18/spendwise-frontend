
const en = {
  translation: {
    common: {
      save: "Save",
      cancel: "Cancel",
      edit: "Edit",
      delete: "Delete",
      add: "Add",
      close: "Close",
      loading: "Loading...",
      noData: "No data available",
      actions: "Actions",
    },

    navigation: {
      dashboard: "Dashboard",
      expenses: "Expenses",
      income: "Income",
      budgets: "Budgets",
      subscriptions: "Subscriptions",
      profile: "Profile",
      logout: "Logout",
    },

    theme: {
      light: "Light mode",
      dark: "Dark mode",
    },

    language: {
      title: "Language",
      english: "English",
      french: "Français",
      arabic: "العربية",
    },


auth: {
  login: "Sign in",
  register: "Create account",

  email: "Email",
  emailPlaceholder: "you@example.com",

  password: "Password",

  name: "Full name",
  namePlaceholder: "Your name",

  welcomeBack:
    "Welcome back",

  loginSubtitle:
    "Sign in to your SpendWise account",

  loginBrandDescription:
    "Take control of your money. Track expenses, manage budgets, and understand your spending.",

  loginHeadlineLine1:
    "Your money.",

  loginHeadlineLine2:
    "Your goals.",

  loginHeadlineLine3:
    "Your control.",

  loginTagline:
    "Personal finance made simple.",

  signingIn:
    "Signing in...",

  loginRequired:
    "Please enter your email and password.",

  invalidCredentials:
    "Invalid email or password.",

  loginError:
    "Something went wrong. Please try again.",

  noAccount:
    "Don't have an account?",

  createOne:
    "Create one",

  createAccount:
    "Create your account",

  registerSubtitle:
    "Get started with SpendWise",

  registerBrandDescription:
    "Start managing your finances with clarity and confidence.",

  registerHeadlineLine1:
    "Build better",

  registerHeadlineLine2:
    "money habits",

  registerHeadlineLine3:
    "every day.",

  registerTagline:
    "Simple tools for smarter financial decisions.",

  creatingAccount:
    "Creating account...",

  haveAccount:
    "Already have an account?",

  signIn:
    "Sign in",

  accountCreated:
    "Account created successfully.",

  registerError:
    "Unable to create your account.",

  signOut:
    "Sign out",

  validation: {
    name:
      "Name must contain at least 2 characters.",

    email:
      "Please enter a valid email address.",

    password:
      "Password must contain at least 6 characters.",
  },
},



    dashboard: {
      title: "Dashboard",
      overview: "Overview of your finances",

      balance: "Balance",
      currentBalance: "Current balance",

      income: "Income",
      expenses: "Expenses",
      subscriptions: "Subscriptions",

      thisMonth: "This month",
      vsPreviousMonth: "vs previous month",

      monthlyCost: "Monthly cost",

      spendingByCategory: "Spending by category",

      noExpensesThisMonth:
        "No expenses this month.",

      spent: "Spent",

      upcomingSubscriptions:
        "Upcoming subscriptions",

      noUpcomingSubscriptions:
        "No upcoming subscriptions.",

      budgetOverview:
        "Budget overview",

      noBudgets:
        "No budgets available.",

      spentOf: "spent of",

      remaining: "Remaining",
    },

    expense: {
      title: "Expenses",

      subtitle:
        "Manage and track your expenses.",

      addExpense:
        "Add expense",

      addNewExpense:
        "Add new expense",

      editExpense:
        "Edit expense",

      deleteExpense:
        "Delete expense",

      allExpenses:
        "All expenses",

      noExpenses:
        "No expenses yet",

      firstExpense:
        "Start by adding your first expense.",

      description:
        "Description",

      descriptionPlaceholder:
        "e.g. Groceries",

      amount:
        "Amount",

      category:
        "Category",

      categoryPlaceholder:
        "e.g. Food",

      date:
        "Date",

      loading:
        "Loading expenses...",

      saving:
        "Saving...",

      saveChanges:
        "Save changes",

      deleting:
        "Deleting...",

      deleteDescription:
        "This action cannot be undone. This expense will be permanently deleted from your account.",

      validation: {
        description:
          "Description must contain at least 2 characters.",

        amountRequired:
          "Amount is required.",

        amountPositive:
          "Amount must be greater than 0.",

        category:
          "Category is required.",

        date:
          "Date is required.",
      },

      toast: {
        added:
          "Expense added successfully.",

        updated:
          "Expense updated successfully.",

        deleted:
          "Expense deleted successfully.",
      },

      errors: {
        load:
          "Unable to load your expenses.",

        save:
          "Unable to save this expense.",

        delete:
          "Unable to delete this expense.",
      },
    },

    incomePage: {
      title: "Income",

      subtitle:
        "Manage and track your income.",

      addIncome:
        "Add income",

      addNewIncome:
        "Add new income",

      editIncome:
        "Edit income",

      deleteIncome:
        "Delete income",

      allIncome:
        "All income",

      noIncome:
        "No income yet",

      firstIncome:
        "Start by adding your first income.",

      source:
        "Source",

      sourcePlaceholder:
        "e.g. Salary",

      amount:
        "Amount",

      date:
        "Date",

      loading:
        "Loading income...",

      saving:
        "Saving...",

      saveChanges:
        "Save changes",

      deleting:
        "Deleting...",

      deleteDescription:
        "This action cannot be undone. This income will be permanently deleted from your account.",

      validation: {
        source:
          "Source must contain at least 2 characters.",

        amountRequired:
          "Amount is required.",

        amountPositive:
          "Amount must be greater than 0.",

        date:
          "Date is required.",
      },

      toast: {
        added:
          "Income added successfully.",

        updated:
          "Income updated successfully.",

        deleted:
          "Income deleted successfully.",
      },

      errors: {
        load:
          "Unable to load your income.",

        save:
          "Unable to save this income.",

        delete:
          "Unable to delete this income.",
      },
    },

    budget: {
      title:
        "Budgets",

      subtitle:
        "Set spending limits and track your progress.",

      addBudget:
        "Add Budget",

      updateBudget:
        "Update Budget",

      editBudget:
        "Edit Budget",

      deleteBudget:
        "Delete Budget",

      yourBudgets:
        "Your Budgets",

      noBudgets:
        "No budgets yet",

      firstBudget:
        "Create your first budget above.",

      category:
        "Category",

      categoryPlaceholder:
        "Food",

      amount:
        "Budget Amount",

      month:
        "Month",

      loading:
        "Loading budgets...",

      used:
        "used",

      remaining:
        "Remaining",

      deleting:
        "Deleting...",

      deleteDescription:
        "This action cannot be undone. This budget will be permanently deleted from your account.",

      validation: {
        category:
          "Category must contain at least 2 characters.",

        amountRequired:
          "Amount is required.",

        amountPositive:
          "Amount must be greater than 0.",

        month:
          "Month is required.",
      },

      toast: {
        added:
          "Budget added successfully.",

        updated:
          "Budget updated successfully.",

        deleted:
          "Budget deleted successfully.",
      },

      errors: {
        load:
          "Failed to load budgets.",

        save:
          "Failed to save budget.",

        delete:
          "Failed to delete budget.",
      },
    },

    subscription: {
      title:
        "Subscriptions",

      subtitle:
        "Manage your recurring payments and upcoming subscriptions.",

      monthlyCost:
        "Monthly Cost",

      upcoming:
        "Upcoming",

      addSubscription:
        "Add Subscription",

      updateSubscription:
        "Update Subscription",

      editSubscription:
        "Edit Subscription",

      deleteSubscription:
        "Delete Subscription",

      name:
        "Name",

      amount:
        "Amount",

      frequency:
        "Frequency",

      nextPayment:
        "Next Payment",

      monthly:
        "Monthly",

      yearly:
        "Yearly",

      upcomingPayments:
        "Upcoming Payments",

      yourSubscriptions:
        "Your Subscriptions",

      loading:
        "Loading subscriptions...",

      noSubscriptions:
        "No subscriptions yet",

      firstSubscription:
        "Add your first subscription above.",

      today:
        "Today",

      tomorrow:
        "Tomorrow",

      inDays:
        "In {{count}} days",

      overdue:
        "Overdue",

      deleting:
        "Deleting...",

      deleteConfirmation:
        "Delete subscription?",

      deleteDescription:
        "This action cannot be undone. This subscription will be permanently deleted from your account.",

      validation: {
        name:
          "Name must contain at least 2 characters.",

        amountRequired:
          "Amount is required.",

        amountPositive:
          "Amount must be greater than 0.",

        nextPaymentDate:
          "Next payment date is required.",

        frequency:
          "Please select a valid frequency.",
      },

      toast: {
        added:
          "Subscription added successfully.",

        updated:
          "Subscription updated successfully.",

        deleted:
          "Subscription deleted successfully.",
      },

      errors: {
        load:
          "Failed to load subscriptions.",

        save:
          "Failed to save subscription.",

        delete:
          "Failed to delete subscription.",
      },
    },

    profile: {
      title:
        "Profile",

      subtitle:
        "Manage your account information and password.",

      personalInformation:
        "Personal Information",

      name:
        "Name",

      namePlaceholder:
        "Your name",

      email:
        "Email",

      emailCannotChange:
        "Email cannot be changed because it is used for authentication.",

      changePassword:
        "Change Password",

      passwordOptional:
        "Leave these fields empty if you don't want to change your password.",

      newPassword:
        "New Password",

      newPasswordPlaceholder:
        "New password",

      confirmPassword:
        "Confirm Password",

      confirmPasswordPlaceholder:
        "Confirm password",

      loading:
        "Loading profile...",

      saving:
        "Saving...",

      saveChanges:
        "Save Changes",

      profileUpdated:
        "Profile updated successfully.",

      validation: {
        name:
          "Name must contain at least 2 characters.",

        email:
          "Please enter a valid email.",

        passwordMismatch:
          "Passwords do not match.",
      },

      errors: {
        load:
          "Unable to load your profile.",

        update:
          "Unable to update your profile.",
      },
    },
  },
};

export default en;
