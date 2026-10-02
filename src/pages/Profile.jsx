import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Lock, Mail, Save, User } from "lucide-react";

import api from "@/services/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
const profileSchema = z
  .object({
    name: z
      .string()
      .min(2, "Name must contain at least 2 characters"),

    email: z.string().email("Please enter a valid email"),

    password: z.string().optional(),

    confirmPassword: z.string().optional(),
  })
  .refine(
    (data) => {
      if (!data.password) return true;
      return data.password === data.confirmPassword;
    },
    {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    }
  );

function Profile() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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

        const response = await api.get("/users/me");

        reset({
          name: response.data.name || "",
          email: response.data.email || "",
          password: "",
          confirmPassword: "",
        });
      } catch (err) {
        console.error(err);
        setError("Unable to load your profile.");
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [reset]);

  const onSubmit = async (data) => {
    try {
      setSaving(true);
      setError("");
      setSuccess("");

      await api.put("/users/me", {
        name: data.name,
        password: data.password || null,
      });

      toast.success("Profile updated successfully.");

      reset({
        name: data.name,
        email: data.email,
        password: "",
        confirmPassword: "",
      });
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message ||
          "Unable to update your profile."
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-sm text-muted-foreground">
          Loading profile...
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Profile
        </h1>

        <p className="text-sm text-muted-foreground">
          Manage your account information and password.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Personal Information
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
          >
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>

              <Input
                id="name"
                placeholder="Your name"
                {...register("name")}
              />

              {errors.name && (
                <p className="text-sm text-red-500">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>

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
                Email cannot be changed because it is used for authentication.
              </p>
            </div>

            <div className="border-t pt-6">
              <h2 className="mb-1 flex items-center gap-2 text-lg font-semibold">
                <Lock className="h-4 w-4" />
                Change Password
              </h2>

              <p className="mb-4 text-sm text-muted-foreground">
                Leave these fields empty if you don't want to change your password.
              </p>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="password">
                    New Password
                  </Label>

                  <Input
                    id="password"
                    type="password"
                    placeholder="New password"
                    {...register("password")}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">
                    Confirm Password
                  </Label>

                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm password"
                    {...register("confirmPassword")}
                  />

                  {errors.confirmPassword && (
                    <p className="text-sm text-red-500">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {error && (
              <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </div>
            )}

            {success && (
              <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-600">
                {success}
              </div>
            )}

            <Button
              type="submit"
              disabled={saving}
              className="gap-2"
            >
              <Save className="h-4 w-4" />

              {saving ? "Saving..." : "Save Changes"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default Profile;