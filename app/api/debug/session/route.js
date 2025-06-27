// app/api/debug/session/route.js
import { getServerSession } from 'next-auth';
import { authOptions } from '@/utils/authOptions';

export async function GET() {
  const session = await getServerSession(authOptions);
  console.log('🔐 SESSION DEBUG:', session);
  return new Response(JSON.stringify(session), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}
