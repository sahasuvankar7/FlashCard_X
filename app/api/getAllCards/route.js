import prisma from "@/lib/db";
import { NextResponse } from "next/server";
// get all cards
export async function GET() {
  try {
    const question = await prisma.question.findMany({});
    if(!question){
        return NextResponse.json({message:'question not found'},{status:404});
    }
    return NextResponse.json(question);
  } catch (err) {
    console.log(err);
    return NextResponse.json({message:err})
  }
}
