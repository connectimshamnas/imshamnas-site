'use client';
import { useState, useEffect } from 'react';

export default function AdminMessages() {
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    const res = await fetch('/api/contact');
    const data = await res.json();
    setMessages(data);
  };

  return (
    <div>
      <h1 style={{ marginBottom: '2rem' }}>Contact Messages & Leads</h1>

      <div style={{ display: 'grid', gap: '1.5rem' }}>
        {(!Array.isArray(messages) || messages.length === 0) ? (
          <p style={{ color: 'var(--text-secondary)' }}>No messages yet.</p>
        ) : (
          messages.map(m => (
            <div key={m.id} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <h3 style={{ marginBottom: '0.25rem' }}>{m.name}</h3>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <a href={`mailto:${m.email}`} style={{ color: 'var(--accent)', fontSize: '0.875rem' }}>{m.email}</a>
                    {m.phone && <span style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>• {m.phone}</span>}
                  </div>
                </div>
                <div className="badge" style={{ margin: 0 }}>{m.service}</div>
              </div>
              <p style={{ color: 'var(--text-secondary)', background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: '0.5rem' }}>
                {m.message}
              </p>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textAlign: 'right' }}>
                {new Date(m.created_at).toLocaleString()}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
