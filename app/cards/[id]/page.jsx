import React from "react";
import prisma from "@/lib/db";
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
    <div className="pt-20 h-screen  flex flex-col items-center">
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
