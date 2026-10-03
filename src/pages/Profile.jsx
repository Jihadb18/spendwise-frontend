
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Lock, Mail, Save, User } from "lucide-react";
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
import { toast } from "sonner";

function Profile() {
  const { t } = useTranslation();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const profileSchema = z
    .object({
      name: z
        .string()
        .min(
          2,
          t("profile.validation.name")
        ),

      email: z
        .string()
        .email(
          t("profile.validation.email")
        ),

      password: z.string().optional(),

      confirmPassword: z.string().optional(),
    })
    .refine(
      (data) => {
        if (!data.password) {
          return true;
        }

        return (
          data.password ===
          data.confirmPassword
        );
      },
      {
        message: t(
          "profile.validation.passwordMismatch"
        ),
        path: ["confirmPassword"],
      }
    );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    const loadProfile = async () => {
      try {
        setLoading(true);
        setError("");

        const response =
          await api.get("/users/me");

        reset({
          name: response.data.name || "",
          email: response.data.email || "",
          password: "",
          confirmPassword: "",
        });
      } catch (err) {
        console.error(err);

        setError(
          t("profile.errors.load")
        );
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [reset, t]);

  const onSubmit = async (data) => {
    try {
      setSaving(true);
      setError("");
      setSuccess("");

      await api.put("/users/me", {
        name: data.name,
        password: data.password || null,
      });

      const successMessage = t(
        "profile.profileUpdated"
      );

      setSuccess(successMessage);
      toast.success(successMessage);

      reset({
        name: data.name,
        email: data.email,
        password: "",
        confirmPassword: "",
      });
    } catch (err) {
      console.error(err);

      const message =
        err.response?.data?.message ||
        t("profile.errors.update");

      setError(message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-sm text-muted-foreground">
          {t("profile.loading")}
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          {t("profile.title")}
        </h1>

        <p className="text-sm text-muted-foreground">
          {t("profile.subtitle")}
        </p>
      </div>

      {/* Profile Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />

            {t("profile.personalInformation")}
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
          >
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name">
                {t("profile.name")}
              </Label>

              <Input
                id="name"
                placeholder={t(
                  "profile.namePlaceholder"
                )}
                {...register("name")}
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
                {t("profile.email")}
              </Label>

              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                <Input
                  id="email"
                  type="email"
                  className="pl-9"
                  readOnly
                  {...register("email")}
                />
              </div>

              <p className="text-xs text-muted-foreground">
                {t(
                  "profile.emailCannotChange"
                )}
              </p>
            </div>

            {/* Password */}
            <div className="border-t pt-6">
              <h2 className="mb-1 flex items-center gap-2 text-lg font-semibold">
                <Lock className="h-4 w-4" />

                {t("profile.changePassword")}
              </h2>

              <p className="mb-4 text-sm text-muted-foreground">
                {t(
                  "profile.passwordOptional"
                )}
              </p>

              <div className="grid gap-4 md:grid-cols-2">
                {/* New Password */}
                <div className="space-y-2">
                  <Label htmlFor="password">
                    {t(
                      "profile.newPassword"
                    )}
                  </Label>

                  <Input
                    id="password"
                    type="password"
                    placeholder={t(
                      "profile.newPasswordPlaceholder"
                    )}
                    {...register("password")}
                  />
                </div>

                {/* Confirm Password */}
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">
                    {t(
                      "profile.confirmPassword"
                    )}
                  </Label>

                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder={t(
                      "profile.confirmPasswordPlaceholder"
                    )}
                    {...register(
                      "confirmPassword"
                    )}
                  />

                  {errors.confirmPassword && (
                    <p className="text-sm text-red-500">
                      {
                        errors.confirmPassword
                          .message
                      }
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </div>
            )}

            {/* Success */}
            {success && (
              <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-600">
                {success}
              </div>
            )}

            {/* Save */}
            <Button
              type="submit"
              disabled={saving}
              className="gap-2"
            >
              <Save className="h-4 w-4" />

              {saving
                ? t("profile.saving")
                : t("profile.saveChanges")}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default Profile;
