import { NextResponse } from "next/server";
import prisma from "@/lib/db";
export async function GET(request) {
  const id = Number(request.nextUrl.searchParams.get("id"));

  if (!id) return NextResponse.json({ message: "provide id" }, { status: 400 });

  try {
    const question = await prisma.question.findUnique({
      where: {
        id: id,
      },
    });

    if (!question)
      return NextResponse.json(
        { message: "question not found" },
        { status: 404 }
      );

    return NextResponse.json(question);
  } catch (error) {
    throw new Error(error.message);
  }
}
