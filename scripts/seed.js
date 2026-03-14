const sqlite3 = require('sqlite3');
const { open } = require('sqlite');
const path = require('path');

const dbPath = path.join(process.cwd(), 'database.sqlite');

async function seed() {
  const db = await open({
    filename: dbPath,
    driver: sqlite3.Database
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS contacts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      service TEXT NOT NULL,
      message TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS contact_services (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      label TEXT NOT NULL
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
      value TEXT NOT NULL
    );
  `);

  console.log('Clearing existing data...');
  await db.exec('DELETE FROM services');
  await db.exec('DELETE FROM testimonials');
  await db.exec('DELETE FROM settings');
  await db.exec('DELETE FROM contact_services');

  console.log('Seeding services...');
  const services = [
    { title: 'Strategy & Consulting', items: ['Digital Marketing Strategy', 'Business Growth Consulting', 'Marketing Funnel Strategy', 'Brand Positioning', 'Competitor Analysis'] },
    { title: 'Search Marketing', items: ['Search Engine Optimization (SEO)', 'Local SEO (Google Business Optimization)', 'Technical SEO', 'Search Engine Marketing (SEM)', 'Google Ads Management', 'Bing Ads Management'] },
    { title: 'Social Media Marketing', items: ['Social Media Strategy', 'Social Media Management', 'Meta Ads (Facebook & Instagram Ads)', 'LinkedIn Ads', 'TikTok Ads'] },
    { title: 'Content Marketing', items: ['Content Strategy', 'Blog Content Creation', 'SEO Content Writing', 'Copywriting'] },
    { title: 'Video Marketing', items: ['Short-Form Video Marketing', 'YouTube Marketing', 'Video Ad Creation', 'Product Video Promotion'] },
    { title: 'Website & Funnel Development', items: ['Corporate Website Development', 'Landing Page Design', 'Sales Funnel Development', 'Conversion Rate Optimization (CRO)', 'Website Performance Optimization'] },
    { title: 'Email Marketing', items: ['Email Campaign Management', 'Newsletter Marketing', 'Email List Building', 'Customer Retention Campaigns'] },
    { title: 'Marketing Automation', items: ['CRM Integration', 'Automated Email Workflows', 'Lead Nurturing Automation', 'Customer Journey Automation'] }
  ];

  for (const s of services) {
    await db.run('INSERT INTO services (title, items) VALUES (?, ?)', [s.title, JSON.stringify(s.items)]);
  }

  console.log('Seeding testimonials...');
  const testimonials = [
    { text: 'Shamnas took our digital presence from invisible to dominant. Organic leads doubled in three months and our website finally reflects the quality of our product.', author: 'Sarah Jenkins', role: 'CEO, TechFlow' },
    { text: 'Rare to find someone who can code a beautiful site AND run an effective ad campaign. Shamnas did both, and the results speak for themselves.', author: 'David Chen', role: 'Founder, Peak Retail' },
    { text: 'The PPC campaigns managed achieved a 6.3x ROAS — better than anything our previous agency delivered. Would recommend without hesitation.', author: 'Emily Rodriguez', role: 'Marketing Director' }
  ];

  for (const t of testimonials) {
    await db.run('INSERT INTO testimonials (author, role, text) VALUES (?, ?, ?)', [t.author, t.role, t.text]);
  }

  console.log('Seeding settings...');
  const settings = [
    { key: 'hero_subtitle', value: 'AVAILABLE FOR NEW PROJECTS' },
    { key: 'hero_main_title_suffix', value: 'That Delivers Results' },
    { key: 'hero_description', value: 'SEO, paid ads, social media, web design, and ERP solutions — everything your business needs to grow online, under one roof at imshamnas.com.' },
    { key: 'stat_1_val', value: '5.0' },
    { key: 'stat_1_label', value: 'Google Reviews' },
    { key: 'stat_2_val', value: '4.2' },
    { key: 'stat_2_label', value: 'Paid Campaigns' },
    { key: 'stat_3_val', value: '150' },
    { key: 'stat_3_label', value: 'Projects Delivered' },
    { key: 'contact_title', value: 'Ready to grow your business online?' },
    { key: 'contact_subtitle', value: 'Whether you need a new website, a winning marketing strategy, or both — let\'s talk and build something great together.' },
    { key: 'email', value: 'hello@imshamnas.com' },
    { key: 'location', value: 'Available Worldwide' },
    { key: 'linkedin_url', value: 'https://linkedin.com' },
    { key: 'twitter_url', value: 'https://twitter.com' },
    { key: 'instagram_url', value: 'https://instagram.com' },
    // About section
    { key: 'about_title', value: 'Hi, I am Shamnas — Digital Growth Expert' },
    { key: 'about_para_1', value: 'With years of hands-on experience in SEO, paid advertising, social media, and web development, I help businesses achieve measurable results online. I believe in data-driven strategies that translate to real revenue growth.' },
    { key: 'about_para_2', value: 'Whether you are a startup looking to launch or an established brand ready to scale, I bring the expertise and dedication to take your digital presence to the next level.' },
    { key: 'about_skill_1', value: '✓ SEO & Content Strategy' },
    { key: 'about_skill_2', value: '✓ Google & Meta Ads' },
    { key: 'about_skill_3', value: '✓ Web Design & Development' },
    { key: 'about_skill_4', value: '✓ Marketing Automation' },
    { key: 'about_cta', value: 'Work With Me' },
    { key: 'about_stat_1_val', value: '5+' },
    { key: 'about_stat_1_label', value: 'Years Experience' },
    { key: 'about_stat_2_val', value: '150+' },
    { key: 'about_stat_2_label', value: 'Projects Completed' },
    { key: 'about_stat_3_val', value: '50+' },
    { key: 'about_stat_3_label', value: 'Happy Clients' },
    { key: 'about_stat_4_val', value: '4.2x' },
    { key: 'about_stat_4_label', value: 'Average ROAS' },
  ];

  for (const s of settings) {
    await db.run('INSERT INTO settings (key, value) VALUES (?, ?)', [s.key, s.value]);
  }

  console.log('Seeding contact services...');
  const contactServices = [
    'Full Package (Web + Marketing)',
    'Web Development',
    'Digital Marketing',
    'Consulting'
  ];

  for (const label of contactServices) {
    await db.run('INSERT INTO contact_services (label) VALUES (?)', [label]);
  }

  console.log('Done seeding database!');
}

seed().catch(console.error);
