'use client';
import { useState, useEffect } from 'react';
import { Save, Loader2, Globe, MessageSquare, Box, Instagram, Twitter, Linkedin } from 'lucide-react';

export default function SettingsPage() {
  const [settings, setSettings] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('/api/settings')
      .then(res => res.json())
      .then(data => {
        setSettings(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      });
      if (res.ok) {
        setMessage('Settings updated successfully!');
        setTimeout(() => setMessage(''), 3000);
      }
    } catch (err) {
      console.error(err);
      setMessage('Error saving settings.');
    }
    setSaving(false);
  };

  if (loading) return <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}><Loader2 className="animate-spin" /></div>;

  interface SettingKey {
    key: string;
    label: string;
    placeholder?: string;
    type?: 'text' | 'textarea';
    icon?: React.ReactNode;
  }

  interface Section {
    title: string;
    icon: React.ReactNode;
    keys: SettingKey[];
  }

  const sections: Section[] = [
    {
      title: 'Hero Section',
      icon: <Globe size={18} />,
      keys: [
        { key: 'hero_subtitle', label: 'Badge Text (Top)', placeholder: 'AVAILABLE FOR NEW PROJECTS' },
        { key: 'hero_main_title_suffix', label: 'Headline Suffix', placeholder: 'That Delivers Results' },
        { key: 'hero_description', label: 'Hero Description', type: 'textarea' }
      ]
    },
    {
      title: 'Success Counters',
      icon: <Box size={18} />,
      keys: [
        { key: 'stat_1_val', label: 'Stat 1 Value', placeholder: '5.0' },
        { key: 'stat_1_label', label: 'Stat 1 Label', placeholder: 'Google Reviews' },
        { key: 'stat_2_val', label: 'Stat 2 Value', placeholder: '4.2' },
        { key: 'stat_2_label', label: 'Stat 2 Label', placeholder: 'Paid Campaigns' },
        { key: 'stat_3_val', label: 'Stat 3 Value', placeholder: '150' },
        { key: 'stat_3_label', label: 'Stat 3 Label', placeholder: 'Projects Delivered' }
      ]
    },
    {
      title: 'Contact Information',
      icon: <MessageSquare size={18} />,
      keys: [
        { key: 'contact_title', label: 'Contact Headline', placeholder: 'Ready to grow your business online?' },
        { key: 'contact_subtitle', label: 'Contact Sub-headline', type: 'textarea' },
        { key: 'email', label: 'Email Address', placeholder: 'hello@imshamnas.com' },
        { key: 'location', label: 'Location Text', placeholder: 'Available Worldwide' }
      ]
    },
    {
      title: 'Social Media Links',
      icon: <Instagram size={18} />,
      keys: [
        { key: 'linkedin_url', label: 'LinkedIn URL', icon: <Linkedin size={14} /> },
        { key: 'twitter_url', label: 'Twitter/X URL', icon: <Twitter size={14} /> },
        { key: 'instagram_url', label: 'Instagram URL', icon: <Instagram size={14} /> }
      ]
    },
    {
      title: 'About Section',
      icon: <Box size={18} />,
      keys: [
        { key: 'about_title', label: 'About Title', placeholder: 'Hi, I am Shamnas — Digital Growth Expert' },
        { key: 'about_para_1', label: 'First Paragraph', type: 'textarea' as const },
        { key: 'about_para_2', label: 'Second Paragraph', type: 'textarea' as const },
        { key: 'about_skill_1', label: 'Skill Badge 1', placeholder: '✓ SEO & Content Strategy' },
        { key: 'about_skill_2', label: 'Skill Badge 2', placeholder: '✓ Google & Meta Ads' },
        { key: 'about_skill_3', label: 'Skill Badge 3', placeholder: '✓ Web Design & Development' },
        { key: 'about_skill_4', label: 'Skill Badge 4', placeholder: '✓ Marketing Automation' },
        { key: 'about_cta', label: 'CTA Button Text', placeholder: 'Work With Me' },
        { key: 'about_stat_1_val', label: 'Stat 1 Value', placeholder: '5+' },
        { key: 'about_stat_1_label', label: 'Stat 1 Label', placeholder: 'Years Experience' },
        { key: 'about_stat_2_val', label: 'Stat 2 Value', placeholder: '150+' },
        { key: 'about_stat_2_label', label: 'Stat 2 Label', placeholder: 'Projects Completed' },
        { key: 'about_stat_3_val', label: 'Stat 3 Value', placeholder: '50+' },
        { key: 'about_stat_3_label', label: 'Stat 3 Label', placeholder: 'Happy Clients' },
        { key: 'about_stat_4_val', label: 'Stat 4 Value', placeholder: '4.2x' },
        { key: 'about_stat_4_label', label: 'Stat 4 Label', placeholder: 'Average ROAS' },
      ]
    }
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Site Settings</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Manage all text, links, and content across the site.</p>
        </div>
        <button 
          onClick={handleSave} 
          disabled={saving}
          className="btn btn-primary" 
          style={{ padding: '0.75rem 1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
        >
          {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      {message && (
        <div style={{ background: 'rgba(12, 226, 226, 0.1)', border: '1px solid var(--accent)', color: 'var(--accent)', padding: '1rem', borderRadius: '8px', marginBottom: '2rem' }}>
          {message}
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {sections.map((section, idx) => (
          <div key={idx} className="card" style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '1rem' }}>
              <div style={{ color: 'var(--accent)' }}>{section.icon}</div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 600 }}>{section.title}</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
              {section.keys.map((item: any) => (
                <div key={item.key} className="input-group">
                  <label className="input-label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    {item.icon} {item.label}
                  </label>
                  {item.type === 'textarea' ? (
                    <textarea 
                      className="input-field" 
                      rows={3} 
                      value={settings[item.key] || ''} 
                      onChange={(e) => setSettings({ ...settings, [item.key]: e.target.value })}
                    />
                  ) : (
                    <input 
                      type="text" 
                      className="input-field" 
                      placeholder={item.placeholder || ''}
                      value={settings[item.key] || ''} 
                      onChange={(e) => setSettings({ ...settings, [item.key]: e.target.value })}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
