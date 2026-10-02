
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

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

const registerSchema = z.object({
  name: z
    .string()
    .min(2, "Name must contain at least 2 characters"),

  email: z
    .string()
    .email("Please enter a valid email address"),

  password: z
    .string()
    .min(6, "Password must contain at least 6 characters"),
});

function Register() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
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

      toast.success("Account created successfully.");

      navigate("/login");
    } catch (error) {
      console.error(error);

      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Unable to create your account.";

      toast.error(message);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex">

      {/* Left side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 text-white">
        <div>
          <div className="text-2xl font-bold tracking-tight">
            SpendWise
          </div>

          <p className="mt-2 text-slate-400 max-w-md">
            Start managing your finances with clarity and confidence.
          </p>
        </div>

        <div>
          <p className="text-4xl font-semibold leading-tight max-w-lg">
            Build better
            <br />
            money habits.
          </p>

          <p className="mt-6 text-sm text-slate-500">
            Simple tools for smarter financial decisions.
          </p>
        </div>
      </div>

      {/* Right side - Register */}
      <div className="flex-1 flex items-center justify-center bg-slate-50 p-6">
        <Card className="w-full max-w-md shadow-xl border-0">
          <CardHeader className="space-y-2">
            <CardTitle className="text-2xl">
              Create your account
            </CardTitle>

            <p className="text-sm text-muted-foreground">
              Get started with SpendWise
            </p>
          </CardHeader>

          <CardContent>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-5"
            >

              <div className="space-y-2">
                <Label htmlFor="name">
                  Full name
                </Label>

                <Input
                  id="name"
                  type="text"
                  placeholder="Your name"
                  {...register("name")}
                  disabled={isSubmitting}
                />

                {errors.name && (
                  <p className="text-sm text-red-500">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">
                  Email
                </Label>

                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  {...register("email")}
                  disabled={isSubmitting}
                />

                {errors.email && (
                  <p className="text-sm text-red-500">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">
                  Password
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

              <Button
                className="w-full"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting
                  ? "Creating account..."
                  : "Create account"}
              </Button>

            </form>

            <p className="mt-6 text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-primary hover:underline"
              >
                Sign in
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>

    </div>
  );
}

export default Register;
