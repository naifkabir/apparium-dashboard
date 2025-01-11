"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { ThemeSwitcher } from "./theme-switcher";
import Image from "next/image";
import { Toaster, toast } from "sonner";
import { Eye, EyeClosed } from "lucide-react";
import { useState } from "react";
import ButtonLoadingAnimation from "./loading-animations/Button-loading-animation";
import { LoginUser } from "@/actions/Login.action";

interface LoginResponse {
  message?: string;
  error?: string;
  redirect?: {
    destination: string;
  };
}

const loginFormSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" })
    .regex(/@/, {
      message: "Email address must contain an @ symbol",
    }),
  password: z
    .string()
    .min(1, { message: "Password is required" })
    .min(6, { message: "Password must be at least 6 characters" }),
});

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  // Show or Hide Password
  const togglePasswordVisibility: () => void = () => {
    setShowPassword((prev) => !prev);
  };

  async function onSubmit(values: z.infer<typeof loginFormSchema>) {
    form.reset();

    const data = { email: values.email, password: values.password }; // Data To Be Send To Backend

    setLoading(true);
    const result: LoginResponse = await LoginUser(data); // Call Login Api

    setLoading(false);

    if (result.message) {
      toast.success("Login Successfully, Welcome to Apparium admin", {
        position: "top-center",
      });
      const redirectDestination = result.redirect?.destination || "/";
      router.push(redirectDestination);
    } else if (result.error) {
      toast.error(`Failed!! ${result.error}`, {
        position: "top-center",
      });
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col items-center gap-5">
              <Link href="#" className="flex flex-col items-center font-medium">
                <div className="flex h-16 w-16 items-center justify-center dark:bg-white px-2 rounded-full">
                  <Image
                    src="/logo-apparium.png"
                    alt="logo"
                    width={200}
                    height={200}
                    className="h-full w-full aspect-auto"></Image>
                </div>
              </Link>
              <div className="space-y-1">
                <h1 className="text-xl font-bold">Welcome to Apparium</h1>
                <p className="text-center text-sm">Embrace the digital edge</p>
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="email@xyz.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          autoComplete="off"
                          placeholder="Your password here..."
                          {...field}
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 -translate-y-1/2"
                          onClick={togglePasswordVisibility}>
                          {showPassword ? (
                            <Eye size={20} />
                          ) : (
                            <EyeClosed size={20} />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                {loading ? <ButtonLoadingAnimation text="Loading" /> : "Login"}
              </Button>
            </div>

            <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
              <span className="relative z-10 bg-background px-2 text-muted-foreground">
                Or
              </span>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Button
                variant="outline"
                className="w-full cursor-not-allowed"
                disabled>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path
                    d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
                    fill="currentColor"
                  />
                </svg>
                Continue with Apple
              </Button>
              <Button
                variant="outline"
                className="w-full cursor-not-allowed"
                disabled>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path
                    d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                    fill="currentColor"
                  />
                </svg>
                Continue with Google
              </Button>
            </div>
          </div>
        </form>
      </Form>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary  ">
        By clicking continue, you agree to our{" "}
        <Link href="#">Terms of Service</Link> and{" "}
        <Link href="#">Privacy Policy</Link>.
      </div>

      <div className="absolute top-4 right-4 border border-gray-300 dark:border-gray-500 rounded-full">
        <ThemeSwitcher />
      </div>
      <Toaster richColors />
    </div>
  );
}
