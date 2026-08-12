import { NextResponse } from "next/server";

export const POST = async (req) => {
    try {
        const body = await req.json();
        const { name, email, password } = body;

        if (!name || !email || !password) {
            return NextResponse.json({ message: "Name, email, and password are required" }, { status: 400 });
        }

        return NextResponse.json({
            message: "Registration successful",
            user: { id: "new-user-id", name, email, avatarUrl: "" },
            token: "mock-jwt-token"
        }, { status: 201 });

    } catch (error) {
        console.error("Registration API error:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
};
