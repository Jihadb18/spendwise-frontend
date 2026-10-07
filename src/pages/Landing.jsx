import { Link } from "react-router-dom";
import dashboardImage from "../assets/dash.PNG";
/* =========================================================
   DATA
========================================================= */

const stats = [
  {
    label: "Total Balance",
    value: "$3,250.75",
    change: "+12.4%",
  },
  {
    label: "Income",
    value: "$2,850.00",
    change: "+8.2%",
  },
  {
    label: "Expenses",
    value: "$1,599.25",
    change: "+5.1%",
  },
];

const transactions = [
  {
    name: "Restaurant",
    category: "Food",
    amount: "-$32.50",
    type: "expense",
  },
  {
    name: "Salary",
    category: "Income",
    amount: "+$2,800.00",
    type: "income",
  },
  {
    name: "Groceries",
    category: "Food",
    amount: "-$120.75",
    type: "expense",
  },
];

const budgets = [
  {
    name: "Food",
    spent: "$320",
    total: "$1,000",
    progress: "32%",
  },
  {
    name: "Housing",
    spent: "$650",
    total: "$1,000",
    progress: "65%",
  },
  {
    name: "Transport",
    spent: "$120",
    total: "$300",
    progress: "40%",
  },
];

/* =========================================================
   ICONS
========================================================= */

