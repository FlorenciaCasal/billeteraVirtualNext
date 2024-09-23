import { LoginFinalScheme } from './../../../../schemes/LoginFinal.scheme';
import { NextResponse, type NextRequest } from "next/server";
import { AccessDeniedError } from '@/services/common/http.errors';
import authService from '@/services/auth/auth.services';


export async function POST(request: NextRequest) {
    const { email, password } = await LoginFinalScheme.validate(await request.json());


    try {
        const loginResponse = await authService.authenticate(email, password)

        const authCookie = `digitalMoneyID=${loginResponse.sessionId}; Expires=${loginResponse.expireAt}; Domain=localhost; HttpOnly; Path=/`;

        // return new Response('', {
        return new Response(JSON.stringify(loginResponse.user), {
            status: 200,
            headers: { 'Set-Cookie': authCookie },
        })
    } catch (e) {
        if (e instanceof AccessDeniedError) {
            return NextResponse.json({
                error: 'Invalid credentials for user',
            }, {
                status: 401,
            });
        } else {
            return NextResponse.json({
                error: 'Internal server error',
                message: e instanceof Error ? e.message : 'Unknown error',
            }, {
                status: 500,
            });
        }
    }
}