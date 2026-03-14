'use client';
import { useState, useEffect } from 'react';
import { Plus, Trash2, Loader2 } from 'lucide-react';

export default function AdminContactServices() {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [newLabel, setNewLabel] = useState('');
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const res = await fetch('/api/contact-services');
      const data = await res.json();
      setServices(data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLabel.trim()) return;
    setAdding(true);
    try {
      const res = await fetch('/api/contact-services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ label: newLabel })
      });
      if (res.ok) {
        setNewLabel('');
        fetchServices();
      }
    } catch (err) {
      console.error(err);
    }
    setAdding(false);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to remove this option?')) return;
    try {
      const res = await fetch(`/api/contact-services?id=${id}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        fetchServices();
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}><Loader2 className="animate-spin" /></div>;

  return (
    <div>
      <h1 style={{ marginBottom: '1rem' }}>Contact Form Options</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '3rem' }}>
        Manage the "Service Needed" dropdown options that users see on the contact form.
      </p>

      <div className="card" style={{ marginBottom: '3rem', padding: '2rem' }}>
        <h3 style={{ marginBottom: '1.5rem' }}>Add New Option</h3>
        <form onSubmit={handleAdd} style={{ display: 'flex', gap: '1rem' }}>
          <input 
            type="text" 
            className="input-field" 
            placeholder="e.g., SEO Consulting" 
            value={newLabel}
            onChange={(e) => setNewLabel(e.target.value)}
            disabled={adding}
          />
          <button type="submit" className="btn btn-primary" style={{ padding: '0.75rem 1.5rem' }} disabled={adding}>
            {adding ? <Loader2 size={18} className="animate-spin" /> : <Plus size={18} />}
            Add Option
          </button>
        </form>
      </div>

      <div style={{ display: 'grid', gap: '1rem' }}>
        <h3 style={{ marginBottom: '0.5rem' }}>Existing Options</h3>
        {Array.isArray(services) && services.length === 0 ? (
          <p style={{ color: 'var(--text-secondary)' }}>No options defined.</p>
        ) : (
          Array.isArray(services) && services.map(s => (
            <div key={s.id} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 1.5rem' }}>
              <span style={{ fontWeight: 600 }}>{s.label}</span>
              <button 
                onClick={() => handleDelete(s.id)}
                style={{ background: 'none', border: 'none', color: '#ff4444', cursor: 'pointer', padding: '0.5rem' }}
                title="Delete Option"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
