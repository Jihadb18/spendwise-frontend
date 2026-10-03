
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useAuth } from "@/context/AuthContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const isArabic = i18n.language === "ar";

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");

    if (!email || !password) {
      setError(t("auth.loginRequired"));
      return;
    }

    setLoading(true);

    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error);

      if (error.response?.status === 401) {
        setError(t("auth.invalidCredentials"));
      } else if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError(t("auth.loginError"));
      }
    } finally {
      setLoading(false);
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
            {t("auth.loginBrandDescription")}
          </p>
        </div>

        {/* Main message */}
        <div dir={isArabic ? "rtl" : "ltr"}>
          <p className="max-w-lg text-5xl font-semibold leading-tight">
            {t("auth.loginHeadlineLine1")}
            <br />
            {t("auth.loginHeadlineLine2")}
            <br />
            {t("auth.loginHeadlineLine3")}
          </p>

          <p className="mt-6 text-sm text-slate-500">
            {t("auth.loginTagline")}
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
              <CardTitle className="text-2xl font-semibold">
                {t("auth.welcomeBack")}
              </CardTitle>

              <p className="text-sm text-muted-foreground">
                {t("auth.loginSubtitle")}
              </p>
            </CardHeader>

            <CardContent>
              <form
                onSubmit={handleSubmit}
                className="space-y-5"
              >
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
                    value={email}
                    onChange={(event) =>
                      setEmail(event.target.value)
                    }
                    disabled={loading}
                  />
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
                    value={password}
                    onChange={(event) =>
                      setPassword(event.target.value)
                    }
                    disabled={loading}
                  />
                </div>

                {/* Error */}
                {error && (
                  <div className="rounded-md bg-destructive/10 px-3 py-2">
                    <p className="text-sm text-destructive">
                      {error}
                    </p>
                  </div>
                )}

                {/* Submit */}
                <Button
                  className="w-full"
                  type="submit"
                  disabled={loading}
                >
                  {loading
                    ? t("auth.signingIn")
                    : t("auth.login")}
                </Button>
              </form>

              {/* Register */}
              <p className="mt-6 text-center text-sm text-muted-foreground">
                {t("auth.noAccount")}{" "}

                <Link
                  to="/register"
                  className="font-medium text-primary hover:underline"
                >
                  {t("auth.createOne")}
                </Link>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Login;
