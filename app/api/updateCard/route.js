import { auth } from "@/auth";
import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function PUT(request) {
  const user = await auth();
  if (!user.user || user.user.type !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
console.log("hi")

  const { id, desc, answers, answer } = await request.json();

  console.log(id);

  if (
    typeof desc !== "string" ||
    typeof answer !== "string" ||
    !Array.isArray(answers)
  ) {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }

  try {
    const card = await prisma.question.update({
      where: {
        id:+id
      },
      data: {
        desc,
        answers,
        answer,
      },
    });

    return NextResponse.json(card, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Couldn't update card" },
      { status: 500 }
    );
  }
}
