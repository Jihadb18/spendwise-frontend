
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

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

import LanguageSwitcher from "@/components/LanguageSwitcher";

function EyeIcon({ className = "size-4" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className={className}
    >
      <path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z" />
      <circle cx="12" cy="12" r="2.5" />
    </svg>
  );
}

function EyeOffIcon({ className = "size-4" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className={className}
    >
      <path d="m3 3 18 18" />
      <path d="M10.6 10.6a2 2 0 0 0 2.8 2.8" />
      <path d="M9.9 5.2A10.8 10.8 0 0 1 12 5c6 0 9.5 7 9.5 7a16.7 16.7 0 0 1-3.1 3.9" />
      <path d="M6.6 6.6C3.8 8.5 2.5 12 2.5 12s3.5 6 9.5 6c1.1 0 2.1-.2 3-.5" />
    </svg>
  );
}

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

function Register() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const [showPassword, setShowPassword] = useState(false);

  const isArabic = i18n.language.startsWith("ar");

  const registerSchema = z.object({
    name: z
      .string()
      .min(2, t("auth.validation.name")),

    email: z
      .string()
      .email(t("auth.validation.email")),

    password: z
      .string()
      .min(6, t("auth.validation.password")),
  });

  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm({
    resolver: zodResolver(registerSchema),

    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      await api.post("/users", {
        name: data.name,
        email: data.email,
        password: data.password,
      });

      toast.success(t("auth.accountCreated"));

      navigate("/login");
    } catch (error) {
      console.error(error);

      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        t("auth.registerError");

      toast.error(message);
    }
  };

  return (
    <div className="dark min-h-screen bg-background text-foreground">
      <div
        dir="ltr"
        className={`flex min-h-screen ${
          isArabic ? "flex-row-reverse" : "flex-row"
        }`}
      >
        {/* =====================================================
            BRANDING
        ===================================================== */}

        <section className="relative hidden overflow-hidden bg-background lg:flex lg:w-[52%] lg:flex-col lg:justify-between lg:p-10 xl:p-14">
          {/* Background decoration */}
<div
  className="
    pointer-events-none
    absolute -left-32 top-1/4
    size-96
    rounded-full
    bg-white/40
    blur-3xl
  "
/>

<div
  className="
    pointer-events-none
    absolute -bottom-55 right-9
    size-96
    rounded-full
    bg-white/30
    blur-3xl
  "
/>

<div
  className="
    pointer-events-none
    absolute -right-12 top-1/36
    size-56
    rounded-full
    bg-white/50
    blur-3xl
  "
/>

          {/* Logo */}
          <div className="relative z-10">
            <Link
              to="/"
              className="inline-flex items-center gap-3"
            >
             

              <span className="text-xl font-semibold tracking-tight">
                SpendWise
              </span>
            </Link>

            <p className="mt-4 max-w-sm text-sm leading-6 text-muted-foreground">
              {t("auth.registerBrandDescription")}
            </p>
          </div>

          {/* Main content */}
          <div
            dir={isArabic ? "rtl" : "ltr"}
            className="relative z-10"
          >
            <p className="max-w-xl text-4xl font-semibold leading-[1.08] tracking-tight xl:text-5xl">
              {t("auth.registerHeadlineLine1")}
              <br />
              {t("auth.registerHeadlineLine2")}
              <br />
              {t("auth.registerHeadlineLine3")}
            </p>

            <p className="mt-5 max-w-md text-sm leading-6 text-muted-foreground">
              {t("auth.registerTagline")}
            </p>

          
          </div>

        </section>

        {/* =====================================================
            FORM SIDE
        ===================================================== */}

        <section className="flex min-h-screen flex-1 flex-col bg-background">
          {/* Top bar */}
          <div className="flex items-center justify-between px-5 py-5 sm:px-8">
            {/* Mobile logo */}
            <Link
              to="/"
              className="flex items-center gap-2.5 lg:hidden"
            >
           

              <span className="font-semibold">
                SpendWise
              </span>
            </Link>

            <div className="ml-auto">
              <LanguageSwitcher />
            </div>
          </div>

          {/* Form */}
          <div
            dir={isArabic ? "rtl" : "ltr"}
            className="flex flex-1 items-center justify-center px-5 pb-10 sm:px-8"
          >
            <div className="w-full max-w-[420px]">
              {/* Heading */}
              <div className="mb-7">
               

                <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                  {t("auth.createAccount")}
                </h1>

                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {t("auth.registerSubtitle")}
                </p>
              </div>

              {/* Card */}
              <Card className="border-border bg-card shadow-xl shadow-black/5">
                <CardHeader className="sr-only">
                  <CardTitle>
                    {t("auth.createAccount")}
                  </CardTitle>
                </CardHeader>

                <CardContent className="p-6 sm:p-7">
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-5"
                  >
                    {/* Name */}
                    <div className="space-y-2">
                      <Label htmlFor="name">
                        {t("auth.name")}
                      </Label>

                      <Input
                        id="name"
                        type="text"
                        autoComplete="name"
                        placeholder={t(
                          "auth.namePlaceholder"
                        )}
                        {...register("name")}
                        disabled={isSubmitting}
                        className="h-10 bg-background"
                      />

                      {errors.name && (
                        <p className="text-sm text-destructive">
                          {errors.name.message}
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <Label htmlFor="email">
                        {t("auth.email")}
                      </Label>

                      <Input
                        id="email"
                        type="email"
                        autoComplete="email"
                        placeholder={t(
                          "auth.emailPlaceholder"
                        )}
                        {...register("email")}
                        disabled={isSubmitting}
                        className="h-10 bg-background"
                      />

                      {errors.email && (
                        <p className="text-sm text-destructive">
                          {errors.email.message}
                        </p>
                      )}
                    </div>

                    {/* Password */}
                    <div className="space-y-2">
                      <Label htmlFor="password">
                        {t("auth.password")}
                      </Label>

                      <div className="relative">
                        <Input
                          id="password"
                          type={
                            showPassword
                              ? "text"
                              : "password"
                          }
                          autoComplete="new-password"
                          placeholder="••••••••"
                          {...register("password")}
                          disabled={isSubmitting}
                          className="h-10 bg-background pe-10"
                        />

                        <button
                          type="button"
                          onClick={() =>
                            setShowPassword(
                              (value) => !value
                            )
                          }
                          disabled={isSubmitting}
                          className="
                            absolute
                            end-0 top-0
                            flex h-10 w-10
                            items-center justify-center
                            text-muted-foreground
                            transition-colors
                            hover:text-foreground
                          "
                          aria-label={
                            showPassword
                              ? "Hide password"
                              : "Show password"
                          }
                        >
                          {showPassword ? (
                            <EyeOffIcon />
                          ) : (
                            <EyeIcon />
                          )}
                        </button>
                      </div>

                      {errors.password && (
                        <p className="text-sm text-destructive">
                          {errors.password.message}
                        </p>
                      )}
                    </div>

                    {/* Submit */}
                    <Button
                      className="h-10 w-full"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <span className="size-3.5 animate-spin rounded-full border-2 border-current border-t-transparent" />
                          {t("auth.creatingAccount")}
                        </span>
                      ) : (
                        <>
                          {t("auth.createAccount")}
                          <ArrowRightIcon
                            className={
                              isArabic
                                ? "size-4 rotate-180"
                                : "size-4"
                            }
                          />
                        </>
                      )}
                    </Button>
                  </form>

                  {/* Login */}
                  <div className="mt-6 border-t border-border pt-6 text-center">
                    <p className="text-sm text-muted-foreground">
                      {t("auth.haveAccount")}{" "}
                      <Link
                        to="/login"
                        className="
                          font-medium
                          text-foreground
                          underline-offset-4
                          hover:underline
                        "
                      >
                        {t("auth.signIn")}
                      </Link>
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Footer */}
              <p className="mt-6 text-center text-xs text-muted-foreground">
                SpendWise · Smart financial management
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Register;
