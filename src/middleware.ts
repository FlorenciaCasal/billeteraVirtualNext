import { NextRequest, NextResponse } from "next/server";
import { AccessDeniedError } from "./services/common/http.errors";
import authApi from "./services/auth/auth.api";

export async function middleware(request: NextRequest) {

    try {
        const sessionId = request.cookies.get('digitalMoneyID')?.value ?? '';
        if (!sessionId) throw new AccessDeniedError('Session ID is not valid anymore')
        const token = await getToken(sessionId);
        if (!token) throw new AccessDeniedError('Session ID is not valid anymore')

        return getAuthenticationHeaders(request, token)

    } catch (e) {
        return NextResponse.redirect(new URL('login', request.url));
    }
}

const getToken = async (sessionId: string): Promise<string> => {
    return (await authApi.getRedisValue(sessionId)).value;

}

const getAuthenticationHeaders = (request: NextRequest, token: string) => {
    const requestHeaders = new Headers(request.headers)
    requestHeaders.set('digital-money-token', token)

    return NextResponse.next({
        request: {
            headers: requestHeaders,
        }
    })
}

export const config = {
    matcher: '/profile',
}