import { NextResponse } from "next/server";

export async function POST(request){
    try {
        const {email,password} = await request.json();
        console.log({email,password})
        
    } catch (error) {
        console.log({error})
    }
    return NextResponse.json({message:"success"});
}