import { NextRequest, NextResponse } from 'next/server';
import authService from '@/services/auth/auth.services';  // Usa el servicio centralizado

export async function POST(request: NextRequest) {
  const { email, account_id } = await request.json();

  if (!email || !account_id) {
    return NextResponse.json({ error: 'Missing email or account_id' }, { status: 400 });
  }
  try {
    // Usa el servicio de autenticación para guardar el valor en Redis
    await authService.setRedisValue(email, account_id);
  } catch (error) {
    console.error('Error al guardar en Redis: ', error);
    return NextResponse.json({ error: 'Failed to save to Redis' }, { status: 500 });
  }

  return NextResponse.json({ message: 'Account ID saved successfully' }, { status: 200 });
}





