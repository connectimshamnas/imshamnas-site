import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

export async function GET() {
  try {
    const db = await getDb();
    const services = await db.all('SELECT * FROM services');
    
    // Parse the items back from JSON string
    const formattedServices = services.map((s: any) => ({
      ...s,
      items: JSON.parse(s.items)
    }));

    return NextResponse.json(formattedServices);
  } catch (error) {
    console.error('Fetch services error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, items } = body;

    const db = await getDb();
    const result = await db.run(
      'INSERT INTO services (title, items) VALUES (?, ?)',
      [title, JSON.stringify(items)]
    );

    return NextResponse.json({ success: true, id: result.lastID });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) return NextResponse.json({ error: 'ID is required' }, { status: 400 });

    const db = await getDb();
    await db.run('DELETE FROM services WHERE id = ?', [id]);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
