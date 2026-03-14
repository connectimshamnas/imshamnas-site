import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

export async function GET() {
  try {
    const db = await getDb();
    const rows = await db.all('SELECT key, value FROM settings');
    
    // Convert array of {key, value} to a single object
    const settings = rows.reduce((acc: any, row: any) => {
      acc[row.key] = row.value;
      return acc;
    }, {});

    return NextResponse.json(settings);
  } catch (error) {
    console.error('Fetch settings error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const db = await getDb();
    
    // Update each setting provided in the body
    const updates = Object.entries(body).map(([key, value]) => {
      return db.run('INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)', [key, value]);
    });

    await Promise.all(updates);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Update settings error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
