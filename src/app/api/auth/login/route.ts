import { LoginFinalScheme } from './../../../../schemes/LoginFinal.scheme';
import { NextResponse, type NextRequest } from "next/server";
import { AccessDeniedError } from '@/services/common/http.errors';
import authService from '@/services/auth/auth.services';
import { cookies } from 'next/headers'


export async function POST(request: NextRequest) {
    const { email, password } = await LoginFinalScheme.validate(await request.json());

    try {
        const loginResponse = await authService.authenticate(email, password)
        // const authCookie = `digitalMoneyID=${loginResponse.sessionId}; Expires=${loginResponse.expireAt}; Domain=localhost; HttpOnly; Path=/`;
        // const emailCookie = `digitalMoneyEmail=${email}; Expires=${loginResponse.expireAt}; Domain=localhost; Path=/`;

        cookies().set('digitalMoneyID', loginResponse.sessionId, {
            expires: loginResponse.expireAt,
            httpOnly: true,
            secure: true,
            domain: 'localhost',
            path: '/'
        })

        cookies().set('digitalMoneyEmail', email, {
            expires: loginResponse.expireAt,
            httpOnly: false,
            secure: true,
            domain: 'localhost',
            path: '/'
        })

        return new Response(JSON.stringify(loginResponse), {

            status: 200,
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