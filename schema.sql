-- Database Schema for imshamnas.com (PostgreSQL / Supabase)

-- Contacts Table
CREATE TABLE IF NOT EXISTS contacts (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    service TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Services Table
CREATE TABLE IF NOT EXISTS services (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    items TEXT NOT NULL -- Stored as JSON string
);

-- Testimonials Table
CREATE TABLE IF NOT EXISTS testimonials (
    id SERIAL PRIMARY KEY,
    author TEXT NOT NULL,
    role TEXT NOT NULL,
    text TEXT NOT NULL,
    image TEXT
);

-- Settings Table
CREATE TABLE IF NOT EXISTS settings (
    key TEXT PRIMARY KEY,
    value TEXT
);

-- Contact Services Table
CREATE TABLE IF NOT EXISTS contact_services (
    id SERIAL PRIMARY KEY,
    label TEXT NOT NULL
);

-- Seed Initial Data (Optional - usually done via Admin Panel)
-- INSERT INTO settings (key, value) VALUES ('site_title', 'imshamnas.com');
