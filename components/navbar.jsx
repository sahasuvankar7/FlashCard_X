import React from "react";
import Link from "next/link";
// import {getServerSession } from "next-auth"
import { auth } from "@/auth";
import Image from "next/image";
import { ModeToggle } from "./ModeToggle";

export default async function Navbar() {
  const session = await auth();
  const user = session?.user;
  console.log({ session, user });

  return (
    <header
      className="flex justify-between items-center px-5 py-3 
    border-[0.1px] border-b-slate-400 shadow-md fixed w-full top-0 left-0 z-50 backdrop-blur-md backdrop-brightness-150"
    >
      <Link href={`${user ? "/cards" : "/"}`} className="flex items-center gap-3">
        <h1 className="text-2xl font-bold">FlashCard</h1>
      </Link>

      <nav className="flex items-center gap-5">
        <ModeToggle />
        {user && (
          <Link
            href="/cards"
            className="hover:text-gray-500  font-semibold text-lg hover:duration-200"
          >
            Cards
          </Link>
        )}
        {user?.role === "ADMIN" && (
          <Link href="/admin" className="hover:text-gray-300">
            Admin
          </Link>
        )}
        {user?.role === "ADMIN" && (
          <Link href="/admin/create" className="hover:text-gray-300">
            Create
          </Link>
        )}
        {user ? (
          <Link href="/api/auth/signout" className="">
            <button className="bg-black border-[0.1px] py-2 px-4 font-semibold rounded-md text-slate-300 hover:text-gray-300 hover:bg-slate-800 hover:scale-105 duration-300">
              Sign Out
            </button>
          </Link>
        ) : (
          <Link href="/login" className="hover:text-gray-300">
            <button className="bg-black border-[0.1px] py-2 px-4 font-semibold rounded-md text-slate-300 hover:text-gray-300 hover:bg-slate-800 hover:scale-105 duration-300">
              Sign In
            </button>
          </Link>
        )}
        {user && user?.image ? (
          <Image
            src={user.image} // Use the user's image if available
            alt={user.name || "avatar"}
            width={40}
            height={40}
            className="rounded-full border-2 border-white"
          />
        ) : (
          <div
            className="flex items-center justify-center w-10 h-10 bg-yellow-500 rounded-full text-white font-bold border-2 border-white"
            style={{ width: 40, height: 40 }}
          >
            {user?.name?.slice(0, 1).toUpperCase() || "?"}
          </div>
        )}
      </nav>
    </header>
  );
}
