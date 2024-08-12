"use client";
import React, { useEffect } from "react";
import prisma from "@/lib/db";
import Link from "next/link";
import { notFound } from "next/navigation";
import Card from "@/components/Card";

const Page = async ({ params }) => {
  const id = Number(params.id);
  if (!id) {
    return notFound();
  }

  const question = await prisma.question.findUnique({
    where: { id },
  });

  if (!question) {
    return notFound();
  }

  const [lowestQuestion, highestQuestion] = await Promise.all([
    prisma.question.findFirst({ orderBy: { id: "asc" } }),
    prisma.question.findFirst({ orderBy: { id: "desc" } }),
  ]);

  const lowestId = lowestQuestion?.id;
  const highestId = highestQuestion?.id;



  return (
    <div className="pt-20 h-screen bg-gray-100 flex flex-col items-center">
      <Card
        question={question}
        lowestId={lowestId}
        highestId={highestId}
        id={id}
        
      />
    </div>
  );
};

export default Page;
