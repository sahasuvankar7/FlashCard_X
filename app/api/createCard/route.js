
import { auth } from "@/auth";
import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request){

    const user = await auth();
    if(!user.user || user.user.type !== "admin"){
        return NextResponse.json({error: "Unauthorized"}, {status: 401});
    }

    const {desc , answers , answer } = await request.json();

    if(typeof desc !== "string" || typeof answer !== "string" || !Array.isArray(answers)){
        return NextResponse.json({error: "Invalid data"}, {status: 400});
    }

    try{
        const card = await prisma.question.create({
            data: {
                desc,
                answers,
                answer
            }
        });

        return NextResponse.json(card , {status: 200});
    }
    catch{
        return NextResponse.json({error: "Couldn't create card"} , {status: 500});
    }


}
