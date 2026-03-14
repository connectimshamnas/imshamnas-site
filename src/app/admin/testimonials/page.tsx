'use client';
import { useState, useEffect, useRef } from 'react';
import { Plus, Trash2, Edit2, Check, X, Upload, Loader2 } from 'lucide-react';

interface Testimonial {
  id: number;
  author: string;
  role: string;
  text: string;
  image?: string;
}

export default function AdminTestimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editData, setEditData] = useState<Partial<Testimonial>>({});
  const [newForm, setNewForm] = useState({ author: '', role: '', text: '', image: '' });
  const [uploading, setUploading] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);
  const newImageRef = useRef<HTMLInputElement>(null);
  const editImageRef = useRef<HTMLInputElement>(null);

  useEffect(() => { fetchTestimonials(); }, []);

  const fetchTestimonials = async () => {
    const res = await fetch('/api/testimonials');
    const data = await res.json();
    setTestimonials(data);
  };

  const handleImageUpload = async (file: File, target: 'new' | 'edit') => {
    setUploading(target);
    const fd = new FormData();
    fd.append('file', file);
    try {
      const res = await fetch('/api/upload', { method: 'POST', body: fd });
      const data = await res.json();
      if (data.url) {
        if (target === 'new') setNewForm(f => ({ ...f, image: data.url }));
        else setEditData(e => ({ ...e, image: data.url }));
      }
    } catch (err) { console.error(err); }
    setUploading(null);
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newForm.author || !newForm.role || !newForm.text) return;
    setAdding(true);
    await fetch('/api/testimonials', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newForm)
    });
    setNewForm({ author: '', role: '', text: '', image: '' });
    fetchTestimonials();
    setAdding(false);
  };

  const startEdit = (t: Testimonial) => {
    setEditingId(t.id);
    setEditData({ author: t.author, role: t.role, text: t.text, image: t.image });
  };

  const saveEdit = async () => {
    await fetch('/api/testimonials', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: editingId, ...editData })
    });
    setEditingId(null);
    fetchTestimonials();
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this testimonial?')) return;
    await fetch(`/api/testimonials?id=${id}`, { method: 'DELETE' });
    fetchTestimonials();
  };

  return (
    <div>
      <h1 style={{ marginBottom: '0.5rem' }}>Manage Testimonials</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '3rem' }}>
        Add client testimonials with their photos. Images are displayed in the animated testimonial carousel.
      </p>

      {/* Add New */}
      <div className="card" style={{ padding: '2rem', marginBottom: '3rem' }}>
        <h3 style={{ marginBottom: '1.5rem' }}>Add New Testimonial</h3>
        <form onSubmit={handleAdd} style={{ display: 'grid', gap: '1.25rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="input-group">
              <label className="input-label">Client Name *</label>
              <input className="input-field" placeholder="Sarah Jenkins" value={newForm.author} onChange={e => setNewForm(f => ({ ...f, author: e.target.value }))} required />
            </div>
            <div className="input-group">
              <label className="input-label">Role / Company *</label>
              <input className="input-field" placeholder="CEO, TechFlow" value={newForm.role} onChange={e => setNewForm(f => ({ ...f, role: e.target.value }))} required />
            </div>
          </div>
          <div className="input-group">
            <label className="input-label">Testimonial Text *</label>
            <textarea className="input-field" rows={3} placeholder="What the client said..." value={newForm.text} onChange={e => setNewForm(f => ({ ...f, text: e.target.value }))} required />
          </div>
          <div className="input-group">
            <label className="input-label">Client Photo</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div
                onClick={() => newImageRef.current?.click()}
                style={{
                  width: '80px', height: '80px', borderRadius: '50%',
                  border: '2px dashed rgba(12,226,226,0.3)', display: 'flex',
                  alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
                  flexShrink: 0, overflow: 'hidden', position: 'relative',
                  background: 'rgba(12,226,226,0.03)'
                }}
              >
                {uploading === 'new' ? (
                  <Loader2 size={20} className="animate-spin" style={{ color: 'var(--accent)' }} />
                ) : newForm.image ? (
                  <img src={newForm.image} alt="preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <Upload size={20} style={{ color: 'var(--text-secondary)' }} />
                )}
              </div>
              <div>
                <button type="button" className="btn" style={{ padding: '0.5rem 1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', borderRadius: '8px', cursor: 'pointer', color: 'var(--text-secondary)', fontSize: '0.875rem' }} onClick={() => newImageRef.current?.click()}>
                  {newForm.image ? 'Change Photo' : 'Upload Photo'}
                </button>
                {newForm.image && <div style={{ fontSize: '0.8rem', color: 'var(--accent)', marginTop: '4px' }}>✓ Photo uploaded</div>}
              </div>
              <input ref={newImageRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={e => e.target.files?.[0] && handleImageUpload(e.target.files[0], 'new')} />
            </div>
          </div>
          <button type="submit" className="btn btn-primary" style={{ justifySelf: 'start', display: 'flex', alignItems: 'center', gap: '0.5rem' }} disabled={adding}>
            {adding ? <Loader2 size={18} className="animate-spin" /> : <Plus size={18} />}
            Add Testimonial
          </button>
        </form>
      </div>

      {/* List */}
      <h3 style={{ marginBottom: '1.5rem' }}>Existing Testimonials</h3>
      <div style={{ display: 'grid', gap: '1.5rem' }}>
        {Array.isArray(testimonials) && testimonials.map(t => (
          <div key={t.id} className="card" style={{ padding: '1.5rem' }}>
            {editingId === t.id ? (
              <div style={{ display: 'grid', gap: '1rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <input className="input-field" value={editData.author || ''} onChange={e => setEditData(d => ({ ...d, author: e.target.value }))} placeholder="Author" />
                  <input className="input-field" value={editData.role || ''} onChange={e => setEditData(d => ({ ...d, role: e.target.value }))} placeholder="Role" />
                </div>
                <textarea className="input-field" rows={3} value={editData.text || ''} onChange={e => setEditData(d => ({ ...d, text: e.target.value }))} />
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div onClick={() => editImageRef.current?.click()} style={{ width: '60px', height: '60px', borderRadius: '50%', border: '2px dashed rgba(12,226,226,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', overflow: 'hidden', flexShrink: 0, background: 'rgba(12,226,226,0.03)' }}>
                    {uploading === 'edit' ? <Loader2 size={16} className="animate-spin" style={{ color: 'var(--accent)' }} /> : editData.image ? <img src={editData.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <Upload size={16} style={{ color: 'var(--text-secondary)' }} />}
                  </div>
                  <button type="button" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', borderRadius: '8px', padding: '0.4rem 0.875rem', cursor: 'pointer', color: 'var(--text-secondary)', fontSize: '0.8rem' }} onClick={() => editImageRef.current?.click()}>
                    {editData.image ? 'Change' : 'Upload'} Photo
                  </button>
                  <input ref={editImageRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={e => e.target.files?.[0] && handleImageUpload(e.target.files[0], 'edit')} />
                  <div style={{ display: 'flex', gap: '0.5rem', marginLeft: 'auto' }}>
                    <button onClick={saveEdit} style={{ background: 'rgba(12,226,226,0.1)', border: '1px solid rgba(12,226,226,0.3)', borderRadius: '8px', padding: '0.4rem 0.875rem', cursor: 'pointer', color: 'var(--accent)', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.875rem' }}><Check size={16} /> Save</button>
                    <button onClick={() => setEditingId(null)} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', borderRadius: '8px', padding: '0.4rem 0.875rem', cursor: 'pointer', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.875rem' }}><X size={16} /> Cancel</button>
                  </div>
                </div>
              </div>
            ) : (
              <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '50%', flexShrink: 0, overflow: 'hidden', background: 'linear-gradient(135deg, rgba(12,226,226,0.15), rgba(100,80,220,0.15))', border: '2px solid rgba(12,226,226,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '1.25rem', color: 'var(--accent)' }}>
                  {t.image ? <img src={t.image} alt={t.author} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : t.author.split(' ').map(n => n[0]).join('')}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700 }}>{t.author}</div>
                  <div style={{ color: 'var(--accent)', fontSize: '0.85rem', marginBottom: '0.5rem' }}>{t.role}</div>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>"{t.text}"</p>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', flexShrink: 0 }}>
                  <button onClick={() => startEdit(t)} style={{ background: 'rgba(12,226,226,0.05)', border: '1px solid rgba(12,226,226,0.15)', borderRadius: '8px', padding: '0.4rem 0.75rem', cursor: 'pointer', color: 'var(--accent)' }}><Edit2 size={16} /></button>
                  <button onClick={() => handleDelete(t.id)} style={{ background: 'rgba(255,60,60,0.05)', border: '1px solid rgba(255,60,60,0.15)', borderRadius: '8px', padding: '0.4rem 0.75rem', cursor: 'pointer', color: '#ff6b6b' }}><Trash2 size={16} /></button>
                </div>
              </div>
            )}
          </div>
        ))}
        {testimonials.length === 0 && <p style={{ color: 'var(--text-secondary)' }}>No testimonials yet. Add one above.</p>}
      </div>
    </div>
  );
}
