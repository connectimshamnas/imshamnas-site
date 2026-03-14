'use client';
import { ArrowLeft } from 'lucide-react';

export default function CookiePolicy() {
  return (
    <main className="bg-grid min-vh-100">
      <nav style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent)', textDecoration: 'none', fontWeight: 600 }}>
          <ArrowLeft size={18} /> Back to Home
        </a>
      </nav>

      <div className="container" style={{ padding: '4rem 1rem', maxWidth: '800px' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '2rem' }}>Cookie Policy</h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '3rem' }}>Last Updated: March 14, 2026</p>

        <section style={{ marginBottom: '2.5rem' }}>
          <h2 style={{ color: 'var(--accent)', marginBottom: '1rem' }}>1. What Are Cookies</h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
            Cookies are small pieces of text sent by your web browser by a website you visit. A cookie file is stored in your web browser and allows the Service or a third-party to recognize you and make your next visit easier and the Service more useful to you.
          </p>
        </section>

        <section style={{ marginBottom: '2.5rem' }}>
          <h2 style={{ color: 'var(--accent)', marginBottom: '1rem' }}>2. How We Use Cookies</h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
            When you use and access the Service, we may place a number of cookies files in your web browser. We use cookies for the following purposes:
          </p>
          <ul style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginTop: '1rem', paddingLeft: '1.5rem' }}>
            <li><strong>Essential cookies:</strong> To authenticate users and prevent fraudulent use of user accounts.</li>
            <li><strong>Analytics cookies:</strong> To track information how the website is used so that we can make improvements.</li>
            <li><strong>Functional cookies:</strong> To remember your preferences and provide enhanced features.</li>
          </ul>
        </section>

        <section style={{ marginBottom: '2.5rem' }}>
          <h2 style={{ color: 'var(--accent)', marginBottom: '1rem' }}>3. Your Choices</h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
            If you'd like to delete cookies or instruct your web browser to delete or refuse cookies, please visit the help pages of your web browser. Please note, however, that if you delete cookies or refuse to accept them, you might not be able to use all of the features we offer.
          </p>
        </section>
      </div>
    </main>
  );
}
