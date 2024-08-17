import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import FormPage from "./form";
import { auth } from "@/auth";
export default async function RegisterPage() {
  const session = await auth();
  const user = session?.user;
//   if (!user) {
//     redirect("/register");
//   }
  return (
    <section className=" text-gray-400 min-h-screen flex items-center justify-center">
      <div className="w-[600px]">
        <FormPage />
      </div>
    </section>
  );
}
