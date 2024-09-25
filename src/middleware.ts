import { NextRequest, NextResponse } from "next/server";
import { AccessDeniedError } from "./services/common/http.errors";
import authApi from "./services/auth/auth.api";

export async function middleware(request: NextRequest) {

    try {
        const sessionId = request.cookies.get('digitalMoneyID')?.value ?? '';
        console.log('Session ID:', sessionId);  // Debugging
        if (!sessionId) throw new AccessDeniedError('Session ID is not valid anymore')
        const token = await getToken(sessionId);
        console.log('Token obtenido:', token);  // Debugging
        if (!token) throw new AccessDeniedError('Session ID is not valid anymore')

        return getAuthenticationHeaders(request, token)

    } catch (e) {
        console.error(e);  // Log the error
        return NextResponse.redirect(new URL('login', request.url));
    }
}

const getToken = async (sessionId: string): Promise<string> => {
    const redisResponse = (await authApi.getRedisValue(sessionId));
    return redisResponse.value;
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