function ArrowRightIcon({ className = "size-4" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className={className}
    >
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

function ChartIcon({ className = "size-5" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className={className}
    >
      <path d="M4 19V5" />
      <path d="M4 19h16" />
      <path d="m7 15 3-4 3 2 5-7" />
    </svg>
  );
}

function WalletIcon({ className = "size-5" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className={className}
    >
      <path d="M20 7V6a2 2 0 0 0-2-2H5a3 3 0 0 0 0 6h15v8a2 2 0 0 1-2 2H5a3 3 0 0 1-3-3V7" />
      <path d="M16 14h.01" />
    </svg>
  );
}

function TargetIcon({ className = "size-5" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className={className}
    >
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1" />
    </svg>
  );
}

function MenuIcon({ className = "size-5" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className={className}
    >
      <path d="M4 6h16" />
      <path d="M4 12h16" />
      <path d="M4 18h16" />
    </svg>
  );
}

/* =========================================================
   LOGO
========================================================= */

function Logo() {
  return (
    <Link
      to="/"
      className="flex items-center gap-2.5"
    >
      
      <span className="text-lg font-semibold tracking-tight text-foreground">
        SpendWise
      </span>
    </Link>
  );
}

/* =========================================================
   DASHBOARD PREVIEW
========================================================= */

function DashboardPreview() {
  return (
    <div className="relative mx-auto mt-16 w-full max-w-6xl">
      <div className="overflow-hidden rounded-2xl border border-border bg-background shadow-2xl">
        
        {/* Browser header */}
        <div className="flex h-10 items-center gap-1.5 border-b border-border bg-muted/50 px-4">
          <span className="size-2.5 rounded-full bg-muted-foreground/30" />
          <span className="size-2.5 rounded-full bg-muted-foreground/30" />
          <span className="size-2.5 rounded-full bg-muted-foreground/30" />

          <div className="mx-auto hidden h-5 w-64 rounded-md border border-border bg-background sm:block" />
        </div>

        {/* Real dashboard image */}
        <img
          src={dashboardImage}
          alt="SpendWise dashboard preview"
          className="block h-auto w-full"
        />
      </div>
    </div>
  );
}

/* =========================================================
   DASHBOARD COMPONENTS
========================================================= */

function PreviewNavItem({ label, active = false }) {
  return (
    <div
      className={`
        rounded-md
        px-3 py-2
        text-[11px]
        transition-colors

        ${
          active
            ? "bg-sidebar-accent text-sidebar-accent-foreground"
            : "text-sidebar-foreground/60"
        }
      `}
    >
      {label}
    </div>
  );
}

function PreviewStat({
  label,
  value,
  change,
}) {
  return (
    <div
      className="
        rounded-xl
        border border-border
        bg-card
        p-4
        shadow-sm
      "
    >
      <div className="flex items-center justify-between">
        <span className="text-[11px] text-muted-foreground">
          {label}
        </span>

        <div
          className="
            flex size-7
            items-center justify-center
            rounded-md
            bg-muted
            text-muted-foreground
          "
        >
          <ChartIcon className="size-3.5" />
        </div>
      </div>

      <div className="mt-3 text-base font-semibold text-card-foreground">
        {value}
      </div>

      <div className="mt-1 text-[10px] text-muted-foreground">
        {change} this month
      </div>
    </div>
  );
}

function SpendingChart() {
  return (
    <div className="relative h-40">
      {/* Grid */}
      <div className="absolute inset-0 flex flex-col justify-between">
        <div className="border-t border-dashed border-border" />
        <div className="border-t border-dashed border-border" />
        <div className="border-t border-dashed border-border" />
        <div className="border-t border-dashed border-border" />
      </div>

      {/* Chart */}
      <svg
        viewBox="0 0 600 180"
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient
            id="dashboardChart"
            x1="0"
            x2="0"
            y1="0"
            y2="1"
          >
            <stop
              offset="0%"
              stopColor="currentColor"
              stopOpacity="0.15"
            />

            <stop
              offset="100%"
              stopColor="currentColor"
              stopOpacity="0"
            />
          </linearGradient>
        </defs>

        <path
          d="
            M0 145
            C70 105 80 130 130 110
            S210 130 260 88
            S330 105 375 75
            S450 95 490 55
            S550 65 600 35
            L600 180
            L0 180
            Z
          "
          fill="url(#dashboardChart)"
          className="text-foreground"
        />

        <path
          d="
            M0 145
            C70 105 80 130 130 110
            S210 130 260 88
            S330 105 375 75
            S450 95 490 55
            S550 65 600 35
          "
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          className="text-foreground"
        />
      </svg>

      {/* Months */}
      <div
        className="
          absolute
          -bottom-1
          left-0 right-0
          flex justify-between
          text-[9px]
          text-muted-foreground
        "
      >
        <span>Jan</span>
        <span>Feb</span>
        <span>Mar</span>
        <span>Apr</span>
        <span>May</span>
        <span>Jun</span>
        <span>Jul</span>
      </div>
    </div>
  );
}

function ExpenseDonut() {
  return (
    <div
      className="
        relative size-24
        shrink-0
        rounded-full
        bg-[conic-gradient(currentColor_0_32%,transparent_32%_56%,currentColor_56%_71%,transparent_71%)]
        text-foreground
      "
    >
      <div
        className="
          absolute inset-4
          flex items-center justify-center
          rounded-full
          bg-card
        "
      >
        <div className="text-center">
          <div className="text-xs font-semibold text-card-foreground">
            $1,599
          </div>

          <div className="text-[8px] text-muted-foreground">
            Expenses
          </div>
        </div>
      </div>
    </div>
  );
}

function BreakdownItem({
  label,
  value,
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span
          className="
            size-2
            rounded-full
            bg-foreground/60
          "
        />

        <span className="text-[11px] text-muted-foreground">
          {label}
        </span>
      </div>

      <span className="text-[11px] font-medium text-card-foreground">
        {value}
      </span>
    </div>
  );
}

function Transaction({
  name,
  category,
  amount,
  type,
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2.5">
        <div
          className="
            flex size-8
            items-center justify-center
            rounded-lg
            bg-muted
            text-muted-foreground
          "
        >
          <WalletIcon className="size-3.5" />
        </div>

        <div>
          <p className="text-[11px] font-medium text-card-foreground">
            {name}
          </p>

          <p className="text-[9px] text-muted-foreground">
            {category}
          </p>
        </div>
      </div>

      <span
        className={`
          text-[11px]
          font-semibold
          ${
            type === "income"
              ? "text-foreground"
              : "text-muted-foreground"
          }
        `}
      >
        {amount}
      </span>
    </div>
  );
}

function Budget({
  name,
  spent,
  total,
  progress,
}) {
  return (
    <div>
      <div className="mb-1.5 flex justify-between">
        <span className="text-[11px] text-muted-foreground">
          {name}
        </span>

        <span className="text-[10px] text-card-foreground">
          {spent} / {total}
        </span>
      </div>

      <div className="h-1.5 overflow-hidden rounded-full bg-muted">
        <div
          className="
            h-full
            rounded-full
            bg-foreground
            transition-all
          "
          style={{ width: progress }}
        />
      </div>
    </div>
  );
}

/* =========================================================
   FEATURES
========================================================= */

function FeatureCard({
  icon,
  title,
  description,
}) {
  return (
    <div
      className="
        rounded-xl
        border border-border
        bg-card
        p-6
        shadow-sm
        transition-all
        hover:-translate-y-1
        hover:shadow-md
      "
    >
      <div
        className="
          flex size-10
          items-center justify-center
          rounded-lg
          bg-muted
          text-foreground
        "
      >
        {icon}
      </div>

      <h3 className="mt-5 font-semibold text-card-foreground">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-muted-foreground">
        {description}
      </p>
    </div>
  );
}

/* =========================================================
   STEP
========================================================= */

function Step({
  number,
  title,
  description,
}) {
  return (
    <div className="text-center">
      <div
        className="
          mx-auto flex size-11
          items-center justify-center
          rounded-lg
          border border-border
          bg-card
          text-sm font-semibold
          text-foreground
          shadow-sm
        "
      >
        {number}
      </div>

      <h3 className="mt-5 font-semibold text-foreground">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-muted-foreground">
        {description}
      </p>
    </div>
  );
}

/* =========================================================
   LANDING PAGE
========================================================= */

export default function Landing() {
  return (
    <div className="dark min-h-screen bg-background text-foreground">
      {/* =====================================================
          NAVBAR
      ===================================================== */}

      <header
        className="
          sticky top-0 z-50
       
          bg-background/80
          backdrop-blur-xl
        "
      >
        <div
          className="
            mx-auto
            flex h-16
            max-w-7xl
            items-center
            justify-between
            px-5
            sm:px-8
          "
        >
          <Logo />

          {/* Desktop navigation */}
          <nav className="hidden items-center gap-7 md:flex">
            <a
              href="#home"
              className="
                text-sm
                text-muted-foreground
                transition-colors
                hover:text-foreground
              "
            >
              Home
            </a>

            <a
              href="#features"
              className="
                text-sm
                text-muted-foreground
                transition-colors
                hover:text-foreground
              "
            >
              Features
            </a>

            <a
              href="#how-it-works"
              className="
                text-sm
                text-muted-foreground
                transition-colors
                hover:text-foreground
              "
            >
              How it works
            </a>

            <a
              href="#contact"
              className="
                text-sm
                text-muted-foreground
                transition-colors
                hover:text-foreground
              "
            >
              Contact
            </a>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Link
              to="/login"
              className="
                hidden
                rounded-lg
                px-3 py-2
                text-sm font-medium
                text-muted-foreground
                transition-colors
                hover:bg-muted
                hover:text-foreground
                sm:block
              "
            >
              Login
            </Link>

            <Link
              to="/register"
              className="
                inline-flex
                items-center
                gap-2
                rounded-lg
                bg-primary
                px-4 py-2
                text-sm font-medium
                text-primary-foreground
                shadow-sm
                transition-all
                hover:bg-primary/80
              "
            >
              Get Started

            </Link>

            {/* Mobile menu visual */}
            <button
              type="button"
              className="
                flex size-9
                items-center justify-center
                rounded-lg
                border border-border
                bg-background
                text-foreground
                md:hidden
              "
              aria-label="Open menu"
            >
              <MenuIcon className="size-4" />
            </button>
          </div>
        </div>
      </header>

      {/* =====================================================
          HERO
      ===================================================== */}

      <main>
        <section
          id="home"
          className="
            relative
            overflow-hidden
            px-5
            pb-8
            pt-20
            sm:px-8
            sm:pt-28
          "
        >
          {/* Background decoration */}
<div
  className="
    pointer-events-none
    absolute -right-32 top-1/25
    size-96
    rounded-full
    bg-white/15
    blur-3xl
  "
/>
 <div
  className="
    pointer-events-none
    absolute -left-32 bottom-1/3
    size-96
    rounded-full
    bg-white/15
    blur-3xl
  "
/>
<div
  className="
    pointer-events-none
    absolute -left-32 top-1/5
    size-96
    rounded-full
    bg-white/15
    blur-3xl
  "
/>
<div
  className="
    pointer-events-none
    absolute -top-25 right-9
    size-96
    rounded-full
    bg-white/15
    blur-3xl
  "
/>

<div
  className="
    pointer-events-none
    absolute -right-17 bottom-1/10
    size-96
    rounded-full
    bg-white/20
    blur-3xl
  "
/>
          {/* subtle background */}
          <div
            className="
              pointer-events-none
              absolute
              left-1/2
              top-0
              -z-10
              h-96
              w-[700px]
              -translate-x-1/2
              rounded-full
              bg-muted/50
              blur-3xl
            "
          />

          <div className="mx-auto max-w-4xl text-center">
            {/* Badge */}
            <div
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                border border-border
                bg-muted/50
                px-3.5 py-1.5
                text-xs
                font-medium
                text-muted-foreground
              "
            >
              <span className="size-1.5 rounded-full bg-foreground/60" />

              Smart money management
            </div>

            {/* Heading */}
            <h1
              className="
                mt-7
                text-5xl
                font-semibold
                leading-[1.05]
                tracking-[-0.04em]
                text-foreground
                sm:text-6xl
                lg:text-7xl
              "
            >
              Manage Your
              <br />
              Finances Smarter
            </h1>

            {/* Description */}
            <p
              className="
                mx-auto
                mt-6
                max-w-2xl
                text-base
                leading-7
                text-muted-foreground
                sm:text-lg
              "
            >
              Track your expenses, manage your budgets,
              and understand your money — all from one
              simple and secure financial dashboard.
            </p>

            {/* CTA */}
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                to="/register"
                className="
                  inline-flex
                  h-10
                  items-center
                  justify-center
                  gap-2
                  rounded-lg
                  bg-primary
                  px-5
                  text-sm
                  font-medium
                  text-primary-foreground
                  shadow-sm
                  transition-all
                  hover:bg-primary/80
                "
              >
                Start for free

                <ArrowRightIcon className="size-4" />
              </Link>

              <Link
                to="/login"
                className="
                  inline-flex
                  h-10
                  items-center
                  justify-center
                  rounded-lg
                  border border-border
                  bg-background
                  px-5
                  text-sm
                  font-medium
                  text-foreground
                  transition-colors
                  hover:bg-muted
                "
              >
                Sign in
              </Link>
            </div>
          </div>

          {/* Dashboard */}
          <DashboardPreview />
        </section>

        {/* ===================================================
            FEATURES
        =================================================== */}

        <section
          id="features"
          className="
            border-t border-border
            px-5
            py-24
            sm:px-8
          "
        >
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-medium text-muted-foreground">
                Everything in one place
              </p>

              <h2
                className="
                  mt-3
                  text-3xl
                  font-semibold
                  tracking-tight
                  text-foreground
                  sm:text-4xl
                "
              >
                Your finances, without the complexity.
              </h2>

              <p className="mt-4 text-muted-foreground">
                SpendWise gives you the tools you need
                to understand and manage your money.
              </p>
            </div>

            <div className="mt-12 grid gap-5 md:grid-cols-3">
              <FeatureCard
                icon={<WalletIcon />}
                title="Track your expenses"
                description="Keep a clear record of your spending and know exactly where your money goes."
              />

              <FeatureCard
                icon={<TargetIcon />}
                title="Manage your budgets"
                description="Set budgets for different categories and monitor your progress throughout the month."
              />

              <FeatureCard
                icon={<ChartIcon />}
                title="Understand your finances"
                description="Use your financial dashboard to see income, expenses, balance and spending trends."
              />
            </div>
          </div>
        </section>

        {/* ===================================================
            HOW IT WORKS
        =================================================== */}

        <section
          id="how-it-works"
          className="
            border-y border-border
            bg-muted/30
            px-5
            py-24
            sm:px-8
          "
        >
          <div className="mx-auto max-w-6xl">
            <div className="text-center">
              <p className="text-sm font-medium text-muted-foreground">
                How it works
              </p>

              <h2
                className="
                  mt-3
                  text-3xl
                  font-semibold
                  tracking-tight
                  text-foreground
                "
              >
                Simple from day one.
              </h2>
            </div>

            <div className="mt-14 grid gap-10 md:grid-cols-3">
              <Step
                number="01"
                title="Create your account"
                description="Sign up and create your personal SpendWise account in a few simple steps."
              />

              <Step
                number="02"
                title="Track your money"
                description="Add your income, expenses and budgets to keep everything organized."
              />

              <Step
                number="03"
                title="Make better decisions"
                description="Use your dashboard and insights to understand your financial habits."
              />
            </div>
          </div>
        </section>

        {/* ===================================================
            CTA
        =================================================== */}

        <section
          id="contact"
          className="px-5 py-24 sm:px-8"
        >
          <div
            className="
              mx-auto
              max-w-5xl
              rounded-2xl
              border border-border
              bg-card
              px-7 py-14
              text-center
              shadow-sm
              sm:px-12
            "
          >
            <p className="text-sm font-medium text-muted-foreground">
              Take control of your finances
            </p>

            <h2
              className="
                mx-auto
                mt-3
                max-w-2xl
                text-3xl
                font-semibold
                tracking-tight
                text-card-foreground
                sm:text-4xl
              "
            >
              Start managing your money with SpendWise.
            </h2>

            <p
              className="
                mx-auto
                mt-4
                max-w-xl
                text-muted-foreground
              "
            >
              A simple way to track expenses, manage
              budgets and understand your financial life.
            </p>

            <Link
              to="/register"
              className="
                mt-8
                inline-flex
                h-10
                items-center
                gap-2
                rounded-lg
                bg-primary
                px-5
                text-sm
                font-medium
                text-primary-foreground
                shadow-sm
                transition-all
                hover:bg-primary/80
              "
            >
              Get Started

              <ArrowRightIcon className="size-4" />
            </Link>
          </div>
        </section>
      </main>

      {/* =====================================================
          FOOTER
      ===================================================== */}

      <footer className="border-t border-border">
        <div
          className="
            mx-auto
            flex max-w-7xl
            flex-col
            items-center
            justify-between
            gap-4
            px-5 py-7
            text-sm
            sm:flex-row
            sm:px-8
          "
        >
          <Logo />

          <p className="text-muted-foreground">
            © 2026 SpendWise. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}