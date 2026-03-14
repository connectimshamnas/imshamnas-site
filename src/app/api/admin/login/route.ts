import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// Hard-coded admin credentials (can be changed here)
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'admin123';
const SESSION_SECRET = 'imshamnas-admin-secret-2024';

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      const cookieStore = await cookies();
      cookieStore.set('admin_session', SESSION_SECRET, {
        httpOnly: true,
        path: '/',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: 'Invalid username or password' }, { status: 401 });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
