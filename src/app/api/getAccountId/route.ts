import { NextRequest, NextResponse } from 'next/server';
import authService from '@/services/auth/auth.services';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get('email');

  if (!email) {
    return NextResponse.json({ error: 'Missing email' }, { status: 400 });
  }

  // Usa el servicio de autenticación para obtener el valor de Redis
  const account_id = await authService.getRedisValue(email);

  if (account_id) {
    return NextResponse.json({ account_id }, { status: 200 });
  } else {
    return NextResponse.json({ error: 'Account ID not found' }, { status: 404 });
  }
}


