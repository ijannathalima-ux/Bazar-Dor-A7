import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function proxy(request: NextRequest) {
    const session = await auth.api.getSession({
        headers: request.headers,
    });

    if (!session) {
        const signUpUrl = new URL("/sign-up", request.url);

        signUpUrl.searchParams.set(
            "callbackURL",
            request.nextUrl.pathname + request.nextUrl.search
        );

        return NextResponse.redirect(signUpUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/product-details/:path*"],
};
