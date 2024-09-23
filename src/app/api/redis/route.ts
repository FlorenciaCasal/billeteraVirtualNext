import { NextResponse } from "next/server";
import authService from "@/services/auth/auth.services";
import { headers } from "next/headers";



export async function GET(request: Request) {
const headersList= headers()
const authorization = headersList.get('Authorization')
if( authorization !== `Bearer ${process.env.REDIS_API_TOKEN}`) {
    return NextResponse.json({
        error: 'Unauthorized',
    }, {status: 401})
}


    const { searchParams } = new URL(request.url)
    const key = searchParams.get('key') ?? ''
    const value = await authService.getRedisValue(key);

    return NextResponse.json({ value: value });
}