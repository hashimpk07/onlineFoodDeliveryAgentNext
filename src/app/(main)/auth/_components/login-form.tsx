"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, KeyRound, Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { loginAction } from "@/app/[locale]/(main)/auth/_actions/login";
import { LoginInput, LoginSchema } from "@/app/[locale]/(main)/auth/_schema";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useUser } from "@/hooks/use-user";

export function LoginForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { fetchUser } = useUser();

  const form = useForm<LoginInput>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginInput) => {
    setIsLoading(true);

    try {
      const result = await loginAction(data.email, data.password);

      if (result.error) {
        toast.error(result.error);
        form.setError("email", { message: result.error });
        return;
      }

      // Fetch user data after successful login
      await fetchUser();

      toast.success("Login successful!");
      // Redirect to dashboard
      router.push("/dashboard/general/home");
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 max-w-sm mx-auto"
      >
        {/* Email Field */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm text-foreground ml-5">
                Email Address
              </FormLabel>
              <FormControl>
                <div className="relative">
                  {/* Icon */}
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="size-5 text-blue-400" />
                  </div>
                  <Input
                    placeholder="admin"
                    className="block w-full pl-12 pr-4 py-6 bg-background border-border rounded-3xl focus-visible:ring-2 focus-visible:ring-blue-400 border shadow-none transition-all"
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Password Field */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm text-foreground ml-5">
                Password
              </FormLabel>
              <FormControl>
                <div className="relative">
                  {/* Lock Icon */}
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <KeyRound className="size-5 text-blue-400" />
                  </div>
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="•••••"
                    className="block w-full pl-12 pr-12 py-6 bg-background border-border rounded-3xl shadow-sm focus-visible:ring-2 focus-visible:ring-blue-400 border transition-all"
                    {...field}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff className="size-5" />
                    ) : (
                      <Eye className="size-5" />
                    )}
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Login Button */}
        <div className="pt-2">
          <Button
            disabled={isLoading}
            type="submit"
            className="w-full py-6 rounded-full text-white font-bold text-lg bg-gradient-to-r from-orange-500 via-orange-400 to-blue-500 shadow-lg shadow-orange-200 hover:opacity-90 transition-opacity border-none cursor-pointer"
          >
            Login
          </Button>
        </div>

        {/* Forgot Password Link */}
        <div className="flex justify-end mt-2">
          {/* <a
            href="#"
            className="text-xs font-medium text-muted-foreground hover:text-blue-500 underline decoration-muted"
          >
            Forgot password?
          </a> */}
        </div>
      </form>
    </Form>
  );
}
