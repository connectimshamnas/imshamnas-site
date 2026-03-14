'use client';
import { Mail, CheckCircle, Send, ArrowRight, Instagram } from 'lucide-react';
import { useState, useEffect, useCallback, useMemo, useRef } from 'react';

const BrandLogo = ({ className = "", style = {}, variant = "default" }: { className?: string, style?: React.CSSProperties, variant?: 'default' | 'plain' | 'premium' }) => {
  if (variant === 'plain') {
    return <span className={`brand-name brand-plain ${className}`} style={style}>imshamnas</span>;
  }
  if (variant === 'premium') {
    return <span className={`brand-name brand-premium ${className}`} style={style}>imshamnas.</span>;
  }
  return (
    <span className={`brand-name ${className}`} style={style}>
      <span className="brand-im">im</span>
      <span className="brand-shamnas">shamnas</span>
      <span className="brand-dot">.</span>
    </span>
  );
};

const SyncedTypewriter = ({ 
  text, 
  onTypeComplete, 
  onDeleteComplete, 
  triggerDelete 
}: { 
  text: string, 
  onTypeComplete: () => void, 
  onDeleteComplete: () => void, 
  triggerDelete: boolean 
}) => {
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // Handle triggerDelete change
  useEffect(() => {
    if (triggerDelete) {
      setIsDeleting(true);
    } else {
      setDisplayText(""); // Reset when not deleting and text changed
      setIsDeleting(false);
    }
  }, [triggerDelete, text]);

  useEffect(() => {
    if (isDeleting) {
      if (displayText.length > 0) {
        const timeout = setTimeout(() => {
          setDisplayText(prev => prev.slice(0, -1));
        }, 30);
        return () => clearTimeout(timeout);
      } else {
        onDeleteComplete();
      }
    } else {
      if (displayText.length < text.length) {
        const timeout = setTimeout(() => {
          setDisplayText(text.slice(0, displayText.length + 1));
        }, 70);
        return () => clearTimeout(timeout);
      } else {
        onTypeComplete();
      }
    }
  }, [displayText, isDeleting, text, onTypeComplete, onDeleteComplete]);

  return (
    <span className="hero-gradient-text">
      {displayText}
      <span className="typewriter-cursor">|</span>
    </span>
  );
};

const StatCounter = ({ end, duration = 2000, suffix = "" }: { end: number, duration?: number, suffix?: string }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let startTimestamp: any = null;
    const step = (timestamp: any) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(Math.floor(progress * end * 10) / 10);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [end, duration]);
  return <>{count}{suffix}</>;
};

const ParticleBackground = () => {
  const [particles, setParticles] = useState<any[]>([]);
  useEffect(() => {
    const p = Array.from({ length: 20 }).map(() => ({
      left: `${Math.random() * 100}%`,
      duration: `${15 + Math.random() * 20}s`,
      drift: `${(Math.random() - 0.5) * 200}px`,
      size: `${2 + Math.random() * 4}px`,
      delay: `${Math.random() * 20}s`
    }));
    setParticles(p);
  }, []);
  return (
    <div className="particle-container">
      {particles.map((p, i) => (
        <div key={i} className="particle" style={{ left: p.left, width: p.size, height: p.size, '--duration': p.duration, '--drift': p.drift, animationDelay: p.delay } as any} />
      ))}
    </div>
  );
};

