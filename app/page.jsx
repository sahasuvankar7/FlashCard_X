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
    <div className="h-full w-full min-h-screen text-center items-center flex justify-center text-3xl font-semibold ">
  <Link href='/login'>
      <button className="bg-black text-slate-400 rounded-md border-[0.1px] border-slate-300 px-6 py-4 font-sans transition hover:scale-105">
      Please Signin to Continue
      </button>
  </Link>
    </div>
  );
}
