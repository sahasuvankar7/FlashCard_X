import React from "react";
import { notFound, redirect  } from "next/navigation";
import Link from "next/link";
import { auth } from "../../auth";
const layout = async ({ children }) => {
  const session = await auth();
  console.log(session);
  if (!session?.user) return redirect("/api/auth/signin");
  if (session?.user?.type != "admin") return redirect("/");
  return (
    <section  className="w-full min-h-screen">
      <nav className="flex justify-between h-full bg-gray-100  px-5 py-3">
        <div></div>
        <div>
          <button className="bg-blue-700 text-white rounded-md px-6 py-3 relative ">
            <Link href={`/admin/create`}>
            Create Card
            </Link>
          </button>
        </div>
      </nav>
      {children}
    </section>
  );
};

export default layout;
