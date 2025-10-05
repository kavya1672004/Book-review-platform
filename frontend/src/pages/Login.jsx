import { isLoggedInAtom } from "@/atoms/userData";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { loginSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { toast } from "sonner";

const LoginForm = () => {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInAtom);
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const navigate = useNavigate();
  useEffect(() => {
    if (isLoggedIn) navigate("/books");
  }, []);

  const onSubmit = (values) => {
    setIsLoading(true);
    let promise = axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/users/login`,
      values
    );
    toast.promise(promise, {
      loading: "Loading...",
      success: (response) => {
        const { token } = response.data;
        localStorage.setItem("token", token);
        setIsLoggedIn(true);
        navigate("/books");
        return response.data.message;
      },
      error: (error) => error.response.data.message,
      finally: () => setIsLoading(false),
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-zinc-900 dark:to-zinc-950 p-4">
      <Card className="w-full max-w-md shadow-lg rounded-xl border border-gray-200 dark:border-zinc-800">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="p-6">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-center text-gray-900 dark:text-white">
                Login
              </CardTitle>
              <CardDescription className="text-center text-gray-600 dark:text-gray-300">
                Enter your credentials to access your account
              </CardDescription>
            </CardHeader>

            <CardContent className="mt-4">
              <div className="grid gap-5">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="you@example.com"
                          {...field}
                          className="bg-gray-50 dark:bg-zinc-800 border-gray-300 dark:border-zinc-700 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex justify-between items-center mb-1">
                        <FormLabel>Password</FormLabel>
                        <Link
                          href="#"
                          className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline"
                        >
                          Forgot password?
                        </Link>
                      </div>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Enter password"
                          {...field}
                          className="bg-gray-50 dark:bg-zinc-800 border-gray-300 dark:border-zinc-700 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />

                {isLoading ? (
                  <Button disabled className="w-full flex justify-center items-center gap-2">
                    <Loader2 className="animate-spin h-5 w-5" /> Please wait
                  </Button>
                ) : (
                  <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white">
                    Login
                  </Button>
                )}
              </div>

              <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
                Don't have an account?{" "}
                <Link to="/signup" className="text-indigo-600 dark:text-indigo-400 underline">
                  Sign up
                </Link>
              </div>

              {/* Predefined test credentials */}
              <div className="mt-4 text-center text-gray-400 text-xs space-y-1">
                <p>User: mayank@example.com</p>
                <p>Admin: mayankjain@example.com</p>
                <p>Password: Password123</p>
              </div>
            </CardContent>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default LoginForm;
