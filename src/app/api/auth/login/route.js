import { NextResponse } from "next/server";

export const POST = async (req) => {
    try {
        const body = await req.json();
        const { email, password } = body;

        if (!email || !password) {
            return NextResponse.json({ message: "Email and password are required" }, { status: 400 });
        }

        if (email === "demo@example.com" && password === "demo123") {
            return NextResponse.json({
                message: "Login successful",
                user: { id: "1", name: "Demo User", email: "demo@example.com", avatarUrl: "" },
                token: "mock-jwt-token"
            }, { status: 200 });
        }

        return NextResponse.json({ message: "Invalid email or password" }, { status: 401 });
    } catch (error) {
        console.error("Login API error:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
};