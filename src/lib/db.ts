import path from 'path';
import { Pool } from 'pg';

let dbInstance: any = null;
let pgPool: Pool | null = null;

export async function getDb() {
  // If we have a DATABASE_URL, we are in production (Postgres)
  if (process.env.DATABASE_URL) {
    if (!pgPool) {
      pgPool = new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: {
          rejectUnauthorized: false
        }
      });
    }
    
    // Wrapper for Postgres to mimic the sqlite-like API used in the project
    return {
      all: async (sql: string, params: any[] = []) => {
        const res = await pgPool!.query(sql.replace(/\?/g, (_, i) => `$${i + 1}`), params);
        return res.rows;
      },
      get: async (sql: string, params: any[] = []) => {
        const res = await pgPool!.query(sql.replace(/\?/g, (_, i) => `$${i + 1}`), params);
        return res.rows[0];
      },
      run: async (sql: string, params: any[] = []) => {
        const res = await pgPool!.query(sql.replace(/\?/g, (_, i) => `$${i + 1}`), params);
        return { lastID: res.oid || 0, changes: res.rowCount };
      },
      exec: async (sql: string) => {
        return await pgPool!.query(sql);
      }
    };
  }

  // Local Development (SQLite)
  if (dbInstance) return dbInstance;

  try {
    const sqlite3 = require('sqlite3');
    const { open } = require('sqlite');
    const dbPath = path.join(process.cwd(), 'database.sqlite');
    dbInstance = await open({
      filename: dbPath,
      driver: sqlite3.Database
    });

    // Ensure tables exist locally
    await dbInstance.exec(`
      CREATE TABLE IF NOT EXISTS contacts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT,
        service TEXT NOT NULL,
        message TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS services (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        items TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS testimonials (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        author TEXT NOT NULL,
        role TEXT NOT NULL,
        text TEXT NOT NULL,
        image TEXT
      );

      CREATE TABLE IF NOT EXISTS settings (
        key TEXT PRIMARY KEY,
        value TEXT
      );

      CREATE TABLE IF NOT EXISTS contact_services (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        label TEXT NOT NULL
      );
    `);

    return dbInstance;
  } catch (err) {
    console.error('SQLite initialization failed, using mock fallback:', err);
    
    // Return a mock instance so the app doesn't crash
    return {
      all: async (sql: string) => {
        if (sql.includes('settings')) return [
          { key: 'hero_subtitle', value: 'DEVELOPMENT MODE (MOCK)' },
          { key: 'hero_main_title_suffix', value: 'Starting Soon' }
        ];
        if (sql.includes('services')) return [
          { title: 'Digital Strategy', items: '["Service A", "Service B"]' }
        ];
        if (sql.includes('testimonials')) return [
          { author: 'Mock User', role: 'Tester', text: 'Fallback content is loading.' }
        ];
        if (sql.includes('contact_services')) return [
          { label: 'General Inquiry' }
        ];
        return [];
      },
      get: async () => null,
      run: async () => ({ lastID: 0, changes: 0 }),
      exec: async () => {}
    };
  }
}
