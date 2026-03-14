const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function check() {
  try {
    console.log('Checking connection...');
    const res = await pool.query('SELECT current_database(), current_user');
    console.log('Connection successful:', res.rows[0]);
    
    console.log('Checking tables...');
    const tables = await pool.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `);
    console.log('Tables found:', tables.rows.map(r => r.table_name));
    
    if (tables.rows.length === 0) {
      console.log('WARNING: No tables found in public schema!');
    }
  } catch (err) {
    console.error('Connection failed:', err.message);
  } finally {
    await pool.end();
  }
}

check();
