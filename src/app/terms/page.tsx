'use client';
import { ArrowLeft } from 'lucide-react';

export default function TermsOfService() {
  return (
    <main className="bg-grid min-vh-100">
      <nav style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent)', textDecoration: 'none', fontWeight: 600 }}>
          <ArrowLeft size={18} /> Back to Home
        </a>
      </nav>

      <div className="container" style={{ padding: '4rem 1rem', maxWidth: '800px' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '2rem' }}>Terms of Service</h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '3rem' }}>Last Updated: March 14, 2026</p>

        <section style={{ marginBottom: '2.5rem' }}>
          <h2 style={{ color: 'var(--accent)', marginBottom: '1rem' }}>1. Agreement to Terms</h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
            By accessing or using imshamnas.com, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
          </p>
        </section>

        <section style={{ marginBottom: '2.5rem' }}>
          <h2 style={{ color: 'var(--accent)', marginBottom: '1rem' }}>2. Use License</h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
            Permission is granted to temporarily download one copy of the materials on imshamnas.com for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.
          </p>
        </section>

        <section style={{ marginBottom: '2.5rem' }}>
          <h2 style={{ color: 'var(--accent)', marginBottom: '1rem' }}>3. Service Provision</h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
            We specialize in Digital Marketing, SEO, and Web Development. The specific scope of work, timelines, and deliverables for any project will be outlined in a separate service agreement signed by both parties.
          </p>
        </section>

        <section style={{ marginBottom: '2.5rem' }}>
          <h2 style={{ color: 'var(--accent)', marginBottom: '1rem' }}>4. Disclaimer</h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
            The materials on imshamnas.com are provided on an 'as is' basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
          </p>
        </section>

        <section style={{ marginBottom: '2.5rem' }}>
          <h2 style={{ color: 'var(--accent)', marginBottom: '1rem' }}>5. Limitations</h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
            In no event shall imshamnas.com or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on the website.
          </p>
        </section>

        <section style={{ marginBottom: '2.5rem' }}>
          <h2 style={{ color: 'var(--accent)', marginBottom: '1rem' }}>6. Governing Law</h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
            These terms and conditions are governed by and construed in accordance with the laws of Oman and the GCC region, and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
          </p>
        </section>
      </div>
    </main>
  );
}
