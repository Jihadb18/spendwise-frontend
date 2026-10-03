
const fr = {
  translation: {
    common: {
      save: "Enregistrer",
      cancel: "Annuler",
      edit: "Modifier",
      delete: "Supprimer",
      add: "Ajouter",
      close: "Fermer",
      loading: "Chargement...",
      noData: "Aucune donnée disponible",
      actions: "Actions",
    },

    navigation: {
      dashboard: "Tableau de bord",
      expenses: "Dépenses",
      income: "Revenus",
      budgets: "Budgets",
      subscriptions: "Abonnements",
      profile: "Profil",
      logout: "Déconnexion",
    },

    theme: {
      light: "Mode clair",
      dark: "Mode sombre",
    },

    language: {
      title: "Langue",
      english: "English",
      french: "Français",
      arabic: "العربية",
    },

    
auth: {
  login: "Se connecter",
  register: "Créer un compte",

  email: "E-mail",
  emailPlaceholder: "vous@exemple.com",

  password: "Mot de passe",

  name: "Nom complet",
  namePlaceholder: "Votre nom",

  welcomeBack:
    "Bon retour",

  loginSubtitle:
    "Connectez-vous à votre compte SpendWise",

  loginBrandDescription:
    "Prenez le contrôle de votre argent. Suivez vos dépenses, gérez vos budgets et comprenez vos habitudes de consommation.",

  loginHeadlineLine1:
    "Votre argent.",

  loginHeadlineLine2:
    "Vos objectifs.",

  loginHeadlineLine3:
    "Votre contrôle.",

  loginTagline:
    "La gestion financière personnelle simplifiée.",

  signingIn:
    "Connexion...",

  loginRequired:
    "Veuillez saisir votre e-mail et votre mot de passe.",

  invalidCredentials:
    "E-mail ou mot de passe incorrect.",

  loginError:
    "Une erreur s'est produite. Veuillez réessayer.",

  noAccount:
    "Vous n'avez pas encore de compte ?",

  createOne:
    "Créer un compte",

  createAccount:
    "Créez votre compte",

  registerSubtitle:
    "Commencez avec SpendWise",

  registerBrandDescription:
    "Commencez à gérer vos finances avec clarté et confiance.",

  registerHeadlineLine1:
    "Adoptez de meilleures",

  registerHeadlineLine2:
    "habitudes financières",

  registerHeadlineLine3:
    "au quotidien.",

  registerTagline:
    "Des outils simples pour prendre de meilleures décisions financières.",

  creatingAccount:
    "Création du compte...",

  haveAccount:
    "Vous avez déjà un compte ?",

  signIn:
    "Se connecter",

  accountCreated:
    "Compte créé avec succès.",

  registerError:
    "Impossible de créer votre compte.",

  signOut:
    "Se déconnecter",

  validation: {
    name:
      "Le nom doit contenir au moins 2 caractères.",

    email:
      "Veuillez saisir une adresse e-mail valide.",

    password:
      "Le mot de passe doit contenir au moins 6 caractères.",
  },
},


    dashboard: {
      title:
        "Tableau de bord",

      overview:
        "Vue d'ensemble de vos finances",

      balance:
        "Solde",

      currentBalance:
        "Solde actuel",

      income:
        "Revenus",

      expenses:
        "Dépenses",

      subscriptions:
        "Abonnements",

      thisMonth:
        "Ce mois-ci",

      vsPreviousMonth:
        "par rapport au mois précédent",

      monthlyCost:
        "Coût mensuel",

      spendingByCategory:
        "Dépenses par catégorie",

      noExpensesThisMonth:
        "Aucune dépense ce mois-ci.",

      spent:
        "Dépensé",

      upcomingSubscriptions:
        "Abonnements à venir",

      noUpcomingSubscriptions:
        "Aucun abonnement à venir.",

      budgetOverview:
        "Aperçu des budgets",

      noBudgets:
        "Aucun budget disponible.",

      spentOf:
        "dépensé sur",

      remaining:
        "Restant",
    },

    expense: {
      title:
        "Dépenses",

      subtitle:
        "Gérez et suivez vos dépenses.",

      addExpense:
        "Ajouter une dépense",

      addNewExpense:
        "Ajouter une nouvelle dépense",

      editExpense:
        "Modifier la dépense",

      deleteExpense:
        "Supprimer la dépense",

      allExpenses:
        "Toutes les dépenses",

      noExpenses:
        "Aucune dépense pour le moment",

      firstExpense:
        "Commencez par ajouter votre première dépense.",

      description:
        "Description",

      descriptionPlaceholder:
        "ex. Courses",

      amount:
        "Montant",

      category:
        "Catégorie",

      categoryPlaceholder:
        "ex. Alimentation",

      date:
        "Date",

      loading:
        "Chargement des dépenses...",

      saving:
        "Enregistrement...",

      saveChanges:
        "Enregistrer les modifications",

      deleting:
        "Suppression...",

      deleteDescription:
        "Cette action est irréversible. Cette dépense sera définitivement supprimée de votre compte.",

      validation: {
        description:
          "La description doit contenir au moins 2 caractères.",

        amountRequired:
          "Le montant est obligatoire.",

        amountPositive:
          "Le montant doit être supérieur à 0.",

        category:
          "La catégorie est obligatoire.",

        date:
          "La date est obligatoire.",
      },

      toast: {
        added:
          "Dépense ajoutée avec succès.",

        updated:
          "Dépense modifiée avec succès.",

        deleted:
          "Dépense supprimée avec succès.",
      },

      errors: {
        load:
          "Impossible de charger vos dépenses.",

        save:
          "Impossible d'enregistrer cette dépense.",

        delete:
          "Impossible de supprimer cette dépense.",
      },
    },

    incomePage: {
      title:
        "Revenus",

      subtitle:
        "Gérez et suivez vos revenus.",

      addIncome:
        "Ajouter un revenu",

      addNewIncome:
        "Ajouter un nouveau revenu",

      editIncome:
        "Modifier le revenu",

      deleteIncome:
        "Supprimer le revenu",

      allIncome:
        "Tous les revenus",

      noIncome:
        "Aucun revenu pour le moment",

      firstIncome:
        "Commencez par ajouter votre premier revenu.",

      source:
        "Source",

      sourcePlaceholder:
        "ex. Salaire",

      amount:
        "Montant",

      date:
        "Date",

      loading:
        "Chargement des revenus...",

      saving:
        "Enregistrement...",

      saveChanges:
        "Enregistrer les modifications",

      deleting:
        "Suppression...",

      deleteDescription:
        "Cette action est irréversible. Ce revenu sera définitivement supprimé de votre compte.",

      validation: {
        source:
          "La source doit contenir au moins 2 caractères.",

        amountRequired:
          "Le montant est obligatoire.",

        amountPositive:
          "Le montant doit être supérieur à 0.",

        date:
          "La date est obligatoire.",
      },

      toast: {
        added:
          "Revenu ajouté avec succès.",

        updated:
          "Revenu modifié avec succès.",

        deleted:
          "Revenu supprimé avec succès.",
      },

      errors: {
        load:
          "Impossible de charger vos revenus.",

        save:
          "Impossible d'enregistrer ce revenu.",

        delete:
          "Impossible de supprimer ce revenu.",
      },
    },

    budget: {
      title:
        "Budgets",

      subtitle:
        "Définissez des limites de dépenses et suivez votre progression.",

      addBudget:
        "Ajouter un budget",

      updateBudget:
        "Mettre à jour le budget",

      editBudget:
        "Modifier le budget",

      deleteBudget:
        "Supprimer le budget",

      yourBudgets:
        "Vos budgets",

      noBudgets:
        "Aucun budget pour le moment",

      firstBudget:
        "Créez votre premier budget ci-dessus.",

      category:
        "Catégorie",

      categoryPlaceholder:
        "Alimentation",

      amount:
        "Montant du budget",

      month:
        "Mois",

      loading:
        "Chargement des budgets...",

      used:
        "utilisé",

      remaining:
        "Restant",

      deleting:
        "Suppression...",

      deleteDescription:
        "Cette action est irréversible. Ce budget sera définitivement supprimé de votre compte.",

      validation: {
        category:
          "La catégorie doit contenir au moins 2 caractères.",

        amountRequired:
          "Le montant est obligatoire.",

        amountPositive:
          "Le montant doit être supérieur à 0.",

        month:
          "Le mois est obligatoire.",
      },

      toast: {
        added:
          "Budget ajouté avec succès.",

        updated:
          "Budget modifié avec succès.",

        deleted:
          "Budget supprimé avec succès.",
      },

      errors: {
        load:
          "Impossible de charger les budgets.",

        save:
          "Impossible d'enregistrer le budget.",

        delete:
          "Impossible de supprimer le budget.",
      },
    },

    subscription: {
      title:
        "Abonnements",

      subtitle:
        "Gérez vos paiements récurrents et vos abonnements à venir.",

      monthlyCost:
        "Coût mensuel",

      upcoming:
        "À venir",

      addSubscription:
        "Ajouter un abonnement",

      updateSubscription:
        "Mettre à jour l'abonnement",

      editSubscription:
        "Modifier l'abonnement",

      deleteSubscription:
        "Supprimer l'abonnement",

      name:
        "Nom",

      amount:
        "Montant",

      frequency:
        "Fréquence",

      nextPayment:
        "Prochain paiement",

      monthly:
        "Mensuel",

      yearly:
        "Annuel",

      upcomingPayments:
        "Paiements à venir",

      yourSubscriptions:
        "Vos abonnements",

      loading:
        "Chargement des abonnements...",

      noSubscriptions:
        "Aucun abonnement pour le moment",

      firstSubscription:
        "Ajoutez votre premier abonnement ci-dessus.",

      today:
        "Aujourd'hui",

      tomorrow:
        "Demain",

      inDays:
        "Dans {{count}} jours",

      overdue:
        "En retard",

      deleting:
        "Suppression...",

      deleteConfirmation:
        "Supprimer l'abonnement ?",

      deleteDescription:
        "Cette action est irréversible. Cet abonnement sera définitivement supprimé de votre compte.",

      validation: {
        name:
          "Le nom doit contenir au moins 2 caractères.",

        amountRequired:
          "Le montant est obligatoire.",

        amountPositive:
          "Le montant doit être supérieur à 0.",

        nextPaymentDate:
          "La date du prochain paiement est obligatoire.",

        frequency:
          "Veuillez sélectionner une fréquence valide.",
      },

      toast: {
        added:
          "Abonnement ajouté avec succès.",

        updated:
          "Abonnement modifié avec succès.",

        deleted:
          "Abonnement supprimé avec succès.",
      },

      errors: {
        load:
          "Impossible de charger les abonnements.",

        save:
          "Impossible d'enregistrer l'abonnement.",

        delete:
          "Impossible de supprimer l'abonnement.",
      },
    },

    profile: {
      title:
        "Profil",

      subtitle:
        "Gérez les informations de votre compte et votre mot de passe.",

      personalInformation:
        "Informations personnelles",

      name:
        "Nom",

      namePlaceholder:
        "Votre nom",

      email:
        "E-mail",

      emailCannotChange:
        "L'e-mail ne peut pas être modifié car il est utilisé pour l'authentification.",

      changePassword:
        "Modifier le mot de passe",

      passwordOptional:
        "Laissez ces champs vides si vous ne souhaitez pas modifier votre mot de passe.",

      newPassword:
        "Nouveau mot de passe",

      newPasswordPlaceholder:
        "Nouveau mot de passe",

      confirmPassword:
        "Confirmer le mot de passe",

      confirmPasswordPlaceholder:
        "Confirmez le mot de passe",

      loading:
        "Chargement du profil...",

      saving:
        "Enregistrement...",

      saveChanges:
        "Enregistrer les modifications",

      profileUpdated:
        "Profil mis à jour avec succès.",

      validation: {
        name:
          "Le nom doit contenir au moins 2 caractères.",

        email:
          "Veuillez saisir une adresse e-mail valide.",

        passwordMismatch:
          "Les mots de passe ne correspondent pas.",
      },

      errors: {
        load:
          "Impossible de charger votre profil.",

        update:
          "Impossible de mettre à jour votre profil.",
      },
    },
  },
};

export default fr;
