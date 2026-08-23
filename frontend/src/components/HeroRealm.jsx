import React from 'react';
import { ArrowDown, Sparkles, Terminal, Zap, Shield, Radio, Activity, Cpu } from 'lucide-react';
import InteractiveHologramPortrait from './InteractiveHologramPortrait';

export default function HeroRealm({ data, lang }) {
  const scrollToNext = () => {
    const el = document.getElementById('skills');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="realm-section" style={{ minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
      <div className="max-w-7xl" style={{ width: '100%' }}>
        
        {/* Top Floating Badge */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
          <div className="cyber-badge" style={{ padding: '8px 22px', fontSize: '0.85rem' }}>
            <Sparkles size={16} />
            <span>{data.badge}</span>
          </div>
        </div>

        {/* Hero Grid: Profile Hologram Frame & Bio Content */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            alignItems: 'center',
            gap: '3.5rem',
            marginBottom: '4rem'
          }}
        >
          
          {/* Left / Layered Masking & Sliced Reveal Hologram Portrait */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <InteractiveHologramPortrait 
              name={data.name} 
              lang={lang} 
              primaryPhoto={data.primaryPhoto}
              alterEgoPhoto={data.alterEgoPhoto}
            />
          </div>

          {/* Right / Hero Typography & Actions */}
          <div style={{ textAlign: lang === 'ar' ? 'right' : 'left' }}>
            
            <div
              className="font-mono"
              style={{
                color: 'var(--neon-purple)',
                fontSize: '0.95rem',
                fontWeight: 700,
                letterSpacing: '0.1em',
                marginBottom: '0.75rem',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <Radio size={16} className="animate-pulse-glow" style={{ color: 'var(--neon-purple)' }} />
              <span>CORE ARCHITECT // PROTOCOL v2.6</span>
            </div>

            <h1
              className="font-cyber text-glow-purple"
              style={{
                fontSize: 'clamp(2.5rem, 5vw, 4.2rem)',
                fontWeight: 900,
                lineHeight: 1.15,
                marginBottom: '1rem',
                color: 'var(--text-heading)'
              }}
            >
              {data.name}
            </h1>

            <div
              style={{
                fontSize: 'clamp(1.1rem, 2.2vw, 1.5rem)',
                fontWeight: 800,
                color: 'var(--neon-purple)',
                marginBottom: '1.25rem'
              }}
            >
              {data.role}
            </div>

            <p
              style={{
                fontSize: 'clamp(0.95rem, 1.6vw, 1.15rem)',
                color: 'var(--text-secondary)',
                marginBottom: '2rem',
                lineHeight: 1.75
              }}
            >
              {data.bio}
            </p>

            {/* Action CTAs */}
            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
              <button onClick={scrollToNext} className="cyber-btn-primary">
                <Zap size={18} />
                <span>{data.ctaPrimary}</span>
              </button>
              <button onClick={scrollToContact} className="cyber-btn-secondary">
                <Terminal size={18} />
                <span>{data.ctaSecondary}</span>
              </button>
            </div>

            {/* Technical Highlights Quick List */}
            <div
              style={{
                display: 'flex',
                gap: '16px',
                flexWrap: 'wrap',
                borderTop: '1px solid var(--color-border)',
                paddingTop: '1.25rem'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                <Cpu size={15} style={{ color: 'var(--neon-purple)' }} />
                <span>Distributed Systems</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                <Shield size={15} style={{ color: 'var(--neon-magenta)' }} />
                <span>High Performance C++/Rust</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                <Activity size={15} style={{ color: 'var(--neon-cyan)' }} />
                <span>Sub-5ms Latency</span>
              </div>
            </div>

          </div>

        </div>

        {/* Floating Metrics HUD Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1.25rem',
            maxWidth: '75rem',
            margin: '0 auto'
          }}
        >
          {data.stats.map((stat, i) => (
            <div
              key={i}
              className="glass-panel"
              style={{
                padding: '1.5rem 1rem',
                textAlign: 'center',
                border: '1px solid var(--color-border)'
              }}
            >
              <div
                className="font-cyber text-glow-purple"
                style={{
                  fontSize: '2.2rem',
                  fontWeight: 900,
                  color: 'var(--neon-purple)',
                  marginBottom: '0.35rem'
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontSize: '0.85rem',
                  color: 'var(--text-secondary)',
                  fontWeight: 600
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Scroll Indicator Prompt */}
        <div
          onClick={scrollToNext}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
            marginTop: '3.5rem',
            cursor: 'pointer',
            opacity: 0.85,
            transition: 'opacity 0.3s ease'
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.85')}
        >
          <span className="font-mono" style={{ fontSize: '0.75rem', letterSpacing: '0.15em', color: 'var(--neon-purple)', fontWeight: 700 }}>
            {lang === 'ar' ? 'اسحب للأسفل للغوص داخل الطبقات' : 'SCROLL TO DIVE DEEP'}
          </span>
          <ArrowDown size={18} className="animate-pulse-glow" style={{ color: 'var(--neon-purple)' }} />
        </div>

      </div>
    </section>
  );
}
