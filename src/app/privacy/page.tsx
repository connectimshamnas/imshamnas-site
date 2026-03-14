'use client';
import { Mail, ArrowLeft } from 'lucide-react';

export default function PrivacyPolicy() {
  return (
    <main className="bg-grid min-vh-100">
      <nav style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent)', textDecoration: 'none', fontWeight: 600 }}>
          <ArrowLeft size={18} /> Back to Home
        </a>
      </nav>

      <div className="container" style={{ padding: '4rem 1rem', maxWidth: '800px' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '2rem' }}>Privacy Policy</h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '3rem' }}>Last Updated: March 14, 2026</p>

        <section style={{ marginBottom: '2.5rem' }}>
          <h2 style={{ color: 'var(--accent)', marginBottom: '1rem' }}>1. Introduction</h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
            Welcome to imshamnas.com. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.
          </p>
        </section>

        <section style={{ marginBottom: '2.5rem' }}>
          <h2 style={{ color: 'var(--accent)', marginBottom: '1rem' }}>2. Data We Collect</h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
            We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:
          </p>
          <ul style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginTop: '1rem', paddingLeft: '1.5rem' }}>
            <li><strong>Identity Data:</strong> Includes first name, last name.</li>
            <li><strong>Contact Data:</strong> Includes email address and telephone numbers.</li>
            <li><strong>Technical Data:</strong> Includes internet protocol (IP) address, browser type and version, time zone setting and location.</li>
            <li><strong>Usage Data:</strong> Includes information about how you use our website and services.</li>
          </ul>
        </section>

        <section style={{ marginBottom: '2.5rem' }}>
          <h2 style={{ color: 'var(--accent)', marginBottom: '1rem' }}>3. How We Use Your Data</h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
            We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
          </p>
          <ul style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginTop: '1rem', paddingLeft: '1.5rem' }}>
            <li>To register you as a new client.</li>
            <li>To process and deliver your requested services.</li>
            <li>To manage our relationship with you.</li>
            <li>To use data analytics to improve our website, products/services, and marketing.</li>
          </ul>
        </section>

        <section style={{ marginBottom: '2.5rem' }}>
          <h2 style={{ color: 'var(--accent)', marginBottom: '1rem' }}>4. Data Security</h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
            We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed.
          </p>
        </section>

        <section style={{ marginBottom: '2.5rem' }}>
          <h2 style={{ color: 'var(--accent)', marginBottom: '1rem' }}>5. Contact Us</h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
            If you have any questions about this privacy policy or our privacy practices, please contact us at:
            <br /><br />
            <strong>Email:</strong> {`hello@imshamnas.com`}
          </p>
        </section>
      </div>
    </main>
  );
}
