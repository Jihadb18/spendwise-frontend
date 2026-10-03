
const ar = {
  translation: {
    common: {
      save: "حفظ",
      cancel: "إلغاء",
      edit: "تعديل",
      delete: "حذف",
      add: "إضافة",
      close: "إغلاق",
      loading: "جارٍ التحميل...",
      noData: "لا توجد بيانات متاحة",
      actions: "الإجراءات",
    },

    navigation: {
      dashboard: "لوحة التحكم",
      expenses: "المصاريف",
      income: "الدخل",
      budgets: "الميزانيات",
      subscriptions: "الاشتراكات",
      profile: "الملف الشخصي",
      logout: "تسجيل الخروج",
    },

    theme: {
      light: "الوضع الفاتح",
      dark: "الوضع الداكن",
    },

    language: {
      title: "اللغة",
      english: "English",
      french: "Français",
      arabic: "العربية",
    },

   
auth: {
  login: "تسجيل الدخول",
  register: "إنشاء حساب",

  email: "البريد الإلكتروني",
  emailPlaceholder: "you@example.com",

  password: "كلمة المرور",

  name: "الاسم الكامل",
  namePlaceholder: "اسمك",

  welcomeBack:
    "مرحباً بعودتك",

  loginSubtitle:
    "سجّل الدخول إلى حسابك في SpendWise",

  loginBrandDescription:
    "تحكم في أموالك. تتبع مصاريفك، وأدر ميزانياتك، وافهم عادات إنفاقك.",

  loginHeadlineLine1:
    "أموالك.",

  loginHeadlineLine2:
    "أهدافك.",

  loginHeadlineLine3:
    "تحكمك.",

  loginTagline:
    "إدارة مالية شخصية بطريقة بسيطة.",

  signingIn:
    "جارٍ تسجيل الدخول...",

  loginRequired:
    "يرجى إدخال البريد الإلكتروني وكلمة المرور.",

  invalidCredentials:
    "البريد الإلكتروني أو كلمة المرور غير صحيحة.",

  loginError:
    "حدث خطأ ما. يرجى المحاولة مرة أخرى.",

  noAccount:
    "ليس لديك حساب؟",

  createOne:
    "أنشئ حساباً",

  createAccount:
    "أنشئ حسابك",

  registerSubtitle:
    "ابدأ باستخدام SpendWise",

  registerBrandDescription:
    "ابدأ في إدارة أموالك بوضوح وثقة.",

  registerHeadlineLine1:
    "ابنِ",

  registerHeadlineLine2:
    "عادات مالية أفضل",

  registerHeadlineLine3:
    "كل يوم.",

  registerTagline:
    "أدوات بسيطة لاتخاذ قرارات مالية أكثر ذكاءً.",

  creatingAccount:
    "جارٍ إنشاء الحساب...",

  haveAccount:
    "لديك حساب بالفعل؟",

  signIn:
    "تسجيل الدخول",

  accountCreated:
    "تم إنشاء الحساب بنجاح.",

  registerError:
    "تعذر إنشاء حسابك.",

  signOut:
    "تسجيل الخروج",

  validation: {
    name:
      "يجب أن يحتوي الاسم على حرفين على الأقل.",

    email:
      "يرجى إدخال بريد إلكتروني صالح.",

    password:
      "يجب أن تحتوي كلمة المرور على 6 أحرف على الأقل.",
  },
},


    dashboard: {
      title:
        "لوحة التحكم",

      overview:
        "نظرة عامة على وضعك المالي",

      balance:
        "الرصيد",

      currentBalance:
        "الرصيد الحالي",

      income:
        "الدخل",

      expenses:
        "المصاريف",

      subscriptions:
        "الاشتراكات",

      thisMonth:
        "هذا الشهر",

      vsPreviousMonth:
        "مقارنة بالشهر السابق",

      monthlyCost:
        "التكلفة الشهرية",

      spendingByCategory:
        "المصاريف حسب الفئة",

      noExpensesThisMonth:
        "لا توجد مصاريف هذا الشهر.",

      spent:
        "تم إنفاق",

      upcomingSubscriptions:
        "الاشتراكات القادمة",

      noUpcomingSubscriptions:
        "لا توجد اشتراكات قادمة.",

      budgetOverview:
        "نظرة عامة على الميزانيات",

      noBudgets:
        "لا توجد ميزانيات متاحة.",

      spentOf:
        "من أصل",

      remaining:
        "المتبقي",
    },

    expense: {
      title:
        "المصاريف",

      subtitle:
        "قم بإدارة وتتبع مصاريفك.",

      addExpense:
        "إضافة مصروف",

      addNewExpense:
        "إضافة مصروف جديد",

      editExpense:
        "تعديل المصروف",

      deleteExpense:
        "حذف المصروف",

      allExpenses:
        "جميع المصاريف",

      noExpenses:
        "لا توجد مصاريف حالياً",

      firstExpense:
        "ابدأ بإضافة أول مصروف لك.",

      description:
        "الوصف",

      descriptionPlaceholder:
        "مثال: مشتريات المنزل",

      amount:
        "المبلغ",

      category:
        "الفئة",

      categoryPlaceholder:
        "مثال: الطعام",

      date:
        "التاريخ",

      loading:
        "جارٍ تحميل المصاريف...",

      saving:
        "جارٍ الحفظ...",

      saveChanges:
        "حفظ التغييرات",

      deleting:
        "جارٍ الحذف...",

      deleteDescription:
        "لا يمكن التراجع عن هذا الإجراء. سيتم حذف هذا المصروف نهائياً من حسابك.",

      validation: {
        description:
          "يجب أن يحتوي الوصف على حرفين على الأقل.",

        amountRequired:
          "المبلغ مطلوب.",

        amountPositive:
          "يجب أن يكون المبلغ أكبر من 0.",

        category:
          "الفئة مطلوبة.",

        date:
          "التاريخ مطلوب.",
      },

      toast: {
        added:
          "تمت إضافة المصروف بنجاح.",

        updated:
          "تم تعديل المصروف بنجاح.",

        deleted:
          "تم حذف المصروف بنجاح.",
      },

      errors: {
        load:
          "تعذر تحميل مصاريفك.",

        save:
          "تعذر حفظ هذا المصروف.",

        delete:
          "تعذر حذف هذا المصروف.",
      },
    },

    incomePage: {
      title:
        "الدخل",

      subtitle:
        "قم بإدارة وتتبع دخلك.",

      addIncome:
        "إضافة دخل",

      addNewIncome:
        "إضافة دخل جديد",

      editIncome:
        "تعديل الدخل",

      deleteIncome:
        "حذف الدخل",

      allIncome:
        "جميع المداخيل",

      noIncome:
        "لا يوجد دخل حالياً",

      firstIncome:
        "ابدأ بإضافة أول دخل لك.",

      source:
        "المصدر",

      sourcePlaceholder:
        "مثال: الراتب",

      amount:
        "المبلغ",

      date:
        "التاريخ",

      loading:
        "جارٍ تحميل الدخل...",

      saving:
        "جارٍ الحفظ...",

      saveChanges:
        "حفظ التغييرات",

      deleting:
        "جارٍ الحذف...",

      deleteDescription:
        "لا يمكن التراجع عن هذا الإجراء. سيتم حذف هذا الدخل نهائياً من حسابك.",

      validation: {
        source:
          "يجب أن يحتوي المصدر على حرفين على الأقل.",

        amountRequired:
          "المبلغ مطلوب.",

        amountPositive:
          "يجب أن يكون المبلغ أكبر من 0.",

        date:
          "التاريخ مطلوب.",
      },

      toast: {
        added:
          "تمت إضافة الدخل بنجاح.",

        updated:
          "تم تعديل الدخل بنجاح.",

        deleted:
          "تم حذف الدخل بنجاح.",
      },

      errors: {
        load:
          "تعذر تحميل دخلك.",

        save:
          "تعذر حفظ هذا الدخل.",

        delete:
          "تعذر حذف هذا الدخل.",
      },
    },

    budget: {
      title:
        "الميزانيات",

      subtitle:
        "حدد حدود الإنفاق وتتبع تقدمك.",

      addBudget:
        "إضافة ميزانية",

      updateBudget:
        "تحديث الميزانية",

      editBudget:
        "تعديل الميزانية",

      deleteBudget:
        "حذف الميزانية",

      yourBudgets:
        "ميزانياتك",

      noBudgets:
        "لا توجد ميزانيات حالياً",

      firstBudget:
        "أنشئ أول ميزانية لك أعلاه.",

      category:
        "الفئة",

      categoryPlaceholder:
        "الطعام",

      amount:
        "مبلغ الميزانية",

      month:
        "الشهر",

      loading:
        "جارٍ تحميل الميزانيات...",

      used:
        "مستخدم",

      remaining:
        "المتبقي",

      deleting:
        "جارٍ الحذف...",

      deleteDescription:
        "لا يمكن التراجع عن هذا الإجراء. سيتم حذف هذه الميزانية نهائياً من حسابك.",

      validation: {
        category:
          "يجب أن تحتوي الفئة على حرفين على الأقل.",

        amountRequired:
          "المبلغ مطلوب.",

        amountPositive:
          "يجب أن يكون المبلغ أكبر من 0.",

        month:
          "الشهر مطلوب.",
      },

      toast: {
        added:
          "تمت إضافة الميزانية بنجاح.",

        updated:
          "تم تعديل الميزانية بنجاح.",

        deleted:
          "تم حذف الميزانية بنجاح.",
      },

      errors: {
        load:
          "تعذر تحميل الميزانيات.",

        save:
          "تعذر حفظ الميزانية.",

        delete:
          "تعذر حذف الميزانية.",
      },
    },

    subscription: {
      title:
        "الاشتراكات",

      subtitle:
        "قم بإدارة دفعاتك المتكررة والاشتراكات القادمة.",

      monthlyCost:
        "التكلفة الشهرية",

      upcoming:
        "القادمة",

      addSubscription:
        "إضافة اشتراك",

      updateSubscription:
        "تحديث الاشتراك",

      editSubscription:
        "تعديل الاشتراك",

      deleteSubscription:
        "حذف الاشتراك",

      name:
        "الاسم",

      amount:
        "المبلغ",

      frequency:
        "التكرار",

      nextPayment:
        "الدفعة القادمة",

      monthly:
        "شهري",

      yearly:
        "سنوي",

      upcomingPayments:
        "الدفعات القادمة",

      yourSubscriptions:
        "اشتراكاتك",

      loading:
        "جارٍ تحميل الاشتراكات...",

      noSubscriptions:
        "لا توجد اشتراكات حالياً",

      firstSubscription:
        "أضف أول اشتراك لك أعلاه.",

      today:
        "اليوم",

      tomorrow:
        "غداً",

      inDays:
        "بعد {{count}} أيام",

      overdue:
        "متأخر",

      deleting:
        "جارٍ الحذف...",

      deleteConfirmation:
        "حذف الاشتراك؟",

      deleteDescription:
        "لا يمكن التراجع عن هذا الإجراء. سيتم حذف هذا الاشتراك نهائياً من حسابك.",

      validation: {
        name:
          "يجب أن يحتوي الاسم على حرفين على الأقل.",

        amountRequired:
          "المبلغ مطلوب.",

        amountPositive:
          "يجب أن يكون المبلغ أكبر من 0.",

        nextPaymentDate:
          "تاريخ الدفعة القادمة مطلوب.",

        frequency:
          "يرجى اختيار تكرار صالح.",
      },

      toast: {
        added:
          "تمت إضافة الاشتراك بنجاح.",

        updated:
          "تم تعديل الاشتراك بنجاح.",

        deleted:
          "تم حذف الاشتراك بنجاح.",
      },

      errors: {
        load:
          "تعذر تحميل الاشتراكات.",

        save:
          "تعذر حفظ الاشتراك.",

        delete:
          "تعذر حذف الاشتراك.",
      },
    },

    profile: {
      title:
        "الملف الشخصي",

      subtitle:
        "قم بإدارة معلومات حسابك وكلمة المرور.",

      personalInformation:
        "المعلومات الشخصية",

      name:
        "الاسم",

      namePlaceholder:
        "اسمك",

      email:
        "البريد الإلكتروني",

      emailCannotChange:
        "لا يمكن تغيير البريد الإلكتروني لأنه يُستخدم لتسجيل الدخول.",

      changePassword:
        "تغيير كلمة المرور",

      passwordOptional:
        "اترك هذه الحقول فارغة إذا كنت لا تريد تغيير كلمة المرور.",

      newPassword:
        "كلمة المرور الجديدة",

      newPasswordPlaceholder:
        "كلمة المرور الجديدة",

      confirmPassword:
        "تأكيد كلمة المرور",

      confirmPasswordPlaceholder:
        "أعد كتابة كلمة المرور",

      loading:
        "جارٍ تحميل الملف الشخصي...",

      saving:
        "جارٍ الحفظ...",

      saveChanges:
        "حفظ التغييرات",

      profileUpdated:
        "تم تحديث الملف الشخصي بنجاح.",

      validation: {
        name:
          "يجب أن يحتوي الاسم على حرفين على الأقل.",

        email:
          "يرجى إدخال بريد إلكتروني صالح.",

        passwordMismatch:
          "كلمتا المرور غير متطابقتين.",
      },

      errors: {
        load:
          "تعذر تحميل ملفك الشخصي.",

        update:
          "تعذر تحديث ملفك الشخصي.",
      },
    },
  },
};

export default ar;
