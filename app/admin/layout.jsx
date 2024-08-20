import React from "react";
import {  redirect,router } from "next/navigation";
import { auth } from "@/auth";
const layout = async ({ children }) => {
  const session = await auth();
  console.log(session);
  if (!session?.user) return redirect("/api/auth/signin");
  if (session?.user?.role !== "ADMIN") return redirect("/");
  return <section className="w-full min-h-screen">{children}</section>;
};

export default layout;
