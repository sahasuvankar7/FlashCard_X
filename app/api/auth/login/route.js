import { NextResponse } from "next/server";
import { compare } from "bcryptjs";
import prisma from "@/lib/db";

export async function POST(request) {
    try {
        const { email, password } = await request.json();
        console.log({ email, password });

        // Retrieve the user from the database
        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            return NextResponse.json({ message: "User does not exist" }, { status: 404 });
        }

        // Compare the provided password with the hashed password in the database
        const isPasswordValid = await compare(password, user.password);

        if (!isPasswordValid) {
            return NextResponse.json({ message: "Invalid password" }, { status: 401 });
        }

        // Successful login
        return NextResponse.json({ message: "Login successful", user }, { status: 200 });

    } catch (error) {
        console.error("Login error:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
