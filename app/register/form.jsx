"use client";
import { registerNewUserCredentials } from "@/actions/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { redirect } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useRouter } from "next/navigation";

// Updated schema with name field
const FormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters long",
  }),
  username: z.string().min(2, {
    message: "Username must be at least 2 characters long",
  }),
  password: z.string().min(6, {
    message: "Password must be greater than 6 characters",
  }),
});

export default function FormPage() {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      username: "",
      password: "",
    },
  });

  // const onSubmit = async (data) => {
  //   console.log("Submitting form", data);
  //   const { name, username: email, password } = data;

  //   try {
  //     const res = await fetch("/api/auth/register", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ name, email, password }),
  //     });

  //     if (!res.ok) {
  //       throw new Error("Network response was not ok");
  //     }

  //     console.log("Registration successful", res);
  //     // alert("Registration successful");
  //     redirect('/login')
  //   } catch (error) {
  //     console.log("Registration failed", error);
  //     throw new Error(error.message);
  //   }
  // };

  return (
    <div className="w-full max-w-md mx-auto mt-10">
      <div className="pb-5 mb-4  ">
        <h3 className="text-slate-300 font-semibold font-mono text-xl text-center ">
          Register
        </h3>
      </div>
      <form
        action={async (formdata) => {
          const name = formdata.get("name");
          const email = formdata.get("username");
          const password = formdata.get("password");
          const result = await registerNewUserCredentials({
            name,
            email,
            password,
          });
          if (result.success) {
            // Redirect to login page or show success message
            router.push("/login");
          } else {
            // Handle error (e.g., show error message)
            console.error(result.error);
          }
        }}
        className="space-y-6"
      >
        <div>
          <label htmlFor="name" className="block text-sm font-medium">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Name"
            {...form.register("name")}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
          {form.formState.errors.name && (
            <p className="mt-1 text-sm text-red-600">
              {form.formState.errors.name.message}
            </p>
          )}
        </div>

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

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
