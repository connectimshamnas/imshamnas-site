import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

export async function GET() {
  try {
    const db = await getDb();
    const testimonials = await db.all('SELECT * FROM testimonials ORDER BY id ASC');
    return NextResponse.json(testimonials);
  } catch (error) {
    console.error('Fetch testimonials error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { author, role, text, image } = body;

    const db = await getDb();
    const result = await db.run(
      'INSERT INTO testimonials (author, role, text, image) VALUES (?, ?, ?, ?)',
      [author, role, text, image || null]
    );

    return NextResponse.json({ success: true, id: result.lastID });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, author, role, text, image } = body;

    const db = await getDb();
    await db.run(
      'UPDATE testimonials SET author = ?, role = ?, text = ?, image = ? WHERE id = ?',
      [author, role, text, image || null, id]
    );

    return NextResponse.json({ success: true });
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
    await db.run('DELETE FROM testimonials WHERE id = ?', [id]);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
