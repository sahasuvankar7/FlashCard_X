"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
const FormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be atleast 2 character",
  }),
  password: z.string().min(6, {
    message: "password must be greater than 6 character",
  }),
});
export default function FormPage() {
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
}
const onSubmit = async (data) => {
  console.log("submitting form", data);
  const { username: email, password } = data;
  try {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) {
      throw new Error("network reponse was not ok");
    }
    console.log("registration successfull", res);
    alert("registration successfull");
  } catch (error) {
    console.log("registration failed", error);
    throw new Error(error.message);
  }
  <div className="w-full max-w-md mx-auto mt-10">
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label htmlFor="username" className="block text-sm font-medium">
          Username
        </label>
        <input
          id="username"
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
  </div>;
};
