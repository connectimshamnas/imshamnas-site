import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, service, message } = body;

    if (!name || !email || !service || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const db = await getDb();
    const result = await db.run(
      'INSERT INTO contacts (name, email, phone, service, message) VALUES (?, ?, ?, ?, ?)',
      [name, email, phone || null, service, message]
    );

    return NextResponse.json({ success: true, id: result.lastID });
  } catch (error) {
    console.error('Contact error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const db = await getDb();
    const contacts = await db.all('SELECT * FROM contacts ORDER BY created_at DESC');
    return NextResponse.json(contacts);
  } catch (error) {
    console.error('Fetch contacts error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
