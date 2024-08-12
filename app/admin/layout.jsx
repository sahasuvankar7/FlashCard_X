import React from "react";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { auth } from "../../auth";
const layout = async ({ children }) => {
  const session = await auth();
  console.log(session);
  if (!session?.user) return redirect("/api/auth/signin");
  if (session?.user?.type != "admin") return redirect("/");
  return <section className="w-full min-h-screen">{children}</section>;
};

export default layout;
