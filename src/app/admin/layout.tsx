'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const isLoginPage = pathname === '/admin/login';

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  if (isLoginPage) {
    return <>{children}</>;
  }

  const navLinks = [
    { href: '/admin/services', label: 'Services' },
    { href: '/admin/contact-services', label: 'Contact Form Options' },
    { href: '/admin/testimonials', label: 'Testimonials' },
    { href: '/admin/settings', label: 'Site Settings (CMS)' },
    { href: '/admin/messages', label: 'Messages (Leads)' },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--background)' }}>
      <aside style={{ width: '260px', background: 'var(--surface)', borderRight: '1px solid var(--border)', padding: '2rem', display: 'flex', flexDirection: 'column' }}>
        <div style={{ fontWeight: 800, fontSize: '1.25rem', marginBottom: '3rem' }}>
          Admin<span className="text-accent">Panel</span>
        </div>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                color: pathname === link.href ? 'var(--accent)' : 'var(--text-secondary)',
                padding: '0.6rem 0.75rem',
                borderRadius: '8px',
                background: pathname === link.href ? 'rgba(12,226,226,0.07)' : 'transparent',
                fontWeight: pathname === link.href ? 600 : 400,
                fontSize: '0.9rem',
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <Link href="/" style={{ color: 'var(--accent)', fontSize: '0.875rem' }}>← Back to Site</Link>
          <button
            onClick={handleLogout}
            style={{ background: 'rgba(255,60,60,0.07)', border: '1px solid rgba(255,60,60,0.2)', color: '#ff6b6b', borderRadius: '8px', padding: '0.5rem 0.75rem', cursor: 'pointer', fontSize: '0.875rem', textAlign: 'left' }}
          >
            Sign Out
          </button>
        </div>
      </aside>
      <main style={{ flex: 1, padding: '3rem', overflowY: 'auto' }}>
        {children}
      </main>
    </div>
  );
}
