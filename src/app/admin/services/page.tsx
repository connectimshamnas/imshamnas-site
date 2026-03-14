'use client';
import { useState, useEffect } from 'react';
import { Plus, Trash2 } from 'lucide-react';

export default function AdminServices() {
  const [services, setServices] = useState<any[]>([]);
  const [newTitle, setNewTitle] = useState('');
  const [newItems, setNewItems] = useState('');

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    const res = await fetch('/api/services');
    const data = await res.json();
    setServices(data);
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newItems) return;
    
    // Convert comma separated string to array
    const itemsArray = newItems.split(',').map(item => item.trim()).filter(Boolean);

    await fetch('/api/services', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: newTitle, items: itemsArray })
    });
    
    setNewTitle('');
    setNewItems('');
    fetchServices();
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure?')) return;
    await fetch(`/api/services?id=${id}`, { method: 'DELETE' });
    fetchServices();
  };

  return (
    <div>
      <h1 style={{ marginBottom: '2rem' }}>Manage Services</h1>
      
      <div className="card" style={{ marginBottom: '3rem' }}>
        <h3 style={{ marginBottom: '1.5rem' }}>Add New Service</h3>
        <form onSubmit={handleAdd} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <input 
            className="input-field" 
            placeholder="Service Title (e.g. Email Marketing)" 
            value={newTitle} 
            onChange={e => setNewTitle(e.target.value)} 
          />
          <input 
            className="input-field" 
             placeholder="Items (comma separated, e.g. Newsletter, Automation)" 
             value={newItems} 
             onChange={e => setNewItems(e.target.value)} 
          />
          <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>
            <Plus size={18} /> Add Service
          </button>
        </form>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
        {Array.isArray(services) && services.map(s => (
          <div key={s.id} className="card" style={{ position: 'relative' }}>
            <button 
              onClick={() => handleDelete(s.id)} 
              style={{ position: 'absolute', top: '1rem', right: '1rem', color: '#ef4444' }}
            >
              <Trash2 size={20} />
            </button>
            <h3 style={{ marginBottom: '1rem', color: 'var(--accent)', paddingRight: '2rem' }}>{s.title}</h3>
            <ul style={{ paddingLeft: '1.5rem', color: 'var(--text-secondary)' }}>
              {Array.isArray(s.items) && s.items.map((item: string, i: number) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
