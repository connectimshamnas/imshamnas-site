const sqlite3 = require('sqlite3');
const { open } = require('sqlite');
const path = require('path');

const dbPath = path.join(process.cwd(), 'database.sqlite');

async function check() {
  const db = await open({
    filename: dbPath,
    driver: sqlite3.Database
  });

  const contacts = await db.all('SELECT * FROM contacts');
  console.log('Contacts:', JSON.stringify(contacts, null, 2));

  const testimonials = await db.all('SELECT * FROM testimonials');
  console.log('Testimonials:', JSON.stringify(testimonials, null, 2));
}

check().catch(console.error);
