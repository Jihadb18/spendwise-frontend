import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

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

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");

    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }

    setLoading(true);

    try {
      await login(email, password);

      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error);

      if (error.response?.status === 401) {
        setError("Invalid email or password.");
      } else if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex">

      {/* ================= LEFT SIDE ================= */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 text-white">

        {/* Logo */}
        <div>
          <div className="text-2xl font-bold tracking-tight">
            SpendWise
          </div>

          <p className="mt-2 text-slate-400 max-w-md">
            Take control of your money. Track expenses, manage budgets,
            and understand your spending.
          </p>
        </div>

        {/* Main message */}
        <div>
          <p className="text-5xl font-semibold leading-tight max-w-lg">
            Your money.
            <br />
            Your goals.
            <br />
            Your control.
          </p>

          <p className="mt-6 text-sm text-slate-500">
            Personal finance made simple.
          </p>
        </div>

      </div>

      {/* ================= RIGHT SIDE ================= */}
      <div className="flex-1 flex items-center justify-center bg-slate-50 p-6">

        <Card className="w-full max-w-md shadow-xl border-0">

          {/* Header */}
          <CardHeader className="space-y-2">

            <CardTitle className="text-2xl font-semibold">
              Welcome back
            </CardTitle>

            <p className="text-sm text-muted-foreground">
              Sign in to your SpendWise account
            </p>

          </CardHeader>

          {/* Form */}
          <CardContent>

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >

              {/* Email */}
              <div className="space-y-2">

                <Label htmlFor="email">
                  Email
                </Label>

                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  disabled={loading}
                />

              </div>

              {/* Password */}
              <div className="space-y-2">

                <Label htmlFor="password">
                  Password
                </Label>

                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
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
                {loading ? "Signing in..." : "Sign in"}
              </Button>

            </form>

            {/* Register */}
            <p className="mt-6 text-center text-sm text-muted-foreground">

              Don't have an account?{" "}

              <Link
                to="/register"
                className="font-medium text-primary hover:underline"
              >
                Create one
              </Link>

            </p>

          </CardContent>

        </Card>

      </div>

    </div>
  );
}

export default Login;