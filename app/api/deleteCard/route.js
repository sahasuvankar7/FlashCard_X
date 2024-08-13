
import { auth } from "@/auth";
import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request){

    const user = await auth();
    if(!user.user || user.user.type !== "admin"){
        return NextResponse.json({error: "Unauthorized"}, {status: 401});
    }

    const {id} = await request.json();

    try{
        await prisma.question.delete({
            where: {
                id
            }
        });

        return NextResponse.json({message: "Card deleted"} , {status: 200});
    }catch{
        return NextResponse.json({error: "Couldn't delete card"} , {status: 500});
    }

}
