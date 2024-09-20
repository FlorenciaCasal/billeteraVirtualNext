import { LoginFinalScheme } from './../../../../schemes/LoginFinal.scheme';
import authApi from "@/services/auth/auth.service";
import { NextResponse, type NextRequest } from "next/server";
import { AccessDeniedError } from '@/services/common/http.errors';
import { createClient } from "redis";
import { v4 as uuidv4 } from 'uuid';
import { headers } from 'next/headers';

// Creo el cliente
const client = createClient({
    url: 'redis://default:digitalMoneyPass@redis:6379'
});

client.connect().then(() => {
    console.log('connected to redis')
})

const TEN_MINUTE = 60 * 10;

export async function POST(request: NextRequest) {

    const { email, password } = await LoginFinalScheme.validate(await request.json());
    try {
        // Usar authApi para hacer la petición a la API de Java
        const loginResponse = await authApi.loginJava(email, password);
        const sessionId = uuidv4();
        const now = new Date();
        const expireAt = new Date(now.getTime() + TEN_MINUTE * 1000).toUTCString();
        client.set(sessionId, loginResponse.token, { EX: TEN_MINUTE })

        const authCookie = `digitalMoneyID=${sessionId}; Expires=${expireAt}; Domain=localhost; Secure; HttpOnly; Path=/`;

        return new Response('', {
            status: 200,
            headers: { 'Set-Cookie': authCookie },
        })
    } catch (e) {
        if (e instanceof AccessDeniedError) {
            return NextResponse.json({
                error: 'Invalid credentials for user',
            }, {
                status: 403,
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