const Marquee = () => {
  const tags = ["Web Design", "SEO Optimization", "Google Ads", "Meta Ads", "ERP Solutions", "Brand Strategy", "Content Marketing", "UI/UX Design"];
  return (
    <div className="marquee-container">
      {[1, 2].map((i) => (
        <div key={i} className="marquee-content">
          {tags.map((tag, j) => (
            <div key={j} className="marquee-item">
              <CheckCircle size={14} className="text-accent" />
              {tag}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

const HolographicCore = ({ title, show }: { title: string, show: boolean }) => {
  return (
    <div className="holographic-core">
      <div className="core-pulse"></div>
      {/* Replit-style Dotted Orbits */}
      <div className="dotted-orbit" style={{ width: '220px', height: '220px' }}></div>
      <div className="dotted-orbit" style={{ width: '260px', height: '260px', opacity: 0.5 }}></div>
      <div className="dotted-orbit" style={{ width: '300px', height: '300px', opacity: 0.2 }}></div>
      
      <svg style={{ position: 'absolute', width: '100%', height: '100%', pointerEvents: 'none' }} viewBox="0 0 280 280">
        <circle cx="140" cy="140" r="100" fill="none" stroke="rgba(12, 226, 226, 0.15)" strokeWidth="1" strokeDasharray="5,5" className="rotating-ring" style={{ '--rev-duration': '30s' } as any} />
      </svg>
      <div className={`hero-gradient-text ${show ? 'animate-pop-in' : 'animate-pop-out'}`} style={{ fontSize: '1.25rem', fontWeight: 800, textAlign: 'center', padding: '0 20px', zIndex: 2, position: 'relative', opacity: show ? 1 : 0 }} key={title}>
        {title}
      </div>
    </div>
  );
};

const CreativeOrbit = ({ items, showStage }: { items: string[], showStage: 'ENTRY' | 'STAY' | 'EXIT' | 'HIDDEN' }) => {
  return (
    <div className="orbit-3d" style={{ position: 'relative', width: '100%', height: '100%', pointerEvents: 'none' }}>
      {showStage !== 'HIDDEN' && items.map((item, i) => {
        const duration = 20; 
        const isExiting = showStage === 'EXIT';
        return (
          <div key={`${item}-${i}`} style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'auto',
            animation: `orbital-3d-motion ${duration}s linear infinite`,
            animationDelay: `-${(i * (duration / items.length))}s`,
          }}>
            <div className={`glass-pill ${isExiting ? 'animate-pop-out' : 'animate-pop-in'}`} style={{
              animationDelay: isExiting ? `${i * 0.1}s` : `${i * 0.2}s`,
              transformOrigin: 'center center'
            }}>
              <div style={{ width: '24px', height: '24px', borderRadius: '4px', background: 'rgba(12,226,226,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(12, 226, 226, 0.2)' }}>
                {i % 3 === 0 ? <Mail size={12} /> : i % 3 === 1 ? <ArrowRight size={12} /> : <CheckCircle size={12} />}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#fff' }}>{item}</span>
                <span style={{ fontSize: '0.6rem', color: 'rgba(12, 226, 226, 0.7)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Success Metrics</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};


// ─── Testimonials Carousel ────────────────────────────────────────────────────
const TestimonialsCarousel = ({ testimonials }: { testimonials: any[] }) => {
  const [active, setActive] = useState(0);
  const [animDir, setAnimDir] = useState<'left' | 'right'>('right');
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const total = testimonials.length;

  const go = useCallback((next: number, dir: 'left' | 'right') => {
    setAnimDir(dir);
    setActive((next + total) % total);
  }, [total]);

  useEffect(() => {
    timerRef.current = setTimeout(() => go(active + 1, 'right'), 5000);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [active, go]);

  const prev = () => { if (timerRef.current) clearTimeout(timerRef.current); go(active - 1, 'left'); };
  const next = () => { if (timerRef.current) clearTimeout(timerRef.current); go(active + 1, 'right'); };

  const t = testimonials[active];
  const prev2 = testimonials[(active - 1 + total) % total];
  const next2 = testimonials[(active + 1) % total];

  return (
    <div style={{ position: 'relative', maxWidth: '900px', margin: '0 auto' }}>
      {/* Side cards */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr 1fr', gap: '1.5rem', alignItems: 'center' }}>
        {/* Prev */}
        <div onClick={prev} style={{ cursor: 'pointer', opacity: 0.35, transform: 'scale(0.9)', transition: 'all 0.3s', filter: 'blur(1px)' }} className="card" title={prev2?.author}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', overflow: 'hidden', flexShrink: 0, background: 'linear-gradient(135deg, rgba(12,226,226,0.2), rgba(100,80,220,0.2))', border: '2px solid rgba(12,226,226,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.875rem', color: 'var(--accent)' }}>
              {prev2?.image ? <img src={prev2.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : prev2?.author?.split(' ').map((n: string) => n[0]).join('')}
            </div>
            <div style={{ fontSize: '0.75rem', fontWeight: 600, lineHeight: 1.2 }}>
              <div style={{ color: 'var(--text-primary)' }}>{prev2?.author}</div>
              <div style={{ color: 'var(--accent)' }}>{prev2?.role}</div>
            </div>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', lineHeight: 1.5, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}>"{prev2?.text}"</p>
        </div>

        {/* Active */}
        <div key={active} className="card" style={{ padding: '2.5rem', background: 'rgba(12,226,226,0.03)', border: '1px solid rgba(12,226,226,0.2)', boxShadow: '0 0 40px rgba(12,226,226,0.06)', animation: `fadeSlide${animDir === 'right' ? 'In' : 'InLeft'} 0.4s ease` }}>
          {/* Stars */}
          <div style={{ display: 'flex', gap: '4px', marginBottom: '1.5rem' }}>
            {[...Array(5)].map((_, i) => (
              <svg key={i} width="18" height="18" viewBox="0 0 24 24" fill="var(--accent)"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            ))}
          </div>

          {/* Quote */}
          <p style={{ color: 'var(--text-primary)', fontSize: '1.15rem', lineHeight: 1.75, fontStyle: 'italic', marginBottom: '2rem', minHeight: '90px' }}>
            "{t?.text}"
          </p>

          {/* Author */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '1.5rem' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '50%', overflow: 'hidden', flexShrink: 0, background: 'linear-gradient(135deg, rgba(12,226,226,0.2), rgba(100,80,220,0.3))', border: '3px solid rgba(12,226,226,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '1.25rem', color: 'var(--accent)' }}>
              {t?.image ? <img src={t.image} alt={t?.author} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : t?.author?.split(' ').map((n: string) => n[0]).join('')}
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>{t?.author}</div>
              <div style={{ color: 'var(--accent)', fontWeight: 500, fontSize: '0.875rem' }}>{t?.role}</div>
            </div>
          </div>
        </div>

        {/* Next */}
        <div onClick={next} style={{ cursor: 'pointer', opacity: 0.35, transform: 'scale(0.9)', transition: 'all 0.3s', filter: 'blur(1px)' }} className="card" title={next2?.author}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', overflow: 'hidden', flexShrink: 0, background: 'linear-gradient(135deg, rgba(12,226,226,0.2), rgba(100,80,220,0.2))', border: '2px solid rgba(12,226,226,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.875rem', color: 'var(--accent)' }}>
              {next2?.image ? <img src={next2.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : next2?.author?.split(' ').map((n: string) => n[0]).join('')}
            </div>
            <div style={{ fontSize: '0.75rem', fontWeight: 600, lineHeight: 1.2 }}>
              <div style={{ color: 'var(--text-primary)' }}>{next2?.author}</div>
              <div style={{ color: 'var(--accent)' }}>{next2?.role}</div>
            </div>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', lineHeight: 1.5, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}>"{next2?.text}"</p>
        </div>
      </div>

      {/* Nav Dots */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '2.5rem', alignItems: 'center' }}>
        <button onClick={prev} style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
        {testimonials.map((_, i) => (
          <button key={i} onClick={() => { if (timerRef.current) clearTimeout(timerRef.current); go(i, i > active ? 'right' : 'left'); }} style={{ width: i === active ? '24px' : '8px', height: '8px', borderRadius: '99px', background: i === active ? 'var(--accent)' : 'rgba(255,255,255,0.15)', border: 'none', cursor: 'pointer', transition: 'all 0.3s', padding: 0 }} />
        ))}
        <button onClick={next} style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6"/></svg>
        </button>
      </div>
    </div>
  );
};

// ─── Cookie Consent ──────────────────────────────────────────────────────────
const CookieConsent = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      const timer = setTimeout(() => setShow(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="animate-fade-in" style={{
      position: 'fixed', bottom: '2rem', left: '2rem', right: '2rem', zIndex: 100,
      display: 'flex', justifyContent: 'center'
    }}>
      <div className="card glass" style={{
        maxWidth: '600px', padding: '1.5rem 2rem', display: 'flex',
        alignItems: 'center', gap: '2rem', boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
        border: '1px solid rgba(12, 226, 226, 0.2)'
      }}>
        <div style={{ flex: 1 }}>
          <h4 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CheckCircle size={18} style={{ color: 'var(--accent)' }} /> 
            Professional Experience
          </h4>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.5 }}>
            We use cookies to enhance your experience and analyze our traffic. By continuing to visit this site you agree to our <a href="/cookies" style={{ color: 'var(--accent)' }}>Cookie Policy</a>.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button onClick={accept} className="btn btn-primary" style={{ padding: '0.6rem 1.5rem', fontSize: '0.875rem' }}>
            Accept All
          </button>
          <button onClick={() => setShow(false)} style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '1.25rem' }}>
            ×
          </button>
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });

  const [contactServices, setContactServices] = useState<any[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    alert('Message sent successfully!');
    setFormData({ name: '', email: '', phone: '', service: '', message: '' });
  };

  const [services, setServices] = useState<any[]>([]);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [settings, setSettings] = useState<any>(null);
  const [activeServiceIndex, setActiveServiceIndex] = useState(0);
  const [animationStage, setAnimationStage] = useState<'TYPING' | 'BADGES_ENTRY' | 'STAY' | 'BADGES_EXIT' | 'DELETING'>('TYPING');

  const onTypeComplete = useCallback(() => {
    setAnimationStage('BADGES_ENTRY');
  }, []);

  const onDeleteComplete = useCallback(() => {
    setAnimationStage('TYPING');
    setActiveServiceIndex(prev => (prev + 1) % (services.length || 1));
  }, [services.length]);

  useEffect(() => {
    if (animationStage === 'BADGES_ENTRY') {
      const timer = setTimeout(() => setAnimationStage('STAY'), 800);
      return () => clearTimeout(timer);
    }
    if (animationStage === 'STAY') {
      const timer = setTimeout(() => setAnimationStage('BADGES_EXIT'), 3000);
      return () => clearTimeout(timer);
    }
    if (animationStage === 'BADGES_EXIT') {
      const timer = setTimeout(() => setAnimationStage('DELETING'), 800);
      return () => clearTimeout(timer);
    }
  }, [animationStage]);

  useEffect(() => {
    fetch('/api/services')
      .then(res => res.json())
      .then(data => setServices(data))
      .catch(console.error);

    fetch('/api/testimonials')
      .then(res => res.json())
      .then(data => setTestimonials(data))
      .catch(console.error);

    fetch('/api/settings')
      .then(res => res.json())
      .then(data => setSettings(data))
      .catch(console.error);

    fetch('/api/contact-services')
      .then(res => res.json())
      .then(data => setContactServices(data))
      .catch(console.error);
  }, []);

  const currentService = services[activeServiceIndex] || { title: "Loading...", sub_services: [] };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "imshamnas",
            "image": "https://imshamnas.com/og-image.jpg",
            "url": "https://imshamnas.com",
            "telephone": settings?.phone || "",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Muscat",
              "addressRegion": "Oman",
              "addressCountry": "OM"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": 23.5859,
              "longitude": 58.4059
            },
            "serviceArea": ["Oman", "United Arab Emirates", "Saudi Arabia", "Qatar", "Kuwait", "Bahrain"],
            "description": "Professional Digital Marketing, SEO, and Web Development services in the GCC region.",
            "sameAs": [
              settings?.linkedin_url || "https://linkedin.com",
              settings?.twitter_url || "https://twitter.com",
              settings?.instagram_url || "https://instagram.com"
            ]
          })
        }}
      />
      {/* Navigation */}
      <nav style={{ padding: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1200px', margin: '0 auto' }}>
        <div className="logo">
          <BrandLogo variant="premium" />
        </div>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <a href="#services" style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Services</a>
          <a href="#about" style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>About</a>
          <a href="#testimonials" style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Testimonials</a>
          <a href="#contact" style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Contact</a>
          <a href="#contact" className="btn btn-primary" style={{ padding: '0.5rem 1.25rem' }}>Let's Talk</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="section bg-grid" style={{ minHeight: '90vh', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
        <ParticleBackground />
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '4rem', alignItems: 'center', position: 'relative', zIndex: 1, paddingBottom: '4rem' }}>
          <div className="animate-fade-in">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(12, 226, 226, 0.05)', border: '1px solid rgba(12, 226, 226, 0.2)', padding: '6px 12px', borderRadius: '99px', fontSize: '10px', fontWeight: 700, letterSpacing: '0.05em', color: 'var(--accent)', marginBottom: '2rem', width: 'fit-content' }}>
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent)', boxShadow: '0 0 10px var(--accent)' }}></div>
              {settings?.hero_subtitle || 'AVAILABLE FOR NEW PROJECTS'}
            </div>
            
            <h1 style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', marginBottom: '1.5rem', lineHeight: 1.1 }}>
              <SyncedTypewriter 
                text={currentService.title}
                onTypeComplete={onTypeComplete}
                onDeleteComplete={onDeleteComplete}
                triggerDelete={animationStage === 'DELETING'}
              /><br />
              {settings?.hero_main_title_suffix || 'That Delivers Results'}
            </h1>
            
            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', marginBottom: '2.5rem', maxWidth: '520px', lineHeight: 1.7 }}>
              {settings?.hero_description || 'SEO, paid ads, social media, web design, and ERP solutions — everything your business needs to grow online, under one roof at imshamnas.com.'}
            </p>

            <div style={{ display: 'flex', gap: '8px', marginBottom: '3rem' }}>
              <span className="hero-pill-tag">SEO</span>
              <span className="hero-pill-tag">Ads</span>
              <span className="hero-pill-tag" style={{ color: 'var(--accent)', borderColor: 'var(--accent)' }}>Web Design</span>
              <span className="hero-pill-tag">ERP</span>
            </div>
            
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '4rem' }}>
              <a href="#services" className="btn btn-primary" style={{ padding: '0.8rem 2rem', borderRadius: '12px' }}>
                Our Services <ArrowRight size={18} />
              </a>
              <a href="#contact" className="btn btn-outline" style={{ padding: '0.8rem 2rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
                Contact Me
              </a>
            </div>

            <div style={{ display: 'flex', gap: '3rem' }}>
              <div className="stat-item">
                <div className="stat-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg></div>
                <div className="stat-text">
                  <span className="stat-value"><StatCounter end={parseFloat(settings?.stat_1_val || "5.0")} suffix=" Rating" /></span>
                  <span className="stat-label">{settings?.stat_1_label || 'Google Reviews'}</span>
                </div>
              </div>
              <div className="stat-item">
                <div className="stat-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M23 6l-9.5 9.5-5-5L1 18"/><path d="M17 6h6v6"/></svg></div>
                <div className="stat-text">
                  <span className="stat-value"><StatCounter end={parseFloat(settings?.stat_2_val || "4.2")} suffix="x Avg ROAS" /></span>
                  <span className="stat-label">{settings?.stat_2_label || 'Paid Campaigns'}</span>
                </div>
              </div>
              <div className="stat-item">
                <div className="stat-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg></div>
                <div className="stat-text">
                  <span className="stat-value"><StatCounter end={parseFloat(settings?.stat_3_val || "150")} suffix="+ Projects" /></span>
                  <span className="stat-label">{settings?.stat_3_label || 'Delivered'}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="animate-fade-in delay-200" style={{ position: 'relative', height: '600px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <HolographicCore title={currentService.title} show={animationStage === 'BADGES_ENTRY' || animationStage === 'STAY'} />
            <CreativeOrbit 
              items={currentService.items?.slice(0, 4) || []} 
              showStage={
                animationStage === 'BADGES_ENTRY' ? 'ENTRY' :
                animationStage === 'STAY' ? 'STAY' :
                animationStage === 'BADGES_EXIT' ? 'EXIT' : 'HIDDEN'
              } 
            />
          </div>
        </div>
        
        {/* Scrolling Marquee */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', zIndex: 2 }}>
          <Marquee />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section bg-grid">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6rem', alignItems: 'center' }}>
            {/* Left - Text Content */}
            <div>
              <div className="badge" style={{ marginBottom: '1.5rem' }}>About Me</div>
              <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.2, marginBottom: '1.5rem' }}>
                {settings?.about_title || 'Hi, I\'m Shamnas — Digital Growth Expert'}
              </h2>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '1.05rem', marginBottom: '1.5rem' }}>
                {settings?.about_para_1 || 'With years of hands-on experience in SEO, paid advertising, social media, and web development, I help businesses achieve measurable results online. I believe in data-driven strategies that translate to real revenue growth.'}
              </p>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '1.05rem', marginBottom: '2.5rem' }}>
                {settings?.about_para_2 || 'Whether you\'re a startup looking to launch or an established brand ready to scale, I bring the expertise and dedication to take your digital presence to the next level.'}
              </p>

              {/* Skills / highlights */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2.5rem' }}>
                {[
                  settings?.about_skill_1 || '✓ SEO & Content Strategy',
                  settings?.about_skill_2 || '✓ Google & Meta Ads',
                  settings?.about_skill_3 || '✓ Web Design & Development',
                  settings?.about_skill_4 || '✓ Marketing Automation',
                ].map((skill, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', background: 'rgba(12,226,226,0.04)', border: '1px solid rgba(12,226,226,0.1)', borderRadius: '10px', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent)', flexShrink: 0 }} />
                    {skill}
                  </div>
                ))}
              </div>

              <a href="#contact" className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.875rem 2rem' }}>
                {settings?.about_cta || 'Work With Me'}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14m-7-7 7 7-7 7"/></svg>
              </a>
            </div>

            {/* Right - Stats / Visual Panel */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              {[
                { val: settings?.about_stat_1_val || '5+', label: settings?.about_stat_1_label || 'Years Experience', icon: '🚀' },
                { val: settings?.about_stat_2_val || '150+', label: settings?.about_stat_2_label || 'Projects Completed', icon: '🎯' },
                { val: settings?.about_stat_3_val || '50+', label: settings?.about_stat_3_label || 'Happy Clients', icon: '🤝' },
                { val: settings?.about_stat_4_val || '4.2x', label: settings?.about_stat_4_label || 'Average ROAS', icon: '📈' },
              ].map((item, i) => (
                <div key={i} className="card" style={{ textAlign: 'center', padding: '2rem 1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ fontSize: '2rem' }}>{item.icon}</div>
                  <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--accent)', lineHeight: 1 }}>{item.val}</div>
                  <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', fontWeight: 500, textAlign: 'center' }}>{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="section" style={{ background: 'var(--surface)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <div className="badge">Expertise</div>
            <h2>Comprehensive Solutions</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
            {services.map((service, i) => (
              <div key={i} className="card animate-fade-in" style={{ animationDelay: `${i * 100}ms` }}>
                <h3 style={{ marginBottom: '1.5rem', color: 'var(--accent)' }}>{service.title}</h3>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {service.items.map((item: string, j: number) => (
                    <li key={j} style={{ color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}>
                      <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--accent)' }}></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="section bg-grid" style={{ overflow: 'hidden' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(12, 226, 226, 0.05)', border: '1px solid rgba(12, 226, 226, 0.2)', padding: '6px 16px', borderRadius: '99px', fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em', color: 'var(--accent)', marginBottom: '1.5rem', textTransform: 'uppercase' }}>
              Testimonials
            </div>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>What Clients Say</h2>
          </div>

          {testimonials.length > 0 && <TestimonialsCarousel testimonials={testimonials} />}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section" style={{ background: 'var(--surface)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-10%', right: '-10%', width: '40%', height: '60%', background: 'radial-gradient(circle, rgba(12, 226, 226, 0.05) 0%, transparent 70%)', zIndex: 0 }}></div>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '6rem', position: 'relative', zIndex: 1 }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(12, 226, 226, 0.05)', border: '1px solid rgba(12, 226, 226, 0.2)', padding: '6px 16px', borderRadius: '99px', fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em', color: 'var(--accent)', marginBottom: '1.5rem', textTransform: 'uppercase' }}>
              Contact
            </div>
            <h2 style={{ marginBottom: '1.5rem', fontSize: '3rem', lineHeight: 1.2 }}>
              {settings?.contact_title || 'Ready to grow your business online?'}
            </h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '3.5rem', fontSize: '1.125rem' }}>
              {settings?.contact_subtitle || 'Whether you need a new website, a winning marketing strategy, or both — let\'s talk and build something great together.'}
            </p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(12, 226, 226, 0.05)', border: '1px solid rgba(12, 226, 226, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)' }}>
                  <Mail size={22} />
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600, marginBottom: '2px' }}>Email Me</div>
                  <div style={{ fontWeight: 700, fontSize: '1.125rem' }}>{settings?.email || 'hello@imshamnas.com'}</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(12, 226, 226, 0.05)', border: '1px solid rgba(12, 226, 226, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)' }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600, marginBottom: '2px' }}>Location</div>
                  <div style={{ fontWeight: 700, fontSize: '1.125rem' }}>{settings?.location || 'Available Worldwide'}</div>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginTop: '3.5rem' }}>
              <a href={settings?.linkedin_url || 'https://linkedin.com'} target="_blank" rel="noopener noreferrer" style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)' }}>
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
              <a href={settings?.twitter_url || 'https://twitter.com'} target="_blank" rel="noopener noreferrer" style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)' }}>
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
              </a>
              <a href={settings?.instagram_url || 'https://instagram.com'} target="_blank" rel="noopener noreferrer" style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)' }}>
                <Instagram size={18} />
              </a>
            </div>
          </div>

          <div className="card glass" style={{ padding: '3.5rem', borderRadius: '2rem', border: '1px solid rgba(255,255,255,0.05)' }}>
            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <div className="input-group">
                  <label className="input-label">Full Name</label>
                  <input type="text" className="input-field" placeholder="Your Name" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                </div>
                <div className="input-group">
                  <label className="input-label">Email Address</label>
                  <input type="email" className="input-field" placeholder="hello@company.com" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                </div>
              </div>

              <div className="input-group">
                <label className="input-label">Phone Number (with Country Code)</label>
                <input type="tel" className="input-field" placeholder="+971 50 000 0000" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
              </div>
              
              <div className="input-group">
                <label className="input-label">Service Needed</label>
                <div style={{ position: 'relative' }}>
                  <select 
                    className="input-field" 
                    required 
                    value={formData.service} 
                    onChange={e => setFormData({...formData, service: e.target.value})} 
                    style={{ appearance: 'none', color: '#fff', background: 'rgba(255,255,255,0.05)' }}
                  >
                    <option value="" disabled style={{ background: '#0a0a0a' }}>Select a service...</option>
                    {contactServices.map(s => (
                      <option key={s.id} value={s.label} style={{ background: '#0a0a0a', color: '#fff' }}>{s.label}</option>
                    ))}
                  </select>
                  <div style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'var(--text-secondary)' }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m6 9 6 6 6-6"/></svg>
                  </div>
                </div>
              </div>

              <div className="input-group">
                <label className="input-label">Message</label>
                <textarea className="input-field" placeholder="Tell me about your project and goals..." rows={4} required value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})}></textarea>
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '1.25rem', background: 'linear-gradient(90deg, #0ce2e2, #a855f7)', fontSize: '1rem', fontWeight: 700, borderRadius: '12px', marginTop: '1rem' }}>
                Send Message <Send size={20} />
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: '4rem 0 2rem', borderTop: '1px solid var(--border)' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '2rem' }}>
            <div className="logo" style={{ fontSize: '1.25rem' }}>
              <BrandLogo variant="premium" />
            </div>
            
            <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
              <a href="/privacy" style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', textDecoration: 'none' }}>Privacy Policy</a>
              <a href="/terms" style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', textDecoration: 'none' }}>Terms of Service</a>
              <a href="/cookies" style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', textDecoration: 'none' }}>Cookie Policy</a>
            </div>

            <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
              © {new Date().getFullYear()} imshamnas.com - All rights reserved.
            </div>
          </div>
        </div>
      </footer>

      <CookieConsent />
    </main>
  );
}
