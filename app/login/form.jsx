"use client";

import { signIn } from "@/auth";
import { redirect, useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { login, loginWithCredentials } from "@/actions/auth";
import AuthButton from "@/components/AuthButton";
import { useToast } from "@/components/ui/use-toast";

import { useSession } from "next-auth/react";
const FormSchema = z.object({
  email: z.string().email({
    message: "Invalid email address.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

export default function LoginForm() {
  const router = useRouter();
  const { toast } = useToast();
  const { data: session, status } = useSession();
  // if(!session?.user){
  //   redirect('/login');
  // }

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // const onSubmit = async (data) => {
  //   console.log("Submitting form", data);

  //   const { email, password } = data;

  //   try {
  //     const response = await signIn("credentials", {
  //       email,
  //       password,
  //       redirect: false,
  //     });
  //     console.log({ response });
  //     if (!response?.error) {
  //       router.push("/");
  //       router.refresh();
  //     }

  //     if (!response.ok) {
  //       throw new Error("Network response was not ok");
  //     }
  //     // Process response here
  //     console.log("Login Successful", response);
  //     redirect('/cards');
  //     //   toast({ title: "Login Successful" });
  //   } catch (error) {
  //     console.error("Login Failed:", error);
  //     //   toast({ title: "Login Failed", description: error.message });
  //   }
  // };

  return (
    <div className="w-full max-w-md mx-auto ">
      <div className="pb-5 mb-4  ">
        <h3 className="text-slate-300 font-semibold font-mono text-xl text-center ">
          Login
        </h3>
      </div>
      <form
        action={async (formdata) => {
          const email = formdata.get("username");
          const password = formdata.get("password");
          const result = await loginWithCredentials({ email, password });
          if (result?.success) {
            console.log("success");

            router.push("/cards");
            router.refresh();
            toast({
              title: "Login Successfully",
              description: "Your login was successful",
              variant: "success",
              className: "bg-green-600 text-white",
              duration: 9000,
              isClosable: true,
            });
          } else {
            console.error("error");
            toast({
              title: "Failed to Login",
              description: "Invalid Credentials",
              variant: "destructive",
              duration: 9000,
              isClosable: true,
            });
          }
        }}
        className="space-y-6"
      >
        <div>
          <label htmlFor="username" className="block text-sm font-medium">
            Username (Email)
          </label>
          <input
            id="username"
            name="username"
            type="email"
            placeholder="Username"
            {...form.register("username")}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
          {form.formState.errors.username && (
            <p className="mt-1 text-sm text-red-600">
              {form.formState.errors.username.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            {...form.register("password")}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
          {form.formState.errors.password && (
            <p className="mt-1 text-sm text-red-600">
              {form.formState.errors.password.message}
            </p>
          )}
        </div>

        <AuthButton />
        <div
          onClick={async () => {
            const res = await login("github");
            if (res) {
              router.push("/cards");
              router.refresh();
              toast({
                title: "Login Successfully",
                description: "Your login was successful",
                variant: "success",
                className: "bg-green-600 text-white",
                duration: 9000,
                isClosable: true,
              });
            } else {
              toast({
                title: "Failed to Login",
                description: "Invalid Credentials",
                variant: "destructive",
                duration: 9000,
                isClosable: true,
              });
            }
          }}
          className="w-full flex items-center justify-center gap-2  hover:cursor-pointer mt-6 h-14 bg-slate-900 rounded-md"
        >
          <FaGithub className="text-white" />
          <p className="text-slate-300">Login with Github</p>
        </div>
      </form>
      <Link
        href="/register"
        className="text-red-500 hover:text-red-600 flex justify-between mt-5"
      >
        <p>Don't have any account yet?</p>
        Register
      </Link>
    </div>
  );
}
