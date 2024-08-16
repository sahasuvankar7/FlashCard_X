import prisma from "@/lib/db";
import Link from "next/link";
import React from "react";

const page = async () => {
  const card = await prisma.question.findMany({});
  if (!card) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <span>No Cards found</span>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center w-full  min-h-screen   p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-5 w-full justify-start px-20">
        {card.map((card) => (
          <Link href={`/cards/${card.id}`} key={card.id} className=" ">
            <div className="border-[0.1px] border-gray-400 mb-1 h-full flex flex-col justify-between bg-slate-800 p-5 rounded-md shadow-md text-gray-300 hover:shadow-lg">
              <h1 className="text-base font-medium font-mono overflow-hidden">
                {card.desc}
              </h1>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default page;
