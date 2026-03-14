import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

export async function GET() {
  try {
    const db = await getDb();
    const services = await db.all('SELECT * FROM contact_services ORDER BY id ASC');
    return NextResponse.json(services);
  } catch (error) {
    console.error('Fetch contact services error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { label } = await req.json();
    const db = await getDb();
    const result = await db.run('INSERT INTO contact_services (label) VALUES (?)', [label]);
    return NextResponse.json({ id: result.lastID, label });
  } catch (error) {
    console.error('Create contact service error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const db = await getDb();
    await db.run('DELETE FROM contact_services WHERE id = ?', [id]);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete contact service error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
