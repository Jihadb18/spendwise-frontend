
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

function Register() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const isArabic = i18n.language === "ar";

  const registerSchema = z.object({
    name: z
      .string()
      .min(
        2,
        t("auth.validation.name")
      ),

    email: z
      .string()
      .email(
        t("auth.validation.email")
      ),

    password: z
      .string()
      .min(
        6,
        t("auth.validation.password")
      ),
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

      toast.success(
        t("auth.accountCreated")
      );

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
    <div
      dir="ltr"
      className={`flex min-h-screen bg-slate-950 ${
        isArabic ? "flex-row-reverse" : "flex-row"
      }`}
    >
      {/* ================= BRANDING SIDE ================= */}
      <div className="hidden flex-col justify-between p-12 text-white lg:flex lg:w-1/2">
        {/* Logo */}
        <div>
          <div className="text-2xl font-bold tracking-tight">
            SpendWise
          </div>

          <p className="mt-2 max-w-md text-slate-400">
            {t("auth.registerBrandDescription")}
          </p>
        </div>

        {/* Main message */}
        <div dir={isArabic ? "rtl" : "ltr"}>
          <p className="max-w-lg text-4xl font-semibold leading-tight">
            {t("auth.registerHeadlineLine1")}
            <br />
            {t("auth.registerHeadlineLine2")}
            <br />
            {t("auth.registerHeadlineLine3")}
          </p>

          <p className="mt-6 text-sm text-slate-500">
            {t("auth.registerTagline")}
          </p>
        </div>
      </div>

      {/* ================= FORM SIDE ================= */}
      <div className="flex flex-1 flex-col bg-slate-50 p-6">
        {/* Language */}
        <div className="flex w-full justify-end">
          <LanguageSwitcher />
        </div>

        {/* Form */}
        <div
          dir={isArabic ? "rtl" : "ltr"}
          className="flex flex-1 items-center justify-center"
        >
          <Card className="w-full max-w-md border-0 shadow-xl">
            <CardHeader className="space-y-2">
              <CardTitle className="text-2xl">
                {t("auth.createAccount")}
              </CardTitle>

              <p className="text-sm text-muted-foreground">
                {t("auth.registerSubtitle")}
              </p>
            </CardHeader>

            <CardContent>
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
                    placeholder={t(
                      "auth.namePlaceholder"
                    )}
                    {...register("name")}
                    disabled={isSubmitting}
                  />

                  {errors.name && (
                    <p className="text-sm text-red-500">
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
                    placeholder={t(
                      "auth.emailPlaceholder"
                    )}
                    {...register("email")}
                    disabled={isSubmitting}
                  />

                  {errors.email && (
                    <p className="text-sm text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <Label htmlFor="password">
                    {t("auth.password")}
                  </Label>

                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    {...register("password")}
                    disabled={isSubmitting}
                  />

                  {errors.password && (
                    <p className="text-sm text-red-500">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                {/* Submit */}
                <Button
                  className="w-full"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting
                    ? t("auth.creatingAccount")
                    : t("auth.createAccount")}
                </Button>
              </form>

              {/* Login */}
              <p className="mt-6 text-center text-sm text-muted-foreground">
                {t("auth.haveAccount")}{" "}

                <Link
                  to="/login"
                  className="font-medium text-primary hover:underline"
                >
                  {t("auth.signIn")}
                </Link>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Register;
