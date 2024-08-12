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
    <div className="flex justify-center items-center w-full  min-h-screen  bg-gray-100 p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full justify-start">
        {card.map((card) => (
          <Link
            href={`/cards/${card.id}`}
            key={card.id}
            className="rounded-lg shadow-lg bg-white p-6"
          >
            <div className="mb-4">
              <h1 className="text-2xl font-bold text-gray-800">{card.desc}</h1>
              <div className="mt-2">
                {card.answers.map((answer, index) => (
                  <p key={index} className="text-gray-600">
                    {`${index+1}. ${answer}`}
                  </p>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default page;
