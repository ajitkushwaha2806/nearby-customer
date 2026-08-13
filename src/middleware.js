import { NextResponse } from "next/server";

const PUBLIC_ROUTES = [
    "/",
    "/login",
    "/register",
];

export function middleware(request) {
    const { pathname } = request.nextUrl;
    const isPublicRoute = PUBLIC_ROUTES.includes(pathname);
    const token = request.cookies.get("token")?.value;

    if (!token && !isPublicRoute) {
        return NextResponse.redirect(new URL("/login", request.url));
    }
    return NextResponse.next();
}

export const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|assets).*)",
    ],
};
