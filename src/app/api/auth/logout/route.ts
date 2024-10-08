import { type NextRequest } from "next/server";
import authService from '@/services/auth/auth.services';
import { cookies } from "next/headers";


export async function POST(request: NextRequest) {
    try {
        const authCookie = request.cookies.get('digitalMoneyID')
        if (authCookie) {
            const sessionId = authCookie.value;
            await authService.logout(sessionId)
        }

        cookies().delete('digitalMoneyID')
        cookies().delete('digitalMoneyEmail')

        return new Response(JSON.stringify({}), {
            // return new Response(JSON.stringify(loginResponse), {
            status: 200,
        })
    } catch (e) {

        return new Response(JSON.stringify({
            error: 'Internal server error',
        }), {
            status: 500,
        })
    }

}
