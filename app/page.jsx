import Link from "next/link";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
export default async function Home() {
  const session = await auth();
  const user = session?.user;
  if (user) {
    redirect("/cards");
  }
  return (
    <div className="h-full w-full min-h-screen text-center items-center flex justify-center text-3xl font-bold ">
      Please Signin to continue
    </div>
  );
}
