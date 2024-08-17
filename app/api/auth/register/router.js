import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import prisma from "@/lib/db";

export async function POST(request) {
    try {
        const { name, email, password } = await request.json();
        console.log({ email, password });

        // Check if the user already exists
        const user = await prisma.user.findUnique({
            where: {
                email: email,
            },
        });

        console.log(user)
        if (user) {
            return NextResponse.json(
                { message: "User already exists" },
                { status: 400 } // Using 400 to indicate a bad request due to existing user
            );
        }

        // Hash the password
        const hashedPassword = await hash(password, 10);

        // Create a new user
        const newUser = await prisma.user.create({
            data: {
                name: name,
                email: email,
                password: hashedPassword,
            },
        });

        return NextResponse.json(
            { message: 'User created successfully', user: newUser },
            { status: 201 } // Using 201 to indicate successful creation
        );
        
    } catch (error) {
        console.log({error})
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 } // Using 500 to indicate a server error
        );
    }
